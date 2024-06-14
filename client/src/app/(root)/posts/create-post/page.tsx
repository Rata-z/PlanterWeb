"use client";
import React, { useEffect, useState } from "react";
import { MdEditor } from "md-editor-rt";
import { useTheme } from "next-themes";
import "md-editor-rt/lib/style.css";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import {
  addPost,
  deletePost,
  editPost,
  getPost,
} from "@/api/posts/postController";
function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const router = useRouter();
  const { currentUser } = useAuth();
  const postId = useSearchParams().get("id");

  const [body, setBody] = useState<string>("# Hello Editor");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    postId && fetchPost();
  }, []);
  const fetchPost = async () => {
    setIsEdited(true);
    if (!postId) throw new Error("Missing post ID");
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing token");
    const uid = await currentUser?.uid;

    const response = await getPost(postId);
    if (!response) throw new Error("Fetching Error.");
    if (uid !== response.author)
      throw new Error("Unauthorized. User is not the author.");
    setTitle(response.title);
    setBody(response.body);
  };

  const handleCreate = async () => {
    if (title === "") {
      setTitleError("title can't be empty.");
      return;
    }
    const token = await currentUser?.getIdToken(true);

    if (!token) throw new Error("Missing Token");
    await addPost(token, title, body);

    router.replace("/posts/" + postId);
  };
  const handleDelete = async () => {
    if (!postId) throw new Error("Missing post ID");
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing Token");
    await deletePost(token, postId);
    router.replace("/");
  };

  const handleConfirmEdit = async () => {
    if (!postId) throw new Error("Missing post ID");
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing Token");
    const updatedPost = { title, body, _id: postId };
    await editPost(token, updatedPost);
    router.replace("/posts/" + postId);
  };
  return (
    <section className="flex w-screen ">
      <div className="flex flex-col w-screen">
        <div className="flex flex-row w-screen justify-between items-center">
          <Input
            isRequired
            type="text"
            label="Title"
            value={title}
            onChange={(text) => setTitle(text.target.value)}
            className=" w-80 border-gray-400 "
            errorMessage={titleError}
            isInvalid={!titleError ? false : true}
            variant="bordered"
          />
          {isEdited ? (
            <div>
              <Button onClick={handleConfirmEdit} color="primary">
                Confirm
              </Button>
              <Button onClick={handleDelete} color="danger">
                Delete
              </Button>
            </div>
          ) : (
            <Button onClick={handleCreate} color="primary">
              Publish
            </Button>
          )}
        </div>

        <MdEditor
          modelValue={body}
          onChange={setBody}
          toolbarsExclude={["save", "github"]}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          language="en-US"
        />
      </div>
    </section>
  );
}

export default CreatePost;