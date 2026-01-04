// @vitest-environment node

import { afterEach, describe, expect, it } from "vitest";

import { POST as signUpPOST } from "@/app/api/auth/sign-up/route";
import { prisma } from "@/lib/db";

describe("Milestone 4: sign up route", () => {
  const email = `milestone4-signup-${Date.now()}@example.com`;

  afterEach(async () => {
    await prisma.password.deleteMany({ where: { user: { email } } });
    await prisma.user.deleteMany({ where: { email } });
  });

  it("returns 400 for invalid payload", async () => {
    const req = new Request("http://localhost/api/auth/sign-up", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "", email: "", password: "short" }),
    });

    const res = await signUpPOST(req);
    expect(res.status).toBe(400);
    const body = (await res.json()) as { ok: boolean; error: string };
    expect(body.ok).toBe(false);
    expect(body.error).toBe("invalid");
  });

  it("creates a user and returns 201", async () => {
    const req = new Request("http://localhost/api/auth/sign-up", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email,
        password: "password123",
      }),
    });

    const res = await signUpPOST(req);
    expect(res.status).toBe(201);
    const body = (await res.json()) as { ok: boolean };
    expect(body.ok).toBe(true);

    const user = await prisma.user.findUnique({ where: { email } });
    expect(user?.email).toBe(email);
    const passwordRow = await prisma.password.findUnique({ where: { userId: user!.id } });
    expect(passwordRow?.passwordHash).toEqual(expect.any(String));
  });

  it("returns 409 when user already exists", async () => {
    await prisma.user.create({
      data: {
        email,
        name: "Existing",
        password: { create: { passwordHash: "x" } },
      },
    });

    const req = new Request("http://localhost/api/auth/sign-up", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email,
        password: "password123",
      }),
    });

    const res = await signUpPOST(req);
    expect(res.status).toBe(409);
    const body = (await res.json()) as { ok: boolean; error: string };
    expect(body.ok).toBe(false);
    expect(body.error).toBe("exists");
  });
});
