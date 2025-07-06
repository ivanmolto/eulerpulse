"use client";

import BreakdownSwaps from "@/components/ui/all-swaps/BreakdownSwaps";
export default function Breakdown() {
  return (
    <section aria-label="App Monitoring">
      <dl className="-ml-4 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Swaps
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Number of swaps over time, grouped by day and broken down by chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-daily-swaps" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Swaps
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Number of swaps over time, grouped by week and broken down by
              chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-weekly-swaps" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Swaps
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Number of swaps over time, grouped by month and broken down by
              chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-monthly-swaps" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Quarterly Swaps
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Number of swaps over time, grouped by quarter and broken down by
              chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-quarterly-swaps" />
        </div>
      </dl>
    </section>
  );
}
