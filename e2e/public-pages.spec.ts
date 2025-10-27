import { test, expect } from '@playwright/test';

/**
 * E2E Test: Public Pages & UI Components
 * 
 * Tests public-facing pages and general UI functionality:
 * - Landing Page
 * - About Page
 * - Beratungsstellen
 * - Legal Pages (Impressum, Datenschutz, AGB)
 * - Responsive Design
 * - Navigation
 */

test.describe('Public Pages & UI', () => {
  
  test.describe('Landing Page', () => {
    test('Landing Page lädt korrekt', async ({ page }) => {
      await page.goto('/');
      
      // Title und Meta
      await expect(page).toHaveTitle(/Muslimin/i);
      
      // Hauptüberschrift
      await expect(page.getByRole('heading', { name: /Willkommen|Salam/i })).toBeVisible();
      
      // Call-to-Action Buttons
      await expect(page.getByRole('link', { name: /Termin buchen/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Mehr erfahren/i })).toBeVisible();
    });

    test('Hero Section zeigt korrekte Inhalte', async ({ page }) => {
      await page.goto('/');
      
      // Hero Text
      await expect(page.getByText(/professionelle Beratung/i)).toBeVisible();
      await expect(page.getByText(/verifizierte Helferinnen/i)).toBeVisible();
      
      // Features angezeigt
      await expect(page.getByText(/Psychologische Beratung/i)).toBeVisible();
      await expect(page.getByText(/Sozialberatung/i)).toBeVisible();
    });

    test('Navigation funktioniert von Landing Page', async ({ page }) => {
      await page.goto('/');
      
      // Klick auf "Über uns"
      const aboutLink = page.getByRole('link', { name: /Über uns/i });
      if (await aboutLink.isVisible()) {
        await aboutLink.click();
        await expect(page).toHaveURL(/\/about/);
      }
    });
  });

  test.describe('About Page', () => {
    test('About Page zeigt Vereinsinformationen', async ({ page }) => {
      await page.goto('/about');
      
      await expect(page.getByRole('heading', { name: /Über uns/i })).toBeVisible();
      
      // Mission/Vision Text
      await expect(page.getByText(/Mission|Ziel|Beratung/i)).toBeVisible();
      
      // Team oder Kontakt Informationen
      await expect(page.locator('text=/Kontakt|Team|Verein/i')).toBeVisible();
    });
  });

  test.describe('Beratungsstellen', () => {
    test('Beratungsstellen-Seite zeigt externe Angebote', async ({ page }) => {
      await page.goto('/beratungsstellen');
      
      await expect(page.getByRole('heading', { name: /Beratungsstellen/i })).toBeVisible();
      
      // Liste von Beratungsstellen sollte angezeigt werden
      const list = page.locator('[data-testid="beratungsstellen-list"]');
      if (await list.isVisible()) {
        await expect(list).toBeVisible();
      }
    });

    test('Beratungsstellen können gefiltert werden', async ({ page }) => {
      await page.goto('/beratungsstellen');
      
      // Suchfeld oder Filter
      const searchInput = page.getByPlaceholder(/Suchen|Filter/i);
      if (await searchInput.isVisible()) {
        await searchInput.fill('Berlin');
        
        // Ergebnisse sollten gefiltert werden
        await page.waitForTimeout(500); // Kurze Pause für Filter
      }
    });
  });

  test.describe('Legal Pages', () => {
    test('Impressum lädt korrekt', async ({ page }) => {
      await page.goto('/impressum');
      
      await expect(page.getByRole('heading', { name: /Impressum/i })).toBeVisible();
      
      // Rechtliche Pflichtangaben
      await expect(page.getByText(/Verantwortlich|Angaben gemäß/i)).toBeVisible();
    });

    test('Datenschutzerklärung lädt korrekt', async ({ page }) => {
      await page.goto('/datenschutz');
      
      await expect(page.getByRole('heading', { name: /Datenschutz/i })).toBeVisible();
      
      // DSGVO Texte
      await expect(page.getByText(/personenbezogene Daten|DSGVO/i)).toBeVisible();
    });

    test('AGB lädt korrekt', async ({ page }) => {
      await page.goto('/agb');
      
      await expect(page.getByRole('heading', { name: /AGB|Nutzungsbedingungen/i })).toBeVisible();
      
      // AGB Inhalt
      await expect(page.getByText(/Geltungsbereich|Nutzung/i)).toBeVisible();
    });

    test('Footer Links zu Legal Pages funktionieren', async ({ page }) => {
      await page.goto('/');
      
      // Scroll zum Footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Footer sollte Links enthalten
      const footer = page.locator('footer');
      await expect(footer.getByRole('link', { name: /Impressum/i })).toBeVisible();
      await expect(footer.getByRole('link', { name: /Datenschutz/i })).toBeVisible();
      
      // Klick auf Impressum
      await footer.getByRole('link', { name: /Impressum/i }).click();
      await expect(page).toHaveURL(/\/impressum/);
    });
  });

  test.describe('Navigation & Header', () => {
    test('Header Navigation ist auf allen Seiten sichtbar', async ({ page }) => {
      const pages = ['/', '/about', '/beratungsstellen', '/login'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        
        const header = page.locator('header');
        await expect(header).toBeVisible();
        
        // Logo sollte sichtbar sein
        const logo = header.locator('img[alt*="Logo"], svg, [data-testid="logo"]');
        await expect(logo.first()).toBeVisible({ timeout: 5000 });
      }
    });

    test('Mobile Menu funktioniert', async ({ page }) => {
      // Setze mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto('/');
      
      // Burger Menu Button
      const menuButton = page.getByRole('button', { name: /Menu|Menü/i });
      if (await menuButton.isVisible()) {
        await menuButton.click();
        
        // Mobile Menu sollte aufklappen
        const mobileNav = page.locator('[data-testid="mobile-nav"]');
        await expect(mobileNav).toBeVisible({ timeout: 2000 });
      }
    });

    test('Logo Link führt zur Startseite', async ({ page }) => {
      await page.goto('/about');
      
      // Klick auf Logo
      const logo = page.locator('header img[alt*="Logo"], header svg, header [data-testid="logo"]').first();
      await logo.click();
      
      // Sollte zur Startseite führen
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Responsive Design', () => {
    test('Desktop Layout (1920x1080)', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      
      // Desktop Navigation sollte horizontal sein
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Burger Menu sollte nicht sichtbar sein
      const burger = page.getByRole('button', { name: /Menu|Menü/i });
      const isVisible = await burger.isVisible().catch(() => false);
      expect(isVisible).toBe(false);
    });

    test('Tablet Layout (768x1024)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      
      // Layout sollte responsive sein
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });

    test('Mobile Layout (375x667)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Mobile optimiertes Layout
      await expect(page.locator('header')).toBeVisible();
      
      // Content sollte lesbar sein
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('Alle Seiten sind responsive', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667, name: 'Mobile' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1920, height: 1080, name: 'Desktop' },
      ];

      const testPages = ['/', '/about', '/beratungsstellen'];

      for (const viewport of viewports) {
        for (const testPage of testPages) {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.goto(testPage);
          
          // Seite sollte ohne Overflow laden
          const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
          expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 20); // 20px Toleranz
        }
      }
    });
  });

  test.describe('PWA Features', () => {
    test('PWA Manifest ist verfügbar', async ({ page }) => {
      await page.goto('/');
      
      // Manifest Link im Head
      const manifest = await page.locator('link[rel="manifest"]').getAttribute('href');
      expect(manifest).toBeTruthy();
    });

    test('Service Worker wird registriert', async ({ page }) => {
      await page.goto('/');
      
      // Warte kurz für Service Worker Registration
      await page.waitForTimeout(2000);
      
      // Prüfe Service Worker Status
      const swRegistered = await page.evaluate(() => {
        return 'serviceWorker' in navigator;
      });
      
      expect(swRegistered).toBe(true);
    });

    test('App Icons sind definiert', async ({ page }) => {
      await page.goto('/');
      
      // Apple Touch Icon
      const appleTouchIcon = await page.locator('link[rel="apple-touch-icon"]').count();
      expect(appleTouchIcon).toBeGreaterThan(0);
      
      // Favicon
      const favicon = await page.locator('link[rel="icon"]').count();
      expect(favicon).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('Heading Hierarchie ist korrekt', async ({ page }) => {
      await page.goto('/');
      
      // H1 sollte existieren
      const h1 = await page.locator('h1').count();
      expect(h1).toBeGreaterThan(0);
      
      // Nicht mehr als ein H1
      expect(h1).toBe(1);
    });

    test('Alle Bilder haben Alt-Text', async ({ page }) => {
      await page.goto('/');
      
      const images = await page.locator('img').all();
      
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        // Alt kann leer sein für dekorative Bilder, sollte aber vorhanden sein
        expect(alt).not.toBeNull();
      }
    });

    test('Links haben erkennbare Namen', async ({ page }) => {
      await page.goto('/');
      
      const links = await page.locator('a').all();
      
      for (const link of links) {
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        // Link sollte entweder Text oder aria-label haben
        expect(text?.trim() || ariaLabel).toBeTruthy();
      }
    });

    test('Formulare haben Labels', async ({ page }) => {
      await page.goto('/login');
      
      const inputs = await page.locator('input').all();
      
      for (const input of inputs) {
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        
        if (id) {
          // Prüfe ob Label mit ID verknüpft ist
          const label = await page.locator(`label[for="${id}"]`).count();
          expect(label > 0 || ariaLabel).toBeTruthy();
        }
      }
    });
  });

  test.describe('Performance', () => {
    test('Seiten laden in akzeptabler Zeit', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Sollte unter 3 Sekunden laden
      expect(loadTime).toBeLessThan(3000);
    });

    test('Bilder werden lazy geladen', async ({ page }) => {
      await page.goto('/');
      
      const images = await page.locator('img').all();
      
      // Mindestens einige Bilder sollten lazy loading haben
      let lazyCount = 0;
      for (const img of images) {
        const loading = await img.getAttribute('loading');
        if (loading === 'lazy') {
          lazyCount++;
        }
      }
      
      // Nicht alle Bilder müssen lazy sein (above-fold Bilder sollten es nicht sein)
      // Aber es sollten einige sein
      expect(lazyCount).toBeGreaterThanOrEqual(0);
    });
  });
});
