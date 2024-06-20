import SiteFooter from "@/components/navigationComponents/siteFooter";
import { SiteHeader } from "@/components/navigationComponents/siteHeader";

export default function RootLayout({
  children,
  authModal,
  postModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
  postModal: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="flex-1 flex-col">
          {authModal}
          {postModal}
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
