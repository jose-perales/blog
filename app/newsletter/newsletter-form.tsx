"use client";

import { useState, useTransition } from "react";

function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

type NewsletterFormProps = {
  initialEmail?: string;
};

export function NewsletterForm({ initialEmail = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const normalized = normalizeEmail(email);
    setEmail(normalized);
    setStatus("idle");
    setMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: normalized }),
        });

        const body = (await response.json()) as any;

        if (response.ok) {
          setStatus("success");
          setMessage("You’re subscribed. Thanks for signing up!");
          return;
        }

        if (body?.error === "exists") {
          setStatus("success");
          setMessage("You’re already subscribed.");
          return;
        }

        setStatus("error");
        setMessage(
          body?.error === "invalid" ? "Please enter a valid email." : "Something went wrong.",
        );
      } catch {
        setStatus("error");
        setMessage("Something went wrong.");
      }
    });
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <label className="block text-sm font-medium" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-accent-subtle bg-background-elevated text-foreground placeholder:text-foreground-muted w-full rounded-md border px-3 py-2 text-sm"
        placeholder="you@example.com"
        disabled={isPending || status === "success"}
      />
      <button
        type="submit"
        className="bg-foreground text-background rounded-md px-3 py-2 text-sm font-medium disabled:opacity-60"
        disabled={isPending || status === "success"}
      >
        Sign up
      </button>

      {message ? (
        <div
          className={
            status === "error" ? "text-error text-sm" : "text-foreground-secondary text-sm"
          }
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
