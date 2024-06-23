"use client";
import { Post } from "@/api/posts/postController";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React from "react";

function PostManager({ post }: { post: Post }) {
  const { currentUser } = useAuth();
  return (
    <>
      {post && currentUser?.uid === post?.author && (
        <Link
          href={{
            pathname: "/posts/create-post",
            query: { id: post._id },
          }}
          className="text-blue-800"
          onClick={() => location.assign(`/posts/create-post?id=${post._id}`)}
        >
          Edit
        </Link>
      )}
    </>
  );
}

export default PostManager;
