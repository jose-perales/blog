// @vitest-environment node

import { afterAll, describe, expect, it } from "vitest";

import { GET as dbHealthGET } from "@/app/api/health/db/route";
import { prisma } from "@/lib/db";

describe("Milestone 3: Postgres + Prisma connectivity", () => {
  it("connects to Postgres via Prisma", async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is missing. Copy .env.example to .env and ensure docker compose is running.",
      );
    }

    await prisma.$queryRaw`SELECT 1`;
  });

  it("can create, read, and delete a Post record", async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is missing. Copy .env.example to .env and ensure docker compose is running.",
      );
    }

    const slug = `vitest-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    try {
      await prisma.post.create({ data: { slug } });
      const row = await prisma.post.findUnique({ where: { slug } });
      expect(row?.slug).toBe(slug);
    } finally {
      await prisma.post.deleteMany({ where: { slug } });
    }
  });

  it("DB health route returns { ok: true }", async () => {
    const res = await dbHealthGET();
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean };
    expect(body.ok).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
