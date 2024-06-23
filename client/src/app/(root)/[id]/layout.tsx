import SideNav from "@/components/navigationComponents/dashboard/sideNav";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-[calc(100vh-4.25rem)] flex-row justify-center sm:justify-normal">
      <div className="hidden h-full w-[20%] self-start sm:flex">
        <SideNav />
      </div>
      <div className="flex max-w-screen-2xl px-2 sm:w-[60%]">{children}</div>
    </main>
  );
}
