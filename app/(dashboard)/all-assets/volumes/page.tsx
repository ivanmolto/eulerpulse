"use client";

import AssetsStakedVolumes from "@/components/ui/all-assets/AssetsStakedVolumes";
export default function Trends() {
  return (
    <section aria-label="App Monitoring">
      <dl className="-ml-4 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Trading Volume by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by and by asset
            </dd>
          </div>
          <AssetsStakedVolumes slug="daily-assets-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Trading Volume by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading Volume over time, grouped by week and by asset
            </dd>
          </div>
          <AssetsStakedVolumes slug="weekly-assets-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Trading Volume by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time grouped, by month and by asset
            </dd>
          </div>
          <AssetsStakedVolumes slug="monthly-assets-vol" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Quarterly Trading Volume by Asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by quarter and by asset
            </dd>
          </div>
          <AssetsStakedVolumes slug="quarterly-assets-volume" />
        </div>
      </dl>
    </section>
  );
}
