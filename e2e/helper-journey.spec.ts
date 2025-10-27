import { test, expect } from '@playwright/test';

/**
 * E2E Test: Complete Helper Journey
 * 
 * Tests the full user flow for a Helferin:
 * 1. Helper Registration mit Kategorien
 * 2. Admin genehmigt Helferin (simuliert)
 * 3. Login
 * 4. Helper Dashboard aufrufen
 * 5. Verfügbarkeiten für nächste Woche setzen
 * 6. Termin wird automatisch zugewiesen (simuliert)
 * 7. Termin-Details anschauen
 * 8. Video-Call Link (Jitsi) prüfen
 */

test.describe('Helper Journey - Verfügbarkeit & Termine', () => {
  
  test('Vollständiger Helper-Flow: Registration bis Verfügbarkeits-Management', async ({ page }) => {
    // Step 1: Helper Registration
    await page.goto('/helper/register');
    
    await expect(page.getByRole('heading', { name: /Helper.*Registrierung/i })).toBeVisible();
    
    // Formular ausfüllen
    await page.getByLabel(/Vorname/i).fill('Sainab');
    await page.getByLabel(/Nachname/i).fill('Hassan');
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByLabel(/Postleitzahl/i).fill('20095');
    
    // Kategorien auswählen (z.B. Psychologische Beratung)
    const categoryCheckbox = page.getByLabel(/Psychologische Beratung/i);
    await categoryCheckbox.check();
    
    // Qualifikation/Beschreibung
    await page.getByLabel(/Qualifikation/i).fill('Diplom-Psychologin mit 5 Jahren Erfahrung');
    
    // Einwilligung DSGVO
    await page.getByLabel(/Datenschutz/i).check();
    
    // Absenden
    await page.getByRole('button', { name: /Registrierung absenden/i }).click();
    
    // Step 2: Bestätigung - Warte auf Admin-Freischaltung
    await expect(page.getByText(/Registrierung erfolgreich/i)).toBeVisible();
    await expect(page.getByText(/Administrator.*überprüfen/i)).toBeVisible();
  });

  test('Helper Login und Dashboard Zugriff', async ({ page }) => {
    // Step 3: Login als Helper
    await page.goto('/login');
    
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    // Sollte zum Helper Dashboard redirecten oder Link zum Dashboard anzeigen
    await page.waitForURL(/\/(dashboard|helper)/);
    
    // Step 4: Helper Dashboard aufrufen
    await page.goto('/helper/dashboard');
    
    await expect(page.getByRole('heading', { name: /Helper.*Dashboard/i })).toBeVisible();
    
    // Überprüfe, dass Helper-spezifische Elemente sichtbar sind
    await expect(page.getByText(/Verfügbarkeiten/i)).toBeVisible();
    await expect(page.getByText(/Termine/i)).toBeVisible();
  });

  test('Verfügbarkeiten setzen - Kalender-Interaktion', async ({ page }) => {
    // Login als Helper
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    // Step 5: Verfügbarkeiten für nächste Woche setzen
    await page.goto('/helper/availability');
    
    await expect(page.getByRole('heading', { name: /Verfügbarkeit/i })).toBeVisible();
    
    // Kalender sollte sichtbar sein
    const calendar = page.locator('[data-testid="availability-calendar"]');
    await expect(calendar).toBeVisible({ timeout: 5000 });
    
    // Wochentage sollten angezeigt werden
    await expect(page.getByText(/Montag/i)).toBeVisible();
    await expect(page.getByText(/Dienstag/i)).toBeVisible();
    
    // Klicke auf Zeitslots um Verfügbarkeit zu setzen
    const timeSlot = page.locator('[data-testid="time-slot"]').first();
    if (await timeSlot.isVisible()) {
      await timeSlot.click();
      
      // Status sollte sich ändern (z.B. Farbe oder Icon)
      await expect(timeSlot).toHaveAttribute('data-available', 'true');
    }
    
    // Speichern Button klicken
    const saveButton = page.getByRole('button', { name: /Speichern/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();
      
      // Erfolgsbestätigung
      await expect(page.getByText(/erfolgreich gespeichert/i)).toBeVisible();
    }
  });

  test('Week Navigation im Verfügbarkeits-Kalender', async ({ page }) => {
    // Login als Helper
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    await page.goto('/helper/availability');
    
    // Nächste Woche Navigation
    const nextWeekButton = page.getByRole('button', { name: /Nächste Woche/i });
    if (await nextWeekButton.isVisible()) {
      await nextWeekButton.click();
      
      // Kalender sollte aktualisiert werden
      await page.waitForTimeout(500); // Kurze Pause für Animation
    }
    
    // Vorherige Woche Navigation
    const prevWeekButton = page.getByRole('button', { name: /Vorherige Woche/i });
    if (await prevWeekButton.isVisible()) {
      await prevWeekButton.click();
      
      await page.waitForTimeout(500);
    }
  });

  test('Zugewiesene Termine anzeigen', async ({ page }) => {
    // Login als Helper
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    // Step 6 & 7: Termine anschauen
    await page.goto('/helper/dashboard');
    
    // Prüfe ob Termine angezeigt werden
    const appointmentsList = page.locator('[data-testid="appointments-list"]');
    
    if (await appointmentsList.isVisible()) {
      const appointments = page.locator('[data-testid="appointment-card"]');
      const count = await appointments.count();
      
      if (count > 0) {
        // Klicke auf ersten Termin für Details
        await appointments.first().click();
        
        // Termin-Details sollten sichtbar sein
        await expect(page.getByText(/Termin-Details/i)).toBeVisible();
        await expect(page.getByText(/Mitglied/i)).toBeVisible();
        await expect(page.getByText(/Zeit/i)).toBeVisible();
        
        // Step 8: Video-Call Link prüfen
        const jitsiLink = page.getByRole('link', { name: /Video.*Call/i });
        if (await jitsiLink.isVisible()) {
          await expect(jitsiLink).toHaveAttribute('href', /jitsi|meet/);
        }
      }
    }
  });

  test('Helper kann nur Termine im eigenen Fachbereich sehen', async ({ page }) => {
    // Login als Helper
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    await page.goto('/helper/dashboard');
    
    // Prüfe dass nur relevante Kategorien angezeigt werden
    const appointments = page.locator('[data-testid="appointment-card"]');
    const count = await appointments.count();
    
    // Alle angezeigten Termine sollten zur Helper-Kategorie gehören
    for (let i = 0; i < count; i++) {
      const appointment = appointments.nth(i);
      // Kategorie sollte zur Helper-Qualifikation passen
      await expect(appointment.getByText(/Psychologische Beratung|Sozialberatung/i)).toBeVisible();
    }
  });

  test('Rollenbasierter Zugriff - Helper+Member kann zwischen Ansichten wechseln', async ({ page }) => {
    // Login als Helper+Member
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('helpermitglied@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    // Sollte Navigation/Toggle für beide Rollen haben
    await page.goto('/dashboard');
    
    // Member Dashboard
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    
    // Switch zu Helper Ansicht
    const helperViewToggle = page.getByRole('link', { name: /Helper.*Bereich/i });
    if (await helperViewToggle.isVisible()) {
      await helperViewToggle.click();
      
      await page.waitForURL(/\/helper/);
      await expect(page.getByText(/Helper.*Dashboard/i)).toBeVisible();
    }
  });

  test('Helper Profil bearbeiten', async ({ page }) => {
    // Login als Helper
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    await page.goto('/helper/profile');
    
    // Profil-Formular sollte sichtbar sein
    await expect(page.getByRole('heading', { name: /Profil/i })).toBeVisible();
    
    // Kategorien können bearbeitet werden
    const categoryCheckbox = page.getByLabel(/Sozialberatung/i);
    if (await categoryCheckbox.isVisible()) {
      const wasChecked = await categoryCheckbox.isChecked();
      await categoryCheckbox.click();
      
      // Status sollte sich ändern
      await expect(categoryCheckbox).toBeChecked({ checked: !wasChecked });
    }
    
    // Speichern
    const saveButton = page.getByRole('button', { name: /Speichern/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();
      await expect(page.getByText(/erfolgreich.*aktualisiert/i)).toBeVisible();
    }
  });

  test('DSGVO - Vorabinformationen nur für zugewiesene Termine', async ({ page }) => {
    // Login als Helper
    await page.goto('/login');
    await page.getByLabel(/E-Mail/i).fill('helper@email.com');
    await page.getByRole('button', { name: /Anmelden/i }).click();
    
    await page.goto('/helper/dashboard');
    
    // Termine sollten angezeigt werden, aber sensible Daten nur nach Klick
    const appointments = page.locator('[data-testid="appointment-card"]');
    const count = await appointments.count();
    
    if (count > 0) {
      const firstAppointment = appointments.first();
      
      // Vor Klick: Nur Zeit und Kategorie sichtbar
      await expect(firstAppointment.getByText(/Uhr/i)).toBeVisible();
      
      // Nach Klick: Details anzeigen
      await firstAppointment.click();
      
      // Jetzt sollten mehr Details sichtbar sein
      await expect(page.getByText(/Beschreibung/i)).toBeVisible();
    }
  });
});
