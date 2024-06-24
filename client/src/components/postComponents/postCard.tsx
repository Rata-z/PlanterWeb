import { Post } from "@/api/posts/postController";
import Link from "next/link";
import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";
import { LuCalendarDays } from "react-icons/lu";

import { format, formatDistance, subDays } from "date-fns";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import ImageCard from "./imageCard";

function PostCard({ post }: { post: Post }) {
  const date = formatDistance(post.date, new Date(), { addSuffix: true });
  const result = micromark(post.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <div className="flex h-screen w-2/4 max-w-screen-xl flex-col rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-card shadow-2xl sm:h-96 sm:flex-row">
      <div className="flex size-full flex-col justify-between gap-2 p-4 sm:px-5 sm:pb-3 sm:pt-4">
        <h1 className="line-clamp-2 min-h-fit pb-2 text-center text-2xl text-card-foreground">
          {post.title}
        </h1>
        <ImageCard body={result} image={post.image} />

        <div className="flex h-5 w-full flex-row justify-between self-end">
          <div className="flex h-full flex-row items-center gap-1">
            <LuCalendarDays className="text-md self-start" />
            <span className="self-end text-sm">{date}</span>
          </div>

          <Link
            className="flex h-full flex-shrink-0 text-sm font-medium text-destructive-foreground opacity-60 hover:opacity-100"
            href={`/posts/${post._id}`}
          >
            Continue Reading
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
