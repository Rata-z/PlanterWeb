"use client";
import { NextUIProvider } from "@nextui-org/system";

import { AuthProvider } from "@/context/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>{children}</AuthProvider>
    </NextUIProvider>
  );
}
