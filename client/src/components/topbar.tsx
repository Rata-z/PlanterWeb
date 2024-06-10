"use client";
import Link from "next/link";
import React, { useState } from "react";
import logoIcon from "../assets/icons/logo.svg";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";

export default function Topbar() {
  const { currentUser, signOut } = useAuth();
  const { setTheme, resolvedTheme } = useTheme();
  const darkModeToggle = (isSelected: Boolean) => {
    isSelected ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="flex  flex-row justify-between  border-b-2 fore border-foreground items-center w-screen h-12">
      <Link href={"./"} className="p-4 flex justify-center items-center">
        <Image src={logoIcon} height={42} alt="Logo Icon" /> lanter
      </Link>
      <div className="flex  gap-16">
        {currentUser ? (
          <>
            <Link href={"./"}>HOME</Link>
            <Link href={"/dashboard"}>DASHBOARD</Link>
            <Link href={"/settings"}>ABOUT</Link>
            <Link href={"/settings"}>SETTINGS</Link>
          </>
        ) : (
          <>
            <Link href={"./"}>HOME</Link>
            <Link href={"/settings"}>ABOUT</Link>
            <Link href={"/settings"}>SETTINGS</Link>
          </>
        )}
      </div>
      <div className="flex flex-row gap-3 p-4">
        <Switch
          size="sm"
          color="default"
          startContent={<IoMoon />}
          endContent={<IoSunny />}
          onValueChange={(isSelected) => darkModeToggle(isSelected)}
        />
        {currentUser ? (
          <Button onPress={signOut}>Log Out</Button>
        ) : (
          <Link href={"/sign-in"}>SIGN IN</Link>
        )}
      </div>
    </div>
  );
}
