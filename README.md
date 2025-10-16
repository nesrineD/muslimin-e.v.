# Muslimin-Beratung - Terminbuchungsplattform (MVP)

> Eine datenschutzfreundliche Terminbuchungsplattform für Vereinsmitglieder mit Fokus auf professionelle Beratung durch verifizierte Helferinnen.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=flat-square&logo=tailwindcss)
![Google Maps](https://img.shields.io/badge/Google_Maps-API-4285F4?style=flat-square&logo=googlemaps)

## 📋 Überblick

Die Muslimin-Beratung Plattform ermöglicht es Vereinsmitgliedern, schnell und unkompliziert Termine für verschiedene Beratungsangebote zu buchen. Das System fokussiert sich auf **Datenschutz**, **Benutzerfreundlichkeit** und **professionelle Beratungsdienstleistungen**.

### 🎯 Kernfunktionen (Aktueller MVP-Stand)

- ✅ **Interaktive Mitgliederkarte** mit datenschutzkonformen PLZ-Kreisen
- ✅ **Google Maps Integration** mit datenschutzfreundlicher Darstellung
- ✅ **Responsive Design** mit warmer Farbpalette
- ✅ **Mock-Data System** für Demo und Entwicklung
- ⏳ **Magic Link Authentication** (in Entwicklung)
- ⏳ **Terminbuchungssystem** (geplant)
- ⏳ **E-Mail-Benachrichtigungen** (geplant)

## 🚀 Schnellstart

### Voraussetzungen

- Node.js 18+
- npm oder yarn
- Google Maps API Key (für Kartenfunktion)

### Installation

```bash
# Repository klonen
git clone https://github.com/nesrineD/muslimin.beratung.git
cd muslimin-beratung

# Dependencies installieren
npm install

# Environment Variables konfigurieren
cp .env.example .env.local
# Google Maps API Key eintragen:
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key-here

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar.

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

### Demo-Features testen

```javascript
// JavaScript Console - Demo-User wechseln
MemberLocationService.setDemoUser("helper@email.com");

// Verfügbare Demo-User anzeigen
console.log(MemberLocationService.getDemoUsers());

// Alle Mock-Mitglieder abrufen (Demo-Modus)
MemberLocationService.getMemberLocations().then(console.log);
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

- **Next.js 14+** - React Framework mit App Router
- **TypeScript 5+** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS Framework
- **React Hook Form + Zod** - Formular-Validierung

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

### Test-Struktur

```
__tests__/
├── components/           # Komponenten-Tests
├── services/            # Service-Layer Tests
├── lib/                 # Utility-Tests
└── integration/         # Integration Tests
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

## 📖 Entwicklung & Beiträge

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

**📍 Aktuelle Version**: MVP 0.1.0  
**🚀 Letztes Update**: Oktober 2025  
**💚 Status**: Aktive Entwicklung

> **Hinweis**: Dies ist ein MVP (Minimum Viable Product) für Stakeholder-Demos und Entwicklungszwecke. Für den Produktionseinsatz werden zusätzliche Sicherheits- und Compliance-Features implementiert.
