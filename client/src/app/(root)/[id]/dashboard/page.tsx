"use client";
import { Post, getUserPosts } from "@/api/posts/postController";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostLink from "@/components/post/postLink";

function Dashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <section className="flex flex-col">
      {currentUser && <div>TU PLANTSY HEHE</div>}
    </section>
  );
}

export default Dashboard;
