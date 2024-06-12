"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

function ArticlesManager() {
  const router = useRouter();
  return (
    <div className="flex w-screen justify-center  ">
      <div className="flex items-center justify-center">
        <Button
          onPress={() => {
            router.push("/create-post");
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default ArticlesManager;
