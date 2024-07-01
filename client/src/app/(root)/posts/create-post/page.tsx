"use client";
import React, { useEffect, useState } from "react";
import { MdEditor } from "md-editor-rt";
import { useTheme } from "next-themes";
import "md-editor-rt/lib/style.css";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Emoji } from "@vavt/rt-extension";
import { useAuth } from "@/context/authContext";
import {
  addPost,
  deletePost,
  editPost,
  getPost,
} from "@/api/posts/postController";
function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const router = useRouter();
  const { currentUser } = useAuth();
  const postId = useSearchParams().get("id");
  const defaultValue = `# Welcome!
This editor allows you to create and format your documents using Markdown syntax. 
## Cover Photo Requirements
Currently images are only allowed as a single cover photo.

To attach your cover photo, paste it's source path. The source path must be from one of the following sites:

1. [freepik.com](https://freepik.com)
2. [unsplash.com](https://unsplash.com/)
3. [pixabay.com](https://pixabay.com/)

### Enjoy!`;

  const [body, setBody] = useState<string>(defaultValue);
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
    setImage(response.image);
  };

  const handleCreate = async () => {
    if (title === "") {
      setTitleError("title can't be empty.");
      return;
    }
    const token = await currentUser?.getIdToken(true);

    if (!token) throw new Error("Missing Token");
    const newPostId = await addPost(token, title, body, image);

    if (!newPostId)
      throw new Error("Action Error: Unable to navigate to created post");
    else location.replace(`/posts/${newPostId}`);
  };
  const handleDelete = async () => {
    if (!postId) throw new Error("Missing post ID");
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing Token");
    await deletePost(token, postId);
    location.replace("/");
  };

  const handleConfirmEdit = async () => {
    if (!postId) throw new Error("Missing post ID");
    const token = await currentUser?.getIdToken();
    if (!token) throw new Error("Missing Token");
    const updatedPost = { title, body, _id: postId, image };
    await editPost(token, updatedPost);
    location.replace("/posts/" + postId);
  };
  return (
    <section className="flex w-full justify-center">
      <div className="flex h-full w-full max-w-screen-xl flex-col px-4">
        <div className="flex w-full flex-row items-center justify-between pb-3">
          <Input
            isRequired
            type="text"
            label="Title"
            value={title}
            onChange={(text) => setTitle(text.target.value)}
            className="z-0 w-80"
            classNames={{
              label: "text-foreground",
              input: "text-foreground",
              errorMessage: "absolute",
              inputWrapper:
                "border-gray-400 border-opacity-80   dark:bg-black dark:bg-opacity-60 transition-colors-opacity hover:border-foreground  shadow-lg ",
            }}
            errorMessage={titleError}
            isInvalid={!titleError ? false : true}
            variant="bordered"
          />
          <Input
            type="text"
            label="Cover Image Path"
            value={image}
            onChange={(text) => {
              text.target.value == ""
                ? setImage(undefined)
                : setImage(text.target.value);
            }}
            className="z-0 w-80"
            classNames={{
              label: "text-foreground",
              input: "text-foreground",
              errorMessage: "absolute",
              inputWrapper:
                "border-gray-400 border-opacity-80   dark:bg-black dark:bg-opacity-60 transition-colors-opacity hover:border-foreground  shadow-lg ",
            }}
            variant="bordered"
          />
          {isEdited ? (
            <div className="flex gap-4 self-end">
              <Button onClick={handleDelete} variant="ghost" color="danger">
                Delete
              </Button>
              <Button onClick={handleConfirmEdit} color="primary">
                Confirm
              </Button>
            </div>
          ) : (
            <Button onClick={handleCreate} className="self-end" color="primary">
              Publish
            </Button>
          )}
        </div>

        <MdEditor
          modelValue={body}
          onChange={setBody}
          noUploadImg
          defToolbars={[<Emoji key="emoji-extension" />]}
          toolbarsExclude={["save", "github", "katex", "htmlPreview", "image"]}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          language="en-US"
          className="s-full rounded-md text-foreground shadow-2xl"
        />
      </div>
    </section>
  );
}

export default CreatePost;
