// Tests for Member Location Service
import { MemberLocationService } from "@/services/member-location.service";

describe("Member Location Service", () => {
  beforeAll(() => {
    // Set demo mode environment
    process.env.NEXT_PUBLIC_DEMO_MODE = "true";
  });

  describe("Demo Mode", () => {
    it("should detect demo mode is active", () => {
      expect(MemberLocationService.isDemoModeActive()).toBe(true);
    });
  });

  describe("Demo Users", () => {
    it("should have demo users", () => {
      const demoUsers = MemberLocationService.getDemoUsers();
      expect(demoUsers.length).toBeGreaterThanOrEqual(3);
    });

    it("should include Zahra in demo users", () => {
      const demoUsers = MemberLocationService.getDemoUsers();
      expect(demoUsers.some((u) => u.email === "mitglied@email.com")).toBe(true);
    });
  });

  describe("Location Update Validation", () => {
    it("should validate correct location update", () => {
      const validUpdate = { postal_code: "10115", location_visible: true };
      const validationResult = MemberLocationService.validateLocationUpdate(validUpdate);
      expect(validationResult.valid).toBe(true);
    });

    it("should reject invalid PLZ format", () => {
      const invalidUpdate = { postal_code: "abc123" };
      const invalidResult = MemberLocationService.validateLocationUpdate(invalidUpdate);
      expect(invalidResult.valid).toBe(false);
    });
  });

  describe("Member Lookup", () => {
    it("should find member by email in demo mode", () => {
      const zahra = MemberLocationService.getMemberByEmail("mitglied@email.com");
      expect(zahra).toBeDefined();
      expect(zahra?.first_name).toBe("Zahra");
    });

    it("should return undefined for non-existent email", () => {
      const notFound = MemberLocationService.getMemberByEmail("nonexistent@example.com");
      expect(notFound).toBeUndefined();
    });
  });

  describe("Demo User Simulation", () => {
    it("should set demo user successfully", () => {
      expect(() => {
        MemberLocationService.setDemoUser("helper@email.com");
      }).not.toThrow();
    });
  });
});

