# Recipe Sharing Platform

This project is built with Next.js and is pre-configured for Supabase.

## Supabase setup

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your Supabase values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What was added

- Browser Supabase client: `lib/supabase/client.ts`
- Server Supabase client: `lib/supabase/server.ts`
- Auth session middleware helper: `lib/supabase/middleware.ts`
- Next.js middleware entry: `middleware.ts`
- Supabase table typings: `types/database.ts`

## Usage examples

In a client component:

```ts
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const { data, error } = await supabase.from("recipes").select("*");
```

In a server component or server action:

```ts
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data, error } = await supabase.from("recipes").select("*");
```
