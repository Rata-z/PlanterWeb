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

export default function MainNavbar() {
  const { currentUser, signOut } = useAuth();

  const pathname = usePathname();
  return (
    <div className="flex w-screen">
      <nav className={"flex w-full items-center justify-between"}>
        <div className="flex flex-row">
          <Link href={"/"}>
            <Icons.logo className="h-11 w-9" />
          </Link>
          <ThemeSwitch
            className={"absolute ml-11 hidden self-end sm:inline-block"}
          />
        </div>

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
          <AuthStateButton props={{ currentUser, signOut }} />
        </div>
        <MobileNavbar />
      </nav>
    </div>
  );
}
