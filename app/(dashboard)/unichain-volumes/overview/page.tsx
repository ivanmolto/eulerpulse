"use client";

import UnichainCumulativeVolumes from "@/components/ui/unichain-volumes/UnichainCumulativeVolumes";
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
              Cumulative Trading Volume over time on Unichain
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Trading Volume accumulated over time on Unichain
            </dd>
          </div>
          <UnichainCumulativeVolumes slug="unichain-cumulative-volumes" />
        </div>
      </dl>
    </section>
  );
}
