import { createBrowserClient } from "@supabase/ssr";

// Client-side Supabase client (anon key).
// Uses @supabase/ssr so auth sessions are stored in cookies and
// are automatically available to middleware and server components.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// Singleton for use in client components / hooks
export const supabaseClient = createSupabaseBrowserClient();
