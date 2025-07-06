"use client";

import BreakdownFees from "@/components/ui/all-fees/BreakdownFees";
export default function Breakdown() {
  return (
    <section aria-label="Split by chain">
      <dl className="-ml-4 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Fees
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by day and broken down by chain
            </dd>
          </div>
          <BreakdownFees slug="breakdown-daily-fees" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Fees
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by week and broken down by chain
            </dd>
          </div>
          <BreakdownFees slug="breakdown-weekly-fees" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Fees
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by month and broken down by chain
            </dd>
          </div>
          <BreakdownFees slug="breakdown-monthly-fees" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Quarterly Fees
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by quarter and broken down by chain
            </dd>
          </div>
          <BreakdownFees slug="breakdown-quarterly-fees" />
        </div>
      </dl>
    </section>
  );
}
