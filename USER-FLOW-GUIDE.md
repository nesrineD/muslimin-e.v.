# 🗺️ Muslimin-Beratung Plattform: User Flow & Seitenstruktur

**Für**: Stakeholder & Entscheidungsträger  
**Überblick**: Alle Seiten auf einen Blick mit Navigationswegen

---

## 📱 Website-Sitemap: Alle Seiten auf einen Blick

```
Startpunkt (https://localhost:3000)
│
├─ Nicht angemeldet? → `/about` (Über uns)
│  │
│  ├─ Footer Links:
│  │  ├─ `/datenschutz` (Datenschutz)
│  │  ├─ `/agb` (AGB)
│  │  ├─ `/impressum` (Impressum)
│  │  ├─ `/beratungsstellen` (Beratungsstellen - ÖFFENTLICH)
│  │  └─ Social Media Links
│  │
│  └─ LOGIN Button → `/login`
│
└─ Angemeldet? → `/dashboard` (oder `/` → Startseite)
   │
   ├─ REINE MITGLIEDER (z.B. zahra@mitglied.de)
   │  │
   │  ├─ Homepage `/` + Dashboard `/dashboard`
   │  │  ├─ ✏️ Profil bearbeiten → `/profile`
   │  │  ├─ 📅 Termin buchen → `/book`
   │  │  ├─ 🗺️ Mitglieder finden → `/member-map`
   │  │  ├─ 📞 Beratungsstellen → `/beratungsstellen`
   │  │  ├─ 🎯 Helferin werden → `/helper/register`
   │  │  └─ 📋 Meine Termine → `/my-appointments`
   │  │
   │  ├─ `/book` (Termin buchen - WIP)
   │  ├─ `/member-map` (Mitgliederkarte)
   │  ├─ `/profile` (Profil bearbeiten)
   │  └─ `/my-appointments` (Alle Termine)
   │
   ├─ REINE HELFERINNEN (z.B. sainab@helper.de)
   │  │
   │  ├─ `/helper/dashboard` (Helferin Dashboard)
   │  │  ├─ 📅 `/helper/availability` (Verfügbarkeiten)
   │  │  ├─ 👥 Offene Anfragen anzeigen
   │  │  ├─ 📊 Statistiken
   │  │  └─ 📋 Meine Termine → `/my-appointments`
   │  │
   │  └─ `/helper/availability` (Verfügbarkeits-Kalender)
   │
   └─ DUAL-ROLLEN (z.B. fatima@helpermitglied.de)
      │
      ├─ `/dashboard` mit Role-Switcher Buttons
      │  │
      │  ├─ 👤 "Als Mitglied" Button
      │  │  ├─ Zeigt: Member Dashboard
      │  │  └─ Optionen: Termin buchen, Mitglieder finden, etc.
      │  │
      │  └─ 🤝 "Als Helferin" Button
      │     ├─ Zeigt: Helferin Dashboard
      │     └─ Optionen: Verfügbarkeiten, Anfragen, etc.
      │
      ├─ `/helper/dashboard` (Helferin-Sicht)
      ├─ `/helper/availability` (Verfügbarkeits-Kalender)
      ├─ `/book` (Termin buchen)
      ├─ `/member-map` (Mitgliederkarte)
      ├─ `/profile` (Profil)
      └─ `/my-appointments` (Alle Termine - beide Rollen)
```

---

## 👥 User Journeys: Schritt-für-Schritt Ablauf

### 🔐 Journey 1: Neues Mitglied - First Time Experience

```
1. START: https://localhost:3000
   ↓
2. REDIRECT (nicht angemeldet) → `/about` (Über uns)
   ↓
3. ENTDECKUNG (auf `/about`)
   - Liest über den Verein
   - Sieht Footer-Links
   - Findet "Login" Button
   ↓
4. LOGIN KLICK → `/login`
   ↓
5. AUTHENTIFIZIERUNG (auf `/login`)
   - Geb E-Mail ein: zahra@mitglied.de
   - Gib Passwort ein: test123
   - Klick "Anmelden"
   ↓
6. SESSION ERSTELLT
   - localStorage.setItem('currentUser', {...})
   ↓
7. REDIRECT → `/dashboard`
   ↓
8. WILLKOMMEN SEITE (Dashboard)
   - "Salam Zahra! 👋"
   - Sehe Quick-Action Cards:
     📅 Termin buchen
     🗺️ Mitglieder finden
     📞 Beratungsstellen
     🎯 Helferin werden
   ↓
9. OPTIONEN (wähle einen Weg):
   a) WEG A: Termin buchen
      → Klick "Termin buchen" → `/book`

   b) WEG B: Andere Mitglieder kennenlernen
      → Klick "Mitglieder finden" → `/member-map`

   c) WEG C: Externe Hilfe finden
      → Klick "Beratungsstellen" → `/beratungsstellen`

   d) WEG D: Selbst Helferin werden
      → Klick "Helferin werden" → `/helper/register`
   ↓
10. PROFIL ERGÄNZEN (optional)
    → Klick Avatar (oben rechts) → Dropdown
    → Wähle "Profil"
    → Bearbeite Details → Speichern
    ↓
11. SITZUNG BEENDEN (optional)
    → Avatar → "Abmelden"
    → Logout: localStorage.removeItem('currentUser')
    → Redirect zu `/login`
```

**Dauer**: 5-10 Minuten

---

### 🤝 Journey 2: Helferin - Verfügbarkeiten einstellen

```
1. START: LOGIN PAGE `/login`
   ↓
2. AUTHENTIFIZIERUNG
   - E-Mail: sainab@helper.de
   - Passwort: test123
   ↓
3. REDIRECT → `/helper/dashboard` (automatisch für Helferinnen!)
   ↓
4. HELFERIN DASHBOARD
   - "Salam Sainab! 👋"
   - Verfügbarkeits-Kalender sichtbar
   - Statistiken: 12 verfügbare Stunden, 3 offene Anfragen
   ↓
5. VERFÜGBARKEITS-KALENDER (vor Ort)
   - 7 Tage (Mo-So)
   - 16 Stunden (6:00-21:00 CEST)
   - Farbcodierung:
     🟢 Grün = verfügbar (klickbar)
     🔘 Grau = gebucht
     ⚪ Weiß = nicht verfügbar
   ↓
6. SLOT STATUS ÄNDERN (klick auf Slot)
   - Grün → Klick → wechsel zu grau (gebucht) oder weiß (nicht verfügbar)
   - Änderung wird automatisch gespeichert (localStorage)
   ↓
7. WOCHE NAVIGATION
   - Klick "← Vorherige Woche"
   - oder
   - Klick "Nächste Woche →"
   ↓
8. VERFÜGBARKEITEN ÜBERPRÜFEN
   - Scrolle Kalender vertikal → alle 16h visible
   - Scrolle Kalender horizontal → sticky time labels
   ↓
9. OFFENE ANFRAGEN BEARBEITEN
   - Sehe Liste der Anfragen von Mitgliedern
   - Akzeptieren oder Ablehnen
   ↓
10. SITZUNG BEENDEN
    → Avatar → "Abmelden"
```

**Dauer**: 10-15 Minuten

---

### 🔄 Journey 3: Dual-Rolle - Zwischen Rollen wechseln

```
1. LOGIN → fatima@helpermitglied.de / test123
   ↓
2. REDIRECT → `/dashboard` (nicht auto zu `/helper/dashboard`)
   ↓
3. DASHBOARD MIT ROLE SWITCHER
   - Sehe 2 Buttons oben:
     "👤 Als Mitglied" (default selected)
     "🤝 Als Helferin"
   ↓
4. MEMBER-SICHT (aktiv)
   - Sehe Member Dashboard
   - Meine Termine: 2 Einträge
   - Quick Actions: Termin buchen, Mitglieder finden, etc.
   ↓
5. WECHSEL ZU HELFERIN-SICHT
   - Klick "🤝 Als Helferin" Button
   - Animation: Dashboard scrollt & aktualisiert
   ↓
6. HELFERIN-SICHT (aktiv)
   - Sehe Helferin Dashboard
   - Verfügbarkeits-Kalender
   - Offene Anfragen: 3 Einträge
   - Statistiken wechseln zu Helferin-Metriken
   ↓
7. ARBEITE ALS HELFERIN
   - Verwalte Verfügbarkeiten
   - Sehe Anfragen von Mitgliedern
   ↓
8. WECHSEL ZURÜCK ZU MITGLIED
   - Klick "👤 Als Mitglied" Button
   - Dashboard wechselt sofort zurück
   ↓
9. ALLE TERMINE ANSEHEN
   - Klick auf "Meine Termine" oder `/my-appointments`
   - Sehe 3 Tabs:
     "Alle" → alle 5 Termine gemischt
     "Als Mitglied" → 2 Termine (Ratsuchende)
     "Als Helferin" → 3 Termine (Beraterin)
   ↓
10. SITZUNG BEENDEN
    → Avatar → "Abmelden"
```

**Dauer**: 15-20 Minuten (um beide Rollen zu testen)

---

### 🆕 Journey 4: Neue Helferin registrieren

```
1. LOGIN als Mitglied → zahra@mitglied.de
   ↓
2. DASHBOARD `/dashboard`
   - Sehe Karte: "🤝 Helferin werden"
   - Klick auf Karte
   ↓
3. REDIRECT → `/helper/register`
   ↓
4. REGISTRIERUNGS-FORMULAR
   a) Wähle Kategorien (Checkboxes):
      ☑️ Psychologische Beratung
      ☑️ Sozialberatung
      ☑️ Schwangerschaftsbegleitung

   b) Motivation (Textarea):
      "Ich möchte Frauen unterstützen..."

   c) Qualifikationen (Textarea):
      "Ich bin ausgebildete Psychologin..."

   d) Terms (Checkbox):
      ☑️ Ich akzeptiere die Bedingungen
   ↓
5. SENDE REGISTRIERUNG
   - Klick "Registrierung absenden"
   ↓
6. LADE-SEITE
   - Spinner Animation
   - Text: "Überprüfung der Anmeldung..."
   - Dauer: ~2 Sekunden
   ↓
7. ERFOLGS-SEITE → `/helper/register/success`
   - ✅ "Deine Registrierung wurde erhalten!"
   - Nachricht: "Admin prüft deine Berechtigung..."
   - Info: "Wir senden dir eine E-Mail..."
   - Button: "Zurück zum Dashboard"
   ↓
8. (SPÄTER - ADMIN-PROCESS)
   - Admin prüft Registrierung (noch nicht im UI)
   - Admin approves oder rejects
   - Helferin bekommt E-Mail
   - Profil wird aktualisiert
```

**Dauer**: 5 Minuten (Registrierung selbst)

---

### 🌐 Journey 5: Unangemeldeter Nutzer - Content Discovery

```
1. START: https://localhost:3000
   ↓
2. REDIRECT → `/about`
   (Da nicht angemeldet, Automatische Umleitung)
   ↓
3. ABOUT-SEITE
   - Hero: "Über Muslimin e.V."
   - Info: "Ein Frauen muslimischer Verein..."
   - 3 Value-Cards:
     👥 Unsere Gemeinschaft
     ❤️ Von Frauen für Frauen
     🤲 Unterstützung & Solidarität
   - Social Media Links
   ↓
4. EXPLORE FOOTER LINKS

   a) BERATUNGSSTELLEN (öffentlich!)
      → Klick "Beratungsstellen" im Footer
      → `/beratungsstellen`
      → Sehe 20+ externe Beratungsstellen
      → Filter nach Kategorie
      → Lese Kontaktinfo & Öffnungszeiten

   b) DATENSCHUTZ
      → `/datenschutz`
      → DSGVO-Dokumentation

   c) AGB
      → `/agb`
      → Nutzungsbedingungen

   d) IMPRESSUM
      → `/impressum`
      → Adresse & Kontakt des Vereins

   e) SOCIAL MEDIA
      → Instagram, Facebook, YouTube Icons
      → Klick öffnet externe Seite
   ↓
5. LOGIN BUTTON (oben)
   → Klick auf "Login"
   → `/login` Seite
   ↓
6. ENTSCHEIDUNG
   - Hat die Person Interessse?
   - Ja → Registrierung oder Login
   - Nein → Kann jederzeit zurückkommen
```

**Dauer**: 10-15 Minuten (Exploration)

---

## 🎯 Feature-Übersicht: Was kann man wo machen?

### 📍 Seite: Homepage / Dashboard (`/` und `/dashboard`)

**Was sehen Sie**:

- Personalisierte Willkommensnachricht
- Quick-Action Karten
- Termine-Übersicht
- Statistiken

**Was können Sie tun**:

- [ ] Termin buchen (→ `/book`)
- [ ] Mitglieder finden (→ `/member-map`)
- [ ] Beratungsstellen sehen (→ `/beratungsstellen`)
- [ ] Helferin werden (→ `/helper/register`)
- [ ] Profil bearbeiten (→ `/profile`)
- [ ] Verfügbarkeiten verwalten (→ `/helper/availability`)
- [ ] Abmelden (→ `/login`)

---

### 📋 Seite: Meine Termine (`/my-appointments`)

**Was sehen Sie**:

- 3 Tabs: Alle, Als Mitglied, Als Helferin
- Terminus-Karten mit Details
- Anliegen, Helferin, Datum, Uhrzeit
- Jitsi-Link
- Aktionen-Menü

**Was können Sie tun**:

- [ ] Nach Rolle filtern (3 Tabs)
- [ ] Details eines Termins sehen
- [ ] Termin verschieben (3-Punkt-Menü)
- [ ] Termin stornieren (3-Punkt-Menü)
- [ ] Video-Link öffnen

---

### 🗺️ Seite: Mitgliederkarte (`/member-map`)

**Was sehen Sie**:

- Google Maps mit Zoom
- Braune Kreise für PLZ
- Mitglieder-Namen beim Hover
- Ausklappbare Liste

**Was können Sie tun**:

- [ ] Zoom in/out
- [ ] Über Kreis hovern → Namen sehen
- [ ] Auf Kreis klicken → Liste erweitern
- [ ] Mit Mitgliedern in Kontakt treten (geplant)

---

### 📞 Seite: Beratungsstellen (`/beratungsstellen`)

**Was sehen Sie**:

- 20+ externe Beratungsstellen
- Kategorien-Filter
- Kontaktinfo (Tel, E-Mail, Website, Adresse)
- Öffnungszeiten & Sprachen

**Was können Sie tun**:

- [ ] Durch Liste scrollén
- [ ] Nach Kategorie filtern
- [ ] Externe Website öffnen
- [ ] Anrufen oder E-Mail schreiben

---

### ⏰ Seite: Verfügbarkeits-Kalender (`/helper/availability`)

**Was sehen Sie**:

- 7-Tage × 16-Stunden Kalender
- Farbcodierte Slots
- Sticky Header & Time Labels
- Legend & Anweisungen

**Was können Sie tun**:

- [ ] Auf grüne Slots klicken → Status ändern
- [ ] Woche wechseln (← → Buttons)
- [ ] Vertikal scrollen → alle Stunden sehen
- [ ] Horizontal scrollen (auf Mobile) → alle Tage sehen

---

### 👤 Seite: Profil (`/profile`)

**Was sehen Sie**:

- Avatar
- Bearbeitbare Felder: Name, E-Mail, PLZ, Spezialisierung
- Speichern-Button

**Was können Sie tun**:

- [ ] Name ändern
- [ ] E-Mail updaten
- [ ] PLZ aktualisieren
- [ ] Speichern
- [ ] Zurück gehen (← Button)

---

### 📝 Seite: Helferin Registrierung (`/helper/register`)

**Was sehen Sie**:

- Willkommenstext
- Kategorie-Checkboxes
- Textareas für Motivation & Qualifikationen
- Terms-Checkbox
- Senden-Button

**Was können Sie tun**:

- [ ] Kategorien auswählen
- [ ] Motivation eingeben
- [ ] Qualifikationen beschreiben
- [ ] Terms akzeptieren
- [ ] Registrierung absenden

---

### ✅ Seite: Helferin Registrierungs-Erfolg (`/helper/register/success`)

**Was sehen Sie**:

- Erfolgsbestätigung
- Nächste Schritte
- "Zurück zum Dashboard" Button

**Was können Sie tun**:

- [ ] Nachricht lesen
- [ ] Zurück zum Dashboard gehen

---

### 📅 Seite: Termin Buchen (`/book`) [WIP]

**Status**: Noch nicht vollständig implementiert

**Geplanter Flow**:

1. Anliegen wählen
2. Beschreibung eingeben
3. Termin wählen
4. Bestätigung

**Was aktuell möglich ist**:

- Formular-Struktur sehen

**Was noch kommt**:

- ⏳ Vollständige Buchungslogik
- ⏳ Verfügbarkeitsprüfung
- ⏳ E-Mail-Benachrichtigungen

---

## 🔒 Zugriffskontrolle: Wer kann was sehen?

```
ÖFFENTLICH (ohne Login):
├─ /about
├─ /beratungsstellen
├─ /datenschutz
├─ /agb
├─ /impressum
├─ /login
└─ Footer-Navigation

NUR ANGEMELDETE:
├─ /dashboard
├─ /
├─ /profile
├─ /my-appointments
├─ /member-map
├─ /book
└─ /helper/register

NUR HELFERINNEN:
├─ /helper/dashboard
├─ /helper/availability
└─ Helper-spezifische Funktionen

DUAL-ROLLEN NUTZER:
└─ Alle der oben (mit Role Switcher)
```

---

## 🎬 Navigation: Wie man sich bewegt

### Top Navigation (Header)

```
[LOGO] ..................... [User Avatar ▼]
        ↓ Klick auf Avatar

[Profil bearbeiten] →  `/profile`
[Meine Termine] →      `/my-appointments` (nur Helferinnen)
[Einstellungen] →      `/profile`
[Abmelden] →           Logout → `/login`
```

### Main Navigation (Buttons & Links)

```
Auf Homepage / Dashboard:
- "Termin buchen" →           `/book`
- "Mitglieder finden" →       `/member-map`
- "Beratungsstellen" →        `/beratungsstellen`
- "Helferin werden" →         `/helper/register`
- "Verfügbarkeiten" →         `/helper/availability`
```

### Footer Navigation (unten auf jeder Seite)

```
Über uns → `/about`
Beratungsstellen → `/beratungsstellen` (öffentlich!)
Datenschutz → `/datenschutz`
AGB → `/agb`
Impressum → `/impressum`
Social Media → externe Links
```

---

## 📊 Daten-Modell: Was wird wo gespeichert?

### Mock-Nutzer (Test-Accounts)

```
zahra@mitglied.de
├─ Role: "member"
├─ Name: Zahra Ahmed
├─ PLZ: 10115 (Berlin)
└─ is_helper: false

sainab@helper.de
├─ Role: "helper"
├─ Name: Sainab Hassan
├─ PLZ: 20095 (Hamburg)
├─ is_helper: true
└─ categories: ["Psychologische Beratung", ...]

fatima@helpermitglied.de
├─ Role: "member+helper"
├─ Name: Fatima El-Mansouri
├─ PLZ: 80331 (München)
├─ is_helper: true
└─ categories: ["Sozialberatung", ...]

amina@mitglied.de
├─ Role: "member"
├─ Name: Amina Khan
├─ PLZ: 10115 (Berlin)
└─ is_helper: false
```

### Mock-Termine (2-3 pro Nutzer)

```
{
  id: 1,
  type: "Psychologische Beratung",
  date: "2025-10-25",
  time: "14:00",
  helper: "Sainab Hassan",
  status: "upcoming",
  jitsi_link: "https://meet.jitsi.si/MuslimBeratungTeam123"
}
```

### Verfügbarkeiten (für Helferinnen)

```
{
  helper_id: "sainab-001",
  week: "2025-10-20",
  slots: {
    "Monday": ["09:00", "09:45", "10:30", ...],
    "Tuesday": ["14:00", "14:45", ...],
    ...
  },
  booked_slots: ["Monday-09:00", "Wednesday-15:00"]
}
```

---

## 🔐 Authentifizierung: Wie funktioniert das?

```
1. USER GIBTS CREDENTIALS EIN
   ↓
2. SIGN IN FUNCTION
   signIn(email, password) in useAuth Hook
   ↓
3. VALIDATION
   Email & Password gegen Mock-Accounts geprüft
   ↓
4. SUCCESS?
   Ja → Speichern in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        id: 'user-zahra-001',
        email: 'zahra@mitglied.de',
        vorname: 'Zahra',
        is_helper: false,
        ...
      }))
   ↓
5. REDIRECT
   → `/dashboard`
   ↓
6. LOGOUT
   localStorage.removeItem('currentUser')
   → `/login`
```

**Wichtig**: Das ist nur Mock-Auth für Testing!  
**In Produktion**: Wird Supabase Auth verwendet (Magic Link)

---

## 💾 Persistierung: Wo werden Daten gespeichert?

### Browser localStorage (aktuell - MVP 0.2.0)

```
currentUser: JSON.stringify(user object)
helper-availability: JSON.stringify(slots)
theme: "light" / "dark" (geplant)
```

**Problem**: Daten gehen verloren nach Browser-Refresh!  
**Lösung**: In Phase 2 werden echte Datenbanken verwendet

---

## 🎨 Layout-Struktur: Wie sieht eine Seite aus?

```
┌─────────────────────────────────────────────────┐
│  HEADER (h-20)                                  │
│  [LOGO] ..................... [AVATAR ▼]        │
├─────────────────────────────────────────────────┤
│  MAIN CONTENT (min-h-screen)                    │
│  ┌────────────────────────────────────────┐    │
│  │ Seitentitel & Beschreibung              │    │
│  ├────────────────────────────────────────┤    │
│  │ Hauptinhalt                            │    │
│  │ - Cards, Formulare, Listen, etc.       │    │
│  │ - Responsive: 1 Spalte → 2 → 3 spalten│    │
│  └────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ FOOTER (h-auto, bg-gradient-to-t sage gradient) │
│  Links | Kontakt | Rechtliches | Social Media  │
└─────────────────────────────────────────────────┘
```

---

## ⚡ Performance-Anforderungen

| Seite                  | Ladezeit | Status                   |
| ---------------------- | -------- | ------------------------ |
| `/`                    | < 1s     | ✅ Erfüllt               |
| `/dashboard`           | < 1s     | ✅ Erfüllt               |
| `/helper/availability` | < 2s     | ✅ Erfüllt               |
| `/member-map`          | < 2s     | ✅ Erfüllt (Google Maps) |
| `/beratungsstellen`    | < 1.5s   | ✅ Erfüllt               |
| `/my-appointments`     | < 1s     | ✅ Erfüllt               |

---

## 📱 Responsive Design: Wie sieht es auf Handy aus?

```
DESKTOP (> 1024px)          TABLET (640-1024px)      MOBILE (< 640px)
┌──────────────────┐        ┌────────────────┐        ┌──────────┐
│ Logo | Menu | Avatar       │ Logo | Menu | Avatar    │☰ | Logo │
├──────────────────┤        ├────────────────┤        │  Avatar ▼│
│ 2-3 Column Grid  │   →    │ 2 Column Grid  │   →   ├──────────┤
│ Large Cards      │        │ Medium Cards   │       │1 Column  │
│ Wide Buttons     │        │ Normal Buttons │       │Small Cards
│                  │        │                │       │Stacked   │
└──────────────────┘        └────────────────┘        └──────────┘
```

**Mobile Kalender**:

```
DESKTOP                    MOBILE
┌──────────────────┐      ┌────────┐
│Mo|Tu|We|Th|...|Su│      │Mo      │
├──────────────────┤      ├────────┤
│  09:00 |        │  →   │ 09:00 │
│  09:45 |        │      │ 09:45 │
│  ...              │      │ ...    │
│                  │      │ [→]    │
└──────────────────┘      └────────┘
  Horizontal scrollbar
```

---

**Ready to test? Let's go! 🚀**

---

_Letzte Aktualisierung: Oktober 2025_
