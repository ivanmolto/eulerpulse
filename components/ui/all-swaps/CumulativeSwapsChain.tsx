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

import { LineChart } from "@/components/LineChart";
import { formatters } from "@/lib/utils";

export default function CumulativeSwapsChain({ slug, column }: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cumulative-swaps-chain", slug],
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

      const chain = row.Chain;
      const swaps = row.Swaps;

      if (!acc[day]) {
        acc[day] = { Day: day };
      }

      // Capitalize the first letter of the chain name
      const capitalizedChain = chain.charAt(0).toUpperCase() + chain.slice(1);
      acc[day][capitalizedChain] = swaps;
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

  // Get unique chain names for categories (capitalized) and sort alphabetically
  const uniqueChains = new Set<string>(
    chartData.map((row: Record<string, any>) => {
      const chain = row.Chain as string;
      return chain.charAt(0).toUpperCase() + chain.slice(1);
    })
  );
  const chainNames: string[] = Array.from(uniqueChains).sort(
    (a: string, b: string) => a.localeCompare(b)
  );

  // Define colors for specific chains
  const getColorsForChains = (chains: string[]) => {
    return chains.map((chain) => {
      if (chain === "Ethereum") return "indigo";
      if (chain === "Unichain") return "pink";
      if (chain === "Bnb") return "yellow";
      return "gray"; // fallback for any other chains
    });
  };

  const chainColors = getColorsForChains(chainNames);

  // Check if we have valid data for the chart
  if (sortedDataChart.length === 0) {
    return <div>No valid data available for chart</div>;
  }

  if (chainNames.length === 0) {
    return <div>No chain categories found</div>;
  }

  return (
    <div>
      <LineChart
        colors={chainColors}
        data={sortedDataChart}
        index="Day"
        categories={chainNames}
        valueFormatter={(value: number) => {
          const formattedValue =
            value >= 1000000
              ? `${(value / 1000000).toFixed(2)}M`
              : value >= 1000
              ? `${(value / 1000).toFixed(1)}k`
              : formatters.unit(value);
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
