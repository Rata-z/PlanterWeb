"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function dashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) location.assign("/sign-in");
  else if (!currentUser.emailVerified) router.push("/verify-account");
  else return { children };
}
