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
        <div className="flex flex-row items-center">
          <Link href={"/"} className="flex flex-row">
            <Icons.logo className="size-10" />
            <h1 className="self-end text-2xl text-card-foreground">lanter</h1>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-16 pr-[1.5%]">
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
          <ThemeSwitch className={"hidden sm:inline-block sm:pt-2"} />
          <AuthStateButton props={{ currentUser, signOut }} />
        </div>
        <MobileNavbar />
      </nav>
    </div>
  );
}
