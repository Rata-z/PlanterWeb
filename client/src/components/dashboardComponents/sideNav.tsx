"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";
import { PiPottedPlant, PiPottedPlantFill } from "react-icons/pi";

function SideNav() {
  const { currentUser } = useAuth();
  const pathname = usePathname();

  if (currentUser && pathname.includes(currentUser.uid)) {
    return (
      <div className="flex h-full w-full items-center pl-10">
        <div className="flex h-[60%] flex-col items-center justify-evenly rounded-full bg-card p-4 text-card-foreground">
          <Link
            href={`/${currentUser.uid}`}
            className="flex flex-col items-center"
          >
            {pathname === `/${currentUser.uid}` ? (
              <IoHome size={28} />
            ) : (
              <IoHomeOutline size={28} />
            )}
            Home
          </Link>
          <Link
            href={`/${currentUser.uid}/plants`}
            className="flex flex-col items-center"
          >
            {pathname === `/${currentUser.uid}/plants` ? (
              <PiPottedPlantFill size={28} />
            ) : (
              <PiPottedPlant size={28} />
            )}
            Plants
          </Link>
          <Link
            href={`/${currentUser.uid}/settings`}
            className="flex flex-col items-center"
          >
            {pathname === `/${currentUser.uid}/settings` ? (
              <IoSettings size={28} />
            ) : (
              <IoSettingsOutline size={28} />
            )}
            Settings
          </Link>
        </div>
      </div>
    );
  }
}

export default SideNav;
