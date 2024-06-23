import { getPosts } from "@/api/posts/postController";
import React from "react";
import PostCard from "@/components/postComponents/postCard";

const Home = async () => {
  const posts = await getPosts();

  return (
    <section className="flex w-full flex-col pb-8 max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="flex flex-col items-center gap-8">
        {posts.toReversed().map((p) => {
          return <PostCard key={p._id} post={p} />;
        })}
      </div>
    </section>
  );
};

export default Home;
