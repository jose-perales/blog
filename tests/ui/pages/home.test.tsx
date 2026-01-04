import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("Milestone 2: Home page", () => {
  it("renders an MDX-driven post list", async () => {
    const element = await HomePage();
    render(element);

    expect(screen.getByRole("heading", { name: "Latest posts" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Posts" })).toBeInTheDocument();

    // Fixture-driven expectations
    expect(screen.getByRole("link", { name: "Hello World" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shiki + rehype-pretty-code" })).toBeInTheDocument();
  });
});
