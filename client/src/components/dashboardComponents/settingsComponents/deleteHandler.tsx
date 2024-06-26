"use client";
import PasswordButton from "@/components/authComponents/passwordButton";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FirebaseError } from "firebase/app";
import React, { useState } from "react";

function DeleteHandler() {
  const { currentUser, deleteCurrentUser, reauthenticateUser } = useAuth();
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  console.log(currentUser);
  const googleProvider =
    currentUser?.providerData[0].providerId === "google.com" ? true : false;

  const handleDeleteUser = async () => {
    if (!googleProvider && password === "") {
      setPasswordError("Enter account password");
    } else {
      if (!currentUser) {
        throw new Error("Current user not found");
      }
      try {
        const credentials = await reauthenticateUser(password);
        if (!credentials) throw new Error("Credentials not found");
        try {
          await deleteCurrentUser(credentials);
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
        if (
          e instanceof FirebaseError &&
          e.code === "auth/invalid-credential"
        ) {
          setPasswordError("Incorrect password");
        } else setPasswordError("Action Error. Try again later");
      }
    }
  };
  return (
    <div className="flex w-min flex-row items-center gap-2">
      {!googleProvider && (
        <Input
          type={isPasswordVisible ? "text" : "password"}
          label="Enter Password"
          value={password}
          classNames={{
            label: "text-foreground",
            input: "text-foreground",
            errorMessage: "absolute",
            inputWrapper:
              "border-border w-max dark:bg-black dark:bg-opacity-60 transition-colors-opacity hover:border-foreground  shadow-lg ",
          }}
          variant="bordered"
          endContent={
            <PasswordButton
              isVisible={isPasswordVisible}
              toggleVisibility={setIsPasswordVisible}
            />
          }
          onChange={(password) => setPassword(password.target.value)}
          isInvalid={!passwordError ? false : true}
          errorMessage={passwordError}
        />
      )}

      <Button color="danger" variant="ghost" onClick={handleDeleteUser}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteHandler;
