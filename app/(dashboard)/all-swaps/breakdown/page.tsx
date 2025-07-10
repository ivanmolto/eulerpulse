"use client";

import BreakdownSwaps from "@/components/ui/all-swaps/BreakdownSwaps";
export default function Breakdown() {
  return (
    <section aria-label="App Monitoring">
      <dl className="-ml-4 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Swaps by Chain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Swaps over time, grouped by day and by chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-daily-swaps" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Swaps by Chain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Swaps over time, grouped by week and by chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-weekly-swaps" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Swaps by Chain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Swaps over time, grouped by month and by chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-monthly-swaps" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Quarterly Swaps by Chain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Swaps over time, grouped by quarter and by chain
            </dd>
          </div>
          <BreakdownSwaps slug="breakdown-quarterly-swaps" />
        </div>
      </dl>
    </section>
  );
}
