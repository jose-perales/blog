// @vitest-environment node

import bcrypt from "bcryptjs";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/db";

describe("Milestone 4: Credentials authorize", () => {
  const email = `milestone4-auth-${Date.now()}@example.com`;
  const password = "password123";

  beforeEach(async () => {
    await prisma.password.deleteMany({ where: { user: { email } } });
    await prisma.user.deleteMany({ where: { email } });

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email,
        name: "Auth Test",
        password: { create: { passwordHash } },
      },
    });
  });

  it("returns a user object for valid credentials", async () => {
    const provider = (authOptions.providers ?? []).find((p: any) => p?.id === "credentials") as any;
    const authorize: any = provider?.options?.authorize ?? provider?.authorize;
    expect(typeof authorize).toBe("function");

    // Sanity-check fixture user exists as expected.
    const dbUser = await prisma.user.findUnique({ where: { email }, include: { password: true } });
    expect(dbUser?.password?.passwordHash).toEqual(expect.any(String));

    // Ensure we're calling our configured authorize function.
    expect(String(authorize)).toContain("normalizeEmail");

    const user = await authorize({ email, password }, {});
    expect(user).toMatchObject({ email, name: "Auth Test" });
    expect(user.id).toEqual(expect.any(String));
  });

  it("returns null for invalid password", async () => {
    const provider = (authOptions.providers ?? []).find((p: any) => p?.id === "credentials") as any;
    const authorize: any = provider?.options?.authorize ?? provider?.authorize;
    const user = await authorize({ email, password: "wrong" }, {});
    expect(user).toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
