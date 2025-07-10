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

export default function EthereumVolumesCount({ slug }: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ethereum-volumes", slug],
    queryFn: () => fetchDuneData(slug),
  });

  if (isLoading)
    return (
      <div className="h-8 w-20 animate-pulse mt-0.5 rounded bg-gray-200 dark:bg-gray-800"></div>
    );
  if (error) return <div>Error: {error.message}</div>;

  if (!data || data.length === 0) return <div>No data available</div>;

  // Get the relative time from execution_ended_at
  const executionTime = data.execution_ended_at
    ? relativeDate(data.execution_ended_at)
    : null;

  return (
    <>
      <dd className="text-lg font-semibold text-gray-900 dark:text-gray-50 mt-1.5 flex items-center gap-2">
        $
        {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
          data.result?.rows[0]["Volumes"]
        )}
        {executionTime && (
          <span className="text-[10px] font-normal text-teal-500 ml-2 mt-1 flex items-center gap-1">
            {executionTime}
            <RiCheckLine className="w-3 h-3 text-teal-500" />
          </span>
        )}
      </dd>
    </>
  );
}
