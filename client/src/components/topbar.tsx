"use client";
import Link from "next/link";
import React from "react";
import logoIcon from "../assets/icons/logo.svg";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";

export default function Topbar() {
  const { currentUser, signOut } = useAuth();
  return (
    <div className="flex  flex-row justify-between bg-blue-400 items-center w-full h-12">
      <Link href={"./"} className="p-4">
        <Image src={logoIcon} height={42} alt="Logo Icon" />
      </Link>

      {currentUser ? (
        <div className="flex  gap-16">
          <Link href={"./"}>Feed</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/settings"}>Settings</Link>
        </div>
      ) : (
        <div>
          <Link href={"./"}>Home</Link>
        </div>
      )}

      {currentUser ? (
        <Button onPress={signOut}>Log Out</Button>
      ) : (
        <div className="flex flex-row-reverse gap-3 p-4">
          <Link href={"/sign-up"}>sign up</Link>
          <Link href={"/sign-in"}>sign in</Link>
        </div>
      )}
    </div>
  );
}
