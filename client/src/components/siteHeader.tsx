import MainNavbar from "./navigationComponents/mainNavbar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 w-full">
      <div className="container flex h-12 max-w-screen-2xl">
        <MainNavbar />
      </div>
    </header>
  );
}
