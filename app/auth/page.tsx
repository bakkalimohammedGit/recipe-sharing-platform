"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<"sign-in" | "sign-up" | "magic" | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading("sign-in");
    setMessage(null);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(null);
      return;
    }

    setMessage("Signed in successfully. Redirecting to your account...");
    setLoading(null);
    router.push("/account");
    router.refresh();
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading("sign-up");
    setMessage(null);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(null);
      return;
    }

    setMessage("Account created successfully. Redirecting to your account...");
    setLoading(null);
    router.push("/account");
    router.refresh();
  }

  async function handleMagicLink() {
    setLoading("magic");
    setMessage(null);
    setError(null);

    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: origin ? `${origin}/auth/callback?next=/account` : "",
      },
    });

    if (otpError) {
      setError(otpError.message);
      setLoading(null);
      return;
    }

    setMessage("Magic link sent. Check your email to sign in.");
    setLoading(null);
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white/90 p-5 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
        Sign in to Recipe Sharing Platform
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Use email + password or request a magic link.
      </p>

      <form onSubmit={handleSignIn} className="mt-5 space-y-3">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none ring-amber-500/40 focus:bg-white focus:ring"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none ring-amber-500/40 focus:bg-white focus:ring"
            placeholder="Your password"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="submit"
            disabled={loading !== null}
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-amber-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading === "sign-in" ? "Signing in..." : "Sign in"}
          </button>
          <button
            type="button"
            disabled={loading !== null}
            onClick={handleSignUp}
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading === "sign-up" ? "Creating..." : "Sign up"}
          </button>
          <button
            type="button"
            disabled={loading !== null || !email}
            onClick={handleMagicLink}
            className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading === "magic" ? "Sending..." : "Send magic link"}
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
          {error}
        </p>
      )}

      <p className="mt-4 text-xs text-zinc-500">
        Already signed in? Go to{" "}
        <Link className="font-medium text-zinc-700 underline" href="/account">
          your account
        </Link>
        .
      </p>
    </div>
  );
}
