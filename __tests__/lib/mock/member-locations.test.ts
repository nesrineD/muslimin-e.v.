import {
  MockMemberLocationService,
  mockMembers,
  MOCK_PLZ_CODES,
} from "@/lib/mock/member-locations";
import { MemberLocation } from "@/types/location";

describe("MockMemberLocationService", () => {
  beforeEach(() => {
    // Reset the service before each test
    MockMemberLocationService.setCurrentUser("test-user-id");
  });

  describe("getMemberLocations", () => {
    it("should return visible members excluding current user", async () => {
      MockMemberLocationService.setCurrentUser("user-zahra-001");

      const response = await MockMemberLocationService.getMemberLocations();

      expect(response.success).toBe(true);
      expect(response.data.members).not.toContainEqual(
        expect.objectContaining({ id: "user-zahra-001" })
      );

      // Should only include visible members with postal codes
      const allVisible = response.data.members.every(
        (member) => member.location_visible && member.postal_code
      );
      expect(allVisible).toBe(true);
    });

    it("should include existing test users (Sainab, Fatima) when Zahra is current user", async () => {
      MockMemberLocationService.setCurrentUser("user-zahra-001");

      const response = await MockMemberLocationService.getMemberLocations();
      const memberEmails = response.data.members.map((m) => m.email);

      expect(memberEmails).toContain("helper@email.com"); // Sainab
      expect(memberEmails).toContain("helpermitglied@email.com"); // Fatima
      expect(memberEmails).not.toContain("mitglied@email.com"); // Zahra (current user)
    });

    it("should return PLZ regions list", async () => {
      const response = await MockMemberLocationService.getMemberLocations();

      expect(response.data.plz_regions).toBeInstanceOf(Array);
      expect(response.data.plz_regions.length).toBeGreaterThan(0);
      expect(response.data.plz_regions).toContain("10115"); // Berlin
      expect(response.data.plz_regions).toContain("20095"); // Hamburg
    });

    it("should exclude members with location_visible: false", async () => {
      const response = await MockMemberLocationService.getMemberLocations();

      // Should not include Sahar and Meryem (hidden)
      const hiddenEmails = [
        "sahar.rashid@example.com",
        "meryem.karim@example.com",
      ];
      const memberEmails = response.data.members.map((m) => m.email);

      hiddenEmails.forEach((email) => {
        expect(memberEmails).not.toContain(email);
      });
    });
  });

  describe("updateMemberLocation", () => {
    it("should successfully update postal code", async () => {
      const response = await MockMemberLocationService.updateMemberLocation(
        "user-zahra-001",
        { postal_code: "12345" }
      );

      expect(response.success).toBe(true);
      if (response.success) {
        expect(response.data.postal_code).toBe("12345");
        expect(response.message).toContain("erfolgreich");
      }
    });

    it("should successfully update location visibility", async () => {
      const response = await MockMemberLocationService.updateMemberLocation(
        "user-zahra-001",
        { location_visible: false }
      );

      expect(response.success).toBe(true);
      if (response.success) {
        expect(response.data.location_visible).toBe(false);
      }
    });

    it("should validate PLZ format", async () => {
      const response = await MockMemberLocationService.updateMemberLocation(
        "user-zahra-001",
        { postal_code: "invalid" }
      );

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.code).toBe("INVALID_PLZ");
        expect(response.error).toContain("5-stellige");
      }
    });

    it("should handle non-existent member", async () => {
      const response = await MockMemberLocationService.updateMemberLocation(
        "non-existent-user",
        { postal_code: "12345" }
      );

      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.code).toBe("MEMBER_NOT_FOUND");
      }
    });

    it("should allow null postal code to remove location", async () => {
      const response = await MockMemberLocationService.updateMemberLocation(
        "user-zahra-001",
        { postal_code: null }
      );

      expect(response.success).toBe(true);
      if (response.success) {
        expect(response.data.postal_code).toBe(null);
      }
    });
  });

  describe("getCurrentUserLocation", () => {
    it("should return current user location data", async () => {
      const location =
        await MockMemberLocationService.getCurrentUserLocation(
          "user-zahra-001"
        );

      expect(location).not.toBeNull();
      expect(location?.postal_code).toBe("10115");
      expect(location?.location_visible).toBe(true);
    });

    it("should return null for non-existent user", async () => {
      const location =
        await MockMemberLocationService.getCurrentUserLocation("non-existent");

      expect(location).toBeNull();
    });
  });

  describe("getMemberByEmail", () => {
    it("should find existing test users", () => {
      const zahra =
        MockMemberLocationService.getMemberByEmail("mitglied@email.com");
      const sainab =
        MockMemberLocationService.getMemberByEmail("helper@email.com");
      const fatima = MockMemberLocationService.getMemberByEmail(
        "helpermitglied@email.com"
      );

      expect(zahra).toBeDefined();
      expect(zahra?.first_name).toBe("Zahra");
      expect(zahra?.role).toBe("member");

      expect(sainab).toBeDefined();
      expect(sainab?.first_name).toBe("Sainab");
      expect(sainab?.role).toBe("helper");

      expect(fatima).toBeDefined();
      expect(fatima?.first_name).toBe("Fatima");
      expect(fatima?.role).toBe("member+helper");
    });

    it("should return undefined for non-existent email", () => {
      const result = MockMemberLocationService.getMemberByEmail(
        "nonexistent@example.com"
      );
      expect(result).toBeUndefined();
    });
  });

  describe("groupMembersByPLZ", () => {
    it("should group members by postal code", () => {
      const testMembers: MemberLocation[] = [
        mockMembers[0], // Zahra - 10115
        mockMembers[1], // Sainab - 20095
        mockMembers[3], // Amira - 10115
      ];

      const grouped = MockMemberLocationService.groupMembersByPLZ(testMembers);

      expect(grouped.size).toBe(2);
      expect(grouped.get("10115")).toHaveLength(2); // Zahra + Amira
      expect(grouped.get("20095")).toHaveLength(1); // Sainab
    });

    it("should skip members without postal code", () => {
      const testMembers: MemberLocation[] = [
        { ...mockMembers[0], postal_code: null },
        mockMembers[1],
      ];

      const grouped = MockMemberLocationService.groupMembersByPLZ(testMembers);

      expect(grouped.size).toBe(1);
      expect(grouped.get("20095")).toHaveLength(1); // Only Sainab
    });
  });

  describe("mock data integrity", () => {
    it("should include all test users from flow.md", () => {
      const testEmails = [
        "mitglied@email.com",
        "helper@email.com",
        "helpermitglied@email.com",
      ];
      const mockEmails = mockMembers.map((m) => m.email);

      testEmails.forEach((email) => {
        expect(mockEmails).toContain(email);
      });
    });

    it("should have realistic German PLZ codes", () => {
      const plzPattern = /^\d{5}$/;

      MOCK_PLZ_CODES.forEach((plz) => {
        if (plz !== "12345") {
          // Exclude test PLZ
          expect(plzPattern.test(plz)).toBe(true);
        }
      });
    });

    it("should have proper display names for privacy", () => {
      mockMembers.forEach((member) => {
        expect(member.display_name).toMatch(
          /^[A-Za-zÄÖÜäöüß]+ [A-Za-zÄÖÜäöüß]\.$/
        );
        expect(member.display_name).toContain(member.first_name);
        expect(member.display_name).toContain(member.last_name[0] + ".");
      });
    });

    it("should have members with different roles", () => {
      const roles = mockMembers.map((m) => m.role);

      expect(roles).toContain("member");
      expect(roles).toContain("helper");
      expect(roles).toContain("member+helper");
    });

    it("should have some members with clustering (same PLZ)", () => {
      const plzCounts = MOCK_PLZ_CODES.reduce(
        (counts, plz) => {
          const count = mockMembers.filter((m) => m.postal_code === plz).length;
          if (count > 1) counts[plz] = count;
          return counts;
        },
        {} as Record<string, number>
      );

      // Should have at least one PLZ with multiple members
      expect(Object.keys(plzCounts).length).toBeGreaterThan(0);
      expect(plzCounts["10115"]).toBeGreaterThan(1); // Berlin cluster
      expect(plzCounts["20095"]).toBeGreaterThan(1); // Hamburg cluster
    });
  });
});
