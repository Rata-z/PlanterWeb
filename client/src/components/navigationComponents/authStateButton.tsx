import { Button } from "@nextui-org/button";
import { User } from "firebase/auth";
import Link from "next/link";
import React from "react";
interface AuthStateProps {
  currentUser: User | null;
  signOut: () => Promise<void>;
}

function AuthStateButton({ props }: { props: AuthStateProps }) {
  return (
    <div className="hidden text-nowrap sm:inline-block">
      {props.currentUser ? (
        <Button size="sm" onPress={props.signOut}>
          LOG OUT
        </Button>
      ) : (
        <Link href={"/sign-in"}>SIGN IN</Link>
      )}
    </div>
  );
}

export default AuthStateButton;
