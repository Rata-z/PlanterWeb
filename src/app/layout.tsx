import "~/styles/globals.css";
import Link from "next/link";
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

function TopNavBar() {
  return (
    <nav className="flex w-full justify-between bg-red-500 p-2 text-xl font-bold">
      <Link className="flex  " href={"/"}>
        <div>Planter</div>
      </Link>
      <div>Log In</div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
