import * as NavigationMenuPrimitives from "@radix-ui/react-navigation-menu";
import React from "react";

import { cx, focusRing } from "@/lib/utils";

type SubtreeOptions = {
  asChild: boolean | undefined;
  children: React.ReactNode;
};

function getSubtree(
  options: SubtreeOptions,
  content: React.ReactNode | ((children: React.ReactNode) => React.ReactNode)
): React.ReactNode {
  const { asChild, children } = options;
  if (!asChild) {
    return typeof content === "function" ? content(children) : content;
  }

  const firstChild = React.Children.only(children);
  if (React.isValidElement(firstChild)) {
    return React.cloneElement(
      firstChild as React.ReactElement<{ children: React.ReactNode }>,
      {
        children:
          typeof content === "function"
            ? content(
                (firstChild as { props: { children: React.ReactNode } }).props
                  .children
              )
            : content,
      }
    );
  }
  return children;
}

const TabNavigation = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Root>,
    "orientation" | "defaultValue" | "dir"
  >
>(({ className, children, ...props }, forwardedRef) => (
  <NavigationMenuPrimitives.Root
    ref={forwardedRef}
    {...props}
    tremor-id="tremor-raw"
    asChild={false}
  >
    <NavigationMenuPrimitives.List
      className={cx(
        // base
        "flex items-center justify-start whitespace-nowrap border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        // border color
        "border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {children}
    </NavigationMenuPrimitives.List>
  </NavigationMenuPrimitives.Root>
));

TabNavigation.displayName = "TabNavigation";

const TabNavigationLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Link>,
  Omit<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Link>,
    "onSelect"
  > & { disabled?: boolean }
>(({ asChild, disabled, className, children, ...props }, forwardedRef) => (
  <NavigationMenuPrimitives.Item className="flex" aria-disabled={disabled}>
    <NavigationMenuPrimitives.Link
      aria-disabled={disabled}
      className={cx(
        "group relative flex shrink-0 select-none items-center justify-center",
        disabled ? "pointer-events-none" : ""
      )}
      ref={forwardedRef}
      onSelect={() => {}}
      asChild={asChild}
      {...props}
    >
      {getSubtree({ asChild, children }, (children) => (
        <span
          className={cx(
            // base
            "-mb-px flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 pb-2 text-sm font-medium transition-all",
            // text color
            "text-gray-500 dark:text-gray-500",
            // hover
            "group-hover:text-gray-700 dark:group-hover:text-gray-400",
            // border hover
            "group-hover:border-gray-300 dark:group-hover:border-gray-400",
            // selected
            "group-data-active:border-teal-600 group-data-active:text-teal-600",
            "dark:group-data-active:border-teal-500 dark:group-data-active:text-teal-500",
            // disabled
            disabled
              ? "pointer-events-none text-gray-300 dark:text-gray-700"
              : "",
            focusRing,
            className
          )}
        >
          {children}
        </span>
      ))}
    </NavigationMenuPrimitives.Link>
  </NavigationMenuPrimitives.Item>
));

TabNavigationLink.displayName = "TabNavigationLink";

export { TabNavigation, TabNavigationLink };
