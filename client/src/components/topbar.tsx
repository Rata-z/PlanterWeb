import Link from "next/link";
import React from "react";

export default function Topbar() {
  return (
    <div className="flex flex-row-reverse  bg-blue-400 items-center w-full h-12">
      <div className="flex flex-row-reverse gap-3 p-4">
        <Link href={"/sign-up"}>sign up</Link>
        <Link href={"/sign-in"}>sign in</Link>
      </div>
    </div>
  );
}
