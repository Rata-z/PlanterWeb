import React from "react";
import { micromark } from "micromark";
import { Post } from "@/api/posts/postController";

import { gfm, gfmHtml } from "micromark-extension-gfm";
import PostManager from "@/components/postComponents/postManager";
import CommentsManager from "@/components/postComponents/commentsManager";
import PostLikeButton from "./postLikeButton";
import { LoremIpsum } from "react-lorem-ipsum";
import { format, formatDistance } from "date-fns";
import { LuCalendarDays } from "react-icons/lu";
import UserLink from "./userLink";

function PostDetailsRenderer({ post }: { post: Post }) {
  const result = micromark(post.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col border-b-1">
        <div className="flex h-72 w-full bg-red-300"></div>
        <p className="my-2 text-center text-3xl">{post.title}</p>
        <div className="flex w-full justify-end px-2">
          <PostManager post={post} />
        </div>
        <div className="my-2 flex w-full flex-row justify-between px-2 text-sm">
          <div className="flex flex-row items-end gap-1">
            <LuCalendarDays className="size-4 self-start" />
            <span>{format(post.date, "dd.mm.yyyy")}</span>
          </div>
          <UserLink author={post.author} />
        </div>
      </div>
      <div className="prose prose-blue flex min-w-full flex-col gap-3 pb-2 prose-headings:text-foreground prose-blockquote:text-foreground prose-code:text-card-foreground prose-ol:text-border prose-li:text-foreground prose-td:text-foreground">
        <div
          className="border-borde w-full items-center rounded-b-2xl px-2 shadow-lg"
          dangerouslySetInnerHTML={{ __html: result }}
        />
        <PostLikeButton post={{ _id: post._id, likes: post.likes }} />
      </div>
      <CommentsManager post={{ _id: post._id, comments: post.comments }} />
    </div>
  );
}

export default PostDetailsRenderer;
