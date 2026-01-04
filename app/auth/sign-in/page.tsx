"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const signedUp = searchParams.get("signedUp");
  const emailPrefill = searchParams.get("email") ?? "";
  const [pending, startTransition] = useTransition();
  const [localError, setLocalError] = useState<string | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocalError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });

      if (res?.error) setLocalError("invalid");
    });
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-foreground-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="underline">
            Sign up
          </Link>
          .
        </p>
      </header>

      {signedUp ? (
        <p className="border-accent-subtle bg-background-elevated text-foreground rounded-md border px-3 py-2 text-sm">
          Account created. Please sign in.
        </p>
      ) : null}

      {error ? (
        <p className="border-error/30 bg-error/10 text-error rounded-md border px-3 py-2 text-sm">
          Sign in failed. Check your email and password.
        </p>
      ) : null}

      {localError ? (
        <p className="border-error/30 bg-error/10 text-error rounded-md border px-3 py-2 text-sm">
          Sign in failed. Check your email and password.
        </p>
      ) : null}

      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={emailPrefill}
            className="input"
          />
        </div>

        <div className="space-y-1">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input id="password" name="password" type="password" required className="input" />
        </div>

        <button type="submit" disabled={pending} className="btn btn-solid btn-sm">
          Sign in
        </button>
      </form>
    </div>
  );
}
