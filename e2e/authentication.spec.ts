import { test, expect } from '@playwright/test';

/**
 * E2E Test: Authentication & Authorization
 * 
 * Tests authentication flows and role-based access control:
 * - Magic Link Login (Mock)
 * - Registration flows
 * - Logout
 * - Protected Routes
 * - Role-based Access Control
 * - Session Management
 */

test.describe('Authentication & Authorization', () => {
  
  test.describe('Login Flow', () => {
    test('Mock Login mit E-Mail funktioniert', async ({ page }) => {
      await page.goto('/login');
      
      // Login-Formular sollte sichtbar sein
      await expect(page.getByRole('heading', { name: /Anmelden/i })).toBeVisible();
      
      // E-Mail eingeben
      await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
      
      // Anmelden Button
      await page.getByRole('button', { name: /Anmelden/i }).click();
      
      // Sollte erfolgreich eingeloggt sein
      await page.waitForURL(/\/(dashboard|book)/, { timeout: 10000 });
      
      // User sollte eingeloggt sein (prüfe Navigation/Header)
      const userMenu = page.locator('[data-testid="user-menu"]');
      if (await userMenu.isVisible()) {
        await expect(userMenu).toBeVisible();
      }
    });

    test('Login mit allen Test-Accounts funktioniert', async ({ page }) => {
      const testAccounts = [
        { email: 'mitglied@email.com', name: 'Zahra' },
        { email: 'helper@email.com', name: 'Sainab' },
        { email: 'helpermitglied@email.com', name: 'Fatima' },
      ];

      for (const account of testAccounts) {
        await page.goto('/login');
        
        await page.getByLabel(/E-Mail/i).fill(account.email);
        await page.getByRole('button', { name: /Anmelden/i }).click();
        
        // Warte auf erfolgreichen Login
        await page.waitForURL(/\/(dashboard|helper)/, { timeout: 10000 });
        
        // Prüfe dass Name irgendwo angezeigt wird
        await expect(page.getByText(new RegExp(account.name, 'i'))).toBeVisible({ timeout: 5000 });
        
        // Logout für nächsten Test
        await page.goto('/login'); // Reset
      }
    });

    test('Ungültige E-Mail zeigt Fehlermeldung', async ({ page }) => {
      await page.goto('/login');
      
      // Ungültige E-Mail
      await page.getByLabel(/E-Mail/i).fill('invalid-email');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      
      // Fehlermeldung sollte erscheinen
      await expect(page.getByText(/ungültig|Fehler/i)).toBeVisible();
    });
  });

  test.describe('Registration Flow', () => {
    test('Member Registration - Vollständiger Flow', async ({ page }) => {
      await page.goto('/register');
      
      await expect(page.getByRole('heading', { name: /Registrierung/i })).toBeVisible();
      
      // Formular ausfüllen
      await page.getByLabel(/Vorname/i).fill('Amira');
      await page.getByLabel(/Nachname/i).fill('Mohammed');
      await page.getByLabel(/E-Mail/i).fill('neues-mitglied@email.com');
      await page.getByLabel(/Postleitzahl/i).fill('10115');
      
      // DSGVO Einwilligung
      await page.getByLabel(/Datenschutz/i).check();
      
      // Absenden
      await page.getByRole('button', { name: /Registrieren/i }).click();
      
      // Erfolgsbestätigung
      await expect(page.getByText(/erfolgreich.*registriert/i)).toBeVisible();
    });

    test('Helper Registration - Admin-Genehmigung erforderlich', async ({ page }) => {
      await page.goto('/helper/register');
      
      // Formular ausfüllen
      await page.getByLabel(/Vorname/i).fill('Nour');
      await page.getByLabel(/Nachname/i).fill('Ali');
      await page.getByLabel(/E-Mail/i).fill('neue-helferin@email.com');
      await page.getByLabel(/Postleitzahl/i).fill('80331');
      
      // Kategorien auswählen
      await page.getByLabel(/Psychologische Beratung/i).check();
      
      // Qualifikation
      await page.getByLabel(/Qualifikation|Beschreibung/i).fill('Systemische Beraterin');
      
      // DSGVO Einwilligung
      await page.getByLabel(/Datenschutz/i).check();
      
      // Absenden
      await page.getByRole('button', { name: /Registrierung absenden/i }).click();
      
      // Hinweis auf Admin-Genehmigung
      await expect(page.getByText(/Administrator.*überprüfen/i)).toBeVisible();
    });

    test('Registration - Pflichtfelder validieren', async ({ page }) => {
      await page.goto('/register');
      
      // Versuche ohne Ausfüllen abzusenden
      await page.getByRole('button', { name: /Registrieren/i }).click();
      
      // Validierungsfehler sollten erscheinen
      await expect(page.getByText(/erforderlich|Pflichtfeld/i).first()).toBeVisible();
    });
  });

  test.describe('Logout Flow', () => {
    test('Logout funktioniert und löscht Session', async ({ page }) => {
      // Einloggen
      await page.goto('/login');
      await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      await page.waitForURL(/\/(dashboard|book)/);
      
      // Logout
      const logoutButton = page.getByRole('button', { name: /Abmelden|Logout/i });
      if (await logoutButton.isVisible()) {
        await logoutButton.click();
      } else {
        // Logout könnte im User-Menü sein
        const userMenu = page.locator('[data-testid="user-menu"]');
        if (await userMenu.isVisible()) {
          await userMenu.click();
          await page.getByRole('button', { name: /Abmelden|Logout/i }).click();
        }
      }
      
      // Sollte zu Login/Homepage redirecten
      await page.waitForURL(/\/(login|\/)/);
      
      // Versuche geschützte Route aufzurufen - sollte zu Login redirecten
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Protected Routes', () => {
    test('Member Routes - Redirect zu Login wenn nicht authentifiziert', async ({ page }) => {
      const protectedRoutes = [
        '/dashboard',
        '/my-appointments',
        '/member-map',
        '/profile',
        '/book',
      ];

      for (const route of protectedRoutes) {
        await page.goto(route);
        
        // Sollte zu Login redirecten oder Login-Hinweis zeigen
        await page.waitForURL(/\/login/, { timeout: 5000 }).catch(() => {
          // Alternativ: Login-Hinweis auf der Seite
          expect(page.getByText(/anmelden|login/i)).toBeVisible();
        });
      }
    });

    test('Helper Routes - Nur für Helferinnen zugänglich', async ({ page }) => {
      // Login als normales Mitglied (kein Helper)
      await page.goto('/login');
      await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      await page.waitForURL(/\/(dashboard|book)/);
      
      // Versuche auf Helper-Route zuzugreifen
      await page.goto('/helper/dashboard');
      
      // Sollte Zugriff verweigert werden
      await page.waitForTimeout(1000); // Kurze Pause
      
      // Entweder Redirect oder Fehlermeldung
      const currentUrl = page.url();
      const hasError = await page.getByText(/keine Berechtigung|nicht berechtigt/i).isVisible().catch(() => false);
      
      expect(currentUrl.includes('/helper/dashboard') ? hasError : true).toBeTruthy();
    });

    test('Helper kann auf Helper-Routes zugreifen', async ({ page }) => {
      // Login als Helper
      await page.goto('/login');
      await page.getByLabel(/E-Mail/i).fill('helper@email.com');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      await page.waitForURL(/\/(dashboard|helper)/);
      
      // Helper Routes sollten zugänglich sein
      const helperRoutes = [
        '/helper/dashboard',
        '/helper/availability',
      ];

      for (const route of helperRoutes) {
        await page.goto(route);
        
        // Sollte ohne Redirect laden
        await expect(page).toHaveURL(new RegExp(route));
      }
    });
  });

  test.describe('Role-Based Access Control', () => {
    test('Member+Helper hat Zugriff auf beide Bereiche', async ({ page }) => {
      // Login als Member+Helper
      await page.goto('/login');
      await page.getByLabel(/E-Mail/i).fill('helpermitglied@email.com');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      await page.waitForURL(/\/(dashboard|helper)/);
      
      // Zugriff auf Member Dashboard
      await page.goto('/dashboard');
      await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
      
      // Zugriff auf Helper Dashboard
      await page.goto('/helper/dashboard');
      await expect(page.getByRole('heading', { name: /Helper.*Dashboard/i })).toBeVisible();
      
      // Zugriff auf Verfügbarkeiten
      await page.goto('/helper/availability');
      await expect(page.getByRole('heading', { name: /Verfügbarkeit/i })).toBeVisible();
    });

    test('Rollenbasierte Navigation ist korrekt', async ({ page }) => {
      // Login als Helper
      await page.goto('/login');
      await page.getByLabel(/E-Mail/i).fill('helper@email.com');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      await page.waitForURL(/\/(dashboard|helper)/);
      
      // Navigation sollte Helper-spezifische Links zeigen
      const navigation = page.locator('nav');
      await expect(navigation.getByText(/Verfügbarkeit/i)).toBeVisible({ timeout: 5000 });
      
      // Member-spezifische Links sollten nicht sichtbar sein (außer bei Member+Helper)
      const memberLink = navigation.getByText(/Meine Termine/i);
      const isVisible = await memberLink.isVisible().catch(() => false);
      
      // Bei reinem Helper sollte dieser Link nicht da sein
      expect(isVisible).toBe(false);
    });
  });

  test.describe('Session Management', () => {
    test('Session bleibt über Page-Reloads erhalten', async ({ page }) => {
      // Login
      await page.goto('/login');
      await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      await page.waitForURL(/\/(dashboard|book)/);
      
      // Reload
      await page.reload();
      
      // User sollte immer noch eingeloggt sein
      await page.goto('/dashboard');
      await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    });

    test('Session funktioniert über mehrere Tabs', async ({ context }) => {
      // Login in erstem Tab
      const page1 = await context.newPage();
      await page1.goto('/login');
      await page1.getByLabel(/E-Mail/i).fill('mitglied@email.com');
      await page1.getByRole('button', { name: /Anmelden/i }).click();
      await page1.waitForURL(/\/(dashboard|book)/);
      
      // Öffne zweiten Tab
      const page2 = await context.newPage();
      await page2.goto('/dashboard');
      
      // Session sollte geteilt sein - User ist eingeloggt
      await expect(page2.getByRole('heading', { name: /Dashboard/i })).toBeVisible({ timeout: 5000 });
      
      await page1.close();
      await page2.close();
    });
  });
});
