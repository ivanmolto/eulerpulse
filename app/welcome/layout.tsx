"use client";

import Footer from "@/components/ui/Footer";
import { Logo } from "@/components/ui/Logo";
import useScroll from "@/lib/useScroll";
import { cx } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { RiGithubFill, RiTwitterXFill, RiEarthFill } from "@remixicon/react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const scrolled = useScroll(15);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 isolate z-50 flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 transition-all md:grid md:grid-cols-[200px_auto_200px] md:px-6 dark:border-gray-900 dark:bg-gray-925",
          scrolled ? "h-12" : "h-20"
        )}
      >
        <div
          className="inline-flex flex-nowrap items-center gap-0.5"
          aria-hidden="true"
        >
          <Logo
            className="w-8 md:w-7 p-px text-teal-500 dark:text-teal-500"
            aria-hidden="true"
          />
          <span className="hidden md:block ml-1 mt-0.5 text-lg font-semibold text-gray-900 dark:text-gray-50">
            euler pulse
          </span>
        </div>
        <div>
          <div className="hidden md:flex items-center">
            {/* Social Icons */}
            <a
              href="https://x.com/ivanmolto"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-teal-400"
            >
              <RiTwitterXFill className="size-5" />
            </a>
            <a
              href="https://github.com/ivanmolto/eulerpulse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-teal-400"
            >
              <RiGithubFill className="size-5" />
            </a>
            <a
              href="https://www.ivanmolto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-teal-400"
            >
              <RiEarthFill className="size-5" />
            </a>
          </div>
        </div>
        <Link
          className="ml-auto w-fit inline-flex cursor-pointer flex-row items-center justify-center gap-1 rounded-sm border-b-[1.5px] border-teal-700 bg-linear-to-b from-teal-400 to-teal-500 px-3 py-2 leading-4 text-sm font-medium tracking-wide whitespace-nowrap text-gray-900 shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all duration-200 ease-in-out hover:shadow-teal-300"
          href="/all-volumes/overview"
        >
          Launch App
        </Link>
      </header>
      <main id="main-content" className="mx-auto">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
