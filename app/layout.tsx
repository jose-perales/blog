import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@/auth";
import SignOutButton from "./sign-out-button";

import "./globals.css";

export const metadata: Metadata = {
  title: "Career Blog",
  description: "A local-first career blog.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold">
              Career Blog
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/newsletter" className="hover:underline">
                Newsletter
              </Link>
              {session?.user ? (
                <div className="flex items-center gap-3">
                  <span className="text-slate-600">
                    Signed in as {session.user.name ?? session.user.email}
                  </span>
                  <SignOutButton />
                </div>
              ) : (
                <Link href="/auth/sign-in" className="hover:underline">
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
