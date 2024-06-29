import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

interface ThemeProps {
  className: string;
  size?: "sm" | "md" | "lg" | undefined;
  showTheme?: boolean;
}

function ThemeSwitch({ className, size = "sm", showTheme }: ThemeProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const darkModeToggle = (isSelected: Boolean) => {
    isSelected ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="flex flex-row items-center gap-4">
      {showTheme && <h2>{resolvedTheme === "light" ? "Light" : "Dark"}</h2>}
      <Switch
        size={size}
        color="default"
        defaultSelected={resolvedTheme === "dark" ? true : false}
        startContent={<IoMoon />}
        endContent={<IoSunny />}
        className={className}
        isSelected={resolvedTheme === "dark" ? true : false}
        onValueChange={(isSelected) => darkModeToggle(isSelected)}
      />
    </div>
  );
}

export default ThemeSwitch;
