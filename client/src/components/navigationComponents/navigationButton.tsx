import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function NavigationButton({
  currentPathName,
  text,
  href,
  uid,
  clickNavigation = false,
}: {
  currentPathName: string;
  text: string;
  href: string;
  uid?: string;
  clickNavigation?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "hidden text-sm font-bold transition-opacity hover:opacity-100 sm:inline-block",
        uid
          ? currentPathName.includes(uid)
            ? "text-destructive-foreground"
            : "text-destructive-foreground opacity-60"
          : currentPathName === href
            ? "text-destructive-foreground"
            : "text-destructive-foreground opacity-60",
      )}
      onClick={clickNavigation ? () => location.assign(href) : undefined}
    >
      {text}
    </Link>
  );
}

export default NavigationButton;
