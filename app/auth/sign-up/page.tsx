"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialError = searchParams.get("error");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(initialError);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("displayName") ?? "").trim();
    const email = normalizeEmail(String(formData.get("email") ?? ""));
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push(`/auth/sign-in?signedUp=1&email=${encodeURIComponent(email)}`);
        return;
      }

      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "server");
    });
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
        <p className="text-foreground-secondary">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="underline">
            Sign in
          </Link>
          .
        </p>
      </header>

      {error ? (
        <p className="border-error/30 bg-error/10 text-error rounded-md border px-3 py-2 text-sm">
          {error === "exists"
            ? "An account with that email already exists."
            : error === "invalid"
              ? "Please provide a display name, valid email, and a password of at least 8 characters."
              : "Sign up failed. Check your details and try again."}
        </p>
      ) : null}

      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            required
            className="border-accent-subtle bg-background-elevated text-foreground w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="border-accent-subtle bg-background-elevated text-foreground w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            className="border-accent-subtle bg-background-elevated text-foreground w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="bg-foreground text-background rounded-md px-3 py-2 text-sm font-medium"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
