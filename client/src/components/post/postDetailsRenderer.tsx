import React from "react";
import { micromark } from "micromark";
import { Post } from "@/api/posts/postController";

import { gfm, gfmHtml } from "micromark-extension-gfm";
import PostManager from "@/components/post/postManager";
import CommentsManager from "@/components/post/commentsManager";

function PostDetailsRenderer({ post }: { post: Post }) {
  const result = micromark(post.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <section className="flex flex-col items-center">
      {post ? (
        <div className="flex flex-col">
          <PostManager post={post} />

          <div className="flex flex-col">
            <p>{post.author}</p>
            <p>{post.title}</p>
            <p>{post.updated?.toString()}</p>
          </div>
          <div className="flex flex-col prose prose-blue max-w-none">
            <div dangerouslySetInnerHTML={{ __html: result }} />
            <CommentsManager
              post={{ _id: post._id, comments: post.comments }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default PostDetailsRenderer;
