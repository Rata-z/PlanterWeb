import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="flex-col  flex-1">
        <Topbar />
        {children}
      </div>
    </main>
  );
}
