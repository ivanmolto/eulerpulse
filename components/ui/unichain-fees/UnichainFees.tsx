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

export default function UnichainFees({ slug, column }: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["unichain-fees", slug],
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

  const formattedDataChart = chartData.map((row: Record<string, any>) => ({
    ...row,
    Day: (() => {
      // Handle different date formats
      const dateStr = row.Day;
      if (dateStr.includes("UTC")) {
        // If it already has UTC, just extract the date part
        return dateStr.split(" ")[0];
      } else {
        // If no timezone indicator, treat as UTC by adding Z
        return new Date(dateStr + "Z").toISOString().split("T")[0];
      }
    })(),
  }));
  const sortedDataChart = [...formattedDataChart].sort(
    (a, b) => new Date(a.Day).getTime() - new Date(b.Day).getTime()
  );
  return (
    <>
      <BarChart
        data={sortedDataChart}
        index="Day"
        categories={["Fees"]}
        colors={["pink"]}
        yAxisWidth={45}
        yAxisLabel=" "
        barCategoryGap="20%"
        valueFormatter={(value) => {
          const formattedValue =
            value >= 1000000
              ? `$${(value / 1000000).toFixed(2)}M`
              : value >= 1000
              ? `$${(value / 1000).toFixed(2)}k`
              : `$${value.toFixed(2)}`;
          return formattedValue;
        }}
        className="mt-4 hidden h-60 md:block"
      />
      <BarChart
        data={sortedDataChart}
        index="Day"
        categories={["Fees"]}
        colors={["pink"]}
        showYAxis={false}
        barCategoryGap="20%"
        className="mt-4 h-60 md:hidden"
      />
      {executionTime && (
        <span className="text-[10px] font-normal text-teal-500 mr-4 mt-1 flex items-center gap-1 justify-end">
          {executionTime}
          <RiCheckLine className="w-3 h-3 text-teal-500" />
        </span>
      )}
    </>
  );
}
