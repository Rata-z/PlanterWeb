import React from "react";
import { getPost } from "@/api/posts/postController";

import PostDetailsRenderer from "@/components/postComponents/postDetailsRenderer";
export const fetchCache = "force-no-store";

async function PostDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const fetchPost = async () => {
    if (!id) throw new Error("Missing post ID");

    return await getPost(id);
  };
  const post = await fetchPost();

  return (
    <section className="flex flex-col items-center">
      {post && (
        <div className="flex w-[85%] max-w-screen-xl flex-col sm:w-[62.5%]">
          <PostDetailsRenderer post={post} />
        </div>
      )}
    </section>
  );
}

export default PostDetails;
