# Projekt: Muslimin-Beratung Terminbuchungsplattform (MVP)

## Überblick

Eine webbasierte Terminbuchungsplattform für Vereinsmitglieder, die schnellen Zugang zu professioneller Beratung durch verifizierte Helferinnen ermöglicht. Die Plattform fokussiert sich auf Terminbuchung für verschiedene Anliegen wie psychologische Beratung, Sozialberatung, Schwangerschaftsbegleitung und weitere Unterstützungsangebote.

## Technologien & Architecture

### Core Stack

- Next.js 14+ (App Router, SSR/SSG)
- TypeScript (strict mode)
- Tailwind CSS
- React 18+ mit Hooks
- PostgreSQL über Supabase
- Supabase Auth + Row Level Security (RLS)

### Zusätzliche Tools

- React Hook Form + Zod (Validation)
- Brevo (E-Mail Service)
- Jitsi Meet (Online-Meetings)
- Vercel (Hosting & Deployment)

### PWA Features

- Service Worker für Offline-Funktionalität
- App Manifest für mobile Installation
- App-ähnliche Bedienung

## Rollen & Berechtigungen

### 1. Vereinsmitglied

- Kann Termine buchen (max. 3 Termine pro Person)
- Kann eigene Termine verwalten (bis 2 Tage vorher)
- Zugang zu Beratungsstellenlisten

### 2. Helferin

- Manuelle Freischaltung durch Administrator
- Verwaltet eigene Verfügbarkeiten
- Zugang nur zu Anfragen des eigenen Fachbereichs
- Erhält E-Mail-Benachrichtigungen bei Buchungen
- Kann Vorabinformationen zu Terminen einsehen

### 3. Administratorin

- Verifiziert Vereinsmitglieder
- Schaltet Helferinnen frei
- Verwaltet Fachbereiche
- Pflegt externe Beratungsstellenlisten

## Fachbereiche & Anliegen

### Unterstützte Anliegen-Typen:

- Psychologische Beratung
- Sozialberatung
- Schwangerschaftsbegleitung
- Weitere Anliegen (flexibel erweiterbar)

### Pflichtfelder bei Buchung:

- Anliegen-Typ
- Kurzbeschreibung des Anliegens
- Name, Vorname
- E-Mail-Adresse

## Terminlogik & Constraints

### Terminregeln

- Standardterminlänge: 45 Minuten
- Alle Zeiten in CEST (Mitteleuropäische Sommerzeit)
- Automatische Zuweisung zur nächsten verfügbaren Helferin
- Umbuchung/Stornierung bis 2 Tage vor Termin möglich
- Ausschließlich Video-Calls (Jitsi Meet)

### Limitierungen

- Maximal 3 Termine pro Person
- Zugang nur für verifizierte Vereinsmitglieder
- Nur deutsche Sprache

## DSGVO & Datenschutz

### Compliance-Anforderungen

- DSGVO-konforme Einwilligungen erfassen
- Datenminimierung - keine sensiblen Diagnosen speichern
- Alle Beratungsanfragen und Zugriffe protokollieren
- Automatische Löschung nach 6 Monaten
- Row Level Security (RLS) für Datentrennung
- EU-Server (Supabase)

### Sicherheit

- Rollenbasierte Zugriffskontrolle
- Sichere Sessions über Supabase Auth
- Verschlüsselte Datenübertragung

## Benachrichtigungen & Integration

### E-Mail-System (Brevo)

- Buchungsbestätigungen an Mitglied + Helferin
- .ics-Kalenderdateien anhängen
- Jitsi Meet Links bereitstellen
- Erinnerungen vor Terminen
- Keine Push-Notifications im MVP

### Online-Meetings

- Jitsi Meet für Video-Sprechstunden
- Automatische Link-Generierung
- Keine eigene Video-Chat-Integration

## User Experience Guidelines

### Navigation & Flow

- Maximal 3 Klicks bis zur Terminbuchung
- Streamlined Buchungsflow: Anliegen auswählen → erfassen → Terminwahl → Bestätigung
- Einfaches Dashboard nach Login
- PWA-optimierte mobile Bedienung

### UI-Prinzipien

- Deutsche UI-Texte durchgehend
- Responsive Design mit Tailwind
- Barrierefreie Bedienung
- Klare, intuitive Benutzerführung

## Code Style & Standards

### React/TypeScript

- Funktionale Komponenten mit Hooks
- TypeScript strict mode aktiviert
- Server Components wo möglich (Next.js App Router)
- Descriptive variable names (deutsch/englisch gemischt erlaubt)

### Styling & Components

- Tailwind CSS für alle Styles
- Custom Termin-Picker (CEST-konform)
- Responsive Listen-Views
- PWA-optimierte Komponenten

### Validation & Forms

- React Hook Form für Formulare
- Zod für Schema-Validierung
- Client + Server-side Validierung

## Performance Requirements

### Zielwerte

- Buchungsflow: < 2 Sekunden Ende-zu-Ende
- PWA-Installation: < 5 Sekunden Download
- Verfügbarkeit: ≥ 99.9% Uptime
- Real-time Updates: < 1 Sekunde Latenz

### Optimierung

- SSR für kritische Seiten
- Statische Generation wo möglich
- Globales CDN über Vercel
- Supabase Subscriptions für Live-Updates

## Nicht im MVP-Scope

- Community-Events oder Tee-Runden
- Chat-Funktionalität
- Komplexe Event-Kalender
- Push-Notifications
- Mehrsprachigkeit
- Native mobile Apps
- Komplexe Reporting-Dashboards
- Öffentliche Registrierung
- Externe Kalender-Synchronisation
