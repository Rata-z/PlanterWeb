"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import PasswordButton from "@/components/authComponents/passwordButton";
import { Input } from "@nextui-org/input";
import { FirebaseError } from "firebase/app";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confrimPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUpWithEmail = async () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords are not matching");
      setPasswordError(null);
      setEmailError(null);
      setError(null);
    } else {
      try {
        const res = await signUp(email, password);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        router.push("/verify-account");
      } catch (e) {
        console.error(e);
        if (e instanceof FirebaseError) {
          switch (e.code) {
            case "auth/invalid-email":
              setEmailError("Invalid email format");
              setPasswordError(null);
              setConfirmPasswordError(null);
              setError(null);
              break;
            case "auth/missing-password":
              setPasswordError("Missing Password");
              setEmailError(null);
              setConfirmPasswordError(null);
              setError(null);
              break;
            case "auth/weak-password":
              setPasswordError("Password should be at least 6 characters");
              setEmailError(null);
              setConfirmPasswordError(null);
              setError(null);
              break;
            case "auth/email-already-in-use":
              setEmailError("Email is already in use");
              setPasswordError(null);
              setConfirmPasswordError(null);
              setError(null);
              break;
            default:
              setError("An undefined Error happened. Please try again.");
              setPasswordError(null);
              setEmailError(null);
              setConfirmPasswordError(null);
              setError(null);
          }
        } else {
          setError("An undefined Error happened. Please try again.");
          setPasswordError(null);
          setEmailError(null);
          setConfirmPasswordError(null);
          setError(null);
        }
        setPassword("");
        setConfirmPassword("");
      }
    }
  };
  return (
    <section className="flex flex-col">
      <div className=" flex flex-col">
        <h1 className="text-4xl pb-2">Sign Up</h1>
        {error && <p className="text-tiny text-red-700">{error}</p>}
        <div className="flex flex-col gap-4 pt-2">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            className=" border-gray-400 "
            variant="bordered"
            isInvalid={!emailError ? false : true}
            errorMessage={emailError}
          />
          <Input
            type={isPasswordVisible ? "text" : "password"}
            label="Password"
            value={password}
            className=" border-gray-400 "
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
          <Input
            type={isConfirmPasswordVisible ? "text" : "password"}
            label="Confirm Password"
            value={confirmPassword}
            className=" border-gray-400 "
            variant="bordered"
            endContent={
              <PasswordButton
                isVisible={isConfirmPasswordVisible}
                toggleVisibility={setIsConfirmPasswordVisible}
              />
            }
            onChange={(password) => setConfirmPassword(password.target.value)}
            isInvalid={!confrimPasswordError ? false : true}
            errorMessage={confrimPasswordError}
          />
        </div>
      </div>

      <div className="flex pt-2 flex-row justify-end">
        <Button
          radius="full"
          onPress={handleSignUpWithEmail}
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          Sign Up
        </Button>
      </div>
      <div className="flex flex-row pt-2 gap-1 text-sm justify-start">
        {/* <Button size="sm" color="primary" onPress={() => router.back()}>
          Return
        </Button> */}
        <Link
          href={"/sign-in"}
          className="text-blue-600"
          onClick={() => location.replace("/sign-in")}
        >
          {"Return"}
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
