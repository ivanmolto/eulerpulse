"use client";
import { usePathname } from "next/navigation";
import { Divider } from "@/components/Divider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "@/components/Sidebar";
import { cx, focusRing } from "@/lib/utils";
import { RiArrowDownSFill } from "@remixicon/react";
import { House, Link } from "lucide-react";
import * as React from "react";
import { Logo } from "@/components/ui/Logo";
import { UnichainIcon } from "@/components/ui/UnichainIcon";
import { EthereumIcon } from "@/components/ui/CustomIcon";
import { UserProfile } from "./UserProfile";

const navigation = [
  {
    name: "All EulerSwap chains",
    href: "#",
    icon: Link,
    children: [
      {
        name: "Volumes",
        href: "/all-volumes/overview",
      },
      {
        name: "Fees",
        href: "/all-fees/overview",
      },
      {
        name: "Pools",
        href: "/all-pools/overview",
      },
      {
        name: "Assets",
        href: "/all-assets/overview",
      },
      {
        name: "Swaps",
        href: "/all-swaps/overview",
      },
    ],
  },
  {
    name: "EulerSwap Ethereum",
    href: "#",
    icon: EthereumIcon,
    children: [
      {
        name: "Volumes",
        href: "/ethereum-volumes/overview",
        active: false,
      },
      {
        name: "Fees",
        href: "/ethereum-fees/overview",
        active: false,
      },
      {
        name: "Pools",
        href: "/ethereum-pools/overview",
        active: false,
      },
      {
        name: "Assets",
        href: "/ethereum-assets/overview",
        active: false,
      },
      {
        name: "Swaps",
        href: "/ethereum-swaps/overview",
        active: false,
      },
    ],
  },
  {
    name: "EulerSwap Unichain",
    href: "#",
    icon: UnichainIcon,
    children: [
      {
        name: "Volumes",
        href: "/unichain-volumes/overview",
        active: false,
      },
      {
        name: "Fees",
        href: "/unichain-fees/overview",
        active: false,
      },
      {
        name: "Pools",
        href: "/unichain-pools/overview",
        active: false,
      },
      {
        name: "Assets",
        href: "/unichain-assets/overview",
        active: false,
      },
      {
        name: "Swaps",
        href: "/unichain-swaps/overview",
        active: false,
      },
    ],
  },
] as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = React.useState<string[]>([
    navigation[0].name,
    navigation[1].name,
    navigation[2].name,
  ]);

  // Helper function to check if a link is active
  const isLinkActive = (href: string) => {
    if (href === "#") return false;

    const basePath = href.split("/").slice(0, 2).join("/");
    return pathname.startsWith(basePath);
  };

  const toggleMenu = (name: string) => {
    setOpenMenus((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((item: string) => item !== name)
        : [...prev, name]
    );
  };
  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-925">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <Logo className="size-6 -ml-2 -mt-1" />
          </span>
          <div>
            <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50">
              euler pulse
            </span>
            <span className="block text-xs text-gray-900 dark:text-gray-50"></span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-1 space-y-4">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {/* @CHRIS/SEV: discussion whether to componentize (-> state mgmt) */}
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 hover:dark:bg-gray-900 hover:dark:text-gray-50",
                      focusRing
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className="size-[18px] shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                    <RiArrowDownSFill
                      className={cx(
                        openMenus.includes(item.name)
                          ? "rotate-0"
                          : "-rotate-90",
                        "size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {item.children && openMenus.includes(item.name) && (
                    <SidebarMenuSub>
                      <div className="absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800" />
                      {item.children.map((child) => (
                        <SidebarMenuItem key={child.name}>
                          <SidebarSubLink
                            href={child.href}
                            isActive={isLinkActive(child.href)}
                          >
                            {child.name}
                          </SidebarSubLink>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-3">
          <Divider className="my-0 py-0" />
        </div>
        <SidebarGroup className="mt-8 pt-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem key="Home">
                <SidebarLink
                  href="/"
                  isActive={false}
                  icon={House}
                  notifications={false}
                >
                  Home
                </SidebarLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
