# Muslimin-Beratung Terminbuchungsplattform# Muslimin-Beratung - Terminbuchungsplattform (MVP)

Eine webbasierte Terminbuchungsplattform für Vereinsmitglieder, die schnellen Zugang zu professioneller Beratung durch verifizierte Helferinnen ermöglicht.> Eine datenschutzfreundliche Terminbuchungsplattform für Vereinsmitglieder mit Fokus auf professionelle Beratung durch verifizierte Helferinnen.

## 🚀 Quick Start![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)

![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)

```bash![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=flat-square&logo=tailwindcss)

# Installation![Google Maps](https://img.shields.io/badge/Google_Maps-API-4285F4?style=flat-square&logo=googlemaps)

npm install

## 📋 Überblick

# Entwicklung starten

npm run devDie Muslimin-Beratung Plattform ermöglicht es Vereinsmitgliedern, schnell und unkompliziert Termine für verschiedene Beratungsangebote zu buchen. Das System fokussiert sich auf **Datenschutz**, **Benutzerfreundlichkeit** und **professionelle Beratungsdienstleistungen**.



# Tests ausführen### ✨ Features

npm run test

### ✅ Implementiert (MVP 0.2.0)

# Build für Production

npm run build**Benutzeroberfläche & Design**

```

- ✅ Responsive Homepage mit rollenbasierter Feature-Anzeige

Die App ist dann verfügbar unter: `http://localhost:3000`- ✅ Sage-Gradient Design System (Header, Footer, Buttons)

- ✅ Optimierte Verfügbarkeits-Kalender mit 16-h-Slots (6:00-21:00 CEST)

## 📚 Dokumentation- ✅ Vergrößerte, bessere positionierte Logo-Navigation (h-16)

- ✅ "Salam"-Grußsystem für kulturelle Authentizität

Alle Dokumentation befindet sich im Ordner `documentation/`:

**Benutzer & Authentifizierung**

- **[ENTWICKLER-LEITFADEN.md](./documentation/ENTWICKLER-LEITFADEN.md)** - Technische Setup & Architektur

- **[TESTING-STRATEGY.md](./documentation/TESTING-STRATEGY.md)** - Testing-Strategie & Test-Coverage- ✅ Mock-Authentifizierung mit 4 Test-Nutzern

- **[USER-FLOW-GUIDE.md](./documentation/USER-FLOW-GUIDE.md)** - User Journeys & Flows- ✅ Vereinsmitglieder-Verwaltung (Mock-Daten)

- **[VALIDATION-CHECK.md](./documentation/VALIDATION-CHECK.md)** - Daten-Validierung- ✅ Rollenbasierte Zugriffskontrolle (Member, Helper, Member+Helper, Admin)

- **[STAKEHOLDER-TESTING-GUIDE.md](./documentation/STAKEHOLDER-TESTING-GUIDE.md)** - Stakeholder-Testing

- **[CALENDAR-ENHANCEMENT-COMPLETE.md](./documentation/CALENDAR-ENHANCEMENT-COMPLETE.md)** - Calendar-Komponente**Funktionen**

- **[TASK-STATUS-UND-OFFENE-FRAGEN.md](./documentation/TASK-STATUS-UND-OFFENE-FRAGEN.md)** - Projekt-Status

- **[DOCUMENTATION-OVERVIEW.md](./documentation/DOCUMENTATION-OVERVIEW.md)** - Dokumentations-Überblick- ✅ Interaktive Mitgliederkarte mit PLZ-Datenschutz

- ✅ Helper-Verfügbarkeits-Management mit verbessertem UI

## 🏗️ Projekt-Struktur- ⏳ Helper-Registrierung und Verifizierung

- ⏳ Terminbuchungssystem

````- ⏳ E-Mail-Benachrichtigungen (Brevo Integration)

src/- ⏳ Jitsi Meet Integration

├── app/                    # Next.js App Router

│   ├── (auth)/            # Login, Registration### 📱 PWA Features

│   ├── (legal)/           # Impressum, Datenschutz

│   ├── (member)/          # Member Dashboard- Service Worker für Offline-Funktionalität

│   ├── helper/            # Helper Routes- App-Installation auf mobilen Geräten

│   └── ...- Push-Benachrichtigungen

├── components/            # React Components

│   ├── calendar/          # Calendar Komponenten## 🎨 Design System

│   ├── layout/            # Layout Komponenten

│   ├── ui/                # UI Components (shadcn/ui)### Farbpalette

│   └── ...

├── hooks/                 # Custom React Hooks```

├── lib/                   # Utilities & HelperSage (Primary):

├── services/              # Business Logic- sage-50: #f8faf7

├── types/                 # TypeScript Types- sage-100: #eff1ed

└── providers/             # Context Providers- sage-700: #0d6f52

```- sage-800: #0a4f38



## 🛠️ Tech StackCream (Secondary): #f5ede5

Warm: #c98c61

- **Frontend**: Next.js 14+, React 18+, TypeScriptCoral (Accent): #f57c5c

- **Styling**: Tailwind CSS```

- **UI Components**: shadcn/ui

- **Database**: PostgreSQL (Supabase)### Komponenten-Updates

- **Auth**: Supabase Auth

- **Email**: Brevo**Header & Navigation**

- **Video**: Jitsi Meet

- **Hosting**: Vercel- Logo-Größe: `h-16` (desktop), `h-14` (mobile)

- Background: Sage-Gradient (`from-sage-50 to-sage-100/50` normal, intensiver beim Scrollen)

## 🔐 Authentifizierung- Container-Höhe: `h-20` für bessere Proportion



Die App verwendet **Magic Link Authentication** mit Supabase:**Kalender (/helper/availability)**



1. User gibt E-Mail ein- Slot-Größe: `min-h-[60px]` (7.5x größer als vorher)

2. Magic Link kommt per E-Mail- Scrollbares Layout: `maxHeight: 700px` für 16-h Ansicht

3. Link öffnet App mit automatischem Login- Sticky Header & Time Labels für bessere Navigation

4. Session wird in localStorage gespeichert- Größere, lesbarere Zeitanzeige

- Farbcodierte Verfügbarkeitsstatus

## 📋 Rollen & Berechtigungen

**Footer**

### Member

- Termin buchen (max. 3)- Background: Sage-Gradient upward (`from-sage-100/30 to-sage-50/50`)

- Eigene Termine verwalten- Border: `border-sage-200` (matching Header)

- Termin stornieren (bis 2 Tage vor)

## 🎯 MVP-Status

### Helper

- Verfügbarkeiten verwalten**Aktueller Stand**: Frontend mit optimierter UI und verbessertem Kalender ist implementiert, Mock-Authentifizierung funktioniert.

- Termine in Fachbereich einsehen

- Vorabinformationen abrufen- 📊 Features: 40% implementiert

- 🗄️ Backend: 0% (geplant mit Supabase)

### Admin- 📱 Mobile: 90% (Responsive Design, PWA-ready)

- Helferinnen verifizieren

- Kategorien verwalten## 🚀 Schnellstart

- Beratungsstellen pflegen

### Voraussetzungen

## 📱 Features

- Node.js 18+

- ✅ Responsive Design (Mobile & Desktop)- npm oder yarn

- ✅ PWA-Installation auf Smartphone- Google Maps API Key (für Kartenfunktion)

- ✅ Offline-Funktionalität

- ✅ Terminverwaltung mit Kalender### Installation

- ✅ E-Mail-Benachrichtigungen

- ✅ Video-Call Integration (Jitsi)```bash

- ✅ DSGVO-konform# Repository klonen

- ✅ Barrierefreie Bedienunggit clone https://github.com/nesrineD/muslimin.beratung.git

cd muslimin-beratung

## 🧪 Testing

# Dependencies installieren

```bashnpm install

# Unit Tests

npm run test# Environment Variables konfigurieren

cp .env.example .env.local

# Watch Mode# Google Maps API Key eintragen:

npm run test:watch# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key-here



# Coverage Report# Entwicklungsserver starten

npm run test:coveragenpm run dev

````

# E2E Tests (Playwright)

npm run test:e2eDie Anwendung ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar.

````

## 📚 Dokumentation für Stakeholder

Siehe [TESTING-STRATEGY.md](./documentation/TESTING-STRATEGY.md) für Details.

Für nicht-technische Nutzer & Stakeholder haben wir umfassende Dokumentationen erstellt:

## 🐛 Development

### 🎯 [DOCUMENTATION-OVERVIEW.md](./DOCUMENTATION-OVERVIEW.md) ← **START HIER!**

### Projekt-Setup

1. Clone Repository**Quick Guide** zu allen Dokumentationen + Testing-Tipps:

2. `npm install`

3. Konfiguriere `.env.local` (siehe `.env.example`)- 📊 Überblick aller Dokumente & wofür sie sind

4. `npm run dev`- 🚀 Quick-Start: Welche Dokumentation für welches Szenario?

- 👥 Die 4 Test-Accounts erklärt

### Code-Style- ✅ Top-10 Testing-Checkliste

- **TypeScript**: Strict Mode aktiviert- 💡 Tipps & Tricks für effektives Testen

- **Linting**: ESLint

- **Formatting**: Prettier### 🧪 [STAKEHOLDER-TESTING-GUIDE.md](./STAKEHOLDER-TESTING-GUIDE.md)

- **Components**: Funktionale Komponenten mit Hooks

**Kompletter Testleitfaden** für alle implementierten Funktionen:

### Git Workflow

```bash- ✅ Alle 17 Seiten erklärt

# Feature Branch erstellen- ✅ 4 Test-Accounts mit konkreten Use Cases

git checkout -b feature/deine-feature- ✅ Schritt-für-Schritt Anleitungen zum Testen

- ✅ Checkliste für alle Features

# Commits schreiben- ✅ Glossar der wichtigsten Begriffe

git commit -m "feat: kurze Beschreibung"

### 🗺️ [USER-FLOW-GUIDE.md](./USER-FLOW-GUIDE.md)

# Push & Pull Request

git push origin feature/deine-feature**Visueller Überblick** aller User Journeys & Navigationen:

````

- ✅ Komplette Website-Sitemap (alle 17 Seiten)

## 📞 Support- ✅ 5 Komplette User Journeys (von Login bis Terminbuchung)

- ✅ Feature-Übersicht nach Seite

Siehe [ENTWICKLER-LEITFADEN.md](./documentation/ENTWICKLER-LEITFADEN.md) für technische Fragen.- ✅ Navigation & Seitenstruktur

## 📄 Lizenz### ✅ [VALIDATION-CHECK.md](./VALIDATION-CHECK.md)

Dieses Projekt ist Teil der Muslimin-Beratung Initiative.**Validierungsdokumentation**: Code ↔ Dokumentation Konsistenz:

---- ✅ Alle Seiten & Features gemappt auf Quellcode

- ✅ Test-Accounts validiert

**Version**: MVP 0.1.0 - ✅ Performance-Metriken

**Last Updated**: Oktober 2025 - ✅ Browser-Kompatibilität

**Status**: In Entwicklung 🚧

## 🧪 Demo & Test-Accounts

### Haupt-Test-User (aus flow.md)

| E-Mail                     | Name               | Rolle             | PLZ             | Passwort |
| -------------------------- | ------------------ | ----------------- | --------------- | -------- |
| `mitglied@email.com`       | Zahra Ahmed        | Mitglied          | 10115 (Berlin)  | `pwd`    |
| `helper@email.com`         | Sainab Hassan      | Helferin          | 20095 (Hamburg) | `pwd`    |
| `helpermitglied@email.com` | Fatima El-Mansouri | Mitglied+Helferin | 80331 (München) | `pwd`    |

### Weitere Mock-User für Karten-Demo

Die Anwendung enthält **20 zusätzliche Mock-Mitglieder** verteilt über ganze Deutschland:

- **Berlin (10115)**: Zahra A., Amira M.
- **Hamburg (20095)**: Sainab H., Yasmin K.
- **München (80331)**: Fatima E., Layla N.
- **Düsseldorf (40210)**: Khadija B.
- **Köln (50667)**: Leila Ö.
- **Frankfurt (60311)**: Mariam A.
- **Stuttgart (70173)**: Nour A.
- **Nürnberg (90402)**: Safiya M.
- **Weitere Städte**: Hannover, Dresden, Essen, Bremen, Bonn, Erfurt, Karlsruhe

### Demo Features

```bash
# Kalender-UI testen (Helper)
# 1. Login mit Helper-Account: sainab@helper.de (PW: test123)
# 2. Navigiere zu: http://localhost:3000/helper/availability
# 3. Test: Klicke auf Zeitslots um Verfügbarkeit zu setzen

# Mitgliederkarte testen
# 1. Login mit Member-Account: zahra@mitglied.de (PW: test123)
# 2. Navigiere zu: http://localhost:3000/member-map
# 3. Feature: Hover über Kreise für Mitglieder-Details

# Console Test
console.log("Helper Verfügbarkeit gespeichert", localStorage.getItem("helper-availability"))
```

### Kalender-Interface (neu in MVP 0.2.0)

Das Helper-Verfügbarkeits-Kalender wurde komplett überarbeitet:

**Verbesserungen:**

- 📏 Größere Zeitslots: `min-h-[60px]` (7.5x größer für bessere Klickbarkeit)
- 🔀 Scrollbares Layout: Alle 16 Stunden (6:00-21:00 CEST) sichtbar
- 📌 Sticky Header: Wochentage bleiben beim Scrollen sichtbar
- 🎨 Farbcodierung: Verfügbar (grün), Gebucht (grau), Nicht verfügbar (weiß)
- 📱 Responsive: Funktioniert auf mobilen Geräten

**Zugriff:**

```
Helper Login → Dashboard → "Verfügbarkeiten verwalten"
oder direkt: http://localhost:3000/helper/availability
```

## 🗺️ Interaktive Mitgliederkarte

### Datenschutz-Features

- **PLZ-Kreise statt exakter Standorte** - Schutz der Privatsphäre
- **Warme Braun-Töne** (#9c604d) - Passend zur Markenidentität
- **Dynamische Kreisgröße** - Basierend auf Mitgliederanzahl (600-1200m)
- **Hover-Effekte** - Interaktive Benutzerführung
- **Aufklappliste** - Alle sichtbaren Mitglieder auf einen Blick

### Zugriff auf die Karte

```bash
# Direkter Link zur Mitgliederkarte
http://localhost:3000/member-map
```

### Technische Details

- **Google Maps JavaScript API** mit Custom Overlays
- **PLZ-zu-Koordinaten Mapping** für deutsche Postleitzahlen
- **Responsive Design** für mobile und Desktop-Nutzung
- **TypeScript Interfaces** für Type-Safety

## 📦 Projektstruktur

```
muslimin-beratung/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── member-map/         # Mitgliederkarte Seite
│   │   ├── login/              # Authentifizierung
│   │   └── dashboard/          # Benutzer-Dashboard
│   ├── components/
│   │   ├── map/                # Karten-Komponenten
│   │   │   ├── GoogleMap.tsx   # Google Maps Integration
│   │   │   ├── PLZCircleMarker.tsx # Datenschutz-Kreise
│   │   │   └── MemberLocationMap.tsx # Haupt-Container
│   │   ├── auth/               # Authentifizierungs-UI
│   │   └── ui/                 # Wiederverwendbare UI-Komponenten
│   ├── lib/
│   │   ├── mock/               # Mock-Data für Development
│   │   └── utils/              # Utility-Funktionen
│   ├── services/               # API Services & Business Logic
│   ├── hooks/                  # Custom React Hooks
│   └── types/                  # TypeScript Definitionen
├── specs/                      # .specify Framework Dokumentation
├── tasks/                      # Development Tasks & Planung
├── mockups/                    # UI/UX Mockups
└── __tests__/                  # Test Suites
```

## 🛠️ Technologie-Stack

### Frontend

- **Next.js 14.2.33+** - React Framework mit App Router
- **TypeScript 5+** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS Framework mit Custom Color Palette
- **React Hook Form + Zod** - Formular-Validierung
- **Framer Motion** - Animationen & Übergänge (hover, scroll, entrance effects)
- **Lucide React** - Icon Library (Calendar, Clock, HeartHandshake, etc.)

### Maps & Location

- **Google Maps JavaScript API** - Interaktive Karten
- **Custom PLZ-Koordinaten Mapping** - Deutsche Postleitzahlen
- **Datenschutz-optimierte Marker** - PLZ-Bereiche statt Adressen

### Backend (geplant)

- **Supabase** - PostgreSQL Database + Auth
- **Magic Link Authentication** - Passwortlose Anmeldung
- **Row Level Security (RLS)** - Datenschutz auf DB-Ebene
- **Brevo (Sendinblue)** - E-Mail Versand

### Deployment

- **Vercel** - Hosting & CI/CD
- **GitHub** - Versionskontrolle
- **Environment Variables** - Sichere Konfiguration

## 🚀 Deployment

### Option A: Demo-Deployment (Aktueller Stand)

```bash
# Build testen
npm run build

# Vercel Deployment
npx vercel

# Environment Variables in Vercel Dashboard setzen:
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
```

### Option B: Produktions-Deployment (Nach Backend-Implementation)

```bash
# 1. Supabase Projekt erstellen
npx supabase init
npx supabase start

# 2. Environment Variables erweitern
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
BREVO_API_KEY=your-brevo-key

# 3. Datenbank-Schema deployen
npx supabase db push

# 4. Produktions-Build
npm run build
vercel --prod
```

## 🔐 Supabase Setup (Zukünftig)

### 1. Supabase Projekt erstellen

```bash
# Supabase CLI installieren
npm install -g @supabase/cli

# Neues Projekt initialisieren
npx supabase init

# Lokale Entwicklung starten
npx supabase start
```

### 2. Datenbank-Schema

```sql
-- users table (Supabase Auth)
-- Automatisch erstellt durch Supabase Auth

-- profiles table für erweiterte Mitgliederdaten
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  postal_code TEXT,
  location_visible BOOLEAN DEFAULT true,
  role TEXT CHECK (role IN ('member', 'helper', 'member+helper', 'admin')) DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view visible member locations" ON profiles
  FOR SELECT USING (
    auth.role() = 'authenticated'
    AND location_visible = true
    AND id != auth.uid()
  );

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 3. Magic Link Authentication

```typescript
// Beispiel für Magic Link Implementation
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Magic Link versenden
const { error } = await supabase.auth.signInWithOtp({
  email: "member@example.com",
  options: {
    emailRedirectTo: "https://muslimin-beratung.de/auth/callback",
  },
});
```

## 🧪 Testing

### Unit Tests

```bash
# Tests ausführen
npm test

# Tests mit Coverage
npm run test:coverage

# Watch Mode für Development
npm run test:watch
```

### E2E Tests (Playwright) ✨ NEU

```bash
# Alle E2E Tests ausführen
npm run test:e2e

# UI Mode (empfohlen für Development)
npm run test:e2e:ui

# Debug Mode
npm run test:e2e:debug

# Test Report anzeigen
npm run test:e2e:report
```

**Vollständige E2E Test-Suite implementiert:**
- ✅ Member Journey (Buchungsflow)
- ✅ Helper Journey (Verfügbarkeiten, Termine)
- ✅ Authentication & Authorization
- ✅ Public Pages & UI/UX
- ✅ Responsive Design Testing
- ✅ PWA & Accessibility Tests

Siehe [E2E-TESTING-COMPLETE.md](./documentation/E2E-TESTING-COMPLETE.md) und [TESTING-STRATEGY.md](./documentation/TESTING-STRATEGY.md) für Details.

### Test-Struktur

```
__tests__/
├── components/           # Komponenten-Tests
├── services/            # Service-Layer Tests
├── lib/                 # Utility-Tests
└── integration/         # Integration Tests

e2e/                     # E2E Tests mit Playwright ✨
├── member-journey.spec.ts
├── helper-journey.spec.ts
├── authentication.spec.ts
├── public-pages.spec.ts
└── README.md
```

### Mock-Data Testing

```javascript
// Service-Tests mit Mock-Data
import { MockMemberLocationService } from "@/lib/mock/member-locations";

// Current User setzen
MockMemberLocationService.setCurrentUser("user-zahra-001");

// Mitglieder abrufen (exkludiert current user)
const response = await MockMemberLocationService.getMemberLocations();
console.log(response.data.members); // Alle außer Zahra
```

## � Dokumentation für Stakeholder

Für nicht-technische Nutzer & Stakeholder haben wir umfassende Dokumentationen erstellt:

### 🧪 [STAKEHOLDER-TESTING-GUIDE.md](./STAKEHOLDER-TESTING-GUIDE.md)

**Kompletter Testleitfaden** für alle implementierten Funktionen:

- ✅ Alle 17 Seiten erklärt (mit Screenshots-Beschreibungen)
- ✅ 4 Test-Accounts mit konkreten Use Cases
- ✅ Schritt-für-Schritt Anleitungen zum Testen
- ✅ Checkliste für alle Features
- ✅ Glossar der wichtigsten Begriffe

**Start hier**: `STAKEHOLDER-TESTING-GUIDE.md` – perfekt für Vorstandsmitglieder & Tester

### 🗺️ [USER-FLOW-GUIDE.md](./USER-FLOW-GUIDE.md)

**Visueller Überblick** aller User Journeys & Navigationen:

- ✅ Komplette Website-Sitemap (alle 17 Seiten)
- ✅ 5 Komplette User Journeys (von Login bis Terminbuchung)
- ✅ Feature-Übersicht nach Seite
- ✅ Navigation & Seitenstruktur
- ✅ Responsive Design Breakpoints

### ✅ [VALIDATION-CHECK.md](./VALIDATION-CHECK.md)

**Validierungsdokumentation**: Code ↔ Dokumentation Konsistenz:

- ✅ Alle Seiten & Features gemappt auf Quellcode
- ✅ Test-Accounts validiert
- ✅ Performance-Metriken
- ✅ Browser-Kompatibilität
- ✅ Bekannte Limitierungen transparent

---

## �📖 Entwicklung & Beiträge

### Development Workflow

```bash
# Feature Branch erstellen
git checkout -b feature/TASK-001-magic-link-auth

# Changes committen
git add .
git commit -m "Implement magic link authentication system"

# Push und Pull Request
git push origin feature/TASK-001-magic-link-auth
```

### .specify Framework

Das Projekt nutzt das [.specify Framework](https://specify.so) für strukturierte Entwicklung:

- **Specs**: Detaillierte Feature-Spezifikationen in `/specs/`
- **Tasks**: Entwicklungsaufgaben in `/tasks/`
- **Contracts**: API und Komponenten-Kontrakte
- **Mockups**: UI/UX Designs in `/mockups/`

### Code Style

- **TypeScript Strict Mode** - Maximale Type-Safety
- **ESLint + Prettier** - Konsistente Code-Formatierung
- **Funktionale Komponenten** - React Hooks Pattern
- **Descriptive Naming** - Deutsch/Englisch gemischt erlaubt

### Dependency Management

Das Projekt nutzt **Renovate** für automatische Dependency-Updates:

- 🤖 **Automatische PRs** - Renovate erstellt Pull Requests für veraltete Dependencies
- 📅 **Zeitplan** - Updates werden montags vor 6:00 Uhr CEST eingereicht
- 🔄 **Gruppierte Updates** - Zusammenhängende Pakete (z.B. React, Radix UI) werden gruppiert
- ✅ **Automerge** - Minor und Patch Updates werden automatisch gemerged (außer v0.x)
- 🔐 **Security Alerts** - Sicherheitslücken werden mit "security" Label markiert
- 📦 **Lock File Maintenance** - Monatliche Aktualisierung der package-lock.json

**Konfiguration**: Siehe `renovate.json` für Details

## 🔒 Sicherheit & Datenschutz

### DSGVO-Compliance

- ✅ **Datenminimierung** - Nur notwendige Daten sammeln
- ✅ **PLZ-Level Precision** - Keine exakten Adressen
- ✅ **Einwilligungsbasiert** - Explizite Location-Sharing Zustimmung
- ✅ **Löschfristen** - Automatische Bereinigung nach 6 Monaten
- ✅ **Row Level Security** - Datentrennung auf DB-Ebene

### Environment Variables

```bash
# .env.local (NICHT in Git!)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
BREVO_API_KEY=your-brevo-key
```

## 📈 Roadmap

### Phase 1: Foundation (✅ Abgeschlossen)

- ✅ Next.js Setup mit TypeScript
- ✅ Tailwind CSS Integration
- ✅ Interaktive Mitgliederkarte
- ✅ Mock-Data System
- ✅ Google Maps Integration

### Phase 2: Authentication (🔄 In Arbeit)

- 🔄 Magic Link System (TASK-000A-C)
- 🔄 Supabase Backend Setup (TASK-001)
- 🔄 User Profile Management (TASK-004)

### Phase 3: Booking System (📋 Geplant)

- 📋 Terminbuchungslogik (TASK-007-010)
- 📋 E-Mail Benachrichtigungen (TASK-011)
- 📋 Jitsi Meet Integration (TASK-012)

### Phase 4: Production (🎯 Ziel)

- 🎯 Security Hardening (TASK-017-018)
- 🎯 Performance Optimization
- 🎯 Admin Dashboard (TASK-019-022)

## 🤝 Support & Community

### Kontakt

- **Projekt Repository**: [GitHub](https://github.com/nesrineD/muslimin.beratung)
- **Issues & Bugs**: [GitHub Issues](https://github.com/nesrineD/muslimin.beratung/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/nesrineD/muslimin.beratung/discussions)

### Lizenz

Dieses Projekt ist für den privaten Gebrauch durch den Muslimin-Beratung e.V. bestimmt. Alle Rechte vorbehalten.

---

**📍 Aktuelle Version**: MVP 0.2.0  
**🚀 Letztes Update**: Januar 2025  
**💚 Status**: Aktive Entwicklung

### 📝 Änderungen in Version 0.2.0

- ✅ **Kalender-UI komplett überarbeitet**: Größere Slots (min-h-[60px]), scrollbares Layout, sticky Header
- ✅ **Design System konsistent**: Sage-Gradient Header & Footer, unified Farbpalette
- ✅ **Grußsystem auf "Salam" aktualisiert**: Alle Grußmeldungen sind jetzt kulturell authentisch
- ✅ **Logo vergrößert und besser positioniert**: h-16 (desktop), h-14 (mobile), verbesserte Animationen
- ✅ **Framer Motion Integration**: Smooth Übergänge und Animationen durchgehend

> **Hinweis**: Dies ist ein MVP (Minimum Viable Product) für Stakeholder-Demos und Entwicklungszwecke. Für den Produktionseinsatz werden zusätzliche Sicherheits- und Compliance-Features implementiert.
