import SiteFooter from "@/components/navigationComponents/siteBottomFooter";
import React from "react";

function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-9">
      {children}
      <SiteFooter />
    </div>
  );
}

export default PostLayout;
