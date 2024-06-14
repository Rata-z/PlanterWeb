import { Post, getUserPosts } from "@/api/posts/postController";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostLink from "@/components/postLink";

async function Dashboard({ params }: { params: { id: string } }) {
  const posts = await getUserPosts(params.id);

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

export default Dashboard;
