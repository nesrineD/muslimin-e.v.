# Entwickler-Leitfaden: Muslimin-Beratung Platform

## 📚 Inhaltsverzeichnis

1. [Projekt-Übersicht](#projekt-übersicht)
2. [Technologie-Stack erklärt](#technologie-stack-erklärt)
3. [Projekt-Struktur](#projekt-struktur)
4. [Next.js Grundlagen](#nextjs-grundlagen)
5. [TypeScript Basics](#typescript-basics)
6. [React Hooks erklärt](#react-hooks-erklärt)
7. [Wichtige Dateien](#wichtige-dateien)
8. [Häufige Aufgaben](#häufige-aufgaben)
9. [Best Practices](#best-practices)

---

## 🎯 Projekt-Übersicht

Diese Plattform ermöglicht Vereinsmitgliedern, Termine für Beratungen zu buchen.

**Hauptfunktionen:**

- Terminbuchung für verschiedene Beratungstypen
- Verwaltung von Helferin-Profilen
- Mitglieder-Verwaltung
- Interaktive Karte der Mitglieder-Standorte

---

## 🛠️ Technologie-Stack erklärt

### Next.js 14

**Was ist das?** Ein React-Framework für Webseiten mit eingebauter Routing, Server-Side Rendering und mehr.

**Warum verwenden wir es?**

- Einfaches Routing: Ordner = URL-Pfad
- Schnelle Performance durch Server-Rendering
- Integrierte Optimierungen (Bilder, Fonts, etc.)

### TypeScript

**Was ist das?** JavaScript mit Typen-System.

**Beispiel:**

```typescript
// JavaScript (ohne Typen)
function greet(name) {
  return "Hello " + name;
}

// TypeScript (mit Typen)
function greet(name: string): string {
  return "Hello " + name;
}
```

**Vorteil:** Fehler werden beim Schreiben erkannt, nicht erst beim Ausführen!

### React

**Was ist das?** Eine Bibliothek zum Erstellen von Benutzeroberflächen.

**Kern-Konzept: Komponenten**

```tsx
// Eine einfache Komponente
function WelcomeMessage() {
  return (
    <div>
      <h1>Willkommen!</h1>
      <p>Schön, dass du da bist.</p>
    </div>
  );
}
```

### Tailwind CSS

**Was ist das?** Utility-first CSS Framework.

**Beispiel:**

```tsx
// Statt CSS zu schreiben:
// .button { background-color: blue; padding: 8px; border-radius: 4px; }

// Verwendest du Klassen direkt im HTML:
<button className="bg-blue-500 px-2 py-1 rounded">Klick mich</button>
```

---

## 📁 Projekt-Struktur

```
muslimin-e.v./
│
├── src/
│   ├── app/                    # Next.js App Router (Seiten)
│   │   ├── page.tsx           # Homepage (/)
│   │   │
│   │   ├── (auth)/            # Route-Group: Authentifizierung
│   │   │   ├── login/
│   │   │   │   └── page.tsx   # Login-Seite (/login)
│   │   │   └── register/
│   │   │       └── page.tsx   # Registrierung (/register)
│   │   │
│   │   ├── (legal)/           # Route-Group: Rechtliche Seiten
│   │   │   ├── agb/
│   │   │   │   └── page.tsx   # AGB (/agb)
│   │   │   ├── datenschutz/
│   │   │   │   └── page.tsx   # Datenschutz (/datenschutz)
│   │   │   └── impressum/
│   │   │       └── page.tsx   # Impressum (/impressum)
│   │   │
│   │   ├── (member)/          # Route-Group: Mitglieder-Bereich
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx   # Dashboard (/dashboard)
│   │   │   ├── my-appointments/
│   │   │   │   └── page.tsx   # Meine Termine (/my-appointments)
│   │   │   ├── profile/
│   │   │   │   └── page.tsx   # Profil (/profile)
│   │   │   └── member-map/
│   │   │       └── page.tsx   # Mitglieder-Karte (/member-map)
│   │   │
│   │   ├── helper/            # Helferin-Bereich
│   │   │   ├── register/
│   │   │   │   └── page.tsx   # Helferin-Registrierung
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx   # Helferin-Dashboard
│   │   │   └── availability/
│   │   │       └── page.tsx   # Verfügbarkeiten
│   │   │
│   │   ├── book/              # Terminbuchung
│   │   ├── about/             # Über uns
│   │   ├── beratungsstellen/  # Externe Beratungsstellen
│   │   ├── mitglied-werden/   # Mitglied werden
│   │   ├── pwa-guide/         # PWA Installation Guide
│   │   └── veranstaltungen/   # Veranstaltungen
│   │
│   ├── components/            # Wiederverwendbare UI-Komponenten
│   │   ├── calendar/          # Kalender-Komponenten
│   │   │   ├── AdvancedCalendar.tsx
│   │   │   └── OptimizedAvailabilityCalendar.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx     # Kopfzeile
│   │   │   ├── footer.tsx     # Fußzeile
│   │   │   └── cookie-banner.tsx
│   │   ├── map/               # Karten-Komponenten
│   │   │   ├── GoogleMap.tsx
│   │   │   ├── MemberMarker.tsx
│   │   │   └── ...
│   │   └── ui/                # Basis-Komponenten (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ...
│   │
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useAuth.tsx        # Authentifizierung-Logik
│   │   ├── useGoogleMaps.ts   # Google Maps Integration
│   │   └── use-toast.ts       # Toast-Notifications
│   │
│   ├── lib/                   # Hilfsfunktionen
│   │   ├── constants.ts       # Konstanten (Kategorien, etc.)
│   │   ├── animations.ts      # Animation-Varianten
│   │   ├── date-utils.ts      # Datums-Funktionen
│   │   ├── utils.ts           # Allgemeine Utilities
│   │   └── mock/              # Mock-Daten
│   │       └── users.ts       # Mock-User für Entwicklung
│   │
│   ├── services/              # API-Aufrufe, Datenbank-Logik
│   │   └── member-location.service.ts
│   │
│   └── types/                 # TypeScript Typ-Definitionen
│       ├── location.ts
│       └── google-maps.ts
│
├── public/                    # Statische Dateien (Bilder, etc.)
│   ├── manifest.json
│   └── images/
│
└── package.json              # Projekt-Abhängigkeiten
```

**💡 Hinweis zu Route-Groups:**

- Ordner mit `(name)` sind **unsichtbar in URLs**
- `(auth)/login/` → URL ist `/login` (nicht `/(auth)/login`)
- Dienen nur der Code-Organisation
- Können eigene Layouts haben

---

## 🚀 Next.js Grundlagen

### 1. **File-Based Routing**

Der Ordner-Name = URL-Pfad:

```
src/app/about/page.tsx                → /about
src/app/(auth)/login/page.tsx         → /login (nicht /(auth)/login!)
src/app/(member)/dashboard/page.tsx   → /dashboard
src/app/helper/register/page.tsx      → /helper/register
```

**💡 Wichtig:** Ordner mit `(name)` erscheinen **nicht** in der URL!

### 2. **page.tsx = Eine Seite**

```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>Über uns</h1>
      <p>Wir sind eine Beratungsplattform...</p>
    </div>
  );
}
```

### 3. **layout.tsx = Gemeinsames Layout**

```tsx
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Header /> {/* Auf jeder Seite */}
        {children} {/* Die spezifische Seite */}
        <Footer /> {/* Auf jeder Seite */}
      </body>
    </html>
  );
}
```

### 4. **"use client" vs Server Components**

```tsx
// Server Component (Standard)
// Läuft auf dem Server, kein JavaScript im Browser
export default function ServerPage() {
  return <div>Ich bin statisch</div>;
}

// Client Component
// Läuft im Browser, kann interaktiv sein
("use client");
import { useState } from "react";

export default function ClientPage() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Geklickt: {count} mal</button>
  );
}
```

**Regel:** Verwende `"use client"` nur wenn du:

- `useState`, `useEffect` oder andere Hooks brauchst
- Event Handler wie `onClick` verwendest
- Browser-APIs brauchst

### 5. **Route Groups (name) - Code-Organisation**

Route Groups sind Ordner mit Klammern, die **nur für Organisation** da sind:

```
src/app/
├── (auth)/              ← Unsichtbar in URL!
│   ├── login/          → URL: /login
│   └── register/       → URL: /register
├── (legal)/
│   ├── agb/           → URL: /agb
│   └── impressum/     → URL: /impressum
└── (member)/
    └── dashboard/     → URL: /dashboard
```

**Vorteile:**

- ✅ Bessere Code-Organisation
- ✅ URLs bleiben kurz und sauber
- ✅ Eigene Layouts pro Gruppe möglich
- ✅ Keine Auswirkung auf Routing

**Beispiel für Gruppen-Layout:**

```tsx
// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Nur Logo, kein Header */}
      {children}
    </div>
  );
}
```

// Client Component
// Läuft im Browser, kann interaktiv sein
("use client");
import { useState } from "react";

export default function ClientPage() {
const [count, setCount] = useState(0);
return (
<button onClick={() => setCount(count + 1)}>Geklickt: {count} mal</button>
);
}

````

**Regel:** Verwende `"use client"` nur wenn du:

- `useState`, `useEffect` oder andere Hooks brauchst
- Event Handler wie `onClick` verwendest
- Browser-APIs brauchst

---

## 📘 TypeScript Basics

### 1. **Basis-Typen**

```typescript
// Strings
const name: string = "Zahra";

// Numbers
const age: number = 25;

// Boolean
const isHelper: boolean = true;

// Arrays
const categories: string[] = ["Psychologische Beratung", "Sozialberatung"];

// Objects
const user: {
  name: string;
  age: number;
} = {
  name: "Zahra",
  age: 25,
};
````

### 2. **Interfaces & Types**

```typescript
// Interface = Struktur eines Objekts
interface User {
  id: string;
  email: string;
  is_helper: boolean;
  user_metadata: {
    full_name?: string; // ? = optional
    vorname?: string;
  };
}

// Verwendung
const user: User = {
  id: "123",
  email: "test@email.com",
  is_helper: false,
  user_metadata: {
    vorname: "Zahra",
  },
};
```

### 3. **Type für Props**

```typescript
// Komponente mit Props
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function MyButton({ text, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

// Verwendung
<MyButton text="Speichern" onClick={() => alert("Gespeichert!")} />
```

---

## 🪝 React Hooks erklärt

### 1. **useState** - Zustand verwalten

```tsx
"use client";
import { useState } from "react";

export default function Counter() {
  // [aktueller Wert, Funktion zum Ändern]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Anzahl: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### 2. **useEffect** - Seiteneffekte

```tsx
"use client";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  // Läuft nach dem ersten Rendern
  useEffect(() => {
    // Daten laden
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []); // [] = nur einmal ausführen

  if (!user) return <p>Lädt...</p>;
  return <p>Hallo {user.name}!</p>;
}
```

**Wichtig:** Das zweite Argument `[]` bestimmt, wann der Effect neu läuft:

- `[]` = nur beim ersten Rendern
- `[user]` = immer wenn sich `user` ändert
- Kein Argument = bei jedem Rendern

### 3. **useContext** - Globalen State teilen

```tsx
// 1. Context erstellen (z.B. in useAuth.tsx)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Provider um die App wrappen
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. In beliebiger Komponente verwenden
export function ProfileButton() {
  const { user } = useContext(AuthContext);
  return <button>Hallo {user?.name}</button>;
}
```

### 4. **Custom Hooks** - Eigene Logik wiederverwenden

```tsx
// hooks/useAuth.tsx
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth muss in AuthProvider verwendet werden");
  return context;
}

// Verwendung in Komponenten
function MyComponent() {
  const { user, signOut } = useAuth();
  // ...
}
```

---

## ⚠️ React Hooks - Regeln & Häufige Fehler

### **Die Regeln von Hooks**

React Hooks haben strikte Regeln, die **immer** befolgt werden müssen:

#### 1. **Nur auf Top-Level aufrufen**

❌ **FALSCH:**

```tsx
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(0); // Fehler!
  }
}
```

✅ **RICHTIG:**

```tsx
function MyComponent() {
  const [state, setState] = useState(0);

  if (condition) {
    // State hier verwenden
  }
}
```

#### 2. **Nur in React Functions aufrufen**

❌ **FALSCH:**

```tsx
function regularFunction() {
  const [state, setState] = useState(0); // Fehler!
}
```

✅ **RICHTIG:**

```tsx
function MyComponent() {
  const [state, setState] = useState(0); // ✓
}

function useMyCustomHook() {
  const [state, setState] = useState(0); // ✓
}
```

#### 3. **Immer in derselben Reihenfolge**

❌ **FALSCH:**

```tsx
function MyComponent({ showExtra }) {
  const [name, setName] = useState("");

  if (showExtra) {
    const [extra, setExtra] = useState(""); // Reihenfolge ändert sich!
  }

  const [age, setAge] = useState(0);
}
```

✅ **RICHTIG:**

```tsx
function MyComponent({ showExtra }) {
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");
  const [age, setAge] = useState(0);

  // extra nur verwenden wenn nötig
  if (showExtra) {
    console.log(extra);
  }
}
```

---

### **Häufige Hook-Fehler & Lösungen**

#### ❌ **Fehler 1: "Rendered more hooks than during the previous render"**

**Problem:** Hook wird bedingt oder in falscher Reihenfolge aufgerufen.

```tsx
// FALSCH - Berechnung im useState
const [selectedSlots, setSelectedSlots] = useState<Set<string>>(
  new Set(availableSlots.map((slot) => `${slot.dayOfWeek}-${slot.startTime}`))
);
```

**Lösung:** Verwende `useEffect` für Initialisierung:

```tsx
// RICHTIG
const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

useEffect(() => {
  const initialSlots = new Set(
    availableSlots.map((slot) => `${slot.dayOfWeek}-${slot.startTime}`)
  );
  setSelectedSlots(initialSlots);
}, [availableSlots]);
```

---

#### ❌ **Fehler 2: Unendliche Loops mit useEffect**

**Problem:** useEffect läuft immer wieder, weil Dependencies sich ständig ändern.

```tsx
// FALSCH - Objekt wird bei jedem Render neu erstellt
const config = { theme: "dark" };

useEffect(() => {
  applyConfig(config);
}, [config]); // config ist immer "neu"!
```

**Lösung 1:** Primitive Werte als Dependencies:

```tsx
const theme = "dark";

useEffect(() => {
  applyConfig({ theme });
}, [theme]);
```

**Lösung 2:** useMemo verwenden:

```tsx
const config = useMemo(() => ({ theme: "dark" }), []);

useEffect(() => {
  applyConfig(config);
}, [config]);
```

---

#### ❌ **Fehler 3: State wird nicht sofort aktualisiert**

**Problem:** setState ist asynchron!

```tsx
// FALSCH
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
  console.log(count); // Zeigt noch den ALTEN Wert!
}
```

**Lösung 1:** Verwende den nächsten Render:

```tsx
useEffect(() => {
  console.log(count); // Zeigt den neuen Wert
}, [count]);
```

**Lösung 2:** Functional Update:

```tsx
setCount((prevCount) => {
  const newCount = prevCount + 1;
  console.log(newCount); // Neuer Wert
  return newCount;
});
```

---

#### ❌ **Fehler 4: Alte State-Werte in Closures**

**Problem:** Event Handler "merken" sich alte State-Werte.

```tsx
// FALSCH
const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1); // count ist immer 0!
  }, 1000);

  return () => clearInterval(interval);
}, []); // count nicht in Dependencies!
```

**Lösung:** Functional Update verwenden:

```tsx
// RICHTIG
useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => prev + 1); // prev ist immer aktuell
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

### **Best Practices für Hooks**

#### 1. **useState Initialisierung**

❌ **Langsam:**

```tsx
const [data, setData] = useState(expensiveCalculation());
// expensiveCalculation() läuft bei JEDEM Render!
```

✅ **Schnell:**

```tsx
const [data, setData] = useState(() => expensiveCalculation());
// Lazy Initialization - läuft nur einmal
```

---

#### 2. **useEffect Dependencies**

**Regel:** Alle verwendeten Variablen müssen in Dependencies sein!

❌ **FALSCH:**

```tsx
useEffect(() => {
  fetchData(userId); // userId wird verwendet
}, []); // aber fehlt in Dependencies!
```

✅ **RICHTIG:**

```tsx
useEffect(() => {
  fetchData(userId);
}, [userId]); // userId ist in Dependencies
```

**Tipp:** ESLint Plugin `eslint-plugin-react-hooks` installieren!

```bash
npm install --save-dev eslint-plugin-react-hooks
```

---

#### 3. **Cleanup in useEffect**

Immer aufräumen bei:

- Timers (setTimeout, setInterval)
- Event Listeners
- Subscriptions
- API Requests

```tsx
useEffect(() => {
  // Setup
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // Cleanup
  return () => {
    clearInterval(timer);
  };
}, []);
```

---

#### 4. **Custom Hooks benennen**

Custom Hooks müssen mit `use` anfangen:

❌ **FALSCH:**

```tsx
function fetchUser() {
  // Kein "use"
  const [user, setUser] = useState(null);
  // ...
}
```

✅ **RICHTIG:**

```tsx
function useFetchUser() {
  // "use" am Anfang
  const [user, setUser] = useState(null);
  // ...
}
```

---

### **Nützliche Hooks-Cheatsheet**

| Hook          | Verwendung              | Beispiel                                              |
| ------------- | ----------------------- | ----------------------------------------------------- |
| `useState`    | Lokaler State           | `const [count, setCount] = useState(0)`               |
| `useEffect`   | Side Effects            | `useEffect(() => { fetch(...) }, [])`                 |
| `useContext`  | Globaler State          | `const value = useContext(MyContext)`                 |
| `useRef`      | DOM Referenz            | `const inputRef = useRef<HTMLInputElement>(null)`     |
| `useMemo`     | Teure Berechnung cachen | `const value = useMemo(() => compute(), [dep])`       |
| `useCallback` | Funktion cachen         | `const fn = useCallback(() => {...}, [dep])`          |
| `useReducer`  | Komplexer State         | `const [state, dispatch] = useReducer(reducer, init)` |

---

## 📄 Wichtige Dateien

### 1. **src/hooks/useAuth.tsx**

**Zweck:** Verwaltet die Authentifizierung (Login, Logout, aktueller User)

**Wichtige Teile:**

```tsx
// Typ-Definition
type User = {
  id: string;
  email: string;
  is_helper: boolean;
  user_metadata: { ... };
};

// Mock-Daten (später durch echte DB ersetzen)
const mockUsers: Record<string, User> = {
  "helper@email.com": { ... },
  "mitglied@email.com": { ... },
};

// Funktionen
const signIn = async (email: string, password: string) => {
  // Login-Logik
};

const signOut = async () => {
  // Logout-Logik
  localStorage.clear();
  setUser(null);
};
```

**Verwendung:**

```tsx
"use client";
import { useAuth } from "@/hooks/useAuth";

export default function MyPage() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) return <p>Lädt...</p>;
  if (!user) return <p>Nicht eingeloggt</p>;

  return (
    <div>
      <p>Eingeloggt als: {user.email}</p>
      <button onClick={signOut}>Ausloggen</button>
    </div>
  );
}
```

### 2. **src/lib/constants.ts**

**Zweck:** Zentrale Stelle für alle Konstanten (keine Duplikate!)

```typescript
// Kategorien als Objekt
export const CATEGORIES = {
  PSYCHOLOGICAL: "Psychologische Beratung",
  SOCIAL: "Sozialberatung",
  PREGNANCY: "Schwangerschaftsbegleitung",
  OTHER: "Andere Anliegen",
} as const;

// Kategorien als Array (für Listen)
export const CATEGORY_LIST = Object.values(CATEGORIES);

// Kategorien mit Details (für UI)
export const CATEGORY_DETAILS = [
  {
    id: "psychological",
    name: CATEGORIES.PSYCHOLOGICAL,
    icon: "💭",
    description: "Psychologische Unterstützung und Beratung",
  },
  // ...
];
```

**Verwendung:**

```tsx
import { CATEGORY_DETAILS } from "@/lib/constants";

export default function CategoryList() {
  return (
    <div>
      {CATEGORY_DETAILS.map((category) => (
        <div key={category.id}>
          <span>{category.icon}</span>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### 3. **src/lib/date-utils.ts**

**Zweck:** Datums-Funktionen für konsistente Formate

```typescript
import { format, addDays as dateFnsAddDays, parseISO } from "date-fns";
import { de } from "date-fns/locale";

// Sicheres Formatieren
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, "dd.MM.yyyy", { locale: de });
}

// Datum in Zukunft erstellen
export function createFutureDate(
  daysFromNow: number,
  hour: number = 0,
  minute: number = 0
): Date {
  const futureDate = dateFnsAddDays(new Date(), daysFromNow);
  futureDate.setHours(hour, minute, 0, 0);
  return futureDate;
}
```

**Verwendung:**

```tsx
import { createFutureDate, formatDate } from "@/lib/date-utils";

// Termin in 10 Tagen um 14:00 Uhr
const appointment = createFutureDate(10, 14, 0);

// Anzeigen
<p>Termin: {formatDate(appointment)}</p>;
```

### 4. **src/components/layout/header.tsx**

**Zweck:** Navigation und Logout-Funktionalität

**Wichtige Pattern:**

```tsx
const { user, loading, signOut } = useAuth();
const router = useRouter();

const handleSignOut = async () => {
  try {
    await signOut();
    // Weiterleitung zu sauberer Login-Seite
    setTimeout(() => {
      window.location.href = "/login";
    }, 50);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
```

---

## 🔧 Häufige Aufgaben

### **Neue Seite erstellen**

1. **Ordner + page.tsx erstellen:**

```bash
mkdir -p src/app/neue-seite
touch src/app/neue-seite/page.tsx
```

2. **Basis-Code schreiben:**

```tsx
// src/app/neue-seite/page.tsx
export default function NeueSeitePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Neue Seite</h1>
      <p>Inhalt hier...</p>
    </div>
  );
}
```

3. **Link zur Seite hinzufügen:**

```tsx
import Link from "next/link";

<Link href="/neue-seite">Zur neuen Seite</Link>;
```

### **Neue Komponente erstellen**

1. **Datei erstellen:**

```bash
touch src/components/MeineKomponente.tsx
```

2. **Komponente schreiben:**

```tsx
// src/components/MeineKomponente.tsx
interface MeineKomponenteProps {
  titel: string;
  beschreibung?: string;
}

export function MeineKomponente({ titel, beschreibung }: MeineKomponenteProps) {
  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{titel}</h2>
      {beschreibung && <p>{beschreibung}</p>}
    </div>
  );
}
```

3. **Verwenden:**

```tsx
import { MeineKomponente } from "@/components/MeineKomponente";

<MeineKomponente titel="Test" beschreibung="Das ist ein Test" />;
```

### **Formular mit State**

```tsx
"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Gesendet:", { name, email });
    // Hier würde API-Call kommen
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>E-Mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Absenden
      </button>
    </form>
  );
}
```

### **Daten aus API laden**

```tsx
"use client";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, 5)); // Nur 5 Posts
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Lädt...</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ✅ Best Practices

### 1. **Komponenten klein halten**

❌ **Schlecht:**

```tsx
function BigComponent() {
  // 500 Zeilen Code...
}
```

✅ **Gut:**

```tsx
function UserProfile() {
  return (
    <div>
      <UserAvatar />
      <UserInfo />
      <UserActions />
    </div>
  );
}
```

### 2. **Typen verwenden**

❌ **Schlecht:**

```tsx
function greet(name) {
  return "Hello " + name;
}
```

✅ **Gut:**

```tsx
function greet(name: string): string {
  return "Hello " + name;
}
```

### 3. **Konstanten statt Magic Strings**

❌ **Schlecht:**

```tsx
if (category === "Psychologische Beratung") { ... }
```

✅ **Gut:**

```tsx
import { CATEGORIES } from "@/lib/constants";

if (category === CATEGORIES.PSYCHOLOGICAL) { ... }
```

### 4. **Destructuring verwenden**

❌ **Schlecht:**

```tsx
const name = user.user_metadata.vorname;
const email = user.email;
```

✅ **Gut:**

```tsx
const {
  email,
  user_metadata: { vorname: name },
} = user;
```

### 5. **Frühe Returns**

❌ **Schlecht:**

```tsx
function UserProfile() {
  if (loading) {
    return <p>Lädt...</p>;
  } else {
    if (user) {
      return <div>{user.name}</div>;
    } else {
      return <p>Kein User</p>;
    }
  }
}
```

✅ **Gut:**

```tsx
function UserProfile() {
  if (loading) return <p>Lädt...</p>;
  if (!user) return <p>Kein User</p>;

  return <div>{user.name}</div>;
}
```

### 6. **Optionales Chaining**

❌ **Schlecht:**

```tsx
const name = user && user.user_metadata && user.user_metadata.vorname;
```

✅ **Gut:**

```tsx
const name = user?.user_metadata?.vorname;
```

---

## 🧪 Debugging-Tipps

### 1. **Console.log verwenden**

```tsx
function MyComponent() {
  const { user } = useAuth();

  console.log("User:", user);
  console.log("Is Helper?", user?.is_helper);

  return <div>...</div>;
}
```

### 2. **React DevTools** (Browser Extension)

- Installiere "React Developer Tools" in Chrome/Firefox
- Zeigt Komponenten-Hierarchie und State an

### 3. **TypeScript Fehler verstehen**

```
Property 'name' does not exist on type 'User'
```

→ Du versuchst auf `user.name` zuzugreifen, aber `User` hat kein `name` Property

**Lösung:** Prüfe die Type-Definition und verwende das richtige Property

---

## 🎓 Nächste Schritte zum Lernen

1. **Next.js Tutorial durcharbeiten:**
   https://nextjs.org/learn

2. **TypeScript Handbook:**
   https://www.typescriptlang.org/docs/handbook/intro.html

3. **React Docs (Beta):**
   https://react.dev/learn

4. **Tailwind CSS Docs:**
   https://tailwindcss.com/docs

5. **Kleine Änderungen machen:**
   - Text auf einer Seite ändern
   - Eine neue Seite erstellen
   - Eine Komponente duplizieren und anpassen
   - Styling mit Tailwind ändern

---

## 💡 Schnell-Referenz

### **Wichtige Befehle:**

```bash
npm run dev          # Entwicklungs-Server starten
npm run build        # Für Produktion bauen
npm run lint         # Code überprüfen
```

### **Datei-Import-Pfade:**

```tsx
import X from "@/components/X"     # @ = src/ Verzeichnis
import X from "./X"                # Relativ zum aktuellen Ordner
import X from "../X"               # Ein Ordner höher
```

### **Häufige Imports:**

```tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
```

---

## 📞 Hilfe bei Problemen

1. **Fehler in der Konsole lesen** (Browser DevTools → Console)
2. **TypeScript-Fehler beachten** (VSCode zeigt sie rot an)
3. **Nach Fehlermeldung googeln** (oft findet man Lösungen auf Stack Overflow)
4. **Code mit funktionierendem Beispiel vergleichen**

---

**Viel Erfolg beim Programmieren! 🚀**

Bei Fragen einfach melden oder spezifische Teile nachfragen.
