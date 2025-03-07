"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { IoMenu } from "react-icons/io5";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import ThemeSwitch from "./themeSwitch";
import MobileSideNav from "../dashboardComponents/mobileSideNav";

function MobileNavbar() {
  const [isOpened, setIsOpened] = useState(false);
  const { currentUser } = useAuth();
  return (
    <Sheet open={isOpened} onOpenChange={setIsOpened}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <IoMenu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex w-5/12 flex-col justify-between"
        side="right"
      >
        <div className="mt-3 flex flex-col gap-3">
          <MobileLink
            onOpenChange={setIsOpened}
            href="/"
            className="flex items-center"
          >
            BLOGS
          </MobileLink>
          <MobileLink
            onOpenChange={setIsOpened}
            href={currentUser ? `/${currentUser.uid}/dashboard` : "/sign-in"}
            className="flex items-center"
          >
            DASHBOARD
          </MobileLink>
          {currentUser && <MobileSideNav />}
          <MobileLink
            onOpenChange={setIsOpened}
            href="/about"
            className="flex items-center"
          >
            ABOUT
          </MobileLink>
          <MobileLink
            onOpenChange={setIsOpened}
            href="/posts/create-post"
            className="flex items-center"
          >
            CREATE
          </MobileLink>
        </div>
        <div className="mt-auto">
          <ThemeSwitch className="" />
        </div>
        <p className="text-tiny text-gray-500 dark:text-gray-400">
          &copy; 2024 Planter. All rights reserved.
        </p>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}

export default MobileNavbar;
