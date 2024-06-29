"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/authContext";
import { usePathname } from "next/navigation";
import { Icons } from "../icons";
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
        <div className="flex flex-row items-center">
          <Link href={"/"} className="flex flex-row">
            <Icons.logoLong className="h-17 w-36" />
          </Link>
        </div>

        <div className="flex flex-row gap-16 pr-[1.5%] pt-1.5">
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
        <div className="flex flex-row items-center gap-2">
          <ThemeSwitch className={"hidden sm:inline-block sm:pt-1"} />
          <AuthStateButton props={{ currentUser, signOut }} />
        </div>
        <MobileNavbar />
      </nav>
    </div>
  );
}
