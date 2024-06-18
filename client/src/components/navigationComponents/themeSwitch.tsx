import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

function ThemeSwitch({ className }: { className: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const darkModeToggle = (isSelected: Boolean) => {
    isSelected ? setTheme("dark") : setTheme("light");
  };
  return (
    <Switch
      size="md"
      color="default"
      defaultSelected={resolvedTheme === "dark" ? true : false}
      startContent={<IoMoon />}
      endContent={<IoSunny />}
      className={className}
      onValueChange={(isSelected) => darkModeToggle(isSelected)}
    />
  );
}

export default ThemeSwitch;
