import { Post } from "@/api/posts/postController";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import IMG from "@/assets/pexels-akilmazumder-1072824.jpg";
import { IoHeart } from "react-icons/io5";

function PostLink({ post }: { post: Post }) {
  return (
    <Link
      key={post._id}
      href={"/posts/" + post._id}
      className="flex h-fit min-h-20 flex-row gap-4 overflow-hidden rounded-2xl bg-card p-2 shadow-2xl"
    >
      <div className={`relative h-full w-20 ${!post.image && "hidden"}`}>
        <Image
          src={post.image ? post.image : ""}
          className="rounded-lg"
          quality={50}
          fill
          alt="Post Image"
        />
      </div>
      <div className="flex size-full flex-col justify-between overflow-hidden text-medium">
        <Link
          key={post._id}
          href={"/posts/" + post._id}
          className="flex text-card-foreground"
        >
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
