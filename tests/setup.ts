import "dotenv/config";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/link", () => {
  return {
    default: ({ href, children, ...props }: any) =>
      React.createElement("a", { href: String(href), ...props }, children),
  };
});
