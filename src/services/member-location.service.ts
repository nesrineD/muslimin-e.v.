import {
  LocationResponse,
  LocationUpdateRequest,
  LocationUpdateResponse,
  APIError,
  MemberLocation,
} from "@/types/location";
import { MockMemberLocationService } from "@/lib/mock/member-locations";

/**
 * Member Location Service
 *
 * Provides a consistent interface for member location data operations.
 * Currently uses mock data, but can be easily replaced with real API calls.
 *
 * Usage:
 * - In mock/demo mode: Uses MockMemberLocationService
 * - In production mode: Replace with real Supabase API calls
 */
export class MemberLocationService {
  private static isDemoMode =
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test" ||
    process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  /**
   * Set the current authenticated user for filtering
   * @param userId - Current user ID
   */
  static setCurrentUser(userId: string): void {
    if (this.isDemoMode) {
      MockMemberLocationService.setCurrentUser(userId);
    }
    // In production: Would store user context for API calls
  }

  /**
   * Get all visible member locations for map display
   * @returns Promise with member locations data
   */
  static async getMemberLocations(): Promise<LocationResponse> {
    if (this.isDemoMode) {
      return MockMemberLocationService.getMemberLocations();
    }

    // Production implementation would be:
    // const response = await fetch('/api/members/locations', {
    //   headers: { Authorization: `Bearer ${getAuthToken()}` }
    // });
    // return response.json();

    throw new Error("Production API not implemented yet");
  }

  /**
   * Update current user's location information
   * @param update - Location update data
   * @returns Promise with update result
   */
  static async updateMemberLocation(
    update: LocationUpdateRequest
  ): Promise<LocationUpdateResponse | APIError> {
    if (this.isDemoMode) {
      // In demo mode, we need a user ID - for now, get from mock data
      const currentUserId = await this.getCurrentUserId();
      if (!currentUserId) {
        return {
          success: false,
          error: "Benutzer nicht authentifiziert",
          code: "UNAUTHORIZED",
          timestamp: new Date().toISOString(),
        };
      }

      return MockMemberLocationService.updateMemberLocation(
        currentUserId,
        update
      );
    }

    // Production implementation would be:
    // const response = await fetch('/api/members/location', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${getAuthToken()}`
    //   },
    //   body: JSON.stringify(update)
    // });
    // return response.json();

    throw new Error("Production API not implemented yet");
  }

  /**
   * Get current user's location settings
   * @returns Promise with user location data or null
   */
  static async getCurrentUserLocation(): Promise<{
    postal_code: string | null;
    location_visible: boolean;
  } | null> {
    if (this.isDemoMode) {
      const currentUserId = await this.getCurrentUserId();
      if (!currentUserId) return null;

      return MockMemberLocationService.getCurrentUserLocation(currentUserId);
    }

    // Production implementation would fetch from current user profile
    throw new Error("Production API not implemented yet");
  }

  /**
   * Get member by email (for demo/testing purposes)
   * @param email - Member email
   * @returns Member data or undefined
   */
  static getMemberByEmail(email: string): MemberLocation | undefined {
    if (this.isDemoMode) {
      return MockMemberLocationService.getMemberByEmail(email);
    }

    // In production, this would not be exposed or would require admin permissions
    return undefined;
  }

  /**
   * Group members by PLZ for map marker clustering
   * @param members - Array of member locations
   * @returns Map of PLZ to members
   */
  static groupMembersByPLZ(
    members: MemberLocation[]
  ): Map<string, MemberLocation[]> {
    return MockMemberLocationService.groupMembersByPLZ(members);
  }

  /**
   * Get current user ID from authentication context
   * In demo mode, this simulates auth by using a default test user
   * @returns Promise with user ID or null
   */
  private static async getCurrentUserId(): Promise<string | null> {
    if (this.isDemoMode) {
      // For demo purposes, simulate different auth states
      // This would normally come from Supabase auth context

      // Check if we have a simulated login (could be set via localStorage in demo)
      const demoUser =
        typeof window !== "undefined"
          ? localStorage.getItem("demo_current_user")
          : null;

      if (demoUser) {
        try {
          const userData = JSON.parse(demoUser);
          return userData.id;
        } catch {
          // Invalid demo user data
        }
      }

      // Default to Zahra for demo
      return "user-zahra-001";
    }

    // Production: Would get from Supabase auth
    // const { data: { user } } = await supabase.auth.getUser();
    // return user?.id || null;

    return null;
  }

  /**
   * Set demo user for testing (demo mode only)
   * @param userEmail - Email of demo user to simulate
   */
  static setDemoUser(userEmail: string): void {
    if (!this.isDemoMode) return;

    const member = MockMemberLocationService.getMemberByEmail(userEmail);
    if (member && typeof window !== "undefined") {
      localStorage.setItem(
        "demo_current_user",
        JSON.stringify({
          id: member.id,
          email: member.email,
          role: member.role,
        })
      );

      // Update the mock service current user
      MockMemberLocationService.setCurrentUser(member.id);
    }
  }

  /**
   * Clear demo user (logout simulation)
   */
  static clearDemoUser(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo_current_user");
    }
  }

  /**
   * Check if running in demo mode
   */
  static isDemoModeActive(): boolean {
    return this.isDemoMode;
  }

  /**
   * Get available demo users for testing
   */
  static getDemoUsers(): Array<{ email: string; name: string; role: string }> {
    if (!this.isDemoMode) return [];

    return [
      { email: "mitglied@email.com", name: "Zahra Ahmed", role: "member" },
      { email: "helper@email.com", name: "Sainab Hassan", role: "helper" },
      {
        email: "helpermitglied@email.com",
        name: "Fatima El-Mansouri",
        role: "member+helper",
      },
    ];
  }

  /**
   * Validate location update data
   * @param update - Location update request
   * @returns Validation result
   */
  static validateLocationUpdate(update: LocationUpdateRequest): {
    valid: boolean;
    error?: string;
  } {
    // Validate postal code format if provided
    if (update.postal_code !== undefined && update.postal_code !== null) {
      const plzRegex = /^\d{5}$/;
      if (!plzRegex.test(update.postal_code)) {
        return {
          valid: false,
          error:
            "Ungültige Postleitzahl. Bitte geben Sie eine 5-stellige deutsche PLZ ein.",
        };
      }

      // Check if PLZ is in reasonable German range
      const numericPLZ = parseInt(update.postal_code, 10);
      if (numericPLZ < 1000 || numericPLZ > 99999) {
        return {
          valid: false,
          error: "Postleitzahl außerhalb des gültigen deutschen Bereichs.",
        };
      }
    }

    // Validate location_visible if provided
    if (
      update.location_visible !== undefined &&
      typeof update.location_visible !== "boolean"
    ) {
      return {
        valid: false,
        error: "Ungültiger Wert für Sichtbarkeitseinstellung.",
      };
    }

    return { valid: true };
  }
}
