"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/authContext";
import { IconContext } from "react-icons";
import Link from "next/link";

function SignIn() {
  const { signIn, signOut, currentUser } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  console.log(currentUser);

  const handleLogOut = () => {
    signOut();
  };

  const handleSignInWithEmail = async () => {
    try {
      const res = await signIn(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      // router.push("/");
    } catch (e) {
      setPassword("");
      console.log(e);
      setError("Invalid email or password.");
    }
  };
  return (
    <section className="flex flex-col">
      <div className=" flex flex-col">
        <h1 className="text-4xl pb-2">Sign In</h1>
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
        </div>
      </div>
      <div className="pt-1.5  flex justify-end">
        <Link href={"/password-reset"} className=" text-tiny text-blue-600">
          Forgot Password
        </Link>
      </div>

      <div className="flex pt-2 flex-row justify-between">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <Button
            color="primary"
            startContent={<FcGoogle />}
            onPress={handleLogOut}
          >
            Continue with Google
          </Button>
        </IconContext.Provider>
        <Button
          radius="full"
          onPress={handleSignInWithEmail}
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          Sign In
        </Button>
      </div>
      <div className="flex flex-row pt-2 gap-1 text-sm justify-center">
        {"dont have account?"}
        <Link href={"/sign-up"} className="text-blue-600">
          {" "}
          Create an account
        </Link>{" "}
      </div>
    </section>
  );
}

export default SignIn;
