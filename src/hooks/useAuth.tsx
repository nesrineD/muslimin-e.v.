"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define a mock user structure with roles
type User = {
  id: string;
  email: string;
  is_helper: boolean; // Whether user has registered as helper
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    vorname?: string;
    nachname?: string;
    telefon?: string;
    adresse?: string;
    plz?: string;
    stadt?: string;
    interessen?: string;
    sichtbarkeit?: "ja" | "plz" | "nein";
  };
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  registerAsHelper: (categories: string[]) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - Personas from flow.md with proper helper registration status
const mockUsers: Record<string, User> = {
  "helper@email.com": {
    id: "helper-sainab-001",
    email: "helper@email.com",
    is_helper: true, // Sainab is registered as helper
    user_metadata: {
      full_name: "Sainab Helper",
      vorname: "Sainab",
      nachname: "Helper",
      avatar_url:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face",
      telefon: "+49 30 12345678",
      adresse: "Hermannstraße 45",
      plz: "12049",
      stadt: "Berlin Neukölln",
      interessen: "Psychologische Beratung, Traumatherapie, Familienberatung",
      sichtbarkeit: "ja",
    },
  },
  "mitglied@email.com": {
    id: "mitglied-zahra-002",
    email: "mitglied@email.com",
    is_helper: false, // Zahra is only a member, not registered as helper
    user_metadata: {
      full_name: "Zahra Mitglied",
      vorname: "Zahra",
      nachname: "Mitglied",
      avatar_url:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      telefon: "+49 30 23456789",
      adresse: "Sonnenallee 123",
      plz: "12045",
      stadt: "Berlin Neukölln",
      interessen: "Frauensport, Gemeinsame Aktivitäten, Deutschkurse",
      sichtbarkeit: "plz",
    },
  },
  "helpermitglied@email.com": {
    id: "helpermitglied-fatima-003",
    email: "helpermitglied@email.com",
    is_helper: true, // Fatima is both member and helper
    user_metadata: {
      full_name: "Fatima HelperMitglied",
      vorname: "Fatima",
      nachname: "HelperMitglied",
      avatar_url:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      telefon: "+49 30 34567890",
      adresse: "Karl-Marx-Straße 78",
      plz: "12043",
      stadt: "Berlin Neukölln",
      interessen: "Sozialberatung, Schwangerschaftsbegleitung, Jugendarbeit",
      sichtbarkeit: "ja",
    },
  },
  "mitglied2@email.com": {
    id: "mitglied-amina-004",
    email: "mitglied2@email.com",
    is_helper: false, // Amina is only a member, not registered as helper, no booked appointments
    user_metadata: {
      full_name: "Amina Mitglied",
      vorname: "Amina",
      nachname: "Mitglied",
      avatar_url:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      telefon: "+49 30 45678901",
      adresse: "Weserstraße 56",
      plz: "12047",
      stadt: "Berlin Neukölln",
      interessen: "Sprachkurse, Kulturelle Veranstaltungen, Kinderbetreuung",
      sichtbarkeit: "nein",
    },
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status (e.g., from localStorage or cookies)
    const timer = setTimeout(() => {
      // Check if user was previously logged in (in real app, check localStorage/cookies)
      const wasLoggedIn = localStorage.getItem("auth-status") === "logged-in";
      const currentUserEmail = localStorage.getItem("current-user-email");

      if (wasLoggedIn && currentUserEmail) {
        const persona = mockUsers[currentUserEmail];
        if (persona) {
          setUser(persona);
        }
      }
      setLoading(false);
    }, 500); // 500ms delay to simulate network request

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock login validation - accepts personas with correct password
    if (password !== "pwd") {
      setLoading(false);
      return false; // Wrong password
    }

    // Find the persona by email
    const persona = mockUsers[email.toLowerCase()];
    if (!persona) {
      setLoading(false);
      return false; // User not found
    }

    // Set user as logged in and persist to localStorage
    setUser(persona);
    localStorage.setItem("auth-status", "logged-in");
    localStorage.setItem("current-user-email", email.toLowerCase());
    setLoading(false);
    return true; // Login successful
  };

  const signOut = async (): Promise<void> => {
    console.log("signOut: Starting logout process...");
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Clear user data
      setUser(null);
      localStorage.removeItem("auth-status");
      localStorage.removeItem("current-user-email");

      // Clear any other auth-related localStorage items
      localStorage.removeItem("demo_current_user");

      console.log(
        "signOut: Logout completed successfully, localStorage cleared"
      );
    } catch (error) {
      console.error("signOut: Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerAsHelper = async (categories: string[]): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update the user to mark them as helper
    const updatedUser = { ...user, is_helper: true };
    setUser(updatedUser);

    // Update localStorage with new user data
    const currentEmail = localStorage.getItem("current-user-email");
    if (currentEmail) {
      // In a real app, this would update the database
      mockUsers[currentEmail] = updatedUser;
    }

    setLoading(false);
    return true; // Registration successful
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, registerAsHelper }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
