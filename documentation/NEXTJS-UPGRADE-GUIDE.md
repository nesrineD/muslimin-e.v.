# Next.js Upgrade Guide: 14.2.33 → 15.1+ (Latest)

## 📊 Versions-Übersicht

| Komponente | Aktuell | Ziel | Status |
|-----------|---------|------|--------|
| Next.js | 14.2.33 | 15.1+ | 🔴 Update needed |
| React | 18 | 18 | ✅ OK |
| TypeScript | 5 | 5+ | ✅ OK |
| Node.js | 18+ | 20+ | ⚠️ Empfohlen |

---

## 🚀 Upgrade-Plan (Schritt für Schritt)

### Phase 1: Vorbereitung (Checkpoint #1)

#### 1.1 Backup erstellen
```bash
# Erstelle einen Backup-Branch
git checkout -b backup/v14.2.33
git push origin backup/v14.2.33

# Zurück zum Feature Branch
git checkout feature/refactoring
```

#### 1.2 Current State dokumentieren
```bash
# Speichere aktuelle Versionen
npm list next react react-dom > current-versions.txt
```

#### 1.3 Node.js Version prüfen
```bash
node --version  # Sollte v18.x oder v20.x sein
npm --version   # Sollte v9.x oder höher sein
```

**Falls zu alt:**
```bash
# Mit nvm (Node Version Manager)
nvm install 20
nvm use 20
```

---

### Phase 2: Breaking Changes verstehen

#### 2.1 Hauptänderungen von v14 → v15+

| Feature | v14 | v15+ | Aktion |
|---------|-----|------|--------|
| App Router | ✅ Standard | ✅ Standard | Keine |
| React Server Components | Partial | ✅ Full | Prüfen |
| Dynamic Imports | ✅ Works | ✅ Updated | Check Code |
| Image Optimization | ✅ Works | ✅ Improved | Testen |
| Font Optimization | ✅ Works | ✅ Improved | Testen |
| Metadata API | ✅ Works | ✅ Works | Keine |

#### 2.2 Bekannte Breaking Changes

```typescript
// 🔴 DEPRECATED in v15+
import Image from 'next/future/image'  // ❌ Entfernen!

// ✅ CORRECT
import Image from 'next/image'

// 🔴 Old API
export const config = { runtime: 'nodejs' }  // Deprecated

// ✅ NEW API  
export const runtime = 'nodejs'  // v15+
```

---

### Phase 3: Dependencies aktualisieren

#### 3.1 Interaktives Update (EMPFOHLEN)
```bash
# Clean install
rm -rf node_modules package-lock.json

# Upgrade Next.js und verwandte Pakete
npm install next@latest react@latest react-dom@latest
npm install -D @types/react@latest @types/react-dom@latest

# Update ESLint Config für Next.js 15+
npm install -D eslint-config-next@latest
```

#### 3.2 Update package.json direkt (Alternative)
```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint-config-next": "15.1.0"
  }
}
```

#### 3.3 Installation bestätigen
```bash
npm install

# Versionen überprüfen
npm list next react react-dom
```

**Erwartetes Output:**
```
next@15.1.0
react@18.3.0
react-dom@18.3.0
```

---

### Phase 4: Code-Migration

#### 4.1 App Router konfigurieren

**`next.config.mjs`** (aktualisieren):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode (empfohlen für v15+)
  reactStrictMode: true,
  
  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },

  // Experimental Features (optional)
  experimental: {
    // v15 Empfehlungen
    serverMinification: true,
    optimizePackageImports: [
      '@radix-ui/react-*',
      'lucide-react',
    ],
  },
}

export default nextConfig
```

#### 4.2 TypeScript aktualisieren

**`tsconfig.json`** (überprüfen):
```json
{
  "compilerOptions": {
    "lib": ["ES2020"],
    "target": "ES2020",
    "useDefineForClassFields": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

#### 4.3 ESLint für Next.js 15

**`.eslintrc.json`** (aktualisieren falls vorhanden):
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "@next/next/no-img-element": "warn"
  }
}
```

---

### Phase 5: Code-Anpassungen

#### 5.1 Imports aktualisieren

```typescript
// 🔴 OLD (v14)
import Image from 'next/image'
import { useRouter } from 'next/router'  // Pages Router

// ✅ NEW (v15+, App Router)
import Image from 'next/image'
import { useRouter } from 'next/navigation'  // App Router ✅
```

#### 5.2 React Server Components prüfen

```typescript
// ✅ Server Component (default in App Router)
export default function Page() {
  // Kann direkt Datenbank abfragen
  return <div>Server Content</div>
}

// 🔴 Client Component (mit 'use client')
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

#### 5.3 Problematische Patterns in deinem Code

**File**: `src/app/helper/dashboard/page.tsx`
```typescript
// 🔴 PROBLEM: UseAuth Hook an Server Component
export default function HelperDashboard() {
  const { user } = useAuth()  // ❌ useAuth kann nur in Client Components sein
}

// ✅ SOLUTION: Markiere als Client Component
'use client'
import { useAuth } from '@/hooks/useAuth'

export default function HelperDashboard() {
  const { user } = useAuth()  // ✅ OK jetzt
}
```

**File**: `src/hooks/useAuth.tsx` (bereits korrekt)
```typescript
'use client'  // ✅ Bereits vorhanden
// ...
```

---

### Phase 6: Testing & Validierung

#### 6.1 Build testen
```bash
# Development Build
npm run build

# Production Simulation
npm run start
```

**Erwartet:**
```
✓ Compiled successfully
✓ Ready in 1.5s
```

#### 6.2 Linting prüfen
```bash
npm run lint
```

**Sollte keine Critical Errors haben**

#### 6.3 Type Checking
```bash
npx tsc --noEmit
```

**Sollte ohne Fehler durchlaufen**

#### 6.4 Development Mode testen
```bash
npm run dev
```

**Checklist:**
- [ ] App lädt fehlerfrei
- [ ] Routes funktionieren
- [ ] Komponenten rendern
- [ ] Hooks funktionieren
- [ ] Keine Console Errors

#### 6.5 Feature-Tests
```bash
# Teste alle kritischen User Flows:
- [ ] Login funktioniert
- [ ] Termin buchen funktioniert
- [ ] Helper Dashboard funktioniert
- [ ] Calendar funktioniert
- [ ] Availability Grid funktioniert
```

---

### Phase 7: Performance-Optimierungen

#### 7.1 Lazy Loading aktivieren
```typescript
// ✅ Dynamic Imports (bereits in Code vorhanden)
const GridAvailabilityCalendar = dynamic(() => 
  import('@/components/calendar/GridAvailabilityCalendar'),
  { loading: () => <div>Loading...</div> }
)
```

#### 7.2 Image Optimization prüfen
```typescript
// ✅ Nutze Next.js Image Component
import Image from 'next/image'

export default function OptimizedImage() {
  return (
    <Image 
      src="/image.png" 
      alt="Description"
      width={1920}
      height={1080}
      priority // Für LCP-Images
    />
  )
}
```

#### 7.3 Bundle Size prüfen
```bash
npm install -D @next/bundle-analyzer
npm run analyze
```

---

### Phase 8: Deployment-Vorbereitung

#### 8.1 Environment Variables prüfen
```bash
# Überprüfe .env.local
cat .env.local

# Sollte enthalten:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

#### 8.2 Vercel Deployment (falls verwendet)
```bash
# Verbinde zu Vercel
npm i -g vercel
vercel env pull

# Deploy zu Staging
vercel --prod --skip-build
```

#### 8.3 Build-Ausgabe prüfen
```bash
npm run build

# Prüfe Output:
# ✓ Route (pages) sizes
# ✓ First Load JS shared by all
# ✓ Server Functions
```

---

## 🔍 Spezifische Probleme in deinem Code

### Issue #1: GridAvailabilityCalendar Syntax Error

**Datei**: `src/components/calendar/GridAvailabilityCalendar.tsx`

```typescript
// 🔴 AKTUELL: JSX Syntax Error (behebt sich wahrscheinlich mit v15 Build)

// ✅ PRÜFUNG:
1. Datei speichern & neu laden
2. npm run build
3. Falls Error bleibt: Siehe Phase 4.3
```

### Issue #2: Route Groups

**Datei**: `src/app/` (bereits korrekt)
```
✅ (auth)/
✅ (legal)/
✅ (member)/
```

Diese sind kompatibel mit v15+

---

## 📋 Checkliste für Upgrade

- [ ] **Phase 1**: Backup erstellt & Node.js v20+ installiert
- [ ] **Phase 2**: Breaking Changes verstanden
- [ ] **Phase 3**: Dependencies aktualisiert (`npm install`)
- [ ] **Phase 4**: Config-Dateien aktualisiert
- [ ] **Phase 5**: Code-Anpassungen durchgeführt
- [ ] **Phase 6.1**: `npm run build` erfolgreich
- [ ] **Phase 6.2**: `npm run lint` bestanden
- [ ] **Phase 6.3**: `npx tsc --noEmit` bestanden
- [ ] **Phase 6.4**: `npm run dev` läuft
- [ ] **Phase 6.5**: Feature-Tests bestanden
- [ ] **Phase 7**: Performance optimiert
- [ ] **Phase 8**: Deployment vorbereitet

---

## 🚀 Quick Migration (für Profis)

Falls du schnell upgraden willst:

```bash
# 1. Dependencies updaten
rm -rf node_modules package-lock.json
npm install next@latest react@latest react-dom@latest -D eslint-config-next@latest

# 2. Build testen
npm run build

# 3. Dev testen
npm run dev

# 4. Feature-Tests machen
# ... (manuell testen)

# 5. Commit
git add package.json package-lock.json next.config.mjs tsconfig.json
git commit -m "chore: upgrade next.js 14.2.33 → 15.1.0"
```

---

## ⚠️ Fallback-Plan (Falls Probleme)

Falls nach dem Upgrade Probleme auftreten:

```bash
# 1. Zurück zum Backup Branch
git checkout backup/v14.2.33

# 2. Oder Revert der letzten Commits
git revert HEAD~1

# 3. Oder Package Lock resetten
git checkout HEAD package-lock.json
npm install
```

---

## 🆘 Häufige Fehler & Lösungen

| Error | Ursache | Lösung |
|-------|--------|--------|
| `Module not found` | Falsche Imports | Check `useRouter` → `next/navigation` |
| `'use client' missing` | Hook ohne Client Component | Add `'use client'` oben in Datei |
| `Next version mismatch` | Alte Lock-Datei | `rm package-lock.json && npm install` |
| `Build fails with JSX` | Next Build Cache | `npm run build -- --no-cache` |

---

## 📚 Weitere Ressourcen

- **Upgrade Guide**: https://nextjs.org/docs/app/getting-started/upgrading
- **v15 Release Notes**: https://nextjs.org/blog/next-15
- **Migration Guide**: https://nextjs.org/docs/app/building-your-application/upgrading/version-15-migration-guide
- **API Reference**: https://nextjs.org/docs/app/api-reference

---

## 📞 Support bei Problemen

Falls du bei einem Schritt steckenbleibst:

1. **Kontrolliere** die Build-Ausgabe genau
2. **Google** den Fehler mit Version-Info: `"next.js 15" "error message"`
3. **Check** die [Next.js Discord Community](https://discord.gg/nextjs)
4. **Open Issue** auf [GitHub](https://github.com/vercel/next.js/issues)

---

## 🎯 Nach dem Upgrade

```bash
# Dokumentiere die neue Version
npm list next

# Aktualisiere DEVELOP-LEITFADEN.md
# Aktualisiere GitHub Actions (CI/CD)
# Deployment zu Production
```

**Status**: 🟢 Ready to upgrade!
