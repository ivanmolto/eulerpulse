"use client";

import CumulativeFees from "@/components/ui/all-fees/CumulativeFees";
import CumulativeStakedFees from "@/components/ui/all-fees/CumulativeStakedFees";
import CumulativeFeesChain from "@/components/ui/all-fees/CumulativeFeesChain";
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
                Cumulative Fees over time
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Fees accumulated over time
              </dd>
            </div>
            <CumulativeFees slug="cumulative-fees" />
          </div>
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Cumulative Fees over time by Chain
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Fees over time by chain
              </dd>
            </div>
            <CumulativeFeesChain slug="cumulative-fees-chain" />
          </div>
        </dl>
      </section>
      <section aria-labelledby="overview">
        <dl
          className={cx(
            "ml-2 mt-10 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-1"
          )}
        >
          <div className="flex flex-col justify-between p-0">
            <div>
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Cumulative Fees over time, staked by chain
              </dt>
              <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
                Fees accumulated over time, staked by chain
              </dd>
            </div>
            <CumulativeStakedFees slug="cumulative-fees-chain" />
          </div>
        </dl>
      </section>
    </>
  );
}
