# PR Documentation: Ashura Event Registration

**Branch:** `feat/ashura-veranstaltung`  
**Event:** Aschura-Frauenveranstaltung, 15. Juni 2026, Berlin  
**Spec:** [specs/010-ashura-event-registration/spec.md](../specs/010-ashura-event-registration/spec.md)

---

## Overview

This PR implements a full event registration system for the Ashura women's event. Public visitors can register without an account, receive an automated confirmation email, and self-manage their registration via a secure one-time cancellation link. Admins get a protected dashboard for the guest list and check-in management.

---

## What Was Changed

### New Files

#### Public Pages

| File                                                         | Description                                                                                                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/veranstaltungen/ashura/page.tsx`                    | Event landing page — shows event details, available capacity, and the registration form (SSR, revalidates every 30 s). Renders a "sold out" message when capacity is exhausted. |
| `src/app/veranstaltungen/ashura/stornieren/page.tsx`         | Cancellation request page — visitor enters their email to receive a cancellation link.                                                                                          |
| `src/app/veranstaltungen/ashura/stornieren/confirm/page.tsx` | Cancellation confirmation page — validates the token server-side and renders the manage-booking form. Shows a friendly error if the link is expired or already used.            |

#### Admin Pages

| File                            | Description                                                                                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/admin/ashura/page.tsx` | Admin dashboard — guest list with search, check-in toggle, manual cancel, and a stats bar. Protected by `middleware.ts`. Redirects to `/login` if not authenticated. |

#### API Routes

| Route                                                 | Method | Description                                                                                                                                                                                                     |
| ----------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /api/events/ashura/register`                    | POST   | Registers a visitor. Calls `register_for_event` Supabase RPC for atomic capacity check + insert. Returns `201` on success, `409` if at capacity. Sends confirmation email (non-blocking).                       |
| `GET /api/events/ashura/capacity`                     | GET    | Returns `{ total_capacity, registered, available, is_full }`. Public.                                                                                                                                           |
| `POST /api/events/ashura/cancel-request`              | POST   | Looks up registration by email, generates a fresh cancellation token (14-day validity), and sends a cancellation link email. Always returns a neutral response (GDPR — does not leak whether the email exists). |
| `GET /api/events/ashura/cancel?token=`                | GET    | Validates a cancellation token and returns registration data for the confirm page. Returns `410` if expired, already used, or not found.                                                                        |
| `POST /api/events/ashura/cancel`                      | POST   | Executes full cancellation or partial reduction. Marks token as used. Sends cancellation confirmation email.                                                                                                    |
| `GET /api/events/ashura/registrations`                | GET    | Admin-only (cookie guard). Returns all registrations sorted by date.                                                                                                                                            |
| `PATCH /api/events/ashura/registrations/[id]/checkin` | PATCH  | Admin-only. Toggles `checked_in` on the registration.                                                                                                                                                           |
| `PATCH /api/events/ashura/registrations/[id]/cancel`  | PATCH  | Admin-only. Sets `status = 'cancelled'` for a registration.                                                                                                                                                     |

#### Components

| File                                                | Description                                                                                                                       |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ashura/RegistrationForm.tsx`        | Client component. React Hook Form + Zod. Handles capacity-full state, optimistic success feedback, and server-side error display. |
| `src/components/ashura/CancellationRequestForm.tsx` | Client component. Email input to request a cancellation link. Always shows the neutral GDPR-safe confirmation message.            |
| `src/components/ashura/CancellationConfirmForm.tsx` | Client component. Shows registration details and offers "Cancel all" or "Reduce count" actions with inline validation.            |
| `src/components/ashura/admin/StatsBar.tsx`          | Displays four key stats: total registered, checked in, still available, total capacity.                                           |
| `src/components/ashura/admin/RegistrationTable.tsx` | Filterable table of registrations with real-time check-in toggle and manual cancel via a confirmation dialog.                     |

#### Libraries & Utilities

| File                            | Description                                                                                                                                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/types/ashura.ts`           | TypeScript types: `EventRegistration`, `CapacityInfo`, `RegistrationStatus`, `AdminRegistrationRow`.                                                                                                                                      |
| `src/lib/validations/ashura.ts` | Zod schemas: `registrationSchema`, `cancelRequestSchema`, `cancelSchema`. Used for both client and server validation.                                                                                                                     |
| `src/lib/supabase/server.ts`    | `getSupabaseServer()` — creates a service-role Supabase client per call (lazy-init pattern; avoids build-time crashes from missing env vars).                                                                                             |
| `src/lib/supabase/client.ts`    | `supabaseClient` — anon-key client for public reads.                                                                                                                                                                                      |
| `src/lib/email/brevo.ts`        | Three email functions using `@getbrevo/brevo`: `sendConfirmationEmail`, `sendCancellationRequestEmail`, `sendCancellationConfirmationEmail`. All are fire-and-forget from the API routes — email failure never rolls back a registration. |

#### Middleware

| File            | Description                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `middleware.ts` | Protects all `/admin/*` routes. Checks for the `mock-admin-session` cookie. Redirects unauthorized requests to `/login?redirect=<path>`. |

### Modified Files

| File                    | What Changed                                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/hooks/useAuth.tsx` | Sets `mock-admin-session=true` cookie on admin login; clears it on logout. This lets the middleware and API routes verify admin status during the mock-auth phase. |
| `src/lib/mock/users.ts` | Minor formatting fix (trailing comma).                                                                                                                             |
| `package.json`          | Added `@getbrevo/brevo ^5.0.4`, `@hookform/resolvers ^5.2.2`, `@supabase/supabase-js ^2.103.0`, `zod ^4.3.6`.                                                      |

### Deleted Files (cleanup commit)

The `feat: cleanUp` commit removed stale root-level documentation and the `/mockups/` directory that were generated during earlier planning sessions:

- `DESIGN_ASSESSMENT_*.md`, `DESIGN_SYSTEM.md`, `IMPLEMENTATION_COMPLETE_*.md`, `STRATEGY_FOR_10_SCORE.md`, `SUMMARY.md`, `RENOVATE-CONFIGURATION.md`
- `mockups/README.md` and all mockup `.tsx` files

---

## Database Setup Required

Before deploying, the following SQL must be executed in Supabase (SQL Editor or migration):

```sql
-- 1. Create the table
CREATE TABLE event_registrations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id            TEXT NOT NULL DEFAULT 'ashura-2026',
  vorname             VARCHAR(100) NOT NULL,
  nachname            VARCHAR(100) NOT NULL,
  email               VARCHAR(255) NOT NULL,
  anzahl_teilnehmer   INT NOT NULL CHECK (anzahl_teilnehmer >= 1),
  status              TEXT NOT NULL DEFAULT 'active'
                        CHECK (status IN ('active', 'cancelled')),
  checked_in          BOOLEAN NOT NULL DEFAULT false,
  cancellation_token  UUID NOT NULL DEFAULT gen_random_uuid(),
  token_expires_at    TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '15 days'),
  token_used          BOOLEAN NOT NULL DEFAULT false,
  created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Indexes
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_email ON event_registrations(email, event_id);
CREATE INDEX idx_event_registrations_token
  ON event_registrations(cancellation_token)
  WHERE token_used = false AND token_expires_at > NOW();
CREATE INDEX idx_event_registrations_status ON event_registrations(event_id, status);

-- 3. Row Level Security
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Public visitors can insert (no auth required)
CREATE POLICY "public_insert_registration"
  ON event_registrations FOR INSERT TO anon WITH CHECK (true);

-- No public SELECT or UPDATE — all reads/writes via API routes with service_role_key

-- 4. Atomic capacity check + insert RPC
CREATE OR REPLACE FUNCTION register_for_event(
  p_event_id TEXT,
  p_vorname TEXT,
  p_nachname TEXT,
  p_email TEXT,
  p_anzahl_teilnehmer INT,
  p_capacity INT
) RETURNS JSON AS $$
DECLARE
  current_total INT;
  new_reg event_registrations;
BEGIN
  -- Lock and sum active participants for this event
  SELECT COALESCE(SUM(anzahl_teilnehmer), 0)
  INTO current_total
  FROM event_registrations
  WHERE event_id = p_event_id AND status = 'active'
  FOR UPDATE;

  IF current_total + p_anzahl_teilnehmer > p_capacity THEN
    RAISE EXCEPTION 'CAPACITY_EXCEEDED';
  END IF;

  INSERT INTO event_registrations (event_id, vorname, nachname, email, anzahl_teilnehmer)
  VALUES (p_event_id, p_vorname, p_nachname, p_email, p_anzahl_teilnehmer)
  RETURNING * INTO new_reg;

  RETURN json_build_object('id', new_reg.id, 'cancellation_token', new_reg.cancellation_token);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Environment Variables Required

Add the following to `.env.local` (and to Vercel project settings for production):

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # server-only, never public
BREVO_API_KEY=<brevo-api-key>
NEXT_PUBLIC_SITE_URL=https://muslimin-ev.de    # used to build email links
EVENT_ASHURA_CAPACITY=250                       # optional override; default 250
```

---

## How to Test

### Prerequisites

```bash
npm install          # install new dependencies
npm run dev          # start dev server on localhost:3000
```

Make sure `.env.local` has all five variables above. For quick local testing without real Supabase/Brevo, see the mock-only path below.

---

### 1 — Public Registration Flow

1. Navigate to `http://localhost:3000/veranstaltungen/ashura`.
2. Verify the event details card shows date, location, and target group.
3. Verify the available-capacity counter updates correctly from the API.
4. Fill in the form — first name, last name, email, number of participants (1–20), and check the Datenschutz checkbox.
5. Submit — expect a success banner: "Vielen Dank für deine Anmeldung!".
6. Check the registered email inbox for the confirmation email (Brevo). It should include event date, location, participant count, and a management link.

**Edge cases to test:**

| Scenario                                                                | Expected result                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------- |
| Submit with empty fields                                                | Inline red validation errors below each field             |
| `anzahl_teilnehmer` = 0 or > 20                                         | Validation error                                          |
| Invalid email format                                                    | Validation error                                          |
| Datenschutz unchecked                                                   | Validation error                                          |
| Submit when event is at capacity (set `EVENT_ASHURA_CAPACITY=0` in env) | Error banner: "Leider sind alle Plätze bereits vergeben." |

---

### 2 — Self-Service Cancellation Flow

#### 2a — Request a cancellation link

1. Navigate to `http://localhost:3000/veranstaltungen/ashura/stornieren`.
2. Enter the email used when registering.
3. Submit — expect the neutral confirmation message regardless of whether the email exists.
4. If the email matches an active registration, check the inbox for the cancellation link email.

**Edge cases:**

| Scenario                  | Expected result                            |
| ------------------------- | ------------------------------------------ |
| Email not in the database | Same neutral message (no information leak) |
| Invalid email format      | Inline validation error                    |

#### 2b — Confirm cancellation / reduce count

1. Click the management link from the cancellation email (URL format: `/veranstaltungen/ashura/stornieren/confirm?token=<uuid>`).
2. Verify the page shows the registrant's name, email, and participant count.
3. **Full cancellation:** Click "Anmeldung vollständig stornieren" → expect success message.
4. **Reduce count:** Enter a new smaller participant count → click "Anzahl reduzieren" → expect success message.
5. Reload the admin dashboard and confirm the change is reflected.

**Edge cases:**

| Scenario                                                                           | Expected result                                                                  |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Access link after it was already used                                              | Error page: "Dieser Link ist nicht mehr gültig" with a link to request a new one |
| Access link after 15 days (simulate by manually updating `token_expires_at` in DB) | Same expired-link error page                                                     |
| No `?token` param in URL                                                           | Error: "Kein Stornierungslink angegeben."                                        |

---

### 3 — Admin Dashboard

#### 3a — Authentication guard

1. Log out (or use a private/incognito window).
2. Navigate to `http://localhost:3000/admin/ashura`.
3. Expect redirect to `/login?redirect=/admin/ashura`.
4. Log in with an admin account (e.g. `admin@muslimin-ev.de` in mock users).
5. Expect redirect back to `/admin/ashura`.

#### 3b — Dashboard content

1. Log in as admin and navigate to `/admin/ashura`.
2. Verify the stats bar shows correct totals (Total, Eingecheckt, Noch verfügbar, Kapazität).
3. Verify the registration table shows all registrations with columns: Name, E-Mail, Anz., Status, Check-in, Aktion.

#### 3c — Check-in toggle

1. Find an active registration in the table.
2. Click the check-in button (sun/checkmark icon).
3. Expect the UI to update immediately (optimistic update).
4. Reload page and confirm the `checked_in` state persisted.

#### 3d — Admin manual cancel

1. Find an active registration.
2. Click the cancel action button.
3. Confirm the dialog that appears.
4. Expect the row to turn greyed-out with status "Storniert".

#### 3e — Search / filter

1. Type a name or email fragment into the search input.
2. Expect the table to filter in real-time (no server round-trip).

---

### 4 — Capacity API

```bash
curl http://localhost:3000/api/events/ashura/capacity
# Expected: { "total_capacity": 250, "registered": <n>, "available": <m>, "is_full": false }
```

---

### 5 — Build & Lint

```bash
npm run lint         # must pass with 0 errors
npm run type-check   # must pass with 0 errors (if configured)
npm run build        # must complete successfully
```

---

### 6 — Mock-Only (no Supabase/Brevo)

If you don't have Supabase configured locally, the API routes will throw on the missing env vars. To smoke-test the UI only:

- The **public event page** still renders (it falls back gracefully when the capacity API fails).
- The **registration form** will receive a 500 and show the delayed-email message (the registration is considered saved).
- The **admin page** will throw at `getData()`. You can add a temporary try/catch or point to a Supabase project with the table created.

---

## Known Limitations / Future Work

- **Auth is mock-based** — the `mock-admin-session` cookie is set by the client-side auth hook. In production this should be replaced with a Supabase JWT role claim validated server-side.
- **No rate limiting** on the registration endpoint yet — should be added before going live (Vercel Edge or Upstash).
- **Event date is hardcoded** (`15. Juni 2026`) in both the page component and email templates. A config table or env var would make this reusable for future events.
- **No automated tests yet** for the new API routes and components — see the spec for the planned test matrix.
