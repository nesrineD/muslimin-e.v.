# 🧪 Muslimin-Beratung Plattform: Testing Guide

**Version**: MVP 0.2.0  
**Zielgruppe**: Vorstandsmitglieder, Tester  
**Letztes Update**: Oktober 2025

---

## 📌 Schnellstart: Die Plattform in 5 Minuten verstehen

Diese Dokumentation führt Sie durch die gesamte Benutzeroberfläche und zeigt, was die Plattform aktuell bietet. Sie können alle Funktionen selbst testen, indem Sie die Test-Accounts nutzen.

### Was ist die Muslimin-Beratung Plattform?

Eine webbasierte Terminbuchungsplattform, die Vereinsmitgliedern ermöglicht:

- ✅ **Termine zu buchen** für psychologische Beratung, Sozialberatung und Schwangerschaftsbegleitung
- ✅ **Verfügbare Beraterinnen zu sehen** und Termine zu vereinbaren
- ✅ **Mitglieder zu vernetzen** über eine interaktive Karte mit Datenschutz
- ✅ **Als Helferin zu registrieren** und Verfügbarkeiten zu verwalten

---

## 🔐 Test-Accounts: Ihre Testpersonen

Nutzen Sie diese Accounts, um die Plattform zu testen. Alle Accounts haben das Passwort `test123`.

### Haupt-Testaccounts mit verschiedenen Rollen

| Rolle                   | E-Mail                     | Passwort  | Beschreibung                                       |
| ----------------------- | -------------------------- | --------- | -------------------------------------------------- |
| **Mitglied**            | `zahra@mitglied.de`        | `test123` | Nur als Mitglied aktiv - kann Termine buchen       |
| **Helferin**            | `sainab@helper.de`         | `test123` | Nur als Helferin aktiv - verwaltet Verfügbarkeiten |
| **Mitglied + Helferin** | `fatima@helpermitglied.de` | `test123` | Duale Rolle - kann wechseln zwischen beiden        |
| **Zweites Mitglied**    | `amina@mitglied.de`        | `test123` | Zusätzliches Mitglied für Kartenfunktion           |

**Besonderheit**: Der Account `fatima@helpermitglied.de` kann zwischen Rollen wechseln und ist perfekt zum Testen beider Seiten der Plattform!

---

## 🗺️ Seiten-Übersicht: Alle Reiter erklärt

### 1. **Homepage** (`/`)

**Für**: Angemeldete Nutzer  
**Was sehen Sie**: Personalisierte Startseite mit „Salam, [Name]!"

**Komponenten**:

- 👤 **Benutzer-Avatar** oben rechts mit Name
- 🎯 **Rollenabhängige Feature-Karten**:
  - Für **Mitglieder**:
    - 📅 Termin buchen
    - 🗺️ Mitglieder finden (interaktive Karte)
    - 📍 Externe Beratungsstellen
  - Für **Helferinnen**:
    - ⏰ Verfügbarkeiten verwalten
    - 📊 Meine Termine anzeigen

**Teste diesen Flow**:

1. ✅ Login mit `zahra@mitglied.de`
2. ✅ Sehe Sie das Grußwort "Salam Zahra!" oben?
3. ✅ Klick auf "Termin buchen" - führt zu Buchungsformular

---

### 2. **Login-Seite** (`/login`)

**Für**: Nicht angemeldete Nutzer  
**Was Sie tun können**:

**Login-Formular**:

- 📧 E-Mail-Eingabe
- 🔑 Passwort-Eingabe (mit Show/Hide-Button)
- ✅ "Angemeldet bleiben"-Checkbox
- 🔘 Login-Button

**Besonderheiten**:

- ⚠️ **Fehlerbehandlung**: Falsche Credentials zeigen rote Fehlermeldung
- ✅ **Erfolgreiche Anmeldung**: Automatische Weiterleitung zu `/dashboard`
- 📍 **Redirect-Parameter**: Nach Logout wird man zur Login-Seite zurückgebracht

**Teste diesen Flow**:

1. ✅ Rufe `/login` auf
2. ✅ Gib falsche Anmeldedaten ein → fehler sehen?
3. ✅ Login mit `fatima@helpermitglied.de` / `test123`
4. ✅ Du solltest automatisch zu Dashboard weitergeleitet werden

---

### 3. **Dashboard** (`/dashboard`)

**Für**: Angemeldete Mitglieder  
**Status**: Hauptseite nach dem Login

#### 3a. Dashboard für reine Mitglieder

**Sichtbar**: Nur für `zahra@mitglied.de` und `amina@mitglied.de`

**Inhalte**:

- 👤 **Profil-Section**: Name, E-Mail, PLZ mit Bearbeitungsbutton
- 📋 **Meine Termine**: Liste aller gebuchten Termine
  - Status: Kommend, Vorbei
  - Details: Anliegen, Helferin, Zeitpunkt
  - Aktionen: Verschieben, Stornieren (bis 2 Tage vorher möglich)
- 📊 **Statistiken**:
  - Gebuchte Termine: `2/3`
  - Nächster Termin: Datum und Uhrzeit
- 🎯 **Quick Actions** Buttons:
  - 📅 Termin buchen
  - 🗺️ Mitglieder finden
  - 📞 Beratungsstellen

**Teste diesen Flow**:

1. ✅ Login mit `zahra@mitglied.de`
2. ✅ Dashboard-Seite öffnet automatisch
3. ✅ Klick auf "Meine Termine" → Sehe 2 Termine (Mock-Daten)
4. ✅ Klick auf "Termin buchen" → Geht zu `/book`
5. ✅ Klick auf "Mitglieder finden" → Geht zu `/member-map`

#### 3b. Dashboard für Helferinnen + Mitglieder

**Sichtbar**: Nur für `fatima@helpermitglied.de`

**Spezialfeature**: 🔄 **Role Switcher Buttons**

- 👤 "Als Mitglied" Button
- 🤝 "Als Helferin" Button

Je nachdem, welche Rolle du klickst, siehst du:

**Als Mitglied** (oben gezeigt):

- Member Dashboard Content

**Als Helferin**:

- ⏰ Verfügbarkeits-Kalender (siehe 3c unten)
- 📊 Helferin-Statistiken
- 👥 Offene Anfragen

**Teste diesen Flow**:

1. ✅ Login mit `fatima@helpermitglied.de`
2. ✅ Du siehst Role Switcher Buttons
3. ✅ Klick "Als Helferin" → Seitenwechsel mit Animation
4. ✅ Klick "Als Mitglied" → Zurück zu Member View

#### 3c. Dashboard für reine Helferinnen

**Sichtbar**: Nur für `sainab@helper.de`

**Seitenlayout**:

- 👤 **Helferin-Profil**: Name, Spezialisierung, E-Mail
- 📊 **Statistiken-Cards**:
  - Verfügbare Stunden diese Woche
  - Offene Anfragen
  - Insgesamt geholfen (z.B. 23)
- 📅 **Verfügbarkeits-Kalender** (16h Ansicht, 6:00-21:00 CEST)
  - Größere Slots (min-h-[60px])
  - Sticky Header für Wochentage
  - Scrollbar für alle 16 Stunden
  - Farbcodierung: Grün (verfügbar), Grau (gebucht), Weiß (nicht verfügbar)
- 📋 **Meine Termine**: Anfragen von Mitgliedern
  - Mitglieder-Details
  - Anliegen-Beschreibung
  - Akzeptieren/Ablehnen Buttons

**Teste diesen Flow**:

1. ✅ Login mit `sainab@helper.de`
2. ✅ Du siehst Helferin-Dashboard (kein Role Switcher!)
3. ✅ Scrolle Verfügbarkeits-Kalender
4. ✅ Klick auf verschiedene Zeitslots
5. ✅ Grüne Slots sollten klickbar sein (verfügbar)

---

### 4. **Verfügbarkeits-Kalender** (`/helper/availability`)

**Für**: Helferinnen  
**Was**: Detaillierte Verfügbarkeitsverwaltung

**Interface-Elemente**:

- 📅 **Kalender-Grid**: 7 Tage × 16 Stunden (6:00-21:00 CEST)
- ⏰ **Zeit-Labels**: Linksseitig, sticky beim horizontalen Scrollen
- 📌 **Sticky Header**: Wochentage oben, sichtbar beim vertikalen Scrollen
- 🎨 **Farbcodierung**:
  - 🟢 Grün (`from-green-100 to-green-50`): Verfügbar
  - 🔘 Grau (`bg-gray-500`): Gebucht
  - ⚪ Weiß (`bg-white`): Nicht verfügbar
- 📊 **Legend**: Beschreibung der Farben unten auf der Seite

**Größere Verbesserung in MVP 0.2.0**:

- Slots sind **7.5x größer** als vorher (`min-h-[60px]` statt `h-8`)
- **Scrollbares Layout**: Alle 16 Stunden passen in maximale Höhe von 700px
- **Bessere Bedienbarkeit**: Leicht zu klicken auf mobilen und Desktop-Geräten

**Funktionen**:

- ✅ Klick auf Slot = Status ändern (verfügbar ↔ gebucht)
- ✅ Woche wechseln mit Arrow-Buttons (← →)
- ✅ Farbige Visualisierung der Auslastung
- ✅ Anweisungen oben für neue Nutzer

**Teste diesen Flow**:

1. ✅ Login mit `sainab@helper.de`
2. ✅ Klick auf "Verfügbarkeiten verwalten" (oder direkt: `/helper/availability`)
3. ✅ Scrolle vertikal → alle 16 Stunden sichtbar?
4. ✅ Klick auf grüne Slots → wechsel zu grau?
5. ✅ Klick auf "← Vorherige Woche" → Kalender wechselt

---

### 5. **Helper Dashboard** (`/helper/dashboard`)

**Für**: Helferinnen  
**Alternative zu**: `/dashboard` für reine Helferinnen

**Ähnlich wie**: Dashboard für Helferin (Punkt 3c oben)

Dedizierte Seite nur für Helferinnen mit:

- 📋 Verfügbarkeits-Kalender
- 👥 Offene Anfragen
- 📊 Statistiken
- ✏️ Profil bearbeiten

---

### 6. **Termin Buchen** (`/book`)

**Für**: Mitglieder  
**Status**: Noch nicht vollständig implementiert (⏳ Work in Progress)

**Geplanter Flow**:

1. 🎯 **Anliegen auswählen**: Psychologische Beratung, Sozialberatung, Schwangerschaftsbegleitung
2. 📝 **Beschreibung eingeben**: Kurzbeschreibung des Anliegens
3. 📅 **Termin wählen**: Verfügbare Slots von Helferinnen
4. 👩‍⚕️ **Helferin zugewiesen**: Automatische Zuweisung zur nächsten verfügbaren
5. ✅ **Bestätigung**: Termin ist gebucht, Kalendereinladung per E-Mail

**Was aktuell funktioniert** (in `/book`):

- 📄 Formular-Grundstruktur sichtbar
- 🎯 Anliegen-Optionen anzeigbar

**Teste diesen Flow** (nur Anschau):

1. ✅ Login mit `zahra@mitglied.de`
2. ✅ Klick auf "Termin buchen"
3. ✅ Schaue das Formular-Layout an
4. ⏳ Vollständige Buchung noch nicht implementiert

---

### 7. **Meine Termine** (`/my-appointments`)

**Für**: Alle angemeldeten Nutzer  
**Was**: Zentrale Übersicht aller Termine (Member + Helper Sicht)

**Tabs**:

- 📋 **Alle**: Alle Termine zusammen
- 👤 **Als Mitglied**: Nur gebuchte Termine (wo du Ratsuchende bist)
- 🤝 **Als Helferin**: Nur Helferin-Termine (wo du berätst) _nur sichtbar für Helferinnen_

**Terminus-Karten** zeigen:

- 🎯 **Anliegen-Typ**: z.B. "Psychologische Beratung"
- 👥 **Person**: Helferin oder Ratsuchende
- 📅 **Datum & Zeit**: Mit Wochentag
- 🎬 **Status**: Kommend, Vorbei
- 🎥 **Jitsi-Link**: Link zu Video-Call
- ⚙️ **Aktionen**: 3-Punkt-Menü mit Verschieben/Stornieren

**Besonderheiten**:

- 🎨 Farbcodierung:
  - 🔵 Blau = Mitglied-Termine
  - 🟢 Grün = Helferin-Termine
- 🔄 Tabs sind rollensensitiv (Nicht-Helferinnen sehen nur "Alle" und "Als Mitglied")

**Teste diesen Flow**:

1. ✅ Login mit `fatima@helpermitglied.de`
2. ✅ Klick auf "Meine Termine" (oder `/my-appointments`)
3. ✅ Du siehst 3 Tabs: Alle, Als Mitglied, Als Helferin
4. ✅ Klick durch Tabs → unterschiedliche Termine?
5. ✅ Klick auf 3-Punkt-Menü → Optionen erscheinen?

---

### 8. **Profil-Seite** (`/profile`)

**Für**: Alle angemeldeten Nutzer  
**Was**: Persönliche Profilinformationen bearbeiten

**Inhalte**:

- 👤 **Profilbild**: Avatar oben
- 📝 **Bearbeitbare Felder**:
  - Vorname
  - Nachname
  - E-Mail
  - PLZ (für Mitglieder)
  - Spezialisierung (für Helferinnen)
- 💾 **Speichern-Button**
- 🔙 **Zurück-Button**: Pfeile-Icon um zurückzugehen

**Teste diesen Flow**:

1. ✅ Login mit `zahra@mitglied.de`
2. ✅ Klick auf Avatar oben rechts → Dropdown?
3. ✅ Oder direkt: `/profile`
4. ✅ Ändere Vorname
5. ✅ Klick Speichern → Änderung gespeichert?

---

### 9. **Helper Registrierung** (`/helper/register`)

**Für**: Mitglieder, die Helferin werden wollen  
**Was**: Formular für Selbstanmeldung als Helferin

**Registrierungs-Schritte**:

1. ✅ **Willkommenstext**: Erklärung der Helferin-Rolle
2. ✅ **Kategorien auswählen**: Checkboxes für:
   - Psychologische Beratung
   - Sozialberatung
   - Schwangerschaftsbegleitung
3. ✅ **Motivation**: Textarea - Warum möchtest du Helferin werden?
4. ✅ **Qualifikationen**: Textarea - Was sind deine Qualifikationen?
5. ✅ **Bedingungen akzeptieren**: Checkbox für Terms & Conditions
6. ✅ **Senden-Button**: Registrierung abschicken

**Nach Registrierung**:

- ⏳ **Status**: "Anmeldung erhielt - Admin-Überprüfung läuft"
- 📧 **E-Mail**: Bestätigung an registrierte E-Mail
- ✅ **Erfolgsseite**: Umleitung zu `/helper/register/success`

**Teste diesen Flow**:

1. ✅ Login mit `zahra@mitglied.de` (wenn noch nicht Helferin)
2. ✅ Homepage: Klick auf "Helferin werden" Karte
3. ✅ Oder direkt: `/helper/register`
4. ✅ Fülle Formular aus
5. ✅ Klick "Registrierung absenden"
6. ✅ Erfolgsmeldung?

---

### 10. **Mitgliederkarte** (`/member-map`)

**Für**: Alle angemeldeten Mitglieder  
**Was**: Interaktive Karte mit allen Mitglieder-Standorten

**Funktionen**:

- 🗺️ **Google Maps Integration**: Basis-Kartenwerkzeug
- 🔴 **PLZ-Kreise**: Datenschutz-optimiert (zeigt PLZ, nicht exakte Adressen)
- 🎨 **Farbcodierung**: Kreis-Größe basierend auf Mitgliederzahl
- 📍 **Hover-Effekt**: Hovere über Kreis → Mitgliederliste Pop-up
- 👥 **Mitgliederliste**: Ausklappbare Liste mit allen sichtbaren Mitgliedern

**Datenschutz-Features**:

- ✅ Nur Mitglieder mit "location_visible = true" werden angezeigt
- ✅ Keine exakten Adressen, nur PLZ-Bezirke
- ✅ Wärme-farbige Kreise (Braun #9c604d)

**Beispiel-Standorte** (Mock-Daten):

- Berlin (10115): Zahra A., Amira M.
- Hamburg (20095): Sainab H., Yasmin K.
- München (80331): Fatima E., Layla N.
- Weitere deutsche Städte

**Teste diesen Flow**:

1. ✅ Login mit `zahra@mitglied.de`
2. ✅ Klick auf "Mitglieder finden" oder direkt: `/member-map`
3. ✅ Karte lädt → Braune Kreise sichtbar?
4. ✅ Zoome Karte rein/raus
5. ✅ Hovere über Kreis in Berlin → Pop-up mit Namen?
6. ✅ Klick auf Kreis → Mitgliederliste erweitert?

---

### 11. **Beratungsstellen** (`/beratungsstellen`)

**Für**: Alle (auch nicht angemeldete Nutzer)  
**Was**: Übersicht externer Beratungsstellen in Berlin

**Funktionen**:

- 🔍 **Filter nach Kategorie**: Checkboxes für:
  - Beratung für Alleinerziehende
  - Sozialberatung
  - Schwangerschaftsbegleitung
  - Etc.
- 📋 **Beratungsstellen-Karten** mit:
  - Name & Beschreibung
  - Telefon 📞
  - E-Mail 📧
  - Adresse 📍
  - Öffnungszeiten ⏰
  - Website 🌐 (wenn vorhanden)
  - Sprachen 🗣️
  - Spezialisierungen 💼

**Beispiel-Einträge**:

- SKF Berlin e.V. (Unterstützung für Alleinerziehende)
- Berliner Frauenbund 1945 e.V. (Beratung & Berufsintegration)
- Verein für aktive Vielfalt (Interkulturelle Beratung)
- Etc. (insgesamt 20+ Einträge)

**Teste diesen Flow**:

1. ✅ Rufe auf: `/beratungsstellen`
2. ✅ Keine Anmeldung nötig - offen für alle!
3. ✅ Scrolle durch die Liste
4. ✅ Klick auf Filter-Checkbox "Beratung für Alleinerziehende"
5. ✅ Liste wird gefiltert?
6. ✅ Klick auf externe Link → öffnet neue Seite

---

### 12. **Über Uns** (`/about`)

**Für**: Alle (auch nicht angemeldete Nutzer)  
**Was**: Informationen über den Verein

**Inhalte**:

- 🏢 **Hero Section**: "Über Muslimin e.V." Titel & Tagline
- 📝 **Über Uns Text**: Wer wir sind, was wir machen
- 🎯 **Unsere Werte** (3er-Grid):
  - 👥 Unsere Gemeinschaft (50+ Mitglieder)
  - ❤️ Von Frauen für Frauen
  - 🤲 Unterstützung & Solidarität
- 📞 **Kontakt-Sektion**: E-Mail, Adresse, Social Media Links
- 🔗 **Links**: Zu anderen wichtigen Seiten

**Teste diesen Flow**:

1. ✅ Rufe auf: `/about`
2. ✅ Sehe die Vereins-Information?
3. ✅ Scrolle down → Werte-Cards?
4. ✅ Klick auf Social Media Icons → Öffnet externe Seiten?

---

### 13. **Informations-Seiten**

**Für**: Alle Nutzer

#### **Datenschutz** (`/datenschutz`)

- 📋 Datenschutzerklärung (DSGVO-konform)
- 🔒 Wie wir Daten speichern & schützen
- 🗑️ Löschfristen & Datenverwaltung

#### **AGB** (`/agb`)

- 📜 Allgemeine Geschäftsbedingungen
- ✅ Nutzer-Vereinbarung für die Plattform
- 🚫 Richtlinien & Regeln

#### **Impressum** (`/impressum`)

- 📍 Adresse des Vereins
- 📞 Kontaktinformationen
- 👤 Verantwortliche Person

#### **Veranstaltungen** (`/veranstaltungen`)

- 📅 Kommende Events
- 🗓️ Bekanntmachungen
- 📝 Event-Details

**Teste diesen Flow**:

1. ✅ Scrolle zur Footer-Sektion (unten auf jeder Seite)
2. ✅ Klick auf verschiedene Links
3. ✅ Inhalte laden?

---

## 🌐 Navigation: Wie man sich zurechtfindet

### Navigation-Menü (oben)

**Sichtbar**: Auf allen Seiten

**Komponenten**:

- 🔷 **Logo** (oben links): Klickbar → führt zu Homepage `/`
- 👤 **User Avatar** (oben rechts):
  - Zeigt Profilbild
  - Klickbar → Dropdown-Menü öffnet
- 🍔 **Mobile Menu** (auf Smartphones): Hamburger-Icon

**Dropdown-Menü** (nach Avatar klick):

- 👤 Profil → `/profile`
- 📋 Meine Termine → `/my-appointments` (nur für Helferinnen)
- ⚙️ Einstellungen → `/profile` (bearbeiten)
- 🚪 Abmelden → Logout (zurück zu `/login`)

### Footer (unten)

**Links-Kategorien**:

- 🏢 **Organisation**: Über uns, Kontakt, Impressum
- 📋 **Rechtliches**: Datenschutz, AGB
- 🆘 **Support**: Hilfe-Seite (geplant)
- 🔗 **Social Media**: Instagram, Facebook, YouTube

---

## 🎯 Komplette User Journeys: Die großen Szenarien

### ✅ Szenario 1: Neues Mitglied - Anmeldung & Termin buchen

**Persona**: Zahra (zahra@mitglied.de)  
**Ziel**: Sich anmelden und einen Termin buchen

**Schritte**:

1. 🌐 Rufe `https://localhost:3000` auf
   - ⚠️ Du bist nicht angemeldet → wirst zu `/about` umgeleitet
2. 📍 Klick auf "Jetzt teilnehmen" oder Login-Link
3. 🔐 Login-Seite (`/login`)
   - Gib E-Mail: `zahra@mitglied.de`
   - Gib Passwort: `test123`
   - Klick "Anmelden"
4. ✅ Du wirst automatisch zu `/dashboard` umgeleitet
5. 🏠 Willkommensseite
   - Sehe: "Salam Zahra! 👋"
   - Sehe: Quick-Action Buttons
6. 📅 Klick "Termin buchen"
   - Gehe zu `/book` (noch nicht vollständig)
   - Siehst Formular-Grundstruktur
7. 🗺️ (Alternative) Klick "Mitglieder finden"
   - Gehe zu `/member-map`
   - Sehe interaktive Karte mit anderen Mitgliedern
8. 📞 Klick "Externe Beratungsstellen"
   - Gehe zu `/beratungsstellen`
   - Sehe 20+ externe Beratungsstellen

**Was du lernt**:

- ✅ Login funktioniert
- ✅ Dashboard zeigt personalisierte Willkommensnachricht
- ✅ Alle Quick Actions funktionieren
- ✅ Booking-Flow ist strukturiert (noch Work in Progress)

---

### ✅ Szenario 2: Helferin - Verfügbarkeiten setzen

**Persona**: Sainab (sainab@helper.de)  
**Ziel**: Verfügbarkeiten für kommende Woche einstellen

**Schritte**:

1. 🔐 Login mit `sainab@helper.de` / `test123`
2. ✅ Du wirst zu `/helper/dashboard` umgeleitet (nur Helferinnen!)
3. 🏠 Helferin-Dashboard
   - Sehe: "Salam Sainab! 👋"
   - Sehe: Verfügbarkeits-Kalender
   - Sehe: Statistiken (Verfügbare Stunden, Offene Anfragen, etc.)
4. 📅 Klick auf grüne Slots im Kalender
   - Grüne Slots = verfügbar
   - Klick drauf → wechsel zu grau (gebucht) oder weiß (nicht verfügbar)
5. 🔄 Wechsel Woche mit ← → Buttons
6. 💾 Änderungen werden automatisch gespeichert
7. 📋 Sehe "Offene Anfragen" von Mitgliedern

**Was du lernt**:

- ✅ Verfügbarkeits-Kalender ist sehr benutzerfreundlich
- ✅ 7.5x größere Slots als im alten Design
- ✅ Sticky Header macht Navigation einfach
- ✅ Farbcodierung ist intuitiv

---

### ✅ Szenario 3: Dual-Rolle - Zwischen Rollen wechseln

**Persona**: Fatima (fatima@helpermitglied.de)  
**Ziel**: Als Mitglied Termin sehen, dann als Helferin Anfragen verwalten

**Schritte**:

1. 🔐 Login mit `fatima@helpermitglied.de` / `test123`
2. 📊 Du landest auf `/dashboard`
3. 🔄 Sehe Role Switcher Buttons:
   - "👤 Als Mitglied"
   - "🤝 Als Helferin"
4. 👤 Klick "Als Mitglied"
   - Dashboard wechselt zu Member-View
   - Sehe: Meine Termine, Statistiken
5. 📋 Klick auf "Meine Termine"
   - Gehe zu `/my-appointments`
   - Sehe: 2 Mitglied-Termine + 3 Helferin-Termine
   - 3 Tabs: "Alle", "Als Mitglied", "Als Helferin"
6. 🤝 Wechsel zurück zu Helferin-Rolle
7. ⏰ Verwalte Verfügbarkeiten
8. 📋 Sehe Anfragen von anderen Mitgliedern

**Was du lernt**:

- ✅ Dual-Rollen funktionieren seamlessly
- ✅ Interface passt sich sofort an
- ✅ Role Switcher ist zentral zugänglich
- ✅ Alle Termine sind organisiert nach Rolle

---

### ✅ Szenario 4: Neue Helferin registrieren

**Persona**: Zahra (zahra@mitglied.de) → möchte Helferin werden  
**Ziel**: Sich selbst als Helferin registrieren

**Schritte**:

1. 🔐 Login mit `zahra@mitglied.de`
2. 🏠 Homepage (`/`)
3. 🎯 Sehe Karte: "Helferin werden"
4. ✅ Klick auf die Karte
   - Gehe zu `/helper/register`
5. 📝 Registrierungs-Formular
   - ✅ Kategorien auswählen (Checkboxes):
     - Psychologische Beratung
     - Sozialberatung
     - Schwangerschaftsbegleitung
   - ✅ Motivation eingeben (Textarea)
   - ✅ Qualifikationen eingeben (Textarea)
   - ✅ Terms akzeptieren (Checkbox)
6. 🔘 Klick "Registrierung absenden"
7. ⏳ Lade-Animation
   - Text: "Überprüfung der Anmeldung..."
8. ✅ Erfolgsseite (`/helper/register/success`)
   - Sehe: "Deine Registrierung wurde erhalten!"
   - Sehe: "Admin prüft deine Berechtigung..."
   - 📧 E-Mail Bestätigung wurde versendet

**Was du lernt**:

- ✅ Registrierungs-Flow ist klar & einfach
- ✅ Selbst-Service Registrierung funktioniert
- ✅ Bestätigungs-E-Mail wird versendet (Mock)
- ✅ Admin-Überprüfung wird erwähnt

---

### ✅ Szenario 5: Nicht angemeldeter Nutzer - Exploration

**Persona**: Niemand (nicht angemeldet)  
**Ziel**: Plattform anschauen ohne sich anzumelden

**Schritte**:

1. 🌐 Rufe `https://localhost:3000` auf
2. 📍 Automatische Umleitung zu `/about`
   - Grund: Nur angemeldete Nutzer sehen Startseite
3. 📖 "Über uns" Seite
   - Infos über den Verein
   - Kontaktinformationen
   - Werte & Mission
4. 🔗 Klick auf "Beratungsstellen"
   - Alle Beratungsstellen sichtbar (öffentlich!)
5. 📜 Klick auf Links im Footer:
   - Datenschutz
   - AGB
   - Impressum
6. 🔐 Klick auf "Login" Button
   - Gehe zu `/login`
7. ✅ Gib Credentials ein & melde dich an

**Was du lernst**:

- ✅ Unangemeldete Nutzer können nur bestimmte Seiten sehen
- ✅ Beratungsstellen sind öffentlich zugänglich
- ✅ Rechtliche Seiten sind immer erreichbar
- ✅ Einstieg über `/about` ist intuitive Orientierung

---

## 🎨 Design-Highlights in MVP 0.2.0

### Farben & Style

**Sage Gradient** (Primary):

- Verwendet in: Header, Footer, Buttons, Links
- Farben: `sage-50` → `sage-100` (hell) bis `sage-700` (dunkel)
- Effekt: Professionell, beruhigend, weiblich

**Akzent-Farben**:

- 🔴 **Coral** (#f57c5c): Warm, einladend (Hover-States)
- 🟤 **Warm** (#c98c61): Natürlich, unterstützend
- 🟡 **Cream** (#f5ede5): Hintergrund, Übergänge

### Animationen

- 🎬 **Framer Motion**: Smooth Transitions überall
- ⬆️ **Entrance Animations**: Elemente fliegen rein beim Laden
- 🖱️ **Hover Effects**: Buttons & Cards reagieren bei Mouseover
- 🔄 **Rolle Switcher**: Animated Wechsel zwischen Views

### Responsive Design

- 📱 **Mobile** (< 640px): Single-Column Layout, großer Touch-Targets
- 💻 **Tablet** (640-1024px): 2-Column Layout
- 🖥️ **Desktop** (> 1024px): Full-Width, Multi-Column

---

## 🔍 Checkliste zum Testen

Nutze diese Checkliste, um alle Funktionen zu überprüfen:

### Authentifizierung & Rollen

- [ ] Login mit falschem Passwort zeigt Fehler
- [ ] Login mit richtigem Passwort erfolgt
- [ ] Automatische Umleitung zu `/dashboard` nach Login
- [ ] Logout führt zu Login-Seite
- [ ] "Angemeldet bleiben" funktioniert
- [ ] Dual-Rollen Wechsel funktioniert (für fatima@helpermitglied.de)

### Dashboard & Navigation

- [ ] Member-Dashboard zeigt nur Member-Funktionen
- [ ] Helferin-Dashboard zeigt nur Helferin-Funktionen
- [ ] Role Switcher ist sichtbar für Dual-Rollen
- [ ] Avatar-Dropdown im Header funktioniert
- [ ] Logo-Klick führt zur Startseite
- [ ] Footer-Links funktionieren

### Verfügbarkeits-Kalender

- [ ] Kalender laden auf `/helper/availability`
- [ ] Alle 16 Stunden (6:00-21:00) sind scrollbar
- [ ] Slots sind min-h-[60px] (groß genug zum Klicken)
- [ ] Sticky Header bleibt beim Scrollen sichtbar
- [ ] Farben sind korrekt: Grün (verfügbar), Grau (gebucht)
- [ ] Woche-Wechsel mit Arrows funktioniert
- [ ] Klick auf Slot ändert Status

### Termine Management

- [ ] "Meine Termine" Seite lädt
- [ ] 3 Tabs ("Alle", "Als Mitglied", "Als Helferin") funktionieren
- [ ] Terminus-Karten zeigen korrekte Details
- [ ] 3-Punkt-Menü öffnet Options
- [ ] Farbcodierung ist sichtbar (blau = member, grün = helper)

### Mitgliederkarte

- [ ] Google Maps lädt ohne Fehler
- [ ] Braune Kreise für PLZ-Bezirke sind sichtbar
- [ ] Zoom in/out funktioniert
- [ ] Hover über Kreis zeigt Mitglieder-Namen
- [ ] Mitgliederliste ist erweiterbar
- [ ] Nur Mitglieder mit location_visible=true angezeigt

### Externe Seiten

- [ ] Beratungsstellen laden (20+ Einträge)
- [ ] Filter nach Kategorie funktioniert
- [ ] Kontaktinformationen sind lesbar
- [ ] Links zu externen Websites funktionieren
- [ ] "Über uns" zeigt korrekte Vereins-Info

### Registrierung

- [ ] Helferin-Registrierungs-Formular lädt
- [ ] Kategorien sind wählbar
- [ ] Textarea für Motivation/Qualifikationen funktioniert
- [ ] Terms-Checkbox funktioniert
- [ ] Registrierung absenden zeigt Bestätigung
- [ ] Erfolgsseite `/helper/register/success` lädt

### Profil-Seite

- [ ] Avatar wird angezeigt
- [ ] Bearbeitbare Felder sind sichtbar
- [ ] Speichern-Button funktioniert
- [ ] Änderungen werden persistiert

---

## 📱 Spezielle Features zum Testen

### PWA-Fähigkeiten (noch in Entwicklung)

- [ ] App kann auf Homescreen installiert werden (Chrome/Safari)
- [ ] Offline-Modus funktioniert teilweise
- [ ] App-Symbol ist korrekt

### Barrierefreiheit

- [ ] Alle Buttons sind mit Tastatur erreichbar
- [ ] Screen Reader kann Seiten vorlesen (getestet mit NVDA/JAWS?)
- [ ] Kontraste sind ausreichend (WCAG AA Standard?)
- [ ] Formulare haben Labels

### Performance

- [ ] Seiten laden in < 2 Sekunden
- [ ] Bilder sind optimiert
- [ ] Keine Console-Fehler
- [ ] Smooth Animationen ohne Ruckeln

---

## 🐛 Bekannte Einschränkungen & Work-in-Progress

### Noch nicht implementiert (⏳ TODO)

- ❌ **Termin Buchungs-Flow**: `/book` ist nur UI-Skelett, Funktionalität folgt
- ❌ **E-Mail-Integration**: Brevo nicht konfiguriert (Mock-Emails nur)
- ❌ **Supabase Backend**: Echte Datenbank noch nicht live (Mock-Daten nur)
- ❌ **Jitsi Meet Integration**: Video-Call Links noch nicht generiert
- ❌ **Admin-Dashboard**: Admin-Seite noch nicht implementiert
- ❌ **Push-Notifications**: Nicht im MVP-Scope
- ❌ **Mehrsprachigkeit**: Nur Deutsch verfügbar

### Bekannte Bugs

- ⚠️ Mobile Kalender: Auf sehr kleinen Bildschirmen ist Seitenschrift nicht ideal (Temporary Limitation)
- ⚠️ Browser-Compatibility: Getestet auf Chrome/Safari/Firefox, Edge nicht vollständig getestet

### Daten sind Mock-Daten

- 📌 Alle Termine, Mitglieder, Verfügbarkeiten sind Beispiel-Daten
- 📌 Änderungen werden nur im Browser-Cache gespeichert (localStorage)
- 📌 Nach Browser-Refresh gehen Änderungen verloren
- 📌 Echte Datenbank kommt in Phase 2

---

## 💬 Feedback & Kontakt

### Wo kann ich Bugs melden?

- 📧 **E-Mail**: [support@muslimin-beratung.de]
- 🐛 **GitHub Issues**: https://github.com/nesrineD/muslimin.beratung/issues

### Fragen zum Testen?

- 📞 **Telefon**: [Konktaktnummer des Vereins]
- 💬 **Slack/Telegram**: [Link zum Kommunikations-Channel]

---

## 📊 Test-Report Template

Verwende folgende Vorlage, um dein Feedback zu dokumentieren:

```
## Test Report - [Dein Name] - [Datum]

### Getestete Features
- [ ] Feature 1: [Beschreibung]
- [ ] Feature 2: [Beschreibung]

### Was funktioniert gut? ✅
- Punkt 1
- Punkt 2

### Was könnte verbessert werden? 💡
- Punkt 1
- Punkt 2

### Bugs gefunden? 🐛
- Bug 1: [Beschreibung mit Schritten zum Reproduzieren]
- Bug 2: [...]

### Allgemeine Kommentare
[Dein Feedback hier...]
```

---

## 🎓 Glossar: Begriffe erklärt

| Begriff                      | Erklärung                                                 |
| ---------------------------- | --------------------------------------------------------- |
| **Mitglied**                 | Person, die sich zur Beratung anmelden kann               |
| **Helferin**                 | Verifizierte Person, die Beratung anbietet                |
| **Dual-Rolle**               | Person, die gleichzeitig Mitglied und Helferin ist        |
| **Verfügbarkeit**            | Zeiten, in denen eine Helferin Termine anbietet           |
| **Termin/Appointment**       | Gebuchte Beratungs-Session zwischen Mitglied und Helferin |
| **PLZ-Kreis**                | Geografischer Kreis um eine Postleitzahl (Datenschutz)    |
| **Mock-Daten**               | Beispiel-Daten zum Testen (nicht echt)                    |
| **localStorage**             | Browser-Speicher für kleine Datenmengen                   |
| **RLS (Row Level Security)** | Datenschutz auf Datenbank-Ebene (geplant)                 |

---

**Viel Spaß beim Testen! 🚀 Wir freuen uns auf dein Feedback!**

---

_Dieses Dokument wird regelmäßig aktualisiert. Letzte Änderung: Oktober 2025_
