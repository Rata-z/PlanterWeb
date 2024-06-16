import { Post, getUserPosts } from "@/api/posts/postController";
import React from "react";
import PostLink from "@/components/post/postLink";

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
