import Link from "next/link";
import React from "react";
import FooterAuthBaseLink from "./footerAuthBasedLink";
import { Icons } from "../icons";
import { MdMailOutline } from "react-icons/md";

function SiteBottomFooter() {
  return (
    <footer className="bottom-0 w-full">
      <div className="xs:px-1 flex h-36 flex-col bg-teal-950 py-3 sm:px-[10%] md:px-[18%]">
        <div className="flex flex-row justify-evenly gap-5">
          <div className="flex w-32 flex-col items-center gap-1 text-xs text-card-foreground">
            <Icons.logo className="h-10 w-6" />
            <p>
              Planter is a plant care oriented platform, providing space to read
              and write blogs.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-xs text-card-foreground">
            <p className="font-halant text-base font-bold">Browse</p>
            <Link href={"/"}>Blogs</Link>
            <FooterAuthBaseLink text="Dashboard" uid href="" className="" />
            <Link href={"/about"}>About</Link>
            <FooterAuthBaseLink
              text="Create Post"
              clickNavigation
              href="/create-post"
              className=""
            />
          </div>
          <div className="flex flex-col gap-1 text-xs text-card-foreground">
            <p className="font-halant text-base font-bold">Services</p>
            <Link href={"/sign-in"}>Sign In</Link>
            <Link href={"/sign-up"}>Sign Up</Link>
          </div>
          <div className="flex flex-col gap-1 text-xs text-card-foreground">
            <p className="font-halant text-base font-bold">Contact</p>
            <span className="flex flex-row gap-1">
              <MdMailOutline className="self-center" /> maciekpaw309@gmail.com
            </span>
          </div>
        </div>
        <p className="self-end text-tiny text-gray-300">
          &copy; 2024 Planter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default SiteBottomFooter;
