"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";

import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

const VerifyAccount = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, sendVerificationLink } = useAuth();
  const router = useRouter();
  !currentUser && redirect("/sign-in");
  currentUser?.emailVerified && redirect("/");

  const resendEmail = async () => {
    if (currentUser) {
      try {
        const res = await sendVerificationLink(currentUser);
        console.log(res);
        setError(null);
        setMessage("Email verification sent!");
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
        <div></div>
      ) : (
        <div>
          <div className=" flex flex-col">
            <h1 className="text-4xl pb-2">Verify Email</h1>
            {error && <p className="text-tiny text-red-700">{error}</p>}
          </div>
          <div className="flex flex-col pt-2">
            <p>On your email address was sent verification link.</p>
          </div>

          <div className="flex pt-2 flex-row justify-end">
            <Button
              radius="full"
              onPress={resendEmail}
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              Resend link
            </Button>
          </div>
          <div className="flex flex-row pt-2 gap-1 text-sm justify-start">
            <Link href={"/sign-in"} className="text-blue-600">
              Return
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default VerifyAccount;
