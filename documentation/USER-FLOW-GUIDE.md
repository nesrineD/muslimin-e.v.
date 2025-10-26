**Für**: Mitglieder **Überblick**: Alle Seiten auf einen Blick mit Navigationswegen

---

| Rolle                             |    E-Mail                   | Passwort  | Beschreibung                                                                    |
| ----------------------------------|-----------------------------| ----------| --------------------------------------------------------------------------------|
| **Mitglied - Zahra**              | `mitglied@email.com`        | `pwd`     | Nur als Mitglied aktiv - kann (Beratungs)Termine buchen                         |
| **Mitglied + Helferin-Sainab**    | `helper@email.com`          | `pwd`     | als Helferin/Mitglied aktiv - kann wechseln zwischen beiden                     |
| **Mitglied + Helferin- Fatima**   | `helpermitglied@email.com`  | `pwd`     | Duale Rolle - kann wechseln zwischen beiden                                     |
| **Zweites Mitglied - Amina**      | `mitglied2d@email.com`      | `pwd`     | Nur als Mitglied aktiv - kann Termine buchen und wenn gewünscht Helferin werden |

## **📱 Website-Sitemap: Alle Seiten auf einen Blick**

```
Startpunkt (https://muslimin-ev.vercel.app/)
│
├─ Nicht angemeldet? → `/about` (Über uns)
│  │
│  ├─ Footer Links:
│  │  ├─ `/datenschutz` (Datenschutz)
│  │  ├─ `/agb` (AGB)
│  │  ├─ `/impressum` (Impressum)
│  │  ├─ Als App installieren Guide `/pwa-guide`
│  │  └─ Social Media Links (fehlt)
│  │  └─ noch weitere Links ..
│  │
│  └─ LOGIN Button → `/login`
│
└─ Angemeldet? → `/dashboard` (oder `/` → Startseite)
   │
   ├─ REINE MITGLIEDER (z.B. mitglied@email.de)
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
   ├─  HELFERINNEN (z.B. helper@email.de)
   │  │
   │  ├─ `/helper/dashboard` (Helferin Dashboard)
   │  │  ├─ 📅 `/helper/availability` (Verfügbarkeiten)
   │  │  ├─ 👥 Offene Anfragen anzeigen
   │  │  ├─ 📊 Statistiken
   │  │  └─ 📋 Meine Termine → `/my-appointments`
   │  │
   │  └─ `/helper/availability` (Verfügbarkeits-Kalender)
   │
    --│─ 👤 "Als Mitglied" Button
      │  ├─ Zeigt: Member Dashboard
      │  └─ Optionen: Termin buchen, Mitglieder finden, etc.
      │  │
      │  🤝 "Als Helferin" Button
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

## **👥 User Journeys: Schritt-für-Schritt Ablauf**

### **🔐 Journey 1: Neues Mitglied - First Time Experience**

```
1. START: https://muslimin-ev.vercel.app/
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
   - Geb E-Mail ein: mitglied@email.com
   - Gib Passwort ein: pwd
   - Klick "Anmelden"
   ↓
6. SESSION ERSTELLT
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
    → Logout
    → Redirect zu `/about`  

```

---

### **🔄 Journey 2: Helferin**

```
1. LOGIN → helper@email.com / pwd  oder  helpermitglied@email.com  / pwd
   ↓
2. REDIRECT → `/helper/dashboard`
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

---

### **🆕 Journey 3: Neue Helferin registrieren**

```
1. LOGIN als Mitglied → mitglied@email.com
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
8. **(SPÄTER - ADMIN-PROCESS)**
   - Admin prüft Registrierung (noch nicht im UI)
   - Admin approves oder rejects
   - Helferin bekommt E-Mail
   - Profil wird aktualisiert

```

---

### **🌐 Journey 4: Unangemeldeter Nutzer - Content Discovery**

```
1. START: https://muslimin-ev.vercel.app/
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
   - Social Media Links:     → Klick öffnet externe Seite
   - Mitglied werden? Wird weitergeleitet um Formular auszufüllen
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
   ↓
5. LOGIN BUTTON (oben)
   → Klick auf "Login"
   → `/login` Seite

```

---

## **🎯 Feature-Übersicht: Was kann man wo machen?**

### **📍 Seite: Homepage / Dashboard (`/` und `/dashboard`)**

**Was sehen Sie**:

- Personalisierte Willkommensnachricht
- Quick-Action Karten
- Termine-Übersicht
- Statistiken

**Was können Sie tun**:

- [ ]  Termin buchen (→ `/book`)
- [ ]  Mitglieder finden (→ `/member-map`)
- [ ]  Beratungsstellen sehen (→ `/beratungsstellen`)
- [ ]  Helferin werden (→ `/helper/register`)
- [ ]  Profil bearbeiten (→ `/profile`)
- [ ]  Verfügbarkeiten verwalten (→ `/helper/availability`)
- [ ]  Abmelden (→ `/login`)

---

### **📋 Seite: Meine Termine (`/my-appointments`)**

**Was sehen Sie**:

- 3 Tabs: Alle, Als Mitglied, Als Helferin
- Terminus-Karten mit Details
- Anliegen, Helferin, Datum, Uhrzeit
- Jitsi-Link (Video)
- Aktionen-Menü

**Was können Sie tun**:

- [ ]  Nach Rolle filtern (3 Tabs)
- [ ]  Details eines Termins sehen
- [ ]  Termin verschieben (3-Punkt-Menü)
- [ ]  Termin stornieren (3-Punkt-Menü)
- [ ]  Video-Link öffnen

---

### **🗺️ Seite: Mitgliederkarte (`/member-map`)**

**Was sehen Sie**:

- Google Maps mit Zoom
- Braune Kreise für PLZ
- Mitglieder-Namen beim Hover
- Ausklappbare Liste

**Was können Sie tun**:

- [ ]  Zoom in/out
- [ ]  Über Kreis hovern → Namen sehen
- [ ]  Auf Kreis klicken → Liste erweitern
- [ ]  Mit Mitgliedern in Kontakt treten (geplant)

---

### **📞 Seite: Beratungsstellen (`/beratungsstellen`)**

**Was sehen Sie**:

- 20+ externe Beratungsstellen
- Kategorien-Filter
- Kontaktinfo (Tel, E-Mail, Website, Adresse)
- Öffnungszeiten & Sprachen

**Was können Sie tun**:

- [ ]  Durch Liste scrollén
- [ ]  Nach Kategorie filtern
- [ ]  Externe Website öffnen
- [ ]  Anrufen oder E-Mail schreiben

---

### **⏰ Seite: Verfügbarkeits-Kalender (`/helper/availability`)**

**Was sehen Sie**:

- 7-Tage × 16-Stunden Kalender
- Farbcodierte Slots
- Sticky Header & Time Labels
- Legend & Anweisungen

**Was können Sie tun**:

- [ ]  Auf grüne Slots klicken → Status ändern
- [ ]  Woche wechseln (← → Buttons)
- [ ]  Vertikal scrollen → alle Stunden sehen
- [ ]  Horizontal scrollen (auf Mobile) → alle Tage sehen

---

### **👤 Seite: Profil (`/profile`)**

**Was sehen Sie**:

- Avatar
- Bearbeitbare Felder: Name, E-Mail, PLZ, Spezialisierung
- Speichern-Button

**Was können Sie tun**:

- [ ]  Name ändern
- [ ]  E-Mail updaten
- [ ]  PLZ aktualisieren
- [ ]  Speichern
- [ ]  Zurück gehen (← Button)

---

### **📝 Seite: Helferin Registrierung (`/helper/register`)**

**Was sehen Sie**:

- Willkommenstext
- Kategorie-Checkboxes
- Textareas für Motivation & Qualifikationen
- Terms-Checkbox
- Senden-Button

**Was können Sie tun**:

- [ ]  Kategorien auswählen
- [ ]  Motivation eingeben
- [ ]  Qualifikationen beschreiben
- [ ]  Terms akzeptieren
- [ ]  Registrierung absenden

---

### **✅ Seite: Helferin Registrierungs-Erfolg (`/helper/register/success`)**

**Was sehen Sie**:

- Erfolgsbestätigung
- Nächste Schritte
- "Zurück zum Dashboard" Button

**Was können Sie tun**:

- [ ]  Nachricht lesen
- [ ]  Zurück zum Dashboard gehen

---

### **📅 Seite: Termin Buchen (`/book`) [WIP]**

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

## **🔒 Zugriffskontrolle: Wer kann was sehen?**

```
ÖFFENTLICH (ohne Login):
├─ /about
├─ /beratungsstellen (und weiter Footer Links wie APP Installation)
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

HELFERINNEN (sind auch Mitglieder):
├─ /helper/dashboard
├─ /helper/availability
└─ Helper-spezifische Funktionen
└─ Role Switcher

```

---

## **🎬 Navigation: Wie man sich bewegt**

### **Top Navigation (Header)**

```
[LOGO] ..................... [User Avatar ▼]
        ↓ Klick auf Avatar

[Profil bearbeiten] →  `/profile`
[Meine Termine] →      `/my-appointments` (nur Helferinnen)
[Einstellungen] →      `/profile`
[Abmelden] →           Logout → `/login`

```

### **Main Navigation (Buttons & Links)**

```
Auf Homepage / Dashboard:
- "Termin buchen" →           `/book`
- "Mitglieder finden" →       `/member-map`
- "Beratungsstellen" →        `/beratungsstellen`
- "Helferin werden" →         `/helper/register`
- "Verfügbarkeiten" →         `/helper/availability`

```

### **Footer Navigation (unten auf jeder Seite)**

```
Über uns → `/about`
Beratungsstellen → `/beratungsstellen` (öffentlich!)
Datenschutz → `/datenschutz`
AGB → `/agb`
Impressum → `/impressum`
Als App installierem -> `/pwa-guide`

```