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

import { LineChart } from "@/components/LineChart";

export default function CumulativeFeesChain({ slug, column }: DuneDataProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cumulative-swaps-chain", slug],
    queryFn: () => fetchDuneData(slug),
  });

  if (isLoading)
    return (
      <div className="h-60 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
    );
  if (error) return <div>Error: {error.message}</div>;

  if (!data || data.length === 0) return <div>No data available</div>;

  if (column) {
    return (
      <div>
        {data.map((row: Record<string, any>, index: number) => (
          <div key={index}>
            {column}: {row[column]}
          </div>
        ))}
      </div>
    );
  }

  // Transform data from long to wide format
  const transformedData = data.reduce(
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
      const fees = row.Fees;

      if (!acc[day]) {
        acc[day] = { Day: day };
      }

      // Capitalize the first letter of the chain name
      const capitalizedChain = chain.charAt(0).toUpperCase() + chain.slice(1);
      acc[day][capitalizedChain] = fees;
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
    data.map((row: Record<string, any>) => {
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
        valueFormatter={(value) => {
          const formattedValue =
            value >= 1000000
              ? `$${(value / 1000000).toFixed(2)}M`
              : value >= 1000
              ? `$${(value / 1000).toFixed(2)}k`
              : `$${value.toFixed(2)}`;
          return formattedValue;
        }}
        className="mt-4 h-60"
      />
    </div>
  );
}
