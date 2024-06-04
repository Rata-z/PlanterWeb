"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";

type User = {
  user: string;
};

function SignIn() {
  const [userName, setUser] = useState<string | null>(null);
  const singInPressHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user");
      const data: User = await response.json();
      if (data && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex">
      <div>
        <Button color="primary" variant="solid" onPress={singInPressHandler}>
          Lol
        </Button>
      </div>
      <div>{userName == null ? <div>XD</div> : <div>{userName}</div>}</div>
    </section>
  );
}

export default SignIn;
