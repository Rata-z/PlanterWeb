import { Post } from "@/api/posts/postController";
import Link from "next/link";
import React from "react";
import { LuCalendarDays } from "react-icons/lu";
import { formatDistance } from "date-fns";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import ImageCard from "./imageCard";
import { IoHeart } from "react-icons/io5";

function PostCard({ post }: { post: Post }) {
  const date = formatDistance(post.date, new Date(), { addSuffix: true });
  const result = micromark(post.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <div className="flex min-h-fit w-2/4 max-w-screen-xl flex-col rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl border-t-2 border-ring bg-accent shadow-xl sm:h-96 sm:flex-row">
      <div className="flex size-full flex-col justify-between gap-2 p-4 sm:px-5 sm:pb-3 sm:pt-4">
        <h1 className="font-halant line-clamp-2 min-h-fit pb-2 text-center text-3xl text-foreground">
          {post.title}
        </h1>
        <ImageCard body={result} image={post.image} />

        <div className="flex h-5 w-full flex-row items-center gap-4 self-end">
          <div className="flex h-full flex-row items-center gap-1">
            <LuCalendarDays className="text-md self-start" />
            <span className="self-end text-sm">{date}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <IoHeart size={14} className="text-md self-center" />
            <span>{post.likes.length}</span>
          </div>
          <div className="flex">
            {post.comments.length}{" "}
            {post.comments.length === 1 ? "Comment" : "Comments"}
          </div>

          <Link
            className="ml-auto h-full flex-shrink-0 text-sm font-medium text-foreground opacity-60 hover:opacity-100"
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
