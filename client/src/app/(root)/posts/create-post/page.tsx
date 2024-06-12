"use client";
import React, { useState } from "react";
import { MdEditor } from "md-editor-rt";
import { useTheme } from "next-themes";
import "md-editor-rt/lib/style.css";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { addPost } from "@/api/posts/postController";
function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const router = useRouter();
  const { currentUser } = useAuth();

  const [body, setBody] = useState<string>("# Hello Editor");
  const { resolvedTheme } = useTheme();
  const handleCreate = async () => {
    if (title === "") {
      setTitleError("title can't be empty.");
      return;
    }
    const token = await currentUser?.getIdToken(true);
    const author = await currentUser?.uid;

    if (token === undefined) throw new Error("Missing Token");
    if (author === undefined) throw new Error("Missing Author");
    await addPost(token, title, body, author);
    router.push("/");
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
            isInvalid={titleError === null ? false : true}
            variant="bordered"
          />
          <Button onClick={handleCreate} color="primary">
            Publish
          </Button>
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
