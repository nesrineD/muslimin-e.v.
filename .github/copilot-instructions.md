# GitHub Copilot Instructions - Muslimin e.V. Plattform

## Projekt-Überblick

Eine webbasierte PWA-Plattform für den Muslimin e.V., die Vereinsmitgliedern Zugang zu Informationen, Mitgliederkarten und Terminbuchungen mit verifizierten Helferinnen bietet.

**Projekttyp:** Full-Stack Web Application + PWA (MVP)  
**Hauptfunktionen:**

- Öffentliche Informationswebseite für Besucher
- Mitgliederbereich mit Mitgliederkarten (PLZ-Suche)
- Terminbuchungssystem für Beratungen
- PWA mit Offline-Funktionalität

**Zielgruppen:**

- Besucher (öffentlicher Bereich)
- Vereinsmitglieder (geschützter Bereich)
- Helferinnen (Beratungsangebote)
- Administratoren (Verwaltung)

**Farbpalette**

**Primary Colors (verbindlich)**

- Sage: #5B6960
- Charcoal: #2A2F32
- Clay/Coral: #9C604D
- Sand/Cream: #D4CBB8

**Secondary Colors (harmonisch)**

- Warm: warm-400, warm-500, warm-700 (Orange-Töne für passive Mitgliedschaft)
- Cream: cream-50, cream-300 (Creme-Töne für sanfte Akzente)

**Regeln**

- Genau **eine** dominante Action-Farbe nutzen (standardmäßig #1F6F5B) – besonders für „Mitglied werden“ & „Spenden“.
- #9C604D (Clay/Coral) und #C8A24A (Gold) nur als Akzent (max. ca. 5–10% der UI), nicht als Fließtext.

weitere Farben die zu dieser Palette passen:
können verwendet werden, solange sie harmonisch mit den Primärfarben wirken.

**Repo-Größe:** Mittelgroß (~50-100 Dateien)

## Tech Stack

**Frontend:** Next.js 14+ (App Router), React 18+, TypeScript (strict), Tailwind CSS  
**Backend:** Next.js API Routes, Supabase (PostgreSQL + Auth + RLS)  
**Integrationen:** Brevo (E-Mail), Jitsi Meet (Video)  
**Hosting:** Vercel  
**Forms:** React Hook Form + Zod

## Projekt-Architektur

```
/app                  # Next.js App Router (SSR/SSG)
  /(public)          # Öffentliche Seiten (Landing, About, Contact)
  /(auth)            # Auth-Flows (Login, Signup, Password Reset)
  /dashboard         # Mitglieder Dashboard
  /mitgliederkarten  # Mitgliederkarten mit PLZ-Suche
  /termine           # Terminbuchung & Verwaltung
  /helferinnen       # Helferinnen-Dashboard (Verfügbarkeiten)
  /admin             # Admin-Bereich (User-Verwaltung)
  /api               # API Routes
/components          # React Components
  /ui               # Reusable UI Components
  /public           # Public Website Components
  /members          # Member-specific Components
/lib                 # Utilities, DB Clients
  /supabase         # Supabase Client Setup
/public              # Static Assets, PWA Manifest, Service Worker
/types               # TypeScript Definitions
.env.local          # Environment Variables (nicht committen!)
next.config.js      # Next.js Config + Security Headers + PWA
middleware.ts       # Auth Middleware, Route Protection
```

**Wichtige Config-Dateien:**

- `next.config.js` - Security Headers, CSP, PWA Config
- `public/manifest.json` - PWA Manifest
- `public/sw.js` - Service Worker für Offline-Support
- `tailwind.config.ts` - Styling Configuration
- `tsconfig.json` - TypeScript strict mode
- `middleware.ts` - Auth Guards, Route Protection

## Build & Development Workflow

### Setup (einmalig)

```bash
npm install              # ALWAYS run after clone or dependency changes
```

**Voraussetzungen:**

- Node.js 18+ erforderlich
- npm 9+ empfohlen
- Supabase-Projekt mit konfigurierter DB

### Environment Variables

Erstelle `.env.local` mit:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...    # NUR für Server-Side, NIEMALS public!
BREVO_API_KEY=...
```

### Development

```bash
npm run dev              # Startet Dev Server auf localhost:3000
```

**Dauer:** ~5-10 Sekunden bis Server bereit  
**Hot Reload:** Automatisch aktiviert

### Build

```bash
npm run build            # ALWAYS run before deployment
```

**Dauer:** ~30-60 Sekunden  
**Output:** `.next/` Directory

**WICHTIG:** Build MUSS erfolgreich sein vor jedem Deployment. Vercel führt automatisch `npm run build` aus.

### Testing & Validation

```bash
npm run test             # Run all tests (Jest + React Testing Library)
npm run test:watch       # Watch mode for development
npm run test:coverage    # Generate coverage report
npm run lint             # ESLint Check - ALWAYS run before commit
npm run type-check       # TypeScript Validation (falls konfiguriert)
```

**Test Framework:**

- **Jest** für Unit/Integration Tests
- **React Testing Library** für Component Tests
- **MSW (Mock Service Worker)** für API Mocking
- Coverage Target: Min. 70% für kritische Flows

**Pre-Commit Checks:**

1. Tests erfolgreich (`npm run test`)
2. Lint errors beheben
3. TypeScript Errors beheben
4. Build erfolgreich
5. Manuelle Tests im Browser für UI-Änderungen

### Known Issues & Workarounds

**Problem:** Build-Fehler durch Type Errors  
**Lösung:** `npm run type-check` ausführen, alle Errors beheben vor Build

**Problem:** Supabase Connection Timeout in Dev  
**Lösung:** Environment Variables prüfen, Supabase-Projekt Status checken

**Problem:** Middleware redirect loops  
**Lösung:** Password-Reset-Flow prüfen, Session-State validieren

**Problem:** Test Failures bei Supabase Mocks  
**Lösung:** MSW Handler korrekt konfigurieren, Mock-Responses validieren

**Problem:** Flaky Tests bei Async Operations  
**Lösung:** `waitFor` oder `findBy` queries verwenden, nie `getBy` bei async data

## Rollen & Permissions (RLS)

**Besucher (Unauthenticated):**

- Zugriff auf öffentliche Webseite (Landing, About, Contact)
- Keine Authentifizierung erforderlich
- Kann Informationen über den Verein abrufen

**Vereinsmitglied (Authenticated):**

- Profile werden vom Admin angelegt (keine Self-Registration)
- Zugriff auf Mitgliederkarten mit PLZ-Suche
- Eigene Termine buchen/verwalten (max. 3 aktive Termine)
- Verfügbarkeitskalender der Helferinnen einsehen
- Beratungsstellenlisten ansehen

**Helferin (Authenticated + Role):**

- Manuelle Freischaltung durch Administrator
- Verwaltet eigene Verfügbarkeiten im Kalender
- Zugang nur zu Anfragen des eigenen Fachbereichs
- Erhält E-Mail-Benachrichtigungen bei Buchungen
- Kann Vorabinformationen zu Terminen einsehen

**Administratorin (Authenticated + Admin Role):**

- Legt Mitglieder-Profile an
- Verifiziert Vereinsmitglieder
- Schaltet Helferinnen frei
- Verwaltet Fachbereiche
- Pflegt externe Beratungsstellenlisten
- Verwaltet Mitgliederkarten-Datenbank

**RLS-Policies in Supabase:** Jede Rolle hat spezifische Row-Level-Security-Regeln. NIEMALS RLS umgehen, außer mit `service_role_key` für Admin-Operationen.

## Code Guidelines

### TypeScript

- Strict mode IMMER aktiv
- Explizite Return-Types für Funktionen
- Keine `any` Types - verwende `unknown` und Type Guards
- Descriptive Variable Names (deutsch/englisch gemischt erlaubt)

### React/Next.js

- **IMMER** Server Components nutzen (Standard in App Router)
- Client Components nur bei Interaktivität (`'use client'`)
- Hooks nur in Client Components
- API Routes für Backend-Logik mit Supabase

### Testing Strategy

**Test File Location:** Co-locate tests with components

```
/components
  /ui
    Button.tsx
    Button.test.tsx          # Component test
/app
  /api
    /bookings
      route.ts
      route.test.ts          # API route test
```

**Testing Pyramid:**

1. **Unit Tests (60%):** Pure functions, utilities, helpers
2. **Integration Tests (30%):** Component + hooks, API routes + DB
3. **E2E Tests (10%):** Critical user flows (optional für MVP)

**What to Test - ALWAYS:**

- **Public Website:** Landing page rendering, navigation, responsive design
- **Authentication Flows:** Login (Admin-created accounts only), Password Reset
- **Mitgliederkarten:** PLZ-Suche Funktionalität, Filter, Zugriffskontrolle
- **Booking Logic:** Termin creation, validation, limits (max 3)
- **Verfügbarkeitskalender:** Helferinnen-Kalender, Zeitslot-Validierung
- **Authorization:** RLS policies, role-based access (Besucher/Mitglied/Helferin/Admin)
- **Form Validation:** Client + Server-side validation
- **API Endpoints:** Success + Error cases, input validation
- **PWA Functionality:** Service Worker registration, offline capabilities
- **Critical Business Rules:** CEST timezone, 45min appointments, 2-day cancellation

**What to Test - OPTIONAL:**

- UI styling, CSS classes
- Third-party library behavior (Supabase, Brevo already tested)
- Simple presentational components ohne Logic

**Test Patterns:**

```typescript
// Component Test Example - Mitgliederkarten PLZ-Suche
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MitgliederkartenSearch from './MitgliederkartenSearch'

describe('MitgliederkartenSearch', () => {
  it('filters results by PLZ', async () => {
    render(<MitgliederkartenSearch />)

    const searchInput = screen.getByPlaceholderText(/plz eingeben/i)
    await userEvent.type(searchInput, '10115')

    await waitFor(() => {
      expect(screen.getByText(/beratungsstelle berlin/i)).toBeInTheDocument()
    })
  })

  it('shows empty state for no results', async () => {
    render(<MitgliederkartenSearch />)

    await userEvent.type(screen.getByPlaceholderText(/plz eingeben/i), '99999')

    expect(await screen.findByText(/keine ergebnisse/i)).toBeInTheDocument()
  })
})

// Booking Form Test
describe('BookingForm', () => {
  it('validates required fields', async () => {
    render(<BookingForm />)

    const submitButton = screen.getByRole('button', { name: /buchen/i })
    await userEvent.click(submitButton)

    expect(await screen.findByText(/email ist erforderlich/i)).toBeInTheDocument()
  })

  it('submits valid booking', async () => {
    const onSubmit = jest.fn()
    render(<BookingForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: /buchen/i }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
  })
})
```

```typescript
// API Route Test Example - Mitgliederkarten
import { GET } from "./route";
import { createMocks } from "node-mocks-http";

describe("GET /api/mitgliederkarten", () => {
  it("returns results for valid PLZ", async () => {
    const { req } = createMocks({
      method: "GET",
      query: { plz: "10115" },
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.results).toBeInstanceOf(Array);
  });

  it("requires authentication", async () => {
    const { req } = createMocks({
      method: "GET",
      headers: {}, // No auth token
    });

    const response = await GET(req);
    expect(response.status).toBe(401);
  });
});

// Booking API Test
describe("POST /api/bookings", () => {
  it("creates booking with valid data", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "test@example.com",
        anliegen: "Psychologische Beratung",
        // ...
      },
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.booking).toHaveProperty("id");
  });

  it("rejects invalid email", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { email: "invalid" },
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
```

**Mocking Guidelines:**

```typescript
// Supabase Mock (MSW)
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("https://*.supabase.co/rest/v1/bookings", (req, res, ctx) => {
    return res(ctx.json({ id: "123", ...req.body }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

**WICHTIG - Test Best Practices:**

- **IMMER** `cleanup` nach jedem Test (automatisch bei RTL)
- **NIEMALS** `waitFor` ohne Condition - führt zu flaky tests
- **IMMER** User-Perspektive testen (Accessibility queries bevorzugen: `getByRole`, `getByLabelText`)
- **NIEMALS** Implementation Details testen (interne state, CSS classes)
- Async queries: `findBy*` statt `getBy*` für asynchrone Daten
- **IMMER** Tests parallel-safe schreiben (keine shared state)

### Styling

- **NUR** Tailwind Utility Classes verwenden
- Keine Custom CSS (außer globals.css für Resets)
- Responsive: Mobile-First-Ansatz
- PWA-optimiert: Touch-Targets min. 44x44px

### Forms & Validation

```typescript
// Standard Pattern
const schema = z.object({
  email: z.string().email(),
  // ...
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

**IMMER:**

- Client-side Validation (React Hook Form + Zod)
- Server-side Validation (API Routes + Zod)
- Error Messages auf Deutsch

## Security Requirements

### KRITISCH - NIEMALS ignorieren:

1. **Input Validation:** ALLE User-Inputs server-side validieren
2. **Secrets:** NIEMALS API Keys im Code - nur in `.env.local`
3. **RLS:** Row Level Security IMMER aktiv, keine direkten DB-Queries ohne RLS
4. **XSS:** User-Generated Content IMMER escapen (React macht das automatisch)
5. **CSRF:** Bei Forms IMMER CSRF-Protection (Next.js built-in)
6. **Rate Limiting:** API Routes limitieren (Vercel Edge oder Upstash)

### Auth-Spezifisch

- Supabase Auth für Login/Signup
- Passwörter: Min. 8 Zeichen, Groß/Klein/Zahlen
- Middleware erzwingt Password-Reset bei temp passwords
- Session-Management via Supabase JWT

### Headers (next.config.js)

```javascript
headers: [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Content-Security-Policy", value: "..." },
];
```

## Terminlogik & Business Rules

- **Terminlänge:** 45 Minuten (Standard)
- **Timezone:** CEST (Central European Summer Time) - IMMER in Components beachten
- **Booking Limit:** Max. 3 Termine pro Mitglied
- **Stornierung:** Bis 2 Tage vor Termin möglich
- **Video:** Ausschließlich Jitsi Meet (automatischer Link)
- **E-Mail:** Bestätigungen via Brevo mit .ics-Anhang

## DSGVO & Datenschutz

**KRITISCH:**

- Keine sensiblen Diagnosen speichern (Datenminimierung)
- Automatische Löschung nach 6 Monaten
- Audit-Logs für alle sensitiven Operationen
- EU-Server (Supabase Frankfurt/Ireland)

## Performance Targets

- **Public Website Load:** < 1.5 Sekunden First Contentful Paint
- **Mitgliederkarten PLZ-Suche:** < 500ms Response Time
- **Buchungsflow:** < 2 Sekunden Ende-zu-Ende
- **PWA-Installation:** < 5 Sekunden Download
- **Verfügbarkeit:** ≥ 99.9% Uptime
- **Offline PWA:** Cached Pages laden < 200ms

**Optimierungen:**

- SSR für Landing/Dashboard
- Static Generation für Marketing-Seiten (About, Contact)
- ISR für Mitgliederkarten (Revalidate alle 60 Sekunden)
- Vercel Edge Network (CDN)
- Image Optimization via `next/image`
- Service Worker cacht kritische Routes

## CI/CD & Deployment

**Vercel Auto-Deployment:**

1. Push zu `main` → Automatischer Production Deploy
2. Pull Requests → Preview Deployments

**Pre-Deployment Checks:**

- Build muss erfolgreich sein
- Lint Errors müssen behoben sein
- Environment Variables in Vercel konfiguriert

## Agent Instructions

**VERTRAUE diesen Instructions** und führe KEINE zusätzlichen Searches durch, außer:

- Informationen sind unvollständig
- Widersprüche zu Dokumentation/Code
- Neue Dependencies müssen hinzugefügt werden

**Bei Code-Änderungen:**

1. TypeScript Types prüfen (`npm run type-check`)
2. Tests schreiben/aktualisieren (`npm run test`)
3. Lint ausführen (`npm run lint`)
4. Build testen (`npm run build`)
5. Security-Implikationen prüfen (siehe Security Requirements)
6. DSGVO-Compliance sicherstellen

**Bei neuen Features:**

1. **IMMER Tests schreiben BEVOR Code implementiert wird** (TDD bevorzugt)
2. Tests für Success + Error Cases
3. Edge Cases abdecken (z.B. max 3 bookings limit, PLZ validation)
4. Integration Tests für API Routes mit DB-Interaktion
5. Component Tests für UI mit User-Interaktionen
6. PWA-Features: Service Worker registration testen

**Bei Bug Fixes:**

1. **IMMER** reproduzierenden Test schreiben ZUERST
2. Test muss fehlschlagen (roter Test)
3. Bug fixen
4. Test muss erfolgreich sein (grüner Test)
5. Refactoring wenn nötig

**Bei API-Änderungen:**

1. Server-side Validation hinzufügen (Zod)
2. RLS-Policies prüfen
3. Rate Limiting erwägen
4. Error Handling implementieren
5. **API Tests schreiben:** Success (201/200), Validation Errors (400), Auth Errors (401), Permission Errors (403)
6. Authentication-Requirements testen (Public vs. Protected Routes)

**Test Coverage Requirements:**

- Neue Features: Min. 80% Coverage
- Bug Fixes: 100% Coverage der betroffenen Lines
- Kritische Flows (Auth, Bookings, Mitgliederkarten): Min. 90% Coverage
- PWA Service Worker: Min. 70% Coverage

**Debugging-Prioritäten:**

1. Test Failures beheben (NIEMALS Tests skippen)
2. TypeScript Errors beheben
3. Build Errors beheben
4. Runtime Errors im Browser prüfen
5. Supabase Logs checken (bei DB-Problemen)
