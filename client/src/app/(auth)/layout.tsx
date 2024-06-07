import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className=" flex ">
      <div className="flex h-screen w-screen items-center justify-center ">
        <div className="flex flex-col w-80 rounded-2xl p-4 border-pink-300 border-2  bg-slate-100">
          {children}
        </div>
      </div>
    </main>
  );
}
