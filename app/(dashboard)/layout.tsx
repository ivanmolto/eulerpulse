import { SidebarProvider, SidebarTrigger } from "@/components/Sidebar";
import { AppSidebar } from "@/components/ui/navigation/AppSidebar";
import { Breadcrumbs } from "@/components/ui/navigation/Breadcrumbs";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-full">
        <AppSidebar />
        <div className="flex-1 transition-all duration-150 ease-in-out md:pl-[var(--sidebar-width)] peer-data-[state=collapsed]:md:pl-0">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
            <SidebarTrigger className="-ml-1" />
            <div className="mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
            <Breadcrumbs />
          </header>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
