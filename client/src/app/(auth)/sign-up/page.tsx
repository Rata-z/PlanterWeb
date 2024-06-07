"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUpWithEmail = async () => {
    if (confirmPassword !== password) {
      setError("Passwords are not matching");
      setPassword("");
      setConfirmPassword("");
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
          let msg = "";
          switch (e.code) {
            case "auth/invalid-email":
              msg = "Invalid email format";
              break;
            case "auth/missing-password":
              msg = "Missing Password";
              break;
            case "auth/weak-password":
              msg = "Password should be at least 6 characters";
              break;
            case "auth/email-already-in-use":
              msg = "Email is already in use";
              break;
            default:
              msg = "An undefined Error happened. Please try again.";
          }
          setError(msg);
        } else {
          setError("An undefined Error happened. Please try again.");
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            className="rounded-2xl border-2 border-gray-400 p-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="rounded-2xl border-2 border-gray-400 p-2"
            onChange={(password) => setPassword(password.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="rounded-2xl border-2 border-gray-400 p-2"
            onChange={(password) => setConfirmPassword(password.target.value)}
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
        <Link href={"/sign-in"} className="text-blue-600">
          Return
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
