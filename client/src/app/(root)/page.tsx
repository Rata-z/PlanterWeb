import { getPosts } from "@/api/posts/postController";
import React from "react";
import PostCard from "@/components/postComponents/postCard";
import PostsLoader from "@/components/postComponents/postsLoader";
import SiteMiniFooter from "@/components/navigationComponents/siteMiniFooter";

const Home = async () => {
  const posts = await getPosts();

  return (
    <section className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <PostsLoader posts={posts.toReversed()} />
      <SiteMiniFooter />
    </section>
  );
};

export default Home;
