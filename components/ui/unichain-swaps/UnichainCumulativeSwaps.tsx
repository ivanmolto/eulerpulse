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

export default function UnichainCumulativeSwaps({
  slug,
  column,
}: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["unichaincumulative-swaps", slug],
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
    Day: new Date(row.Day.split(" ")[0] + "T00:00:00Z")
      .toISOString()
      .split("T")[0], // Converts "2024-10-01 00:00:00.000 UTC" to "2024-10-01"
  }));
  const sortedDataChart = [...formattedDataChart].sort(
    (a, b) => new Date(a.Day).getTime() - new Date(b.Day).getTime()
  );
  return (
    <>
      <LineChart
        className="h-60 w-full"
        colors={["pink"]}
        data={sortedDataChart}
        index="Day"
        categories={["Swaps"]}
        valueFormatter={(value) => {
          const formattedValue =
            value >= 1000000
              ? `${(value / 1000000).toFixed(2)}M`
              : value >= 1000
              ? `${(value / 1000).toFixed(2)}k`
              : formatters.unit(value);
          return formattedValue;
        }}
        onValueChange={(v) => console.log(v)}
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
