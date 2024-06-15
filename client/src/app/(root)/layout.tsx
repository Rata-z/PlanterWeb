import Navbar from "@/components/navbar";

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
    <main className="flex flex-row">
      <div className="flex-col  flex-1">
        {authModal}
        <Navbar />
        {postModal}
        {children}
      </div>
    </main>
  );
}
