"use client";
import ThemeSwitch from "@/components/navigationComponents/themeSwitch";
import UsernameHandler from "@/components/dashboardComponents/settingsComponents/usernameHandler";

import React from "react";
import PasswordHandler from "@/components/dashboardComponents/settingsComponents/passwordHandler";
import DeleteHandler from "@/components/dashboardComponents/settingsComponents/deleteHandler";

function Settings() {
  return (
    <section className="scrollbar-rounded flex size-full flex-col gap-5 overflow-auto rounded-3xl border-t-2 border-border bg-accent p-6 shadow-lg">
      <div className="flex flex-col gap-2 pb-2">
        <h1 className="text-xl">General</h1>
        <div className="flex w-full flex-col gap-1 px-3">
          Change Theme
          <ThemeSwitch className="z-0 flex" showTheme size="md" />
        </div>
      </div>
      <div className="flex h-full flex-col gap-2 border-t-1 border-border">
        <h1 className="text-xl">Profile</h1>
        <div className="flex w-full flex-col gap-2 px-3">
          Change Username
          <UsernameHandler />
        </div>
        <div className="flex w-full flex-col gap-2 px-3 pt-2">
          Change Password
          <PasswordHandler />
        </div>
        <div className="mt-auto flex w-full flex-col gap-2 px-3 pt-6">
          Delete Account
          <DeleteHandler />
        </div>
      </div>
    </section>
  );
}

export default Settings;
