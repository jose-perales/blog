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
    <html lang="en" className="bg-background text-foreground">
      <body className="bg-background text-foreground min-h-dvh">
        <div className="max-w-page mx-auto">
          <header className="border-accent-subtle border-b">
            <nav className="max-w-content mx-auto flex items-center justify-between px-6 py-4">
              <Link href="/" className="font-semibold">
                Career Blog
              </Link>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/about" className="text-foreground-secondary hover:text-foreground">
                  About
                </Link>
                <Link
                  href="/newsletter"
                  className="text-foreground-secondary hover:text-foreground"
                >
                  Newsletter
                </Link>
                {session?.user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-foreground-secondary">
                      Signed in as {session.user.name ?? session.user.email}
                    </span>
                    <SignOutButton />
                  </div>
                ) : (
                  <Link
                    href="/auth/sign-in"
                    className="text-foreground-secondary hover:text-foreground"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </nav>
          </header>
          <main className="max-w-content mx-auto px-6 py-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
