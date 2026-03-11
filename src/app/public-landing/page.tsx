import { redirect } from "next/navigation";

/**
 * /public-landing is now served at the canonical root URL "/".
 * Redirect for backward compatibility (deep links, cached URLs, etc.)
 */
export default function PublicLandingRedirect() {
  redirect("/");
}
