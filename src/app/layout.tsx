import "~/styles/globals.css";
import Link from "next/link";

export const metadata = {
  title: "Planter Web",
  description: "New planter web app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TopNavBar />

        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
}
