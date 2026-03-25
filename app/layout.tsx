import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { signOutAction } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Sharing Platform",
  description:
    "Discover, create, and share delicious recipes with a beautiful, modern interface.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Avoid rendering failures if env vars are missing on the hosting platform.
  // This prevents the whole site from returning 404 when Supabase isn't reachable.
  let user: { id: string; email?: string } | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase.auth.getUser();
    user = result.data.user
      ? { id: result.data.user.id, email: result.data.user.email ?? undefined }
      : null;
  } catch {
    user = null;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-zinc-50 to-zinc-100">
          <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white shadow-sm">
                  RS
                </span>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight">
                    Recipe Sharing Platform
                  </h1>
                  <p className="text-xs text-zinc-500">
                    Share your best dishes with the world.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Link
                  href="/"
                  className="rounded-full border border-zinc-300 px-3 py-1.5 font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  Home
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/account"
                      className="rounded-full border border-zinc-300 px-3 py-1.5 font-medium text-zinc-700 transition hover:bg-zinc-50"
                    >
                      Account
                    </Link>
                    <form action={signOutAction}>
                      <button
                        type="submit"
                        className="rounded-full bg-zinc-900 px-3 py-1.5 font-medium text-amber-50 transition hover:bg-zinc-800"
                      >
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className="rounded-full bg-zinc-900 px-3 py-1.5 font-medium text-amber-50 transition hover:bg-zinc-800"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 pb-10 pt-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
