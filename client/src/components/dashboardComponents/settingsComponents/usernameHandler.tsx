"use client";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

function UsernameHandler() {
  const { currentUser, updateUserInfo } = useAuth();
  const [currentUsername, changeCurrentUsername] = useState(
    currentUser?.displayName ? currentUser.displayName : "",
  );
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const handleChangeUsername = () => {
    if (currentUsername === "") {
      setUsernameError("Username cannot be empty");
    } else {
      try {
        updateUserInfo("displayName", currentUsername);
        setUsernameError(null);
        location.reload();
      } catch (e) {
        setUsernameError("Action Error. Try again later");
      }
    }
  };
  return (
    <div className="flex w-min flex-row items-center gap-2">
      <Input
        type="text"
        label="Username"
        value={currentUsername}
        onChange={(text) => changeCurrentUsername(text.target.value)}
        classNames={{
          label: "text-foreground",
          input: "text-foreground",
          errorMessage: "absolute",
          inputWrapper:
            "border-border w-max  dark:bg-black dark:bg-opacity-60 transition-colors-opacity hover:border-foreground  shadow-lg ",
        }}
        errorMessage={usernameError}
        isInvalid={!usernameError ? false : true}
        variant="bordered"
      />
      <Button
        className="rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl border-2.5 border-green-950 border-opacity-85 bg-gradient-to-tl from-orange-300 from-[-30%] to-pink-300 to-[130%] font-nunitoSans font-bold text-green-950 shadow-lg"
        isDisabled={
          currentUser && currentUsername === currentUser.displayName
            ? true
            : false
        }
        onClick={handleChangeUsername}
      >
        Accept
      </Button>
    </div>
  );
}

export default UsernameHandler;
