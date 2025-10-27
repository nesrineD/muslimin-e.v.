# Renovate Setup Guide

## Was ist Renovate?

Renovate ist ein automatisiertes Tool, das Ihre Projekt-Dependencies (npm-Pakete) aktuell hält. Es erstellt automatisch Pull Requests, wenn neue Versionen von Paketen verfügbar sind.

## Installation

### Schritt 1: Renovate GitHub App installieren

1. Besuchen Sie: https://github.com/apps/renovate
2. Klicken Sie auf **"Install"** oder **"Configure"**
3. Wählen Sie das Repository `nesrineD/muslimin-e.v.`
4. Bestätigen Sie die Installation

### Schritt 2: Initiale Pull Requests

Nach der Installation wird Renovate:

1. Das Repository scannen
2. Die `renovate.json` Konfiguration erkennen
3. Initial Pull Requests für veraltete Dependencies erstellen

**Wichtig**: Die ersten PRs können mehrere Updates enthalten. Prüfen Sie diese sorgfältig!

## Konfiguration (bereits erledigt ✅)

Die Datei `renovate.json` ist bereits konfiguriert mit:

### Zeitplan
- **Updates**: Montags vor 6:00 Uhr CEST
- **Lock File Maintenance**: Erster Tag des Monats vor 6:00 Uhr

### Automatische Merges
- ✅ Minor Updates (z.B. 1.2.0 → 1.3.0)
- ✅ Patch Updates (z.B. 1.2.0 → 1.2.1)
- ❌ Major Updates (z.B. 1.0.0 → 2.0.0) - Manuelle Prüfung erforderlich
- ❌ Version 0.x Pakete - Manuelle Prüfung erforderlich

### Gruppierte Updates

Zusammenhängende Pakete werden in einem PR gruppiert:
- React & React-DOM
- Next.js & ESLint Config
- Radix UI Komponenten
- FullCalendar Pakete
- TypeScript & Type Definitions
- ESLint & Prettier
- Tailwind CSS Pakete

### Sicherheitsupdates

- 🔐 Sicherheitslücken werden mit Label **"security"** markiert
- ⚠️ Werden **nicht** automatisch gemerged
- 🚨 Sollten zeitnah manuell geprüft und gemerged werden

## Nutzung

### Pull Requests prüfen

Renovate erstellt PRs mit:
- **Titel**: z.B. "Update dependency react to v18.3.0"
- **Beschreibung**: Changelog, Release Notes, Kompatibilität
- **Tests**: Automatische CI/CD Tests (falls konfiguriert)

### Manuelle Prüfung

Für Major Updates:
1. PR-Beschreibung lesen
2. Breaking Changes prüfen
3. Lokal testen falls nötig
4. Mergen oder schließen

### Automerge

Minor/Patch Updates werden automatisch gemerged wenn:
- ✅ Alle CI Tests bestanden (falls vorhanden)
- ✅ Keine Konflikte vorhanden
- ✅ Update ist nicht für v0.x Pakete

## Dashboard

Renovate Dashboard verfügbar unter:
```
https://github.com/nesrineD/muslimin-e.v./issues
```

Suchen Sie nach Issues mit Label **"dependencies"**

## Renovate deaktivieren

Falls Sie Renovate vorübergehend deaktivieren möchten:

### Option 1: Zeitweilig pausieren
Fügen Sie in `renovate.json` hinzu:
```json
{
  "enabled": false
}
```

### Option 2: App deinstallieren
GitHub → Settings → Applications → Renovate → Uninstall

## Troubleshooting

### Problem: Zu viele PRs
**Lösung**: Erhöhen Sie `prConcurrentLimit` in `renovate.json`

### Problem: Renovate erstellt keine PRs
**Checks**:
1. Ist die GitHub App installiert?
2. Hat Renovate Zugriff auf das Repository?
3. Sind alle Dependencies aktuell?

### Problem: Automerge funktioniert nicht
**Mögliche Ursachen**:
- CI/CD Tests schlagen fehl
- Branch Protection Rules blockieren Automerge
- Update ist ein Major Update

## Weiterführende Links

- [Renovate Dokumentation](https://docs.renovatebot.com)
- [Renovate GitHub App](https://github.com/apps/renovate)
- [Konfigurationsoptionen](https://docs.renovatebot.com/configuration-options/)

## Support

Bei Fragen oder Problemen:
1. Prüfen Sie die [Renovate Dokumentation](https://docs.renovatebot.com)
2. Erstellen Sie ein Issue im Repository
3. Kontaktieren Sie das Entwicklungsteam

---

**Erstellt**: Oktober 2025
**Status**: Bereit zur Aktivierung
