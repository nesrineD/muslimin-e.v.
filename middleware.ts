import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi =
    pathname.startsWith("/api/events/aschura/registrations") ||
    pathname.startsWith("/api/events/aschura/guests");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // Build a response we can attach refreshed cookies to
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh the session (rotates token if needed)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Role-based access:
  // - "admin"       → full access to all /admin/* routes
  // - "event_admin" → restricted to /admin/aschura only
  const role = user?.app_metadata?.role;
  const isAdmin = role === "admin";
  const isEventAdmin = role === "event_admin";

  const isAshuraRoute = pathname.startsWith("/admin/aschura");
  const hasAccess = isAdmin || (isEventAdmin && isAshuraRoute);

  if (!hasAccess) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/events/aschura/registrations/:path*",
    "/api/events/aschura/guests/:path*",
  ],
};
