import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const name = typeof (body as any)?.name === "string" ? (body as any).name.trim() : "";
    const email =
      typeof (body as any)?.email === "string" ? normalizeEmail((body as any).email) : "";
    const password = typeof (body as any)?.password === "string" ? (body as any).password : "";

    if (!name || !email || password.length < 8) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        name,
        password: {
          create: {
            passwordHash,
          },
        },
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
