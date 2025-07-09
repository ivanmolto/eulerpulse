"use client";

import AssetsCumulativeStakedVolumes from "@/components/ui/all-assets/AssetsCumulativeStakedVolumes";
import AssetsCumulativeStakedFees from "@/components/ui/all-assets/AssetsCumulativeStakedFees";
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
              Cumulative Trading Volume over time by asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading Volume accumulated over time by asset
            </dd>
          </div>
          <AssetsCumulativeStakedVolumes slug="assets-cumulative-volumes" />
        </div>
        <div className="flex flex-col justify-between p-0">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Cumulative Fees over time by asset
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees accumulated over time by asset
            </dd>
          </div>
          <AssetsCumulativeStakedFees slug="assets-cumulative-fees" />
        </div>
      </dl>
    </section>
  );
}
