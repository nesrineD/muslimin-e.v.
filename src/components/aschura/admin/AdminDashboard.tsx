"use client";

import { useState, useMemo } from "react";
import { RegistrationTable } from "@/components/aschura/admin/RegistrationTable";
import { GuestList } from "@/components/aschura/admin/GuestList";
import type { EventRegistration, CapacityInfo, Guest } from "@/types/aschura";

interface GuestRow extends Guest {
  registration_email: string;
}

interface Props {
  initialRegistrations: EventRegistration[];
  initialGuests: GuestRow[];
  totalCapacity: number;
}

export function AdminDashboard({ initialRegistrations, initialGuests, totalCapacity }: Props) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [guests, setGuests] = useState(initialGuests);

  const capacity: CapacityInfo = useMemo(() => {
    const registered = guests.length;
    return {
      total_capacity: totalCapacity,
      registered,
      available: Math.max(0, totalCapacity - registered),
      is_full: registered >= totalCapacity,
    };
  }, [guests, totalCapacity]);

  const checkedIn = useMemo(() => guests.filter((g) => g.checked_in).length, [guests]);

  function handleGuestCancelled(guestId: string) {
    const guest = guests.find((g) => g.id === guestId);
    if (!guest) return;

    setGuests((prev) => prev.filter((g) => g.id !== guestId));
    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id !== guest.registration_id) return r;
        const newGuests = (r.guests ?? []).filter((g) => g.id !== guestId);
        return {
          ...r,
          anzahl_teilnehmer: newGuests.length,
          guests: newGuests,
          ...(newGuests.length === 0 ? { status: "cancelled" as const } : {}),
        };
      }),
    );
  }

  function handleRegistrationCancelled(registrationId: string) {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === registrationId ? { ...r, status: "cancelled" as const } : r,
      ),
    );
    setGuests((prev) => prev.filter((g) => g.registration_id !== registrationId));
  }

  function handleCheckinToggled(guestId: string, checked_in: boolean) {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, checked_in } : g)),
    );
  }

  return (
    <>
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-charcoal-200">
          <div className="w-1 h-5 rounded-full bg-charcoal-800" />
          <h2 className="text-base font-bold text-charcoal-800 uppercase tracking-wide">
            Anmeldungsübersicht
          </h2>
        </div>
        <RegistrationTable
          registrations={registrations}
          onCancelled={handleRegistrationCancelled}
        />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-2 pb-3 border-b border-charcoal-200">
          <div className="w-1 h-5 rounded-full bg-sage-600" />
          <h2 className="text-base font-bold text-charcoal-800 uppercase tracking-wide">
            Gesamtgästeliste
          </h2>
        </div>
        <p className="text-charcoal-400 text-xs mb-5">
          Eine Zeile pro Gast · Check-in pro Person · sortiert nach Nachname A–Z
        </p>
        <GuestList
          guests={guests}
          capacity={capacity}
          checkedIn={checkedIn}
          onGuestCancelled={handleGuestCancelled}
          onCheckinToggled={handleCheckinToggled}
        />
      </section>
    </>
  );
}
