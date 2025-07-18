"use client";

import CumulativeSwaps from "@/components/ui/all-swaps/CumulativeSwaps";
import CumulativeStackedSwaps from "@/components/ui/all-swaps/CumulativeStackedSwaps";
import CumulativeSwapsChain from "@/components/ui/all-swaps/CumulativeSwapsChain";
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
                Cumulative Swaps over time
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Swaps accumulated over time
              </dd>
            </div>
            <CumulativeSwaps slug="cumulative-swaps" />
          </div>
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Cumulative Swaps over time by Chain
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Swaps accumulated over time by chain
              </dd>
            </div>
            <CumulativeSwapsChain slug="cumulative-swaps-chain" />
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
                Cumulative Swaps over time by Chain
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Swaps accumulated over time by chain
              </dd>
            </div>
            <CumulativeStackedSwaps slug="cumulative-swaps-chain" />
          </div>
        </dl>
      </section>
    </>
  );
}
