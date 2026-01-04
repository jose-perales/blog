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
        <p className="text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="underline">
            Sign up
          </Link>
          .
        </p>
      </header>

      {signedUp ? (
        <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
          Account created. Please sign in.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          Sign in failed. Check your email and password.
        </p>
      ) : null}

      {localError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
          Sign in failed. Check your email and password.
        </p>
      ) : null}

      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={emailPrefill}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
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
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
