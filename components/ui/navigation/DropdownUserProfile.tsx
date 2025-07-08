"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { ArrowUpRight, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export type DropdownUserProfileProps = {
  children: React.ReactNode;
  align?: "center" | "start" | "end";
};

export function DropdownUserProfile({
  children,
  align = "start",
}: DropdownUserProfileProps) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          className="sm:!min-w-[calc(var(--radix-dropdown-menu-trigger-width))]"
        >
          <DropdownMenuGroup>
            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>Theme</DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) => {
                    setTheme(value);
                  }}
                >
                  <DropdownMenuRadioItem
                    aria-label="Switch to Light Mode"
                    value="light"
                    iconType="check"
                  >
                    <Sun className="size-4 shrink-0" aria-hidden="true" />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    aria-label="Switch to Dark Mode"
                    value="dark"
                    iconType="check"
                  >
                    <Moon className="size-4 shrink-0" aria-hidden="true" />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    aria-label="Switch to System Mode"
                    value="system"
                    iconType="check"
                  >
                    <Monitor className="size-4 shrink-0" aria-hidden="true" />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <a
                href="https://dune.com/eulerswap_pulse"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-gray-700 dark:text-gray-300 transition-colors duration-200 "
              >
                <span className="group inline-flex hover:text-red-400">
                  <span className="group-hover:text-red-400">Queries Docs</span>
                  <ArrowUpRight
                    className="mb-1 ml-1 size-3 shrink-0 text-gray-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="https://github.com/ivanmolto/eulerpulse"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-gray-700 dark:text-gray-300 transition-colors duration-200 "
              >
                <span className="group inline-flex hover:text-red-400">
                  <span className="group-hover:text-red-400">GitHub</span>
                  <ArrowUpRight
                    className="mb-1 ml-1 size-3 shrink-0 text-gray-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="https://x.com/ivanmolto"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-gray-700 dark:text-gray-300 transition-colors duration-200 "
              >
                <span className="group inline-flex hover:text-red-400">
                  <span className="group-hover:text-red-400">X</span>
                  <ArrowUpRight
                    className="mb-1 ml-1 size-3 shrink-0 text-gray-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
