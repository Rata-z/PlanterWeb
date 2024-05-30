import "./globals.css";
import { Inter, Nunito_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
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
    <html lang="en">
      <body className={` ${nunitoSans.variable} font-sans bg-slate-700`}>
        {children}
      </body>
    </html>
  );
}
