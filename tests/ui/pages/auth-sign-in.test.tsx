import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import SignInPage from "@/app/auth/sign-in/page";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

function mockSearchParams(values: Record<string, string>) {
  return {
    get: (key: string) => values[key] ?? null,
  };
}

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<any>("next/navigation");
  return {
    ...actual,
    useSearchParams: () => mockSearchParams({ signedUp: "1", email: "a@b.com" }),
  };
});

describe("Milestone 4: Sign in page", () => {
  it("shows signed-up success message and prefills email", () => {
    render(<SignInPage />);

    expect(screen.getByText("Account created. Please sign in.")).toBeInTheDocument();
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.value).toBe("a@b.com");
  });
});
