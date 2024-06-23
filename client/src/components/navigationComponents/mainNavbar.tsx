"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import MobileNavbar from "./mobileNavbar";
import AuthStateButton from "./authStateButton";
import ThemeSwitch from "./themeSwitch";
import NavigationButton from "./navigationButton";

export default function MainNavbar() {
  const { currentUser, signOut } = useAuth();

  const pathname = usePathname();
  return (
    <div className="flex w-screen">
      <nav className={"flex w-full items-center justify-between"}>
        <div className="flex flex-row items-center sm:gap-3">
          <Link href={"/"}>
            <Icons.logo className="size-11" />
          </Link>
          <ThemeSwitch className={"hidden sm:inline-block sm:pt-2"} />
        </div>

        <div className="flex items-center justify-center gap-16 pr-[6.5%]">
          <NavigationButton
            currentPathName={pathname}
            text="BLOGS"
            href={"/"}
          />
          <NavigationButton
            currentPathName={pathname}
            text="DASHBOARD"
            uid={currentUser?.uid}
            href={currentUser ? `/${currentUser.uid}` : "/sign-in"}
          />

          <NavigationButton
            currentPathName={pathname}
            text="ABOUT"
            href={"/about"}
          />
          <NavigationButton
            currentPathName={pathname}
            text="CREATE"
            href={currentUser ? "/posts/create-post" : "/sign-in"}
            clickNavigation={true}
          />
        </div>
        <div className="flex flex-row items-center">
          <AuthStateButton props={{ currentUser, signOut }} />
        </div>
        <MobileNavbar />
      </nav>
    </div>
  );
}
