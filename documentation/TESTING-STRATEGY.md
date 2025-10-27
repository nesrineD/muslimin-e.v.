# Testing-Strategie: Muslimin e.V. Terminbuchungsplattform

## 🎯 Überblick

Testing-Strategie für MVP mit Fokus auf kritische User Flows, Sicherheit (RLS, Auth) und DSGVO-Compliance.

---

## 1️⃣ Unit Tests (React Components & Utilities)

### Priority: HIGH | Coverage Target: 80%+

#### 1.1 Utility Functions

```typescript
// lib/date-utils.test.ts
- ✅ createFutureDate() - Generiert korrekte zukünftige Daten
- ✅ addDays() - Addiert Tage korrekt (inkl. Timezone CEST)
- ✅ isPast() - Erkennt vergangene Daten
- ✅ isUpcoming() - Erkennt bevorstehende Daten (7 Tage)
```

#### 1.2 Constants & Validation

```typescript
// lib/constants.test.ts
- ✅ CATEGORIES - Korrekte Struktur & Typen
- ✅ CATEGORY_DETAILS - Icons, Beschreibungen vorhanden
- ✅ CategoryKey Type - TypeScript Type-Safety

// lib/zod-schemas.test.ts (zu erstellen)
- ✅ appointmentSchema - Validiert korrekte Daten
- ✅ appointmentSchema - Lehnt ungültige Daten ab
- ✅ memberRegistrationSchema - E-Mail, Namen validieren
```

#### 1.3 Hook Tests

```typescript
// hooks/useAuth.test.tsx
- ✅ useAuth() returns mockUsers korrekt
- ✅ useAuth() throws error wenn nicht authentifiziert
- ✅ User Metadata wird korrekt gesetzt
- ✅ is_helper Flag funktioniert
```

#### 1.4 Component Tests

```typescript
// components/calendar/GridAvailabilityCalendar.test.tsx
- ✅ Grid wird mit 7 Tagen + 16 Stunden gerendert
- ✅ Slot-Click Handler wird aufgerufen
- ✅ Week Navigation funktioniert
- ✅ Current Week wird korrekt hervorgehoben

// components/ui/badge.test.tsx
- ✅ Badge rendert korrekt
- ✅ Varianten (default, secondary, outline) funktionieren
```

---

## 2️⃣ Integration Tests (Page Routes & User Flows)

### Priority: CRITICAL | Coverage Target: 100% kritische Flows

#### 2.1 Authentication Flows

```typescript
// __tests__/integration/auth.test.ts
- ✅ Magic Link Login - Vollständiger Flow
- ✅ Registration (Member) - Daten werden gespeichert
- ✅ Registration (Helper) - Admin-Approval benötigt
- ✅ Logout - Session wird gelöscht, keine stale Messages
- ✅ Protected Routes - Redirect zu /login wenn unauthenticated
- ✅ Role-based Access - Helper kann nicht auf /dashboard zugreifen
```

#### 2.2 Appointment Booking Flow

```typescript
// __tests__/integration/booking.test.ts
- ✅ SELECT CATEGORY → Mit 4 Kategorien aus constants
- ✅ ENTER DETAILS → Name, E-Mail, Beschreibung
- ✅ SELECT TIME → Zeigt verfügbare Slots
- ✅ CONFIRM → Bestätigung mit .ics Datei
- ✅ REDIRECT → Dashboard mit Termin angezeigt
- ✅ MAX 3 APPOINTMENTS - User kann nicht mehr als 3 buchen
- ✅ CANCEL WITHIN 2 DAYS - Vor Termin möglich
```

#### 2.3 Helper Dashboard

```typescript
// __tests__/integration/helper-dashboard.test.ts
- ✅ Helper sieht nur Termine in Fachbereichen
- ✅ Availability Grid zeigt aktuelle Woche
- ✅ Week Navigation funktioniert
- ✅ Slot-Toggle speichert Änderungen
- ✅ Member View - Kann zwischen Rollen wechseln
- ✅ Profile Edit - Speichert Kategorien & Daten
```

#### 2.4 Member Dashboard

```typescript
// __tests__/integration/member-dashboard.test.ts
- ✅ Zeigt nur gebuchte Termine (max 3)
- ✅ Termin Details (Helper-Name, Zeit, Link)
- ✅ "Termin stornieren" Button funktioniert
- ✅ Weiterleitung zu /book möglich
```

---

## 3️⃣ E2E Tests (Playwright/Cypress)

### Priority: HIGH | Coverage Target: 70% User Journeys

#### 3.1 Complete User Journey: Member

```typescript
// e2e/member-journey.spec.ts
1. Landing Page besuchen
2. "Termin buchen" klicken
3. Magic Link Login
4. Kategorie auswählen (z.B. Psychologische Beratung)
5. Details eingeben (Name, E-Mail, Beschreibung)
6. Verfügbare Slots anzeigen
7. Termin auswählen
8. Bestätigung mit Email-Vorschau
9. Dashboard zeigt neuen Termin
10. Termin stornieren (bis 2 Tage vor)
```

#### 3.2 Complete User Journey: Helper

```typescript
// e2e/helper-journey.spec.ts
1. Helper Registration mit Kategorien
2. Admin genehmigt Helferin
3. Login mit Magic Link
4. Helper Dashboard aufrufen
5. Verfügbarkeiten für nächste Woche setzen
6. Termin wird automatisch zugewiesen
7. Termin-Details anschauen
8. Video-Call Link (Jitsi) öffnen
9. Nach Termin: Feedback optional
```

#### 3.3 Admin Workflows

```typescript
// e2e/admin-workflows.spec.ts
1. Admin Login
2. Helper-Freischaltungsanfragen anschauen
3. Helper genehmigen
4. Helper ablehnen (optional)
5. Kategorien verwalten
6. Externe Beratungsstellen pflegen
```

---

## 4️⃣ Security & Permission Tests

### Priority: CRITICAL | RLS + DSGVO

#### 4.1 Row Level Security (RLS)

```typescript
// __tests__/security/rls.test.ts

// Appointments Table
- ❌ Member kann Termine von anderen Membern NICHT sehen
- ❌ Helper kann Termine außerhalb Fachbereich NICHT sehen
- ❌ Member kann Appointment von Helper NICHT modifizieren
- ❌ Helper kann nur eigene Verfügbarkeiten bearbeiten

// Users Table
- ❌ Niemand kann is_helper Flag selbst setzen
- ❌ Admin kann nur User mit role='admin' modifizieren
- ❌ User sieht nur sein eigenes Profil

// Availability Table
- ❌ User kann nur eigene Verfügbarkeiten sehen
- ❌ Booked Slots können nicht von Member gelöscht werden
```

#### 4.2 Authentication Tests

```typescript
// __tests__/security/auth.test.ts
- ✅ Magic Link Token nach 24h ungültig
- ✅ Session Hijacking unmöglich (secure cookies)
- ✅ CSRF Protection aktiv
- ✅ Rate Limiting auf Login-Endpoint
```

#### 4.3 DSGVO Compliance

```typescript
// __tests__/security/dsgvo.test.ts
- ✅ Einwilligung wird vor Datenspeicherung erfasst
- ✅ User kann Profil + Daten exportieren
- ✅ User kann Daten löschen (soft delete)
- ✅ Alte Daten werden nach 6 Monaten gelöscht
- ✅ Logs enthalten keine Diagnosen/sensiblen Daten
- ✅ Keine Daten an Dritte übermittelt
```

---

## 5️⃣ Performance Tests

### Priority: MEDIUM | Ziel: < 2s Buchungsflow

#### 5.1 Page Load Times

```typescript
// __tests__/performance/page-load.test.ts
- ✅ / (Landing) - < 1.5s
- ✅ /book - < 1.5s
- ✅ /helper/dashboard - < 2s
- ✅ /my-appointments - < 1.5s
```

#### 5.2 API Response Times

```typescript
// __tests__/performance/api.test.ts
- ✅ POST /api/appointments - < 500ms
- ✅ GET /api/availability - < 300ms
- ✅ GET /api/appointments - < 300ms
```

#### 5.3 PWA Performance

```typescript
// __tests__/performance/pwa.test.ts
- ✅ Service Worker registriert sich
- ✅ App Shell cacht sich
- ✅ Offline-Funktionalität funktioniert
- ✅ Install Zeit < 5 Sekunden
```

---

## 6️⃣ Validation & Data Integrity Tests

### Priority: HIGH

#### 6.1 Form Validation

```typescript
// __tests__/validation/forms.test.ts
- ✅ Appointment Form - Alle Felder Pflicht
- ✅ E-Mail Format - Ungültig wird rejected
- ✅ Phone Format - Optional, aber wenn Eingabe → validieren
- ✅ Max Length - Name (100), Beschreibung (500)
- ✅ German Only - Input Sprache prüfen (optional)
```

#### 6.2 Business Logic

```typescript
// __tests__/validation/business-logic.test.ts
- ✅ Max 3 Appointments pro Person
- ✅ Slot-Overlap Prevention - Keine doppelten Buchungen
- ✅ 45-Minute Duration - Automatisch gesetzt
- ✅ CEST Timezone - Alle Zeiten konvertiert
- ✅ Cancel Window - Nur bis 2 Tage vor Termin
- ✅ Only Video Calls - Jitsi Link generiert
```

#### 6.3 Data Constraints

```typescript
// __tests__/validation/constraints.test.ts
- ✅ Appointment.duration = 45min
- ✅ Helper.categories ⊆ CATEGORIES
- ✅ Appointment.status ∈ ['pending', 'confirmed', 'cancelled']
- ✅ Timestamps in CEST UTC+2
```

---

## 7️⃣ Email & Notification Tests

### Priority: MEDIUM

#### 7.1 Email Generation (Brevo)

```typescript
// __tests__/notifications/email.test.ts
- ✅ Booking Confirmation - An Member + Helper
- ✅ .ics Attachment - Kalender-kompatibel
- ✅ Jitsi Link - In E-Mail enthalten
- ✅ 24h Before - Reminder an beide
- ✅ Cancellation - Notification an beide
- ✅ Helper Approval - Admin erhält Anfrage
```

#### 7.2 Template Testing

```typescript
// __tests__/notifications/templates.test.ts
- ✅ German Text - Keine Englischen Reste
- ✅ HTML Rendering - Korrekte Formate
- ✅ Link Validity - Alle URLs funktionieren
- ✅ Personalization - {{name}}, {{date}} ersetzt
```

---

## 8️⃣ Browser & Device Compatibility

### Priority: MEDIUM

#### 8.1 Responsive Design

```typescript
// __tests__/compat/responsive.test.ts
- ✅ Mobile (375px) - iOS Safari
- ✅ Tablet (768px) - iPad
- ✅ Desktop (1920px) - Chrome, Firefox, Safari
- ✅ Touch Gestures - Kalender swipe funktioniert
```

#### 8.2 Browser Support

```
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
```

#### 8.3 PWA Compatibility

```typescript
- ✅ iOS (PWA Installation)
- ✅ Android (PWA Installation)
- ✅ Offline Mode - App funktioniert ohne Internet
```

---

## 9️⃣ Accessibility Tests

### Priority: MEDIUM | WCAG 2.1 AA Standard

#### 9.1 Manual Testing

```typescript
// __tests__/a11y/wcag.test.ts
- ✅ Keyboard Navigation - Alle Buttons mit Tab erreichbar
- ✅ Screen Reader - Labels & ARIA vorhanden
- ✅ Color Contrast - Mind. 4.5:1 Ratio
- ✅ Font Size - Mind. 14px lesbar
- ✅ Focus Indicators - Sichtbar bei Keyboard
```

#### 9.2 Automated Checks

```typescript
// Axe-core für automatische A11y Checks
- ✅ axe-core auf allen Pages
- ✅ Lighthouse Accessibility Score ≥ 90
```

---

## 🔟 Deployment & Smoke Tests

### Priority: CRITICAL | Vor jedem Release

#### 10.1 Smoke Tests (Production)

```typescript
// __tests__/smoke/production.test.ts
- ✅ Landing Page lädt
- ✅ Login funktioniert
- ✅ Booking Flow funktioniert
- ✅ Dashboard anzeigen
- ✅ Termin Details abrufen
- ✅ Helper Verfügbarkeiten speichern
```

#### 10.2 Database Health

```typescript
- ✅ Connection zu Supabase OK
- ✅ RLS Policies aktiv
- ✅ Backups laufen
- ✅ Performance OK (Response < 500ms)
```

---

## 📊 Testing Matrix

| Layer           | Framework        | Priority     | Coverage |
| --------------- | ---------------- | ------------ | -------- |
| **Unit**        | Jest             | MEDIUM       | 80%+     |
| **Integration** | Jest + SuperTest | HIGH         | 90%+     |
| **E2E**         | Playwright       | HIGH         | 70%+     |
| **Security**    | Manual + Custom  | **CRITICAL** | 100%     |
| **Performance** | Lighthouse       | MEDIUM       | 85%+     |
| **A11y**        | Axe + Manual     | MEDIUM       | 90%+     |

---

## 🚀 Testing Workflow

### Development

```bash
# Unit + Integration Tests
npm run test

# Watch Mode
npm run test:watch

# Coverage Report
npm run test:coverage
```

### Pre-Deployment

```bash
# Alle Tests + E2E
npm run test:all

# Lighthouse
npm run lighthouse

# Security Scan
npm run security:scan
```

### Production Monitoring

```bash
# Sentry für Error Tracking
# LogRocket für Session Replay
# DataDog für Performance Monitoring
```

---

## ✅ Definition of Done

Bevor MVP deployed wird, müssen erfüllt sein:

- [ ] Unit Test Coverage ≥ 80%
- [ ] Alle kritischen Integration Tests grün
- [ ] Alle E2E User Journeys durchlaufen
- [ ] Security Audit bestanden (RLS, Auth, DSGVO)
- [ ] Performance Budget eingehalten (< 2s Booking Flow)
- [ ] WCAG 2.1 AA Standard erfüllt
- [ ] Keine Critical Security Vulnerabilities
- [ ] Browser Compatibility Check bestanden
- [ ] Load Testing ≥ 100 concurrent users
- [ ] Smoke Tests in Staging bestanden

---

## 📅 Testing Timeline

| Phase           | Woche | Fokus                  |
| --------------- | ----- | ---------------------- |
| **Development** | W1-W3 | Unit Tests schreiben   |
| **Integration** | W3-W4 | API & DB Tests         |
| **E2E**         | W4-W5 | User Journey Tests     |
| **Security**    | W5    | RLS, Auth, DSGVO Audit |
| **Performance** | W5    | Lighthouse, Load Tests |
| **Staging**     | W6    | Final Smoke Tests      |
| **Production**  | W6+   | Monitoring aktiv       |
