"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

const VerifyAccount = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, sendVerificationLink } = useAuth();
  const router = useRouter();

  const resendEmail = async () => {
    if (currentUser) {
      try {
        setError(null);
        setMessage("Email verification resent!");
        await sendVerificationLink(currentUser);
      } catch (e) {
        console.log(e);
        setMessage(null);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <section className="flex flex-col">
      {!currentUser || currentUser.emailVerified ? (
        <></>
      ) : (
        <div>
          <div className="flex flex-col">
            <h1 className="pb-2 text-4xl">Verify Email</h1>
            {error && <p className="text-tiny text-red-700">{error}</p>}
            {message && <p className="text-tiny">{message}</p>}
          </div>
          <div className="flex flex-col pt-2">
            <p>On your email address was sent verification link.</p>
          </div>

          <div className="flex flex-row justify-end pt-2">
            <Button
              radius="full"
              onPress={resendEmail}
              className="rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl border-2.5 border-green-950 border-opacity-85 bg-gradient-to-tl from-orange-300 from-[-30%] to-pink-300 to-[130%] font-nunitoSans font-bold text-green-950 shadow-lg"
            >
              Resend link
            </Button>
          </div>
          <div className="flex flex-row justify-start gap-1 pt-2 text-sm">
            <Link
              href={"/sign-in"}
              className="text-blue-600 dark:text-blue-500"
            >
              Return
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default VerifyAccount;
