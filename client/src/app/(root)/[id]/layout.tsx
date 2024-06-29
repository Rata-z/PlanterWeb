import SideNav from "@/components/dashboardComponents/sideNav";
import SiteBottomFooter from "@/components/navigationComponents/siteBottomFooter";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-col gap-8">
      <div className="flex h-[calc(100vh-6.25rem)] w-full flex-row justify-center sm:justify-normal">
        <div className="hidden w-[20%] sm:flex">
          <SideNav />
        </div>
        <div className="flex max-w-screen-2xl px-2 sm:w-[60%]">{children}</div>
      </div>
      <SiteBottomFooter />
    </main>
  );
}
