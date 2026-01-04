import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("Milestone 2: Home page", () => {
  it("renders an MDX-driven post list", async () => {
    const element = await HomePage();
    render(element);

    expect(screen.getByRole("heading", { name: "Latest posts" })).toBeInTheDocument();

    // Fixture-driven expectations - post titles are now headings inside links
    expect(screen.getByRole("heading", { name: "Hello World" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Shiki + rehype-pretty-code" })).toBeInTheDocument();

    // Links exist for each post
    expect(screen.getByRole("link", { name: /Hello World/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Shiki \+ rehype-pretty-code/ })).toBeInTheDocument();
  });
});
