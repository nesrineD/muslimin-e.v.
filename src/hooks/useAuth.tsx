"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// ---------------------------------------------------------------------------
// Local User type — kept compatible with the rest of the app.
// role and is_helper are stored in Supabase user_metadata so they survive
// across sessions without a separate profiles table.
// ---------------------------------------------------------------------------
export type User = {
  id: string;
  email: string;
  role?: "member" | "helper" | "admin" | "event_admin";
  is_helper: boolean;
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

function mapSupabaseUser(sbUser: SupabaseUser): User {
  const meta = sbUser.user_metadata ?? {};
  // role can be set server-side via app_metadata (more secure) or user_metadata
  const role =
    (sbUser.app_metadata?.role as User["role"]) ??
    (meta.role as User["role"]) ??
    "member";
  return {
    id: sbUser.id,
    email: sbUser.email ?? "",
    role,
    is_helper: Boolean(meta.is_helper),
    user_metadata: {
      full_name: meta.full_name,
      avatar_url: meta.avatar_url,
      vorname: meta.vorname,
      nachname: meta.nachname,
      telefon: meta.telefon,
      adresse: meta.adresse,
      plz: meta.plz,
      stadt: meta.stadt,
      interessen: meta.interessen,
      sichtbarkeit: meta.sichtbarkeit,
    },
  };
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  registerAsHelper: (selectedCategories: string[]) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    // Load the current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? mapSupabaseUser(session.user) : null);
      setLoading(false);
    });

    // Keep state in sync with Supabase auth events (tab focus, token refresh, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapSupabaseUser(session.user) : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error || !data.user) return null;
    const mappedUser = mapSupabaseUser(data.user);
    setUser(mappedUser);
    return mappedUser;
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  const registerAsHelper = async (
    selectedCategories: string[], // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<boolean> => {
    if (!user) return false;
    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      data: { is_helper: true },
    });
    if (!error && data.user) {
      setUser(mapSupabaseUser(data.user));
    }
    setLoading(false);
    return !error;
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

// User is already exported above as a named export — no re-export needed.
