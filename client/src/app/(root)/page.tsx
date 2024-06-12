"use client";
import { getPosts } from "@/api/posts/postController";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { Post } from "@/api/posts/postController";
import Link from "next/link";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const token = await currentUser?.getIdToken();
    if (token === undefined) throw new Error("Missing Token");
    const response = await getPosts(token);
    setPosts(response);
  };
  return (
    <section className="flex-col  flex w-full  max-xl:max-h-screen   max-xl:overflow-y-scroll">
      <div className="prose prose-blue max-w-none">HOME</div>
      <div className="flex flex-col gap-4">
        {posts?.map((p) => {
          return (
            <Link href={"/posts/" + p._id} className="flex bg-red-400">
              {p.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
