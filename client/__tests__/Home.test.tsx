import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(root)/page";

test("Home", () => {
  render(<Home />);
  expect(screen.getByRole("paragraph")).toBeDefined();
});
