import Link from "next/link";
import React from "react";
import logoIcon from "../assets/icons/logo.svg";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="flex flex-col  min-h-screen w-28 bg-red-500  justify-between items-center">
      <Link href={"./"} className="p-4">
        <Image src={logoIcon} height={64} alt="Logo Icon" />
      </Link>
      <div className="flex flex-col items-center gap-11">
        <Link href={"./"}>Feed</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/settings"}>Settings</Link>
      </div>
      <p className="p-4">lol</p>
    </div>
  );
}
