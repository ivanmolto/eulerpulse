/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useQuery } from "@tanstack/react-query";

interface DuneResponse {
  result?: {
    rows: Array<Record<string, any>>;
  };
}

interface DuneDataProps {
  slug: string;
  column?: string;
}

const fetchDuneData = async (slug: string): Promise<any> => {
  const response = await fetch(`/api/dune/${encodeURIComponent(slug)}`);
  const data: DuneResponse = await response.json();
  return data.result?.rows;
};

export default function EthereumVolumesCount({ slug }: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["volumes", slug],
    queryFn: () => fetchDuneData(slug),
  });

  if (isLoading)
    return (
      <div className="h-8 w-20 animate-pulse mt-0.5 rounded bg-gray-200 dark:bg-gray-800"></div>
    );
  if (error) return <div>Error: {error.message}</div>;

  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <>
      <dd className="text-lg font-semibold text-gray-900 dark:text-gray-50 mt-1.5 flex items-center gap-2">
        {(() => {
          const value = data[0]["Volumes"];
          if (value >= 1000000000) {
            return `$${(value / 1000000000).toFixed(2)}B`;
          } else if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(2)}M`;
          } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(2)}k`;
          } else {
            return `$${value.toFixed(2)}`;
          }
        })()}
      </dd>
    </>
  );
}
