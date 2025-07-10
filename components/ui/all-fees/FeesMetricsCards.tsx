import FeesCount from "@/components/ui/all-fees/FeesCount";

export function FeesMetricsCards() {
  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Overview
      </h1>
      <dl className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-8">
        <div>
          <dt className="text-sm text-gray-500 dark:text-gray-500">
            Total Fees
          </dt>
          <FeesCount slug="all-fees-count" />
        </div>
      </dl>
    </>
  );
}
