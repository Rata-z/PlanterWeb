"use client";
import { togglePostLike } from "@/api/posts/postController";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

function PostLikeButton({ post }: { post: { _id: string; likes: string[] } }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [isLiked, changeIsLiked] = useState(false);
  useEffect(() => {
    if (currentUser && currentUser.emailVerified)
      changeIsLiked(post.likes.includes(currentUser.uid));
  }, []);

  const handleLikePress = async () => {
    if (!currentUser) router.push("/sign-in");
    else if (!currentUser.emailVerified) router.push("/verify-account");

    try {
      const token = await currentUser?.getIdToken();
      if (!token) throw new Error("Missing token");

      const updatedPost = await togglePostLike(token, post._id);
      if (updatedPost) {
        post.likes = updatedPost.likes;
        changeIsLiked((value) => !value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        isIconOnly
        color="danger"
        onPress={handleLikePress}
        aria-label="Like"
        size="sm"
        className="shadow-lg"
      >
        {isLiked ? <IoHeart /> : <IoHeartOutline />}
      </Button>
      <span className="text-lg font-medium text-foreground">
        {post.likes.length}
      </span>
    </div>
  );
}

export default PostLikeButton;
