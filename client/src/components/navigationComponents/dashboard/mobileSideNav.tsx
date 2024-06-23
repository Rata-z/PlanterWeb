"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React from "react";

function MobileSideNav() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return (
      <div className="flex flex-col gap-3 pb-4 pl-8">
        <Link href={`/${currentUser.uid}`}>HOME</Link>
        <Link href={`/${currentUser.uid}/plants`}>PLANTS</Link>
        <Link href={`/${currentUser.uid}/settings`}>SETTINGS</Link>
      </div>
    );
  }
}

export default MobileSideNav;
