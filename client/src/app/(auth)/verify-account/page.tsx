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

  useEffect(() => {
    if (currentUser) {
      currentUser.emailVerified && router.replace("/");
    } else router.replace("/sign-in");
  }, [currentUser]);

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
          <div className=" flex flex-col">
            <h1 className="text-4xl pb-2">Verify Email</h1>
            {error && <p className="text-tiny text-red-700">{error}</p>}
            {message && <p className="text-tiny ">{message}</p>}
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
