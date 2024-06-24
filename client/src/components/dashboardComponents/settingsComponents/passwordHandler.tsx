"use client";
import { useAuth } from "@/context/authContext";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";

function PasswordHandler() {
  const { sendResetLink, currentUser } = useAuth();

  const [message, setMessage] = useState<null | string>(null);
  const handleResetWithEmail = async () => {
    if (!currentUser || !currentUser.email) setMessage("User is not logged in");
    else {
      try {
        await sendResetLink(currentUser.email).then(() => {
          setMessage(
            "Link for changing your password was sent to your e-mail!",
          );
        });
      } catch (e) {
        console.log(e);
        setMessage(null);
      }
    }
  };
  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        radius="full"
        onPress={handleResetWithEmail}
        isDisabled={message ? true : false}
        className="w-min rounded-bl-3xl rounded-br-lg rounded-tl-lg rounded-tr-3xl border-2.5 border-green-950 border-opacity-85 bg-gradient-to-tl from-orange-300 from-[-30%] to-pink-300 to-[130%] font-nunitoSans font-bold text-green-950 shadow-lg"
      >
        {message ? "Link sent" : "Send link"}
      </Button>
      {message && <p className="text-sm text-foreground">{message}</p>}
    </div>
  );
}

export default PasswordHandler;
