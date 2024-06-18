"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import MobileNavbar from "./mobileNavbar";
import AuthStateButton from "./authStateButton";
import ThemeSwitch from "./themeSwitch";

export default function MainNavbar() {
  const { currentUser, signOut } = useAuth();

  const pathname = usePathname();
  return (
    <div className="flex w-screen border-b-2 border-foreground">
      <nav className={"flex w-full items-center justify-between"}>
        <Link href={"/"}>
          <Icons.logo className="h-11 w-9" />
        </Link>
        <div className="flex items-center justify-center gap-16">
          <Link
            href={"/"}
            className={cn(
              "hidden text-sm font-bold transition-opacity hover:opacity-100 sm:inline-block",
              pathname === "/"
                ? "text-foreground"
                : "text-foreground opacity-60",
            )}
          >
            BLOGS
          </Link>
          <Link
            href={currentUser ? `/${currentUser.uid}/dashboard` : "/"}
            className={cn(
              "hidden text-sm font-bold transition-opacity hover:opacity-100 sm:inline-block",
              pathname === `/${currentUser?.uid}/dashboard`
                ? "text-foreground"
                : "text-foreground opacity-60",
            )}
          >
            DASHBOARD
          </Link>
          <Link
            href={"/settings"}
            className={cn(
              "hidden text-sm font-bold transition-opacity hover:opacity-100 sm:inline-block",
              pathname === "/about"
                ? "text-foreground"
                : "text-foreground opacity-60",
            )}
          >
            ABOUT
          </Link>
          <Link
            href={"/posts/create-post"}
            className={cn(
              "hidden text-sm font-bold transition-opacity hover:opacity-100 sm:inline-block",
              pathname === "/posts/create-post"
                ? "text-foreground"
                : "text-foreground opacity-60",
            )}
            onClick={() => location.assign("/posts/create-post")}
          >
            CREATE
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <ThemeSwitch className={"hidden sm:inline-block"} />
          <AuthStateButton props={{ currentUser, signOut }} />
        </div>
        <MobileNavbar />
      </nav>
    </div>
  );
}
