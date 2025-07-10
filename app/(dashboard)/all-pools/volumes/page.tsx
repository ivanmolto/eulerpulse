"use client";

import PoolsStakedVolumes from "@/components/ui/all-pools/PoolsStakedVolumes";
import { cx } from "@/lib/utils";

export default function Overview() {
  return (
    <section aria-labelledby="usage-overview">
      <dl
        className={cx(
          "ml-2 mt-6 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1"
        )}
      >
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily Trading Volume by Pool
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by day and by pool
            </dd>
          </div>
          <PoolsStakedVolumes slug="daily-pools-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Weekly Trading Volume by Pool
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by week and by pool
            </dd>
          </div>
          <PoolsStakedVolumes slug="weekly-pools-volumes" />
        </div>
        {/* <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Monthly Trading Volume by Pool
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by day and by pool
            </dd>
          </div>
          <PoolsStakedVolumes slug="monthly-pools-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Daily trading volume by pool
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading volume over time, grouped by day and by pool
            </dd>
          </div>
          <PoolsStakedVolumes slug="quarterly-pools-volumes" />
        </div> */}
      </dl>
    </section>
  );
}
