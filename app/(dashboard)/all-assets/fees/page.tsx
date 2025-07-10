"use client";

import AssetsStakedFees from "@/components/ui/all-assets/AssetsStakedFees";
export default function Trends() {
  return (
    <section aria-label="App Monitoring">
      <dl className="-ml-4 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Fees by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by day and by asset
            </dd>
          </div>
          <AssetsStakedFees slug="daily-assets-fees" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Fees by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by week and by asset
            </dd>
          </div>
          <AssetsStakedFees slug="weekly-assets-fees" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Fees by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by month and by asset
            </dd>
          </div>
          <AssetsStakedFees slug="monthly-assets-fees" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Quarterly Fees by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees over time, grouped by quarter and by asset
            </dd>
          </div>
          <AssetsStakedFees slug="quarterly-assets-fees" />
        </div>
      </dl>
    </section>
  );
}
