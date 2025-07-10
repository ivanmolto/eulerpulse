"use client";

import BreakdownVolumes from "@/components/ui/all-volumes/BreakdownVolumes";
export default function Breakdown() {
  return (
    <section aria-label="Breakdown">
      <dl className="-ml-4 grid grid-cols-1 gap-x-14 gap-y-10 border-t border-gray-200 p-6 md:grid-cols-2 dark:border-gray-800">
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Trading Volume by Chain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by day and by chain
            </dd>
          </div>
          <BreakdownVolumes slug="breakdown-daily-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Trading Volume by Chain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by week and by chain
            </dd>
          </div>
          <BreakdownVolumes slug="breakdown-weekly-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Trading Volume by Chain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by month and by chain
            </dd>
          </div>
          <BreakdownVolumes slug="breakdown-monthly-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Quarterly Trading Volume
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by quarter and by chain
            </dd>
          </div>
          <BreakdownVolumes slug="breakdown-quarterly-volumes" />
        </div>
      </dl>
    </section>
  );
}
