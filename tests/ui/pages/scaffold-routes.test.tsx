import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import NewsletterPage from "@/app/newsletter/page";

vi.mock("@/auth", () => ({
  auth: async () => null,
}));

describe("Milestone 1: scaffold routes", () => {
  it("renders About page heading", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  });

  it("renders Newsletter form", () => {
    render(<NewsletterPage />);
    expect(screen.getByRole("heading", { name: "Newsletter" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("shows top nav links and Sign in when logged out", async () => {
    const { default: RootLayout } = await import("@/app/layout");
    const element = await RootLayout({ children: <div>child</div> });

    const body = (element as any)?.props?.children;
    const bodyChildren = body?.props?.children;
    render(<>{bodyChildren}</>);

    expect(screen.getByRole("link", { name: "Career Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Newsletter" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });
});
