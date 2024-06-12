import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-row">
      <div className="flex-col  flex-1">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
