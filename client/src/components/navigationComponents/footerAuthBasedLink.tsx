"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React from "react";

function FooterAuthBaseLink({
  text,
  href,
  uid,
  className,
  clickNavigation = false,
}: {
  text: string;
  className: string;
  href: string;
  uid?: boolean;
  clickNavigation?: boolean;
}) {
  const { currentUser } = useAuth();
  const newHref = currentUser ? href : "/sign-in";

  return (
    <Link
      href={uid && currentUser ? `/${currentUser.uid}` : newHref}
      className={className}
      onClick={
        clickNavigation || !currentUser
          ? () => location.assign(newHref)
          : undefined
      }
    >
      {text}
    </Link>
  );
}

export default FooterAuthBaseLink;
