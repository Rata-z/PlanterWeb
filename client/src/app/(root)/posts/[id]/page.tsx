import React from "react";
import { getPost, Post } from "@/api/posts/postController";

import PostDetailsRenderer from "@/components/post/postDetailsRenderer";
export const fetchCache = "force-no-store";

async function PostDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const fetchPost = async () => {
    if (!id) throw new Error("Missing post ID");

    return await getPost(id);
  };
  const post = await fetchPost();

  return post ? <PostDetailsRenderer post={post} /> : <></>;
}

export default PostDetails;
