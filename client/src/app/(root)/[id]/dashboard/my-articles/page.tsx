"use client";
import { Post, getUserPosts } from "@/api/posts/postController";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostLink from "@/components/post/postLink";

function MyArticles() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    if (!currentUser?.uid) return;

    const fetched = await getUserPosts(currentUser.uid);
    setPosts(fetched);
    return;
  }

  return (
    <section className="flex flex-col">
      <div>
        {posts.map((post: Post) => {
          return <PostLink key={post._id} post={post} headerOnly />;
        })}
      </div>
    </section>
  );
}

export default MyArticles;
