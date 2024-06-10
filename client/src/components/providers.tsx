"use client";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/context/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextUIProvider>
        <AuthProvider>{children}</AuthProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}
