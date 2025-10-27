# End-to-End Tests mit Playwright

Dieses Verzeichnis enthält die End-to-End (E2E) Tests für die Muslimin-Beratung Terminbuchungsplattform.

## 📋 Überblick

Die E2E Tests validieren die kompletten User Journeys und kritischen Funktionen der Anwendung:

### Test Suites

1. **member-journey.spec.ts** - Vollständiger Buchungsflow für Vereinsmitglieder
   - Landing Page → Login → Kategorie auswählen → Details eingeben → Termin buchen → Dashboard
   - Maximal 3 Termine Limitierung
   - Termin-Stornierung
   - Protected Routes
   - Navigation

2. **helper-journey.spec.ts** - Helferin Workflows
   - Helper Registration
   - Verfügbarkeits-Management
   - Termin-Zuweisung
   - Rollenbasierter Zugriff
   - DSGVO-konforme Dateneinsicht

3. **authentication.spec.ts** - Authentifizierung & Authorization
   - Mock Login Flow
   - Registration (Member & Helper)
   - Logout
   - Protected Routes
   - Role-Based Access Control
   - Session Management

4. **public-pages.spec.ts** - Öffentliche Seiten & UI
   - Landing Page
   - About, Beratungsstellen, Legal Pages
   - Navigation & Header
   - Responsive Design (Mobile, Tablet, Desktop)
   - PWA Features
   - Accessibility
   - Performance

## 🚀 Installation

### 1. Playwright installieren

```bash
npm install -D @playwright/test
```

### 2. Browser installieren

```bash
npx playwright install
```

Oder nur Chromium für schnellere Tests:

```bash
npx playwright install chromium
```

## ▶️ Tests ausführen

### Alle Tests ausführen

```bash
npm run test:e2e
```

### Tests im UI Mode (empfohlen für Development)

```bash
npm run test:e2e:ui
```

### Tests im Headed Mode (Browser sichtbar)

```bash
npm run test:e2e:headed
```

### Tests im Debug Mode

```bash
npm run test:e2e:debug
```

### Einzelne Test-Datei ausführen

```bash
npx playwright test e2e/member-journey.spec.ts
```

### Spezifischen Test ausführen

```bash
npx playwright test -g "Vollständiger Buchungsflow"
```

### Tests in bestimmtem Browser ausführen

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Test Report anzeigen

Nach dem Test-Run:

```bash
npm run test:e2e:report
```

## 🎯 Test Coverage

Die E2E Tests decken folgende User Journeys ab:

### Member Journey
- ✅ Termin buchen (vollständiger Flow)
- ✅ Maximal 3 Termine Regel
- ✅ Termin stornieren (2-Tage-Regel)
- ✅ Protected Routes
- ✅ Navigation zwischen Seiten

### Helper Journey
- ✅ Helper Registration
- ✅ Verfügbarkeiten setzen (Kalender)
- ✅ Week Navigation
- ✅ Zugewiesene Termine einsehen
- ✅ Rollenbasierter Zugriff
- ✅ DSGVO-konforme Dateneinsicht

### Authentication
- ✅ Mock Login (alle Test-Accounts)
- ✅ Member Registration
- ✅ Helper Registration mit Admin-Approval
- ✅ Logout & Session-Verwaltung
- ✅ Protected Routes Redirect
- ✅ Role-Based Access Control
- ✅ Session über Page-Reloads & Tabs

### Public Pages & UI
- ✅ Landing Page
- ✅ About, Beratungsstellen
- ✅ Legal Pages (Impressum, Datenschutz, AGB)
- ✅ Navigation & Header
- ✅ Responsive Design (375px - 1920px)
- ✅ PWA Features (Manifest, Service Worker)
- ✅ Accessibility (Headings, Alt-Text, Labels)
- ✅ Performance (Load Times)

## 🧪 Test-Accounts

Die Tests verwenden folgende Mock-Accounts:

| E-Mail                     | Name               | Rolle             |
| -------------------------- | ------------------ | ----------------- |
| `mitglied@email.com`       | Zahra Ahmed        | Member            |
| `helper@email.com`         | Sainab Hassan      | Helper            |
| `helpermitglied@email.com` | Fatima El-Mansouri | Member+Helper     |

## 🔧 Konfiguration

Die Playwright-Konfiguration befindet sich in `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Test Directory**: `./e2e`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile Testing**: Pixel 5, iPhone 12
- **Web Server**: Automatischer Start des Dev-Servers
- **Retries**: 2x auf CI, 0x lokal
- **Reporter**: HTML Report
- **Screenshots**: Bei Fehlern
- **Traces**: Bei fehlgeschlagenen Tests

## 📝 Best Practices

### Test-Struktur

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup vor jedem Test
    await page.goto('/');
  });

  test('Beschreibung des Tests', async ({ page }) => {
    // Test-Schritte
    await expect(page).toHaveTitle(/Expected/);
  });
});
```

### Selektoren

Verwende in dieser Reihenfolge:

1. **Role-basierte Selektoren** (bevorzugt)
   ```typescript
   page.getByRole('button', { name: /Anmelden/i })
   ```

2. **Label-basierte Selektoren**
   ```typescript
   page.getByLabel(/E-Mail/i)
   ```

3. **Test-IDs** (für komplexe Komponenten)
   ```typescript
   page.locator('[data-testid="calendar-slot"]')
   ```

4. **Text-Selektoren** (als Fallback)
   ```typescript
   page.getByText(/Willkommen/i)
   ```

### Assertions

```typescript
// Sichtbarkeit
await expect(element).toBeVisible();

// Text-Inhalt
await expect(element).toHaveText(/Expected Text/i);

// URL
await expect(page).toHaveURL(/\/dashboard/);

// Attribute
await expect(element).toHaveAttribute('data-available', 'true');
```

### Waits & Timeouts

```typescript
// Warte auf URL-Änderung
await page.waitForURL(/\/dashboard/);

// Warte auf Element
await expect(element).toBeVisible({ timeout: 10000 });

// Warte auf Netzwerk-Idle
await page.waitForLoadState('networkidle');
```

## 🐛 Debugging

### Debug Mode starten

```bash
npm run test:e2e:debug
```

### Screenshots bei Fehlern

Screenshots werden automatisch bei fehlgeschlagenen Tests erstellt und im Test Report angezeigt.

### Traces

Traces werden bei fehlgeschlagenen Tests aufgezeichnet und können im Playwright Inspector angezeigt werden.

### Console Logs

```typescript
page.on('console', msg => console.log(msg.text()));
```

## 🔗 Nützliche Links

- [Playwright Dokumentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selektoren Guide](https://playwright.dev/docs/selectors)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## 📌 Hinweise

### Voraussetzungen

- Node.js 18+
- Next.js Dev Server läuft auf Port 3000
- Playwright-Browser installiert

### CI/CD

Die Tests können in CI/CD Pipelines integriert werden:

```yaml
# GitHub Actions Example
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E Tests
  run: npm run test:e2e
```

### Performance

- Tests laufen parallel (konfigurierbar in `playwright.config.ts`)
- Auf CI: 1 Worker, lokal: CPU-basiert
- Durchschnittliche Test-Laufzeit: ~2-5 Minuten (alle Tests)

## ✨ Neue Tests hinzufügen

1. Erstelle neue `.spec.ts` Datei in `/e2e`
2. Importiere Playwright Test Framework
3. Schreibe Test mit aussagekräftiger Beschreibung
4. Verwende Best Practices für Selektoren
5. Füge Assertions hinzu
6. Teste lokal mit `npm run test:e2e:ui`

Beispiel:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Neue Feature', () => {
  test('sollte X tun', async ({ page }) => {
    await page.goto('/');
    // Test-Schritte...
    await expect(page).toHaveTitle(/Expected/);
  });
});
```
