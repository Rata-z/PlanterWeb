"use client";
import { Post, getPost } from "@/api/posts/postController";
import ModalWrapper from "@/components/modalWrapper";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import PostDetailsRenderer from "@/components/postComponents/postDetailsRenderer";

function PostDetailsModal({ params: { id } }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>();
  const [isReady, setIsReady] = useState(false);

  const fetchPost = async () => {
    if (!id) throw new Error("Missing post ID");

    const result = await getPost(id);
    setPost(result);
    setIsReady(true);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <ModalWrapper>
      {isReady ? (
        post && (
          <div className="scrollbar-rounded flex w-[85%] justify-center overflow-y-auto rounded-2xl border-2 border-pink-300 bg-accent px-5 py-3 sm:w-[75%] md:w-[65%]">
            <PostDetailsRenderer post={post} />
          </div>
        )
      ) : (
        <Loader />
      )}
    </ModalWrapper>
  );
}

export default PostDetailsModal;
