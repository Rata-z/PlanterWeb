"use client";
import Link from "next/link";
import React from "react";

function UserLink({ author }: { author: string }) {
  return (
    <Link
      href={`/${author}`}
      onClick={() => {
        location.assign(`/${author}`);
      }}
      className="font-medium text-foreground no-underline"
    >
      {author}
    </Link>
  );
}

export default UserLink;
