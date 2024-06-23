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
      <div className="flex flex-col">
        <h1 className="pb-2 text-4xl">Reset your password</h1>
        {message ? (
          <p className="text-sm text-green-700">{message}</p>
        ) : (
          <div className="flex flex-col gap-4 pt-2">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(text) => setEmail(text.target.value)}
              classNames={{
                label: "text-foreground",
                input: "text-foreground",
                errorMessage: "absolute",
                inputWrapper:
                  "border-border dark:bg-black dark:bg-opacity-60 transition-colors-opacity hover:border-foreground  shadow-lg ",
              }}
              variant="bordered"
              isInvalid={!error ? false : true}
              errorMessage={error}
            />
          </div>
        )}
      </div>

      <div className="flex flex-row justify-end pt-2">
        <Button
          radius="full"
          onPress={message ? handleSendNewLink : handleSignInWithEmail}
          className="rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl border-2.5 border-green-950 border-opacity-85 bg-gradient-to-tl from-orange-300 from-[-30%] to-pink-300 to-[130%] font-nunitoSans font-bold text-green-950 shadow-lg"
        >
          {message ? "Send new link" : "Send link"}
        </Button>
      </div>
      <div className="flex flex-row justify-start gap-1 pt-2 text-sm">
        <Link
          href={"/sign-in"}
          className="text-blue-600 dark:text-blue-500"
          onClick={() => location.replace("/sign-in")}
        >
          {"Return"}
        </Link>
      </div>
    </section>
  );
}

export default PasswordReset;
