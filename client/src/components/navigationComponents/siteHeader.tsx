import MainNavbar from "./mainNavbar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 mb-5 w-full border-b-1 border-border bg-destructive">
      <div className="container flex h-12 max-w-screen-2xl">
        <MainNavbar />
      </div>
    </header>
  );
}
