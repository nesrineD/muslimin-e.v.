"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { mockUsers, type User } from "@/lib/mock/users";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  registerAsHelper: (categories: string[]) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

// Re-export User type for use in other components
export type { User };
