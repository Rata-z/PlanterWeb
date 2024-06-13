"use client";
import React, { useEffect, useState } from "react";
import { micromark } from "micromark";
import { getPost, Post } from "@/api/posts/postController";

import { gfm, gfmHtml } from "micromark-extension-gfm";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import {
  addComment,
  editComment,
  Comment,
  deleteComment,
} from "@/api/posts/commentController";
export const fetchCache = "force-no-store";

function PostDetails({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [newCommentText, changeNewCommentText] = useState<string>("");
  const [editedCommentID, changeEditedCommentID] = useState<string | null>();
  const [editedCommentText, changeEditedCommentText] = useState<string>("");

  const [commentError, setCommentError] = useState<null | string>(null);
  const { id } = params;
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    if (!id) throw new Error("Missing post ID");
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing Token");

    const response = await getPost(token, id);
    setPost(response);
  };

  const handleAddComment = async () => {
    if (newCommentText === "") setCommentError("Comment can't be empty");
    else {
      const token = await currentUser?.getIdToken();
      if (!token) throw new Error("Missing token");
      if (!post?._id) throw new Error("Missing post ID");
      const updatedPost = await addComment(token, post?._id, newCommentText);
      updatedPost && setPost(updatedPost);
      changeNewCommentText("");
    }
  };
  const handleEditComment = (id: string, body: string) => {
    changeEditedCommentID(id);
    changeEditedCommentText(body);
  };
  const handleCancelEditComment = () => {
    changeEditedCommentID(null);
    changeEditedCommentText("");
  };
  const handleDeleteComment = async (commentID: string) => {
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    if (!post?._id) throw new Error("Missing post ID");
    const updatedPost = await deleteComment(token, post._id, commentID);
    updatedPost && setPost(updatedPost);
    changeEditedCommentID(null);
    changeEditedCommentText("");
  };
  const handleAcceptEditComment = async (commentID: string) => {
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    if (!post?._id) throw new Error("Missing post ID");
    const updatedPost = await editComment(
      token,
      post?._id,
      commentID,
      editedCommentText
    );
    updatedPost && setPost(updatedPost);
    handleCancelEditComment();
  };

  const result = micromark(post?.body ?? "Missing Article", {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
  return (
    <section className="flex w-screen h-screen flex-col">
      {currentUser?.uid === post?.author && post && (
        <Link
          href={{ pathname: "/posts/create-post", query: { id: post._id } }}
        >
          Edit
        </Link>
      )}
      <div className="flex flex-col">
        <p>{post?.author}</p>
        <p>{post?.title}</p>
        <p>{post?.updated?.toString()}</p>
      </div>
      <div className="prose prose-blue max-w-none">
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: result }}
        />
        <div className="flex flex-col">
          Comment Section
          <Input
            type="text"
            label="Write comment"
            value={newCommentText}
            onChange={(text) => changeNewCommentText(text.target.value)}
            className=" w-80 border-gray-400 "
            errorMessage={commentError}
            isInvalid={!commentError ? false : true}
            variant="bordered"
          />
          <Button onPress={handleAddComment}>Add</Button>
        </div>
        {post?.comments.map((com: Comment) => {
          return (
            <div key={com._id} className="flex">
              {editedCommentID !== com._id ? (
                <div>
                  {com.body} {com.author}{" "}
                  {com.updated && com.updated.toString()}
                  {com.author === currentUser?.uid && (
                    <Button
                      onPress={() => handleEditComment(com._id, com.body)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <Input
                    type="text"
                    label="Edit comment"
                    value={editedCommentText}
                    onChange={(text) =>
                      changeEditedCommentText(text.target.value)
                    }
                    className=" w-80 border-gray-400 "
                    errorMessage={commentError}
                    isInvalid={!commentError ? false : true}
                    variant="bordered"
                  />
                  <Button onPress={() => handleAcceptEditComment(com._id)}>
                    Accept
                  </Button>
                  <Button onPress={() => handleCancelEditComment()}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    onPress={() => handleDeleteComment(com._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PostDetails;
