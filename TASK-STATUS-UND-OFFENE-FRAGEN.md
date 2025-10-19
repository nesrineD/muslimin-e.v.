# 📋 Task-Übersicht und Offene Fragen - Muslimin-Beratung

_Erstellt am: 19. Oktober 2025_  
\_Für: Sozial-Team

---

## 🎯 Was ist unser Ziel?

Wir bauen eine **einfache Webseite**, wo:

- Vereinsmitglieder **Beratungstermine buchen** können
- Helferinnen (von der sozial Gruppe) ihre **Verfügbarkeiten eintragen** können
- Mitglied werden / Helferin werden über die Webseite
- Mitgliederkarte
- Profile Management
- Beratungsstellen finden
- Alles **sicher und datenschutzfreundlich** funktioniert

---

## ✅ Was ist bereits fertig? (Erledigte Tasks)

### 🖥️ **Frontend (Benutzeroberfläche) - 85% fertig**

**✅ ERLEDIGT:**

- **Seiten erstellt**: Startseite, Login, Registrierung, Dashboards
- **Terminbuchung**: 4-Schritte-Flow funktioniert (Anliegen → Details → Zeit → Bestätigung)
- **Helferin-Registrierung**: Komplett funktional mit Kategorien-Auswahl
- **Kalender-System**: Modernes Verfügbarkeits-Management
- **Mobile Optimierung**: Funktioniert auf Smartphone und Tablet und ach als App (PWA: https://muslimin-ev.vercel.app/pwa-guide)
- **Design-System**: Warme, einladende Farben implementiert
- **Test-Benutzer**: Zahra/Amina (Mitglied), Sainab (Helferin), Fatima (Beides)
- **Beratungsstellenliste**
  - Statische Seite mit externen Beratungsstellen
  - Nach Kategorien sortiert

**📱 Benutzerfreundlichkeit:**

- Alle Texte auf Deutsch
- Große Buttons für einfache Bedienung
- Klare Navigation
- Responsive Design (passt sich an Bildschirmgröße an)

### 🎨 **Beratungskategorien - 100% fertig**

**Aktuell verfügbare Kategorien:**

1. **🧠 Psychologische Beratung** - Stress, Angst, emotionale Unterstützung
2. **🤝 Sozialberatung** - Behördengänge, Anträge, Kindergeld
3. **🤱 Schwangerschaftsbegleitung** - Schwangerschaft und nach der Geburt
4. **💬 Andere Anliegen** - Weitere Lebensthemen

---

## ⏳ Was fehlt noch? (Offene Tasks nach Priorität)

### 🔴 **KRITISCH - Muss sofort gemacht werden**

#### **1. Backend/Datenbank einrichten (TASK-001 bis TASK-004)**

**Was bedeutet das?**

- Derzeit laufen alle Daten nur "zum Testen" - echte Speicherung fehlt
- Magic Link Login (sichere Anmeldung ohne Passwort) muss eingerichtet werden
- Admin-Interface für Mitgliederverwaltung

#### **2. DSGVO-Compliance implementieren (TASK-017)**

**Was bedeutet das?**

- Automatische Löschung der Termine nach 6 Monaten

### 🟠 **HOCH - Wichtig für den Start**

#### **3. E-Mail-System (TASK-010)**

**Was bedeutet das?**

- Automatische Bestätigungs-E-Mails
- Terminerinnerungen
- Kalender-Dateien zum Herunterladen

#### **4. Video-Meeting Integration (TASK-011)**

**Was bedeutet das?**

- Jitsi Meet Links automatisch erstellen
- Links in E-Mails einbetten

### 🟡 **MITTEL - Kann später gemacht werden**

#### **5. Admin Dashboard (TASK-013)**

**Was bedeutet das?**

- Übersicht für Administratorinnen
- Statistiken sehen (wie viele Termine, Mitglieder, etc.)

### 🟢 **NIEDRIG - Nice to have**

#### **7. Testing und Dokumentation (TASK-019, TASK-021)**

**Was bedeutet das?**

- Tests schreiben
- Benutzerhandbuch erstellen

---

## ❓ Wichtige offene Fragen - Brauchen Entscheidungen!

### 🔄 **Workflow-Fragen**

#### **1. Helferin-Freischaltung: Automatisch oder manuell?**

**🤔 Aktuelle Situation:**

- Jedes Mitglied kann sich direkt als Helferin registrieren
- Keine Überprüfung von Qualifikationen oder Erfahrung

**🎯 Optionen:**

- **Option A:** Bleibt automatisch (Self-Service)
  - ✅ Vorteil: Schnell, keine Wartezeit
  - ❌ Nachteil: Keine Qualitätskontrolle
- **Option B:** Administrator muss freischalten
  - ✅ Vorteil: Qualitätskontrolle möglich
  - ❌ Nachteil: Verzögerung, mehr Arbeit für Admin

**⚡ Entscheidung benötigt:** Welcher Weg soll umgesetzt werden?

#### **2. Termin-Format: Nur Video oder auch andere Möglichkeiten?**

**🤔 Aktuelle Situation:**

- Nur Video-Calls via Jitsi Meet geplant

**🎯 Optionen:**

- **Option A:** Nur Video-Calls (wie geplant)
  - ✅ Vorteil: Einfach, einheitlich, corona-sicher
  - ❌ Nachteil: Nicht alle sind technik-affin
- **Option B:** Video + Telefon-Option
  - ✅ Vorteil: Flexibler für ältere Mitglieder
  - ❌ Nachteil: Komplizierter umzusetzen
- **Option C:** Video + Telefon + persönlich
  - ✅ Vorteil: Maximale Flexibilität
  - ❌ Nachteil: Sehr komplex, Datenschutz-Probleme

**⚡ Entscheidung benötigt:** Welche Termin-Formate sollen angeboten werden?

#### **3. "Helferin" als Begriff: Passt das für alle?**

**🤔 Aktuelle Situation:**

- Überall wird "Helferin" verwendet
- Bezieht sich auf die helfende Person, nicht die Hilfesuchende

**🎯 Alternativen:**

- **Beraterin** (professioneller klingend)
- **Unterstützerin** (weicher)
- **Mentorin** (bei Erfahrungsaustausch)
- **Ansprechpartnerin** (neutral)

**⚡ Entscheidung benötigt:** Soll der Begriff "Helferin" beibehalten werden?

### 📋 **Kategorien-Fragen**

#### **54. Sind die 4 Beratungskategorien ausreichend?**

**🤔 Aktuelle Kategorien:**

1. Psychologische Beratung
2. Sozialberatung
3. Schwangerschaftsbegleitung
4. Andere Anliegen

**🎯 Mögliche Ergänzungen:**

- **Familien-/Partnerschaftsberatung**
- **Berufliche Orientierung**
- **Rechtliche Erstberatung**
- **Islamische Lebensberatung**
- **Erziehungsberatung**

**⚡ Entscheidung benötigt:** Sollen weitere Kategorien hinzugefügt werden?

#### **5. Kategorie-Namen: Sind sie verständlich genug?**

**🤔 Feedback benötigt:**

- Sind die Namen klar und eindeutig?
- Verstehen alle Mitglieder, was gemeint ist?
- Sollen Beispiele hinzugefügt werden?

#### Wer hätte Lust die Texte die auf der Webseite sind anzupassen/ zu erstellen?

---

## 📊 Zeitplan-Übersicht

### **Phase 1: Backend & Sicherheit (2 Wochen)**

- Magic Link Authentication
- DSGVO-Compliance
- Admin-Interface

### **Phase 2: Integration (1 Woche)**

- E-Mail-System
- Video-Meeting Links
- Real-time Updates

### **Phase 3: Polishing (1 Woche)**

- Admin Dashboard
- Beratungsstellenliste
- Testing & Dokumentation

**🎯 Geschätzter Gesamtaufwand:** 4-5 Wochen bis zum Launch

---

## ⚡ Nächste Schritte

### **Sofort erforderlich:**

1. **Workflow-Entscheidungen treffen** (siehe offene Fragen oben)
2. **Backend-Entwicklung starten** (TASK-001 bis TASK-004)
3. **Supabase Account einrichten** (EU-Region für DSGVO)

### **Diese Woche:**

1. Antworten auf offene Fragen sammeln
2. Stakeholder-Meeting für Entscheidungen
3. Backend-Setup beginnen

### **Nächste Woche:**

1. E-Mail-System konfigurieren (Brevo)
2. DSGVO-Implementierung
3. Testing mit echten Daten

---

## 📞 Kontakt für Fragen

**Technische Fragen:** Development Team  
**Workflow-Fragen:** Projekt-Manager  
**Inhaltliche Fragen:** Vereinsvorstand

---

_📝 Dieses Dokument wird wöchentlich aktualisiert_  
_🔄 Letzte Aktualisierung: 19. Oktober 2025_
