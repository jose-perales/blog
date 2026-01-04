import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  // Intentionally simple validation; avoids over-restricting.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const emailRaw = typeof (body as any)?.email === "string" ? (body as any).email : "";
    const email = normalizeEmail(emailRaw);

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscription.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });
    }

    await prisma.newsletterSubscription.create({
      data: { email },
    });

    // Provider integration is intentionally a no-op by default.
    // A future provider webhook can be plugged in via env vars.
    if (process.env.NEWSLETTER_PROVIDER_WEBHOOK_URL) {
      try {
        await fetch(process.env.NEWSLETTER_PROVIDER_WEBHOOK_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch {
        // Do not fail local persistence if provider call fails.
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
