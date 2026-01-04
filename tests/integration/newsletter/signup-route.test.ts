// @vitest-environment node

import { afterAll, afterEach, describe, expect, it } from "vitest";

import { POST as newsletterPOST } from "@/app/api/newsletter/route";
import { prisma } from "@/lib/db";

describe("Milestone 6: newsletter signup route", () => {
  const email = `m6-newsletter-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;

  afterEach(async () => {
    // Clean up by email in case the route was implemented.
    // If the model doesn't exist yet, this will fail and that's OK for the initial red phase.
    await prisma.newsletterSubscription.deleteMany({ where: { email } });
  });

  it("returns 400 for invalid email", async () => {
    const req = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "not-an-email" }),
    });

    const res = await newsletterPOST(req);
    expect(res.status).toBe(400);
    const body = (await res.json()) as any;
    expect(body.ok).toBe(false);
    expect(body.error).toBe("invalid");
  });

  it("creates a subscription and returns 201", async () => {
    const req = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const res = await newsletterPOST(req);
    expect(res.status).toBe(201);
    const body = (await res.json()) as any;
    expect(body.ok).toBe(true);

    const row = await prisma.newsletterSubscription.findUnique({ where: { email } });
    expect(row?.email).toBe(email);
  });

  it("returns 409 when email is already subscribed", async () => {
    await prisma.newsletterSubscription.create({ data: { email } });

    const req = new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const res = await newsletterPOST(req);
    expect(res.status).toBe(409);
    const body = (await res.json()) as any;
    expect(body.ok).toBe(false);
    expect(body.error).toBe("exists");
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
