import React from "react";
import { micromark } from "micromark";
import { getPost, Post } from "@/api/posts/postController";

import { gfm, gfmHtml } from "micromark-extension-gfm";
import PostManager from "@/components/postManager";
import CommentsManager from "@/components/commentsManager";
export const fetchCache = "force-no-store";

async function PostDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const fetchPost = async () => {
    if (!id) throw new Error("Missing post ID");

    return await getPost(id);
  };
  const post = await fetchPost();

  const result = micromark(post?.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <section className="flex w-screen h-screen flex-col">
      {post ? (
        <div>
          <PostManager post={post} />

          <div className="flex flex-col">
            <p>{post.author}</p>
            <p>{post.title}</p>
            <p>{post.updated?.toString()}</p>
          </div>
          <div className="prose prose-blue max-w-none">
            <div dangerouslySetInnerHTML={{ __html: result }} />
            <CommentsManager
              post={{ _id: post._id, comments: post.comments }}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
}

export default PostDetails;
