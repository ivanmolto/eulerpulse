"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment);
  const currentPage = segments[0];
  let nav = "";
  if (currentPage === "all-swaps") {
    nav = "EulerSwap swaps across chains";
  } else if (currentPage === "all-volumes") {
    nav = "EulerSwap trading volume across chains";
  } else if (currentPage === "all-fees") {
    nav = "EulerSwap fees across chains";
  } else if (currentPage === "all-pools") {
    nav = "EulerSwap pools across chains";
  } else if (currentPage === "all-assets") {
    nav = "EulerSwap assets across chains";
  } else if (currentPage === "ethereum-swaps") {
    nav = "EulerSwap swaps on Ethereum";
  } else if (currentPage === "ethereum-volumes") {
    nav = "EulerSwap trading volume on Ethereum";
  } else if (currentPage === "ethereum-fees") {
    nav = "EulerSwap fees on Ethereum";
  } else if (currentPage === "ethereum-pools") {
    nav = "EulerSwap pools on Ethereum";
  } else if (currentPage === "ethereum-assets") {
    nav = "EulerSwap assets on Ethereum";
  } else if (currentPage === "unichain-swaps") {
    nav = "EulerSwap swaps on Unichain";
  } else if (currentPage === "unichain-volumes") {
    nav = "EulerSwap trading volume on Unichain";
  } else if (currentPage === "unichain-fees") {
    nav = "EulerSwap fees on Unichain";
  } else if (currentPage === "unichain-pools") {
    nav = "EulerSwap pools on Unichain";
  } else if (currentPage === "unichain-assets") {
    nav = "EulerSwap assets on Unichain";
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="ml-2">
        <ol role="list" className="flex items-center space-x-3 text-sm">
          <li className="flex">
            <Link
              href="/all-volumes/overview"
              className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 hover:dark:text-gray-300"
            >
              Main
            </Link>
          </li>
          <ChevronRight
            className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
            aria-hidden="true"
          />
          <li className="flex">
            <div className="flex items-center">
              <Link
                href={pathname}
                // aria-current={page.current ? 'page' : undefined}
                className="text-gray-900 dark:text-gray-50"
              >
                {nav}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
    </>
  );
}
