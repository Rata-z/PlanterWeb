import { Icons } from "@/components/icons";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-svh flex-col">
      <div className="-mt-10 flex h-full flex-col items-center justify-center gap-8">
        <Link href={"/"} className="">
          <Icons.logo className="size-28" />
        </Link>
        <div className="flex w-80 flex-col rounded-2xl border-2 border-pink-300 bg-slate-100 p-4 dark:bg-card">
          {children}
        </div>
      </div>
    </main>
  );
}
