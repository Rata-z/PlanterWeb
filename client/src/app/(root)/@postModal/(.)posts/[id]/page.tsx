"use client";
import { Post, getPost } from "@/api/posts/postController";
import ModalWrapper from "@/components/modalWrapper";
import PostDetailsRenderer from "@/components/postComponents/postDetailsRenderer";
import React, { useEffect, useState } from "react";

function PostDetailsModal({ params: { id } }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>();

  const fetchPost = async () => {
    if (!id) throw new Error("Missing post ID");

    const result = await getPost(id);
    setPost(result);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return post ? (
    <ModalWrapper>
      <PostDetailsRenderer post={post} />
    </ModalWrapper>
  ) : null;
}

export default PostDetailsModal;
