import { getPosts } from "@/api/posts/postController";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { Post } from "@/api/posts/postController";
import Link from "next/link";
import PostLink from "@/components/postLink";

const Home = async () => {
  const posts = await getPosts();

  return (
    <section className="flex-col  flex w-full  max-xl:max-h-screen   max-xl:overflow-y-scroll">
      <div className="prose prose-blue max-w-none">HOME</div>
      <div className="flex flex-col gap-4">
        {posts.map((p) => {
          return <PostLink key={p._id} post={p} headerOnly />;
        })}
      </div>
    </section>
  );
};

export default Home;
