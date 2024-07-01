import { Post } from "@/api/posts/postController";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoHeart } from "react-icons/io5";

function PostLink({ post }: { post: Post }) {
  return (
    <Link
      key={post._id}
      href={"/posts/" + post._id}
      className="flex min-h-20 w-full flex-row gap-4 overflow-hidden rounded-2xl bg-accent p-2 px-3 shadow-xl"
    >
      {post.image && (
        <div className={"relative h-full w-20"}>
          <Image
            src={post.image}
            className="rounded-lg"
            quality={50}
            sizes="(min-width: 2140px) 72px, (min-width: 740px) calc(0.87vw + 56px), (min-width: 520px) 65px, calc(3.5vw + 45px)"
            fill
            alt="Post Image"
          />
        </div>
      )}

      <div className="flex size-full flex-col justify-between overflow-hidden text-medium">
        <Link key={post._id} href={"/posts/" + post._id} className="flex">
          {post.title}
        </Link>
        <div className="flex h-5 w-full flex-row items-center gap-6 self-end font-bold">
          <div className="flex flex-row items-center gap-1">
            <IoHeart size={14} />
            <span>{post.likes.length}</span>
          </div>
          <div>{post.comments.length} Comments</div>
        </div>
      </div>
    </Link>
  );
}

export default PostLink;
