"use client";

import UnichainVolumes from "@/components/ui/unichain-volumes/UnichainVolumes";
export default function Trends() {
  return (
    <section aria-label="App Monitoring">
      <dl className="-ml-4 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Trading Volume
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time grouped by day
            </dd>
          </div>
          <UnichainVolumes slug="unichain-daily-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Trading Volume
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time grouped by week
            </dd>
          </div>
          <UnichainVolumes slug="unichain-weekly-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Trading Volume
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time grouped by month
            </dd>
          </div>
          <UnichainVolumes slug="unichain-monthly-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Quarterly Trading Volume
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading olume over time grouped by quarter
            </dd>
          </div>
          <UnichainVolumes slug="unichain-quarterly-volume" />
        </div>
      </dl>
    </section>
  );
}
