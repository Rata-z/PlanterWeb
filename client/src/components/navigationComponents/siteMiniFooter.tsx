import Link from "next/link";
import React from "react";
import FooterAuthBaseLink from "./footerAuthBasedLink";
import { Icons } from "../icons";
import { MdMailOutline } from "react-icons/md";

function SiteMiniFooter() {
  return (
    <footer className="fixed bottom-0 hidden h-fit p-2 text-gray-500 dark:text-gray-400 sm:block sm:w-1/12 sm:text-center md:w-2/12 md:text-left">
      <div className="flex flex-row flex-wrap justify-evenly gap-x-3 text-tiny">
        <Link href={"/"}>Blogs</Link>
        <FooterAuthBaseLink text="Dashboard" uid href="" className="" />
        <Link href={"/about"}>About</Link>
        <FooterAuthBaseLink
          text="Create Post"
          clickNavigation
          href="/create-post"
          className=""
        />
        <Link href={"/sign-in"}>Sign In</Link>
        <Link href={"/sign-up"}>Sign Up</Link>
        <p className="pt-1">&copy; 2024 Planter. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default SiteMiniFooter;
