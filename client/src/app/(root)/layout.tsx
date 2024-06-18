import { SiteHeader } from "@/components/siteHeader";

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
        <div className="flex-col  flex-1">
          {authModal}
          {postModal}
          {children}
        </div>
      </main>
    </>
  );
}
