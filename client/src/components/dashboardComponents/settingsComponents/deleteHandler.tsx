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
  const [confirm, setConfirm] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [startDelete, setStartDelete] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const googleProvider =
    currentUser?.providerData[0].providerId === "google.com" ? true : false;

  const handleDeleteUser = async () => {
    if (!startDelete) setStartDelete(true);
    else {
      if (!googleProvider && password === "") {
        setPasswordError("Enter account password");
      } else if (googleProvider && confirm !== "confirm") {
        setConfirmError(`Please write "confirm" and click "delete" button`);
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
    }
  };
  return (
    <div className="flex w-fit flex-row items-center gap-2">
      {!googleProvider && startDelete && (
        <Input
          type={isPasswordVisible ? "text" : "password"}
          label="Enter Password"
          value={password}
          classNames={{
            label: "text-foreground",
            input: "text-foreground",
            errorMessage: "absolute",
            inputWrapper:
              "border-gray-400 border-opacity-80  w-max dark:bg-black dark:bg-opacity-60 transition-colors-opacity hover:border-foreground  shadow-lg ",
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

      {googleProvider && startDelete && (
        <Input
          type={"text"}
          label={`Please write "confirm"`}
          value={confirm}
          classNames={{
            label: "text-foreground",
            input: "text-foreground",
            errorMessage: "absolute",
            inputWrapper:
              "border-gray-400 border-opacity-80  w-max dark:bg-black dark:bg-opacity-60 transition-colors-opacity hover:border-foreground  shadow-lg ",
          }}
          variant="bordered"
          onChange={(text) => setConfirm(text.target.value)}
          isInvalid={!confirmError ? false : true}
          errorMessage={confirmError}
        />
      )}

      <Button
        color="danger"
        variant="ghost"
        isDisabled={startDelete && googleProvider && confirm !== "confirm"}
        onClick={handleDeleteUser}
      >
        Delete
      </Button>
    </div>
  );
}

export default DeleteHandler;
