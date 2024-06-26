import SideNav from "@/components/dashboardComponents/sideNav";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mb-5 flex min-h-[calc(100vh-4.25rem)] flex-row justify-center sm:justify-normal">
      <div className="hidden w-[20%] sm:flex">
        <SideNav />
      </div>
      <div className="flex max-w-screen-2xl px-2 sm:w-[60%]">{children}</div>
    </main>
  );
}
