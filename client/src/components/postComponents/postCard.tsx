import { Post } from "@/api/posts/postController";
import Link from "next/link";
import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";
import { LuCalendarDays } from "react-icons/lu";

import { format, formatDistance, subDays } from "date-fns";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";

function PostCard({ post }: { post: Post }) {
  const date = formatDistance(post.date, new Date(), { addSuffix: true });
  const result = micromark(post.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <div className="flex h-screen w-3/4 max-w-screen-xl flex-col rounded-lg shadow-sm sm:h-96 sm:flex-row">
      <div className="h-1/2 w-full bg-red-600 sm:h-full sm:w-1/2" />
      <div className="flex h-1/2 w-full flex-col items-center justify-between gap-2 bg-accent p-4 sm:h-full sm:w-1/2 sm:p-5">
        <div className="max-h-full overflow-hidden">
          <h1 className="mb-2 line-clamp-3 text-center text-2xl text-foreground">
            {post.title}
          </h1>
          <div
            className="sm:line-clamp-10 line-clamp-3 max-w-full text-ellipsis text-left text-foreground"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </div>

        <div className="flex w-full flex-row justify-between self-end">
          <div className="flex h-full flex-row items-center gap-1">
            <LuCalendarDays className="text-md self-start" />
            <text className="self-end text-sm">{date}</text>
          </div>

          <Link
            className="flex h-full flex-shrink-0 text-sm text-blue-600"
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
