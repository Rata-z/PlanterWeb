"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { Input } from "@nextui-org/input";

function PasswordReset() {
  const { sendResetLink } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);
  const router = useRouter();

  const handleSendNewLink = () => {
    setMessage(null);
  };

  const handleSignInWithEmail = async () => {
    try {
      await sendResetLink(email).then(() => {
        setEmail("");
        setError(null);
        setMessage("Reset link was sent to your e-mail.");
      });
    } catch (e) {
      setEmail("");
      console.log(e);
      setMessage(null);
      setError("Invalid email.");
    }
  };
  return (
    <section className="flex flex-col">
      <div className=" flex flex-col">
        <h1 className="text-4xl pb-2">Reset your password</h1>
        {message ? (
          <p className="text-sm text-green-700">{message}</p>
        ) : (
          <div className="flex flex-col gap-4 pt-2">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(text) => setEmail(text.target.value)}
              className=" border-gray-400 "
              variant="bordered"
              isInvalid={!error ? false : true}
              errorMessage={error}
            />
          </div>
        )}
      </div>

      <div className="flex pt-2 flex-row justify-end">
        <Button
          radius="full"
          onPress={message ? handleSendNewLink : handleSignInWithEmail}
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          {message ? "Send new link" : "Send link"}
        </Button>
      </div>
      <div className="flex flex-row pt-2 gap-1 text-sm justify-start">
        <Link href={"/sign-in"} replace className="text-blue-600">
          {"Return"}
        </Link>
      </div>
    </section>
  );
}

export default PasswordReset;
