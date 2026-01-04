// @vitest-environment node

import { describe, expect, it } from "vitest";

import { authOptions } from "@/auth";

describe("Milestone 4: session callback", () => {
  it("adds user.id to session.user from JWT token", async () => {
    const cb = authOptions.callbacks?.session as any;
    expect(typeof cb).toBe("function");

    const session = await cb({
      session: { user: { name: "x", email: "x@example.com" } },
      token: { id: "user_123" },
    });

    expect(session.user.id).toBe("user_123");
  });
});
