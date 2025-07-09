"use client";

import CumulativeVolumes from "@/components/ui/all-volumes/CumulativeVolumes";
import CumulativeStakedVolumes from "@/components/ui/all-volumes/CumulativeStakedVolumes";
import CumulativeVolumesChain from "@/components/ui/all-volumes/CumulativeVolumesChain";
import { cx } from "@/lib/utils";

export default function Overview() {
  return (
    <>
      <section aria-label="Overview">
        <dl
          className={cx(
            "ml-2 mt-6 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1"
          )}
        >
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Cumulative Trading Volume over time
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Trading Volume accumulated over time
              </dd>
            </div>
            <CumulativeVolumes slug="cumulative-volumes" />
          </div>
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Cumulative Trading Volume over time by chain
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Trading Volume accumulated over time by chain
              </dd>
            </div>
            <CumulativeVolumesChain slug="cumulative-volumes-chain" />
          </div>
        </dl>
      </section>
      <section aria-labelledby="usage-overview">
        <dl
          className={cx(
            "ml-2 mt-10 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1"
          )}
        >
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Cumulative Trading Volume over time, staked by chain
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Trading Volume accumulated over time, staked by chain
              </dd>
            </div>
            <CumulativeStakedVolumes slug="cumulative-volumes-chain" />
          </div>
        </dl>
      </section>
    </>
  );
}
