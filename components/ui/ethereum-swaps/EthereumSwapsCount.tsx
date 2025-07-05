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

export default function EthereumSwapsCount({ slug }: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ethereum swaps", slug],
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
        {new Intl.NumberFormat("en-US").format(data[0]["Swaps"])}
      </dd>
    </>
  );
}
