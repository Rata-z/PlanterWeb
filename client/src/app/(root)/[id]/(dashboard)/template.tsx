"use client";
import { useAuth } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";

export default function dashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!currentUser) location.replace("/sign-in");
  else if (!currentUser.emailVerified) router.replace("/verify-account");
  else if (!pathname.includes(currentUser.uid)) router.replace("/");
  else return <>{children}</>;
}
