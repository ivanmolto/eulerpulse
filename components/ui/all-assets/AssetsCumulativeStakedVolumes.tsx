/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useQuery } from "@tanstack/react-query";
import { relativeDate } from "@/lib/relativeDate";
import { RiCheckLine } from "@remixicon/react";

interface DuneResponse {
  result?: {
    rows: Array<Record<string, any>>;
  };
  execution_ended_at?: string;
  execution_id?: string;
  query_id?: number;
  is_execution_finished?: boolean;
  state?: string;
  submitted_at?: string;
}

interface DuneDataProps {
  slug: string;
  column?: string;
}

const fetchDuneData = async (slug: string): Promise<any> => {
  const response = await fetch(`/api/dune/${encodeURIComponent(slug)}`);
  const data: DuneResponse = await response.json();
  return data;
};

import { BarChart } from "@/components/BarChart";

export default function AssetsCumulativeStakedVolumes({
  slug,
  column,
}: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["assets-cumulative-volumes", slug],
    queryFn: () => fetchDuneData(slug),
  });

  if (isLoading)
    return (
      <div className="h-60 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
    );
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data.result?.rows || data.result.rows.length === 0)
    return <div>No data available</div>;

  // Get the relative time from execution_ended_at
  const executionTime = data.execution_ended_at
    ? relativeDate(data.execution_ended_at)
    : null;

  const chartData = data.result.rows;

  if (column) {
    return (
      <div>
        {chartData.map((row: Record<string, any>, index: number) => (
          <div key={index}>
            {column}: {row[column]}
          </div>
        ))}
      </div>
    );
  }

  // Transform data from long to wide format
  const transformedData = chartData.reduce(
    (acc: Record<string, Record<string, any>>, row: Record<string, any>) => {
      // Skip rows with null, undefined, or empty string dates
      if (
        !row.Day ||
        row.Day === "" ||
        row.Day === "null" ||
        row.Day === "undefined"
      ) {
        return acc;
      }

      // Extract just the date part (before the space) and treat as UTC
      let day: string;
      try {
        const dateOnly = row.Day.split(" ")[0]; // Extract "2025-06-30" from "2025-06-30 00:00"
        const date = new Date(dateOnly + "T00:00:00Z"); // Create UTC date
        if (isNaN(date.getTime())) {
          return acc;
        }
        day = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
      } catch {
        return acc;
      }

      const asset = row.Asset;
      const volumes = row.Volumes;

      if (!acc[day]) {
        acc[day] = { Day: day };
      }

      // Capitalize the asset name
      const capitalizedAsset = asset;
      acc[day][capitalizedAsset] = volumes;
      return acc;
    },
    {}
  );

  const formattedDataChart: Record<string, any>[] =
    Object.values(transformedData);
  const sortedDataChart = [...formattedDataChart].sort(
    (a: Record<string, any>, b: Record<string, any>) =>
      new Date(a.Day).getTime() - new Date(b.Day).getTime()
  );

  // Get unique assets names for categories (capitalized) and sort alphabetically
  const uniqueAssets = new Set<string>(
    chartData.map((row: Record<string, any>) => {
      const asset = row.Asset as string;
      return asset;
    })
  );
  const assetNames: string[] = Array.from(uniqueAssets).sort(
    (a: string, b: string) => a.localeCompare(b)
  );

  // Define colors for specific assets
  const getColorsForAssets = (assets: string[]) => {
    return assets.map((asset) => {
      if (asset === "RLUSD") return "blue";
      if (asset === "USD₮0") return "emerald";
      if (asset === "USD1") return "yellow";
      if (asset === "USDC") return "sky";
      if (asset === "USDT") return "green";
      if (asset === "USR") return "neutral";
      if (asset === "WBTC") return "amber";
      if (asset === "WETH") return "violet";
      if (asset === "wstETH") return "cyan";
      return "gray"; // fallback for any other assets
    });
  };

  const assetColors = getColorsForAssets(assetNames);

  // Check if we have valid data for the chart
  if (sortedDataChart.length === 0) {
    return <div>No valid data available for chart</div>;
  }

  if (assetNames.length === 0) {
    return <div>No asset categories found</div>;
  }

  return (
    <div>
      <BarChart
        showGridLines={true}
        type="stacked"
        colors={assetColors}
        data={sortedDataChart}
        index="Day"
        categories={assetNames}
        valueFormatter={(value) => {
          const formattedValue =
            value >= 1000000000
              ? `$${(value / 1000000000).toFixed(2)}B`
              : value >= 1000000
              ? `$${(value / 1000000).toFixed(0)}M`
              : value >= 1000
              ? `$${(value / 1000).toFixed(2)}k`
              : `$${value.toFixed(2)}`;
          return formattedValue;
        }}
        className="mt-4 h-60"
      />
      {executionTime && (
        <span className="text-[10px] font-normal text-teal-500 mr-4 mt-1 flex items-center gap-1 justify-end">
          {executionTime}
          <RiCheckLine className="w-3 h-3 text-teal-500" />
        </span>
      )}
    </div>
  );
}
