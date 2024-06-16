"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

export default function authenticationTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (currentUser && !currentUser.emailVerified)
    router.replace("/verify-account");
  else if (currentUser && currentUser.emailVerified) router.replace("/");
  else return { children };
}
