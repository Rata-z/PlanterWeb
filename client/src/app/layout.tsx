import "./globals.css";
import { Nunito_Sans, Halant } from "next/font/google";
import { Providers } from "../components/providers";
import { cn } from "@/lib/utils";
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "500", "700"],
  adjustFontFallback: false,
});
const halant = Halant({
  subsets: ["latin"],
  variable: "--font-halant",
  weight: ["400"],
  adjustFontFallback: false,
});

export const metadata = {
  title: "Planter",
  description: "Planter is plant care oriented platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={cn(
          "font-halant min-h-screen bg-background font-nunitoSans antialiased",
          nunitoSans.variable,
          halant.variable,
        )}
      >
        <Providers>
          <div className="relative flex flex-col bg-background">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
