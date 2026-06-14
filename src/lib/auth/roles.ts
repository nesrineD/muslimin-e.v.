import { getSupabaseAuth } from "@/lib/supabase/server";

/**
 * Checks whether the current request is from a full admin (Mitglieder-Verwaltung).
 * Only users with app_metadata.role === "admin" pass this check.
 */
export async function isFullAdmin(): Promise<boolean> {
  const supabase = await getSupabaseAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.app_metadata?.role === "admin";
}

/**
 * Checks whether the current request is from an Aschura event admin.
 * Both "admin" (full admin) and "event_admin" (Aschura-only) pass this check.
 */
export async function isAschuraAdmin(): Promise<boolean> {
  const supabase = await getSupabaseAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = user?.app_metadata?.role;
  return role === "admin" || role === "event_admin";
}
