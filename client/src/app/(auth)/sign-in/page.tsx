"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/authContext";
import { IconContext } from "react-icons";
import PasswordButton from "@/components/passwordButton";
import { Input } from "@nextui-org/input";
import Link from "next/link";

function SignIn() {
  const { signIn, currentUser, continueWithGoogle } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (currentUser)
      currentUser.emailVerified
        ? router.replace("/")
        : router.replace("/verify-account");
  }, []);

  const handleSignInWithEmail = async () => {
    try {
      await signIn(email, password);
      router.back();
    } catch (e) {
      setPassword("");
      console.log(e);
      setError("Invalid email or password.");
    }
  };
  const handleContinueWithGoogle = async () => {
    try {
      await continueWithGoogle();
      router.back();
    } catch (error) {
      setError("Google authentication error.");
    }
  };
  return (
    <section className="flex flex-col">
      <div className=" flex flex-col">
        <h1 className="text-4xl pb-2">Sign In</h1>
        {error && <p className="text-tiny text-red-700">{error}</p>}
        <div className="flex flex-col gap-4 pt-2">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            className=" border-gray-400 "
            variant="bordered"
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
            onPress={handleContinueWithGoogle}
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
