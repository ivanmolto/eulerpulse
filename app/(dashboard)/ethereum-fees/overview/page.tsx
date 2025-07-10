"use client";

import EthereumCumulativeFees from "@/components/ui/ethereum-fees/EthereumCumulativeFees";
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
              Cumulative Fees over time on Ethereum
            </dt>
            <dd className="mt-0.5 text-sm/6 text-gray-500 dark:text-gray-500">
              Fees accumulated over time on Ethereum
            </dd>
          </div>
          <EthereumCumulativeFees slug="ethereum-cumulative-fees" />
        </div>
      </dl>
    </section>
  );
}
