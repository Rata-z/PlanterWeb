"use client";
import React, { useMemo, useState } from "react";
import {
  Comment,
  addComment,
  deleteComment,
  editComment,
} from "@/api/posts/commentController";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { format, formatDistance } from "date-fns";
import Link from "next/link";
import UserLink from "./userLink";
function CommentsManager({
  post,
}: {
  post: { _id: string; comments: Comment[] };
}) {
  const [newCommentText, changeNewCommentText] = useState<string>("");
  const [editedCommentID, changeEditedCommentID] = useState<string | null>();
  const [editedCommentText, changeEditedCommentText] = useState<string>("");
  const [commentError, setCommentError] = useState<null | string>(null);
  const [commentEditError, setCommentEditError] = useState<null | string>(null);
  const router = useRouter();
  const sortedComments = useMemo(
    () => [...post.comments].reverse(),
    [post.comments],
  );

  const { currentUser } = useAuth();
  const handleAddComment = async () => {
    if (!currentUser) {
      router.push("/sign-in");
    } else {
      if (newCommentText === "") setCommentError("Comment can't be empty");
      else {
        const token = await currentUser?.getIdToken();
        if (!token) throw new Error("Missing token");
        const updatedPost = await addComment(token, post._id, newCommentText);
        changeNewCommentText("");
        setCommentError(null);
        if (updatedPost) post.comments = updatedPost.comments;
      }
    }
  };
  const handleEditComment = (id: string, body: string) => {
    changeEditedCommentID(id);
    changeEditedCommentText(body);
  };
  const handleCancelEditComment = () => {
    changeEditedCommentID(null);
    changeEditedCommentText("");
    setCommentEditError(null);
  };
  const handleDeleteComment = async (commentID: string) => {
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    const updatedPost = await deleteComment(token, post._id, commentID);
    handleCancelEditComment();
    if (updatedPost) post.comments = updatedPost.comments;
  };
  const handleAcceptEditComment = async (commentID: string) => {
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    if (editedCommentText === "") setCommentEditError("Comment can't be empty");
    else {
      const updatedPost = await editComment(
        token,
        post._id,
        commentID,
        editedCommentText,
      );
      handleCancelEditComment();
      if (updatedPost) post.comments = updatedPost.comments;
    }
  };

  return (
    <div className="flex flex-col pb-4 pt-1">
      <span className="text-lg font-medium">
        {post.comments.length === 1
          ? `${post.comments.length} Comment`
          : `${post.comments.length} Comments`}
      </span>
      <div className="flex gap-3">
        <Input
          type="text"
          label="Add comment"
          value={newCommentText}
          onChange={(text) => changeNewCommentText(text.target.value)}
          classNames={{
            label: "text-foreground",
            input: "text-foreground",
            errorMessage: "absolute",
            inputWrapper:
              "border-border  transition-colors-opacity hover:border-foreground  shadow-lg ",
          }}
          errorMessage={commentError}
          isInvalid={!commentError ? false : true}
          variant="underlined"
        />
        <Button
          size="sm"
          className="mt-6 rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl border-2.5 border-green-950 border-opacity-85 bg-gradient-to-tl from-orange-300 from-[-30%] to-pink-300 to-[130%] font-nunitoSans font-bold text-green-950 shadow-lg"
          onPress={handleAddComment}
        >
          ADD
        </Button>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        {sortedComments.map((com: Comment) => {
          return (
            <div
              key={com._id}
              className="flex w-full rounded-lg bg-accent px-2 py-1 shadow-xl"
            >
              {editedCommentID !== com._id ? (
                <div className="flex w-full flex-col">
                  <div className="flex w-full flex-row gap-4">
                    <UserLink author={com.author} />

                    <span>
                      {formatDistance(com.date, new Date(), {
                        addSuffix: true,
                      })}
                      {com.updated && " (edited)"}
                    </span>

                    <div className="flex">
                      {currentUser && com.author === currentUser.uid && (
                        <span
                          className="flex text-blue-800 hover:cursor-pointer"
                          onClick={() => handleEditComment(com._id, com.body)}
                        >
                          Edit
                        </span>
                      )}
                    </div>
                  </div>
                  {com.body}
                </div>
              ) : (
                <div className="flex w-full flex-col">
                  <div className="flex flex-row">
                    <Input
                      type="text"
                      label="Edit comment"
                      value={editedCommentText}
                      onChange={(text) =>
                        changeEditedCommentText(text.target.value)
                      }
                      classNames={{
                        label: "text-foreground",
                        input: "text-foreground",
                        errorMessage: "absolute",
                        inputWrapper:
                          "border-border transition-colors-opacity hover:border-foreground  ",
                      }}
                      errorMessage={commentEditError}
                      isInvalid={!commentEditError ? false : true}
                      variant="underlined"
                    />
                    <Button
                      size="sm"
                      className="mt-6 rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl border-2.5 border-green-950 border-opacity-85 bg-gradient-to-tl from-orange-300 from-[-30%] to-pink-300 to-[130%] font-nunitoSans font-bold text-green-950 shadow-lg"
                      onPress={() => handleAcceptEditComment(com._id)}
                    >
                      Accept
                    </Button>
                  </div>
                  <div className="mt-3 flex flex-row gap-4">
                    <Button size="sm" onPress={() => handleCancelEditComment()}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onPress={() => handleDeleteComment(com._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommentsManager;
