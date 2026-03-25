import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  let userId: string | null = null;
  let email: string | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    userId = user?.id ?? null;
    email = user?.email ?? null;
  } catch {
    redirect("/auth");
  }

  if (!userId) {
    redirect("/auth");
  }

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("recipes")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Your account
        </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Signed in as <span className="font-medium">{email ?? "user"}</span>
          </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-zinc-800">Quick DB check</h3>
        {error ? (
          <p className="mt-1 text-sm text-rose-700">
            Could not load your recipes count: {error.message}
          </p>
        ) : (
          <p className="mt-1 text-sm text-zinc-600">
            You currently have <span className="font-medium">{count ?? 0}</span>{" "}
            recipes in the database.
          </p>
        )}
      </div>

      <p className="text-sm text-zinc-600">
        Return to the{" "}
        <Link className="font-medium underline" href="/">
          home page
        </Link>
        .
      </p>
    </div>
  );
}
