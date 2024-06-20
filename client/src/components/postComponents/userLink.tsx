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
    >
      {author}
    </Link>
  );
}

export default UserLink;
