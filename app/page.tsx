import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("recipes")
    .select("id", { count: "exact", head: true });

  const supabaseStatus = error ? "error" : "connected";

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-100">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Coming soon: a place for food lovers to share and discover recipes.
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            A home for your best recipes.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
            Recipe Sharing Platform will make it simple to capture your
            favorite dishes, share them with friends and family, and discover
            new ideas from cooks around the world — all in one beautiful,
            distraction‑free space.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex-1 min-w-[160px] rounded-2xl border border-zinc-200 bg-white/90 p-3 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              Save & organize
            </p>
            <p className="mt-1 text-zinc-700">
              Keep all your recipes in one place with clear ingredients,
              steps, and timing.
            </p>
          </div>
          <div className="flex-1 min-w-[160px] rounded-2xl border border-zinc-200 bg-white/90 p-3 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              Share easily
            </p>
            <p className="mt-1 text-zinc-700">
              Send beautiful, readable recipe pages instead of messy screenshots
              or notes.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-xs font-semibold text-amber-50 shadow-sm transition hover:bg-zinc-800">
            Get notified at launch
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50">
            Preview the experience
          </button>
          <p className="w-full text-[11px] text-zinc-500 sm:w-auto">
            No spam. Just one email when we go live.
          </p>
        </div>
        <div
          className={`rounded-2xl border p-3 text-xs shadow-sm ${
            supabaseStatus === "connected"
              ? "border-emerald-200 bg-emerald-50/70 text-emerald-800"
              : "border-rose-200 bg-rose-50/70 text-rose-800"
          }`}
        >
          <p className="font-semibold">Supabase connection test</p>
          {supabaseStatus === "connected" ? (
            <p className="mt-1">
              Connected successfully. Public recipes count:{" "}
              <span className="font-semibold">{count ?? 0}</span>
            </p>
          ) : (
            <p className="mt-1 break-words">
              Could not connect/query Supabase: {error?.message}
            </p>
          )}
        </div>
      </section>

      <section className="relative">
        <div className="pointer-events-none absolute -inset-10 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.18),_transparent_55%)] opacity-80" />
        <div className="rounded-3xl border border-zinc-200 bg-white/95 p-4 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-100 pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                What you&apos;ll be able to do
              </p>
              <p className="mt-0.5 text-xs text-zinc-600">
                A quick peek at the future app.
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
              In design
            </span>
          </div>

          <div className="mt-3 grid gap-3 text-xs text-zinc-700 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="font-semibold text-zinc-800">
                Build your personal cookbook
              </p>
              <p className="text-zinc-600">
                Capture every detail: ingredients, steps, photos, prep and
                cook times, and serving sizes.
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-zinc-600">
                <li>Tag recipes by cuisine, occasion, or diet.</li>
                <li>Quickly search by ingredient or name.</li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold text-zinc-800">
                Discover trusted community recipes
              </p>
              <p className="text-zinc-600">
                See what others are cooking, with notes, ratings, and
                thoughtful tips from home cooks.
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-zinc-600">
                <li>Follow favorite creators and cuisines.</li>
                <li>Save recipes into your own collections.</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-zinc-50 p-3 text-[11px] text-zinc-600">
            <p className="font-medium text-zinc-700">
              Want this to fit your needs?
            </p>
            <p className="mt-1">
              Tell us what features matter most to you — meal planning, grocery
              lists, family sharing, or something else — and we&apos;ll shape
              the roadmap around real cooks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
