"use client";
import Link from "next/link";
import React from "react";

function UserLink({
  author,
  username,
}: {
  author: string;
  username: string | undefined;
}) {
  return (
    <Link
      href={`/${author}`}
      onClick={() => {
        location.assign(`/${author}`);
      }}
      className="font-medium text-foreground no-underline"
    >
      {!username || username === "" ? author : username}
    </Link>
  );
}

export default UserLink;
