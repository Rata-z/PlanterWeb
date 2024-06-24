import "./globals.css";
import { Inter, Nunito_Sans } from "next/font/google";
import { Providers } from "../components/providers";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "500", "700"],
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
          "min-h-screen bg-background font-nunitoSans antialiased",
          nunitoSans.variable,
        )}
      >
        <Providers>
          <div className="relative flex flex-col bg-background">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
