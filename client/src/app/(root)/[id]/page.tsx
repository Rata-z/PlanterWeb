import { Post, getUserPosts } from "@/api/posts/postController";
import React from "react";
import PostLink from "@/components/postComponents/postLink";

async function UserPosts({ params }: { params: { id: string } }) {
  const posts = await getUserPosts(params.id);

  return (
    <section className="flex flex-col">
      {posts.length !== 0 ? (
        <div className="flex flex-col gap-5">
          {posts.map((post: Post) => {
            return <PostLink key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <div className="flex w-full items-center">
          <h1 className="self-center text-xl text-foreground">
            No posts found!
          </h1>
        </div>
      )}
    </section>
  );
}

export default UserPosts;
