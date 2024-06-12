"use client";
import React, { useEffect, useState } from "react";
import { micromark } from "micromark";
import { getPost, Post } from "../../../../api/posts/postController";

import { gfm, gfmHtml } from "micromark-extension-gfm";
import { useAuth } from "../../../../context/authContext";
export const fetchCache = "force-no-store";

function PostDetails({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = params;
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    if (id === undefined) throw new Error("Missing post ID");
    const token = await currentUser?.getIdToken();
    if (token === undefined) throw new Error("Missing Token");

    const response = await getPost(token, id);
    setPost(response);
  };

  const result = micromark(post?.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <section className="flex w-screen h-screen">
      <div className="prose prose-blue max-w-none">
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: result }}
        />
        <div className="flex"></div>
      </div>
    </section>
  );
}

export default PostDetails;
