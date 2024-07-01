"use client";
import { Post } from "@/api/posts/postController";
import { Spinner } from "@nextui-org/spinner";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./postCard";

function PostsLoader({ posts }: { posts: Post[] }) {
  const { ref, inView } = useInView();
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
  const [page, changePages] = useState<number>(1);

  const loadPagePosts = () => {
    const pagePosts = posts.slice((page - 1) * 2, page * 2);
    changePages((currentPage) => {
      return currentPage + 1;
    });
    return pagePosts;
  };
  useEffect(() => {
    inView &&
      posts.length > loadedPosts.length &&
      setLoadedPosts([...loadedPosts, ...loadPagePosts()]);
  }, [inView]);

  return (
    <div className="flex size-full flex-col">
      <div className="flex flex-col items-center gap-8 pb-8">
        {loadedPosts.map((p) => {
          return <PostCard key={p._id} post={p} />;
        })}
      </div>

      <div
        ref={ref}
        className={`ml-[50%] ${!(posts.length > loadedPosts.length) && "hidden"}`}
      >
        <Spinner />
      </div>
    </div>
  );
}

export default PostsLoader;
