import { Post } from "@/api/posts/postController";
import Link from "next/link";
import React from "react";

function PostLink({
  post,
  headerOnly = false,
}: {
  post: Post;
  headerOnly: boolean;
}) {
  return (
    <div>
      {headerOnly ? (
        <Link
          key={post._id}
          href={"/posts/" + post._id}
          className="flex bg-red-400"
        >
          {post.title}
        </Link>
      ) : (
        <div>{post._id}</div>
      )}
    </div>
  );
}

export default PostLink;
