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
import { AvailableChartColorsKeys } from "@/lib/chartUtils";

// Define a color palette with similar colors well-separated for better visual distinction
const colorPalette: AvailableChartColorsKeys[] = [
  "blue", // 1. Blue
  "amber", // 2. Amber (warm, opposite of blue)
  "emerald", // 3. Emerald (green)
  "violet", // 4. Violet (purple)
  "orange", // 5. Orange (warm)
  "sky", // 6. Sky (light blue)
  "rose", // 7. Rose (pink/red)
  "lime", // 8. Lime (bright green)
  "indigo", // 9. Indigo (dark blue)
  "yellow", // 10. Yellow (bright)
  "green", // 11. Green
  "pink", // 12. Pink
  "teal", // 13. Teal (blue-green)
  "red", // 14. Red
  "cyan", // 15. Cyan (light blue-green)
  "purple", // 16. Purple
  "lightBlue", // 17. Light blue
  "zinc", // 18. Zinc (gray)
  "neutral", // 19. Neutral (gray)
  "gray", // 20. Gray (fallback)
];

// Function to assign colors to pools based on alphabetical order
const getColorsForPools = (pools: string[]): AvailableChartColorsKeys[] => {
  return pools.map((pool, index) => {
    // Use the index to assign colors in order
    // If there are more pools than colors, use gray as fallback
    if (index < colorPalette.length) {
      return colorPalette[index];
    } else {
      return "gray"; // fallback for additional pools
    }
  });
};

export default function PoolsCumulativeStakedVolumes({
  slug,
  column,
}: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pools-cumulative-volumes", slug],
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

      // Check if Pool and Volumes fields exist
      if (!row.Pool) {
        return acc;
      }

      if (row.Volumes === undefined || row.Volumes === null) {
        return acc;
      }

      const pool = row.Pool;
      const volumes = parseFloat(row.Volumes);

      if (isNaN(volumes)) {
        return acc;
      }

      if (!acc[day]) {
        acc[day] = { Day: day };
      }

      // Use the pool name as is
      acc[day][pool] = volumes;
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

  // Get unique pools names for categories and sort alphabetically
  const uniquePools = new Set<string>(
    chartData
      .map((row: Record<string, any>) => {
        const pool = row.Pool as string;
        return pool;
      })
      .filter(Boolean) // Filter out any null/undefined values
  );
  const poolNames: string[] = Array.from(uniquePools).sort(
    (a: string, b: string) => a.localeCompare(b)
  );

  const poolColors = getColorsForPools(poolNames);

  // Check if we have valid data for the chart
  if (sortedDataChart.length === 0) {
    return <div>No valid data available for chart</div>;
  }

  if (poolNames.length === 0) {
    return <div>No pool categories found</div>;
  }

  return (
    <div>
      <BarChart
        showGridLines={true}
        type="stacked"
        colors={poolColors}
        data={sortedDataChart}
        index="Day"
        categories={poolNames}
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
        className="hidden md:block mt-4 h-80"
      />
      <BarChart
        showGridLines={true}
        showLegend={false}
        type="stacked"
        colors={poolColors}
        data={sortedDataChart}
        index="Day"
        categories={poolNames}
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
        className="block md:hidden mt-4 h-80"
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
