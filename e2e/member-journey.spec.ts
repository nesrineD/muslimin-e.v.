import { test, expect } from '@playwright/test';

/**
 * E2E Test: Complete Member Journey
 * 
 * Tests the full user flow for a Vereinsmitglied:
 * 1. Landing Page besuchen
 * 2. "Termin buchen" klicken
 * 3. Mock Login
 * 4. Kategorie auswählen (z.B. Psychologische Beratung)
 * 5. Details eingeben (Name, E-Mail, Beschreibung)
 * 6. Verfügbare Slots anzeigen
 * 7. Termin auswählen
 * 8. Bestätigung
 * 9. Dashboard zeigt neuen Termin
 * 10. Termin stornieren (bis 2 Tage vor)
 */

test.describe('Member Journey - Terminbuchung', () => {
  
  test.beforeEach(async ({ page }) => {
    // Start at the homepage
    await page.goto('/');
  });

  test('Vollständiger Buchungsflow: Von Landingpage bis Dashboard', async ({ page }) => {
    // Step 1: Landing Page überprüfen
    await expect(page).toHaveTitle(/Muslimin/i);
    await expect(page.getByRole('heading', { name: /Willkommen/i })).toBeVisible();

    // Step 2: "Termin buchen" Button finden und klicken
    const bookingButton = page.getByRole('link', { name: /Termin buchen/i });
    await expect(bookingButton).toBeVisible();
    await bookingButton.click();

    // Step 3: Login - Mock Authentication
    // Sollte entweder zum Login redirecten oder Mock-User verwenden
    await page.waitForURL(/\/(login|book)/);
    
    // Wenn Login-Seite, dann Mock-Login durchführen
    if (page.url().includes('/login')) {
      await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
      await page.getByRole('button', { name: /Anmelden/i }).click();
      
      // Warte auf Redirect nach erfolgreicher Authentifizierung
      await page.waitForURL('/book', { timeout: 10000 });
    }

    // Step 4: Kategorie auswählen
    await expect(page.getByRole('heading', { name: /Kategorie/i })).toBeVisible();
    
    // Wähle "Psychologische Beratung"
    const categoryCard = page.locator('text=Psychologische Beratung').first();
    await expect(categoryCard).toBeVisible();
    await categoryCard.click();

    // Step 5: Details eingeben
    await expect(page.getByRole('heading', { name: /Details/i })).toBeVisible();
    
    await page.getByLabel(/Vorname/i).fill('Zahra');
    await page.getByLabel(/Nachname/i).fill('Ahmed');
    await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
    await page.getByLabel(/Beschreibung/i).fill('Ich benötige Unterstützung bei persönlichen Herausforderungen.');

    // Weiter zur Terminauswahl
    await page.getByRole('button', { name: /Weiter/i }).click();

    // Step 6 & 7: Verfügbare Slots anzeigen und auswählen
    await expect(page.getByRole('heading', { name: /Termin/i })).toBeVisible();
    
    // Warte auf Kalender-Anzeige
    const calendarSlot = page.locator('[data-testid="calendar-slot"]').first();
    await expect(calendarSlot).toBeVisible({ timeout: 5000 });
    
    // Klicke auf den ersten verfügbaren Slot
    const availableSlot = page.locator('[data-available="true"]').first();
    if (await availableSlot.isVisible()) {
      await availableSlot.click();
    }

    // Step 8: Bestätigung
    const confirmButton = page.getByRole('button', { name: /Bestätigen/i });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    // Warte auf Erfolgsbestätigung
    await expect(page.getByText(/erfolgreich gebucht/i)).toBeVisible({ timeout: 10000 });

    // Step 9: Dashboard zeigt neuen Termin
    await page.goto('/dashboard');
    
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByText(/Psychologische Beratung/i)).toBeVisible();

    // Step 10: Termin stornieren prüfen (Button sollte sichtbar sein)
    const cancelButton = page.getByRole('button', { name: /Stornieren/i }).first();
    await expect(cancelButton).toBeVisible();
  });

  test('Maximal 3 Termine - Limitierung wird durchgesetzt', async ({ page }) => {
    // Login als Member
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    // Gehe zum Dashboard
    await page.goto('/dashboard');
    
    // Prüfe aktuelle Anzahl der Termine
    const appointmentCount = await page.locator('[data-testid="appointment-card"]').count();
    
    if (appointmentCount >= 3) {
      // Wenn bereits 3 Termine vorhanden, sollte Buchung nicht möglich sein
      await page.goto('/book');
      await expect(page.getByText(/maximale Anzahl.*erreicht/i)).toBeVisible();
    }
  });

  test('Termin stornieren - Bis 2 Tage vor Termin möglich', async ({ page }) => {
    // Login als Member mit bestehendem Termin
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    await page.goto('/my-appointments');
    
    // Prüfe ob Termine vorhanden sind
    const appointments = page.locator('[data-testid="appointment-card"]');
    const count = await appointments.count();
    
    if (count > 0) {
      // Klicke auf ersten Termin's Stornieren-Button
      const cancelButton = appointments.first().getByRole('button', { name: /Stornieren/i });
      
      // Button sollte nur verfügbar sein, wenn Termin > 2 Tage in Zukunft
      if (await cancelButton.isEnabled()) {
        await cancelButton.click();
        
        // Bestätigungsdialog
        await page.getByRole('button', { name: /Ja.*stornieren/i }).click();
        
        // Erfolgsbestätigung
        await expect(page.getByText(/erfolgreich storniert/i)).toBeVisible();
      }
    }
  });

  test('Protected Routes - Redirect zu Login wenn nicht authentifiziert', async ({ page }) => {
    // Versuche auf geschützte Route ohne Login zuzugreifen
    await page.goto('/dashboard');
    
    // Sollte zu Login redirecten
    await expect(page).toHaveURL(/\/login/);
  });

  test('Navigation zwischen Seiten funktioniert', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('mitglied@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    // Navigiere zu verschiedenen Seiten
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    
    await page.goto('/beratungsstellen');
    await expect(page.getByRole('heading', { name: /Beratungsstellen/i })).toBeVisible();
    
    await page.goto('/member-map');
    await expect(page.getByRole('heading', { name: /Mitgliederkarte/i })).toBeVisible();
    
    await page.goto('/profile');
    await expect(page.getByRole('heading', { name: /Profil/i })).toBeVisible();
  });
});
