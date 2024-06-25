"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function verificationTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) location.replace("/sign-in");
  else if (currentUser.emailVerified) router.replace("/");
  else return <>{children}</>;
}