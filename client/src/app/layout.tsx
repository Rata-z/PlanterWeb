import "./globals.css";
import { Inter, Nunito_Sans } from "next/font/google";
import { Providers } from "../components/providers";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400"],
  adjustFontFallback: false,
});

export const metadata = {
  title: "Planter",
  description: "Planter is plant care oriented platform.",
  icons: { icon: "../assets/icons/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={` ${nunitoSans.variable} font-sans `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
