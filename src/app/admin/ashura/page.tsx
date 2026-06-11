import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { RegistrationTable } from "@/components/ashura/admin/RegistrationTable";
import type { EventRegistration, CapacityInfo } from "@/types/ashura";

async function getData(): Promise<{
  registrations: EventRegistration[];
  capacity: CapacityInfo;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const cookieStore = await cookies();

  const [regRes, capRes] = await Promise.all([
    fetch(`${baseUrl}/api/events/ashura/registrations`, {
      cache: "no-store",
      headers: { Cookie: cookieStore.toString() },
    }),
    fetch(`${baseUrl}/api/events/ashura/capacity`, { cache: "no-store" }),
  ]);

  if (regRes.status === 401) redirect("/login");

  if (!regRes.ok || !capRes.ok) {
    const regErr = !regRes.ok ? await regRes.text() : "";
    const capErr = !capRes.ok ? await capRes.text() : "";
    console.error("Admin page fetch error:", { regErr, capErr });
    throw new Error(
      "API nicht erreichbar. Bitte SUPABASE_SERVICE_ROLE_KEY und andere Umgebungsvariablen in .env.local prüfen.",
    );
  }

  const { registrations } = await regRes.json();
  const capacity: CapacityInfo = await capRes.json();

  return { registrations, capacity };
}

export default async function AshuraAdminPage() {
  const { registrations, capacity } = await getData();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-charcoal-800">
            Admin — Aschura-Veranstaltung 2026
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            Gästeliste und Check-in-Verwaltung
          </p>
        </div>

        <RegistrationTable
          initialRegistrations={registrations}
          capacity={capacity}
        />
      </div>
    </main>
  );
}
