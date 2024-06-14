"use client";
import React, { useState } from "react";
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
function CommentsManager({
  post,
}: {
  post: { _id: string; comments: Comment[] };
}) {
  const [newCommentText, changeNewCommentText] = useState<string>("");
  const [editedCommentID, changeEditedCommentID] = useState<string | null>();
  const [editedCommentText, changeEditedCommentText] = useState<string>("");
  const [commentError, setCommentError] = useState<null | string>(null);
  const router = useRouter();

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
  };
  const handleDeleteComment = async (commentID: string) => {
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    const updatedPost = await deleteComment(token, post._id, commentID);
    changeEditedCommentID(null);
    changeEditedCommentText("");
  };
  const handleAcceptEditComment = async (commentID: string) => {
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    const updatedPost = await editComment(
      token,
      post._id,
      commentID,
      editedCommentText
    );
    handleCancelEditComment();
  };

  return (
    <>
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

      {post.comments.map((com: Comment) => {
        return (
          <div key={com._id} className="flex">
            {editedCommentID !== com._id ? (
              <div>
                {com.body} {com.author} {com.updated && com.updated.toString()}
                {currentUser && com.author === currentUser.uid && (
                  <Button onPress={() => handleEditComment(com._id, com.body)}>
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
    </>
  );
}

export default CommentsManager;
