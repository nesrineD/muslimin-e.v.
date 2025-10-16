import {
  MemberLocation,
  LocationResponse,
  LocationUpdateRequest,
  LocationUpdateResponse,
  APIError,
} from "@/types/location";

// Mock member data including existing test users from flow.md
export const mockMembers: MemberLocation[] = [
  // Existing test users from flow.md
  {
    id: "user-zahra-001",
    first_name: "Zahra",
    last_name: "Ahmed",
    email: "mitglied@email.com",
    postal_code: "10115",
    location_visible: true,
    display_name: "Zahra A.",
    role: "member",
    created_at: "2025-01-15T10:00:00.000Z",
    updated_at: "2025-10-01T14:30:00.000Z",
  },
  {
    id: "user-sainab-002",
    first_name: "Sainab",
    last_name: "Hassan",
    email: "helper@email.com",
    postal_code: "20095",
    location_visible: true,
    display_name: "Sainab H.",
    role: "helper",
    created_at: "2025-02-10T09:15:00.000Z",
    updated_at: "2025-10-02T11:20:00.000Z",
  },
  {
    id: "user-fatima-003",
    first_name: "Fatima",
    last_name: "El-Mansouri",
    email: "helpermitglied@email.com",
    postal_code: "80331",
    location_visible: true,
    display_name: "Fatima E.",
    role: "member+helper",
    created_at: "2025-01-28T16:45:00.000Z",
    updated_at: "2025-10-03T09:10:00.000Z",
  },

  // Additional mock members for realistic demo
  {
    id: "user-amira-004",
    first_name: "Amira",
    last_name: "Mahmoud",
    email: "amira.mahmoud@example.com",
    postal_code: "10115", // Same as Zahra for clustering demo
    location_visible: true,
    display_name: "Amira M.",
    role: "member",
    created_at: "2025-03-05T12:00:00.000Z",
    updated_at: "2025-09-28T15:45:00.000Z",
  },
  {
    id: "user-khadija-005",
    first_name: "Khadija",
    last_name: "Benali",
    email: "khadija.benali@example.com",
    postal_code: "40210",
    location_visible: true,
    display_name: "Khadija B.",
    role: "helper",
    created_at: "2025-02-18T08:30:00.000Z",
    updated_at: "2025-10-04T13:15:00.000Z",
  },
  {
    id: "user-leila-006",
    first_name: "Leila",
    last_name: "Özkan",
    email: "leila.oezkan@example.com",
    postal_code: "50667",
    location_visible: true,
    display_name: "Leila Ö.",
    role: "member",
    created_at: "2025-04-12T14:20:00.000Z",
    updated_at: "2025-09-30T10:30:00.000Z",
  },
  {
    id: "user-mariam-007",
    first_name: "Mariam",
    last_name: "Al-Zahra",
    email: "mariam.alzahra@example.com",
    postal_code: "60311",
    location_visible: true,
    display_name: "Mariam A.",
    role: "member+helper",
    created_at: "2025-01-22T11:10:00.000Z",
    updated_at: "2025-10-01T16:25:00.000Z",
  },
  {
    id: "user-nour-008",
    first_name: "Nour",
    last_name: "Abdel-Rahman",
    email: "nour.abdelrahman@example.com",
    postal_code: "70173",
    location_visible: true,
    display_name: "Nour A.",
    role: "member",
    created_at: "2025-03-30T09:45:00.000Z",
    updated_at: "2025-10-05T14:00:00.000Z",
  },
  {
    id: "user-yasmin-009",
    first_name: "Yasmin",
    last_name: "Khoury",
    email: "yasmin.khoury@example.com",
    postal_code: "20095", // Same as Sainab for clustering
    location_visible: true,
    display_name: "Yasmin K.",
    role: "helper",
    created_at: "2025-02-14T13:25:00.000Z",
    updated_at: "2025-09-29T12:50:00.000Z",
  },
  {
    id: "user-safiya-010",
    first_name: "Safiya",
    last_name: "Mohamed",
    email: "safiya.mohamed@example.com",
    postal_code: "90402",
    location_visible: true,
    display_name: "Safiya M.",
    role: "member",
    created_at: "2025-04-08T15:30:00.000Z",
    updated_at: "2025-10-02T08:45:00.000Z",
  },
  {
    id: "user-aisha-011",
    first_name: "Aisha",
    last_name: "Ibrahim",
    email: "aisha.ibrahim@example.com",
    postal_code: "30159",
    location_visible: true,
    display_name: "Aisha I.",
    role: "member+helper",
    created_at: "2025-01-10T10:15:00.000Z",
    updated_at: "2025-10-06T11:30:00.000Z",
  },
  {
    id: "user-halima-012",
    first_name: "Halima",
    last_name: "Ouali",
    email: "halima.ouali@example.com",
    postal_code: "01307",
    location_visible: true,
    display_name: "Halima O.",
    role: "helper",
    created_at: "2025-03-18T12:40:00.000Z",
    updated_at: "2025-09-25T14:20:00.000Z",
  },
  {
    id: "user-layla-013",
    first_name: "Layla",
    last_name: "Nasiri",
    email: "layla.nasiri@example.com",
    postal_code: "80331", // Same as Fatima for clustering
    location_visible: true,
    display_name: "Layla N.",
    role: "member",
    created_at: "2025-02-25T14:55:00.000Z",
    updated_at: "2025-10-04T09:15:00.000Z",
  },
  {
    id: "user-rahma-014",
    first_name: "Rahma",
    last_name: "Saidi",
    email: "rahma.saidi@example.com",
    postal_code: "45127",
    location_visible: true,
    display_name: "Rahma S.",
    role: "member",
    created_at: "2025-04-02T11:20:00.000Z",
    updated_at: "2025-10-01T15:35:00.000Z",
  },
  {
    id: "user-sumaya-015",
    first_name: "Sumaya",
    last_name: "Yusuf",
    email: "sumaya.yusuf@example.com",
    postal_code: "22765",
    location_visible: true,
    display_name: "Sumaya Y.",
    role: "helper",
    created_at: "2025-03-12T16:10:00.000Z",
    updated_at: "2025-09-27T13:25:00.000Z",
  },
  {
    id: "user-hanan-016",
    first_name: "Hanan",
    last_name: "Almasi",
    email: "hanan.almasi@example.com",
    postal_code: "28195",
    location_visible: true,
    display_name: "Hanan A.",
    role: "member+helper",
    created_at: "2025-01-30T08:45:00.000Z",
    updated_at: "2025-10-03T12:10:00.000Z",
  },
  {
    id: "user-noura-017",
    first_name: "Noura",
    last_name: "Farhat",
    email: "noura.farhat@example.com",
    postal_code: "53111",
    location_visible: true,
    display_name: "Noura F.",
    role: "member",
    created_at: "2025-04-20T13:30:00.000Z",
    updated_at: "2025-10-05T10:45:00.000Z",
  },
  {
    id: "user-latifa-018",
    first_name: "Latifa",
    last_name: "Zidane",
    email: "latifa.zidane@example.com",
    postal_code: "99084",
    location_visible: true,
    display_name: "Latifa Z.",
    role: "helper",
    created_at: "2025-02-08T09:20:00.000Z",
    updated_at: "2025-09-26T16:55:00.000Z",
  },

  // A few members with location_visible: false for privacy demo
  {
    id: "user-sahar-019",
    first_name: "Sahar",
    last_name: "Rashid",
    email: "sahar.rashid@example.com",
    postal_code: "76133",
    location_visible: false, // Hidden for privacy
    display_name: "Sahar R.",
    role: "member",
    created_at: "2025-03-25T15:15:00.000Z",
    updated_at: "2025-10-02T14:40:00.000Z",
  },
  {
    id: "user-meryem-020",
    first_name: "Meryem",
    last_name: "Karim",
    email: "meryem.karim@example.com",
    postal_code: "12345",
    location_visible: false, // Hidden for privacy
    display_name: "Meryem K.",
    role: "member+helper",
    created_at: "2025-01-16T12:05:00.000Z",
    updated_at: "2025-09-28T11:20:00.000Z",
  },
];

// Mock API service functions
export class MockMemberLocationService {
  private static currentUserId: string | null = null;
  private static members = [...mockMembers];

  static setCurrentUser(userId: string) {
    this.currentUserId = userId;
  }

  static async getMemberLocations(): Promise<LocationResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Filter visible members (exclude current user and hidden locations)
    const visibleMembers = this.members.filter(
      (member) =>
        member.location_visible &&
        member.postal_code &&
        member.id !== this.currentUserId
    );

    const plzRegions = Array.from(
      new Set(
        visibleMembers
          .map((m) => m.postal_code)
          .filter((plz): plz is string => plz !== null)
      )
    ).sort();

    return {
      success: true,
      data: {
        members: visibleMembers,
        total_count: visibleMembers.length,
        plz_regions: plzRegions,
      },
      timestamp: new Date().toISOString(),
    };
  }

  static async updateMemberLocation(
    userId: string,
    update: LocationUpdateRequest
  ): Promise<LocationUpdateResponse | APIError> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validate PLZ format if provided
    if (update.postal_code && update.postal_code !== null) {
      const plzRegex = /^\d{5}$/;
      if (!plzRegex.test(update.postal_code)) {
        return {
          success: false,
          error:
            "Ungültige Postleitzahl. Bitte geben Sie eine 5-stellige deutsche PLZ ein.",
          code: "INVALID_PLZ",
          timestamp: new Date().toISOString(),
        };
      }
    }

    // Find and update member
    const memberIndex = this.members.findIndex((m) => m.id === userId);
    if (memberIndex === -1) {
      return {
        success: false,
        error: "Mitglied nicht gefunden",
        code: "MEMBER_NOT_FOUND",
        timestamp: new Date().toISOString(),
      };
    }

    const member = this.members[memberIndex];
    const updatedMember = {
      ...member,
      postal_code:
        update.postal_code !== undefined
          ? update.postal_code
          : member.postal_code,
      location_visible:
        update.location_visible !== undefined
          ? update.location_visible
          : member.location_visible,
      updated_at: new Date().toISOString(),
    };

    this.members[memberIndex] = updatedMember;

    return {
      success: true,
      data: {
        member_id: userId,
        postal_code: updatedMember.postal_code,
        location_visible: updatedMember.location_visible,
        updated_at: updatedMember.updated_at,
      },
      message: "Standort erfolgreich aktualisiert",
    };
  }

  static async getCurrentUserLocation(
    userId: string
  ): Promise<{ postal_code: string | null; location_visible: boolean } | null> {
    const member = this.members.find((m) => m.id === userId);
    if (!member) return null;

    return {
      postal_code: member.postal_code,
      location_visible: member.location_visible,
    };
  }

  // Utility function to get member by email (for testing with existing auth)
  static getMemberByEmail(email: string): MemberLocation | undefined {
    return this.members.find((m) => m.email === email);
  }

  // Get members grouped by PLZ for marker clustering
  static groupMembersByPLZ(
    members: MemberLocation[]
  ): Map<string, MemberLocation[]> {
    return members.reduce((groups, member) => {
      const plz = member.postal_code;
      if (!plz) return groups; // Skip members without postal code

      if (!groups.has(plz)) {
        groups.set(plz, []);
      }
      groups.get(plz)!.push(member);
      return groups;
    }, new Map<string, MemberLocation[]>());
  }
}

// Export unique PLZ codes used in mock data for coordinate utility
export const MOCK_PLZ_CODES = [
  "10115", // Berlin (Zahra, Amira)
  "20095", // Hamburg (Sainab, Yasmin)
  "80331", // München (Fatima, Layla)
  "40210", // Düsseldorf (Khadija)
  "50667", // Köln (Leila)
  "60311", // Frankfurt (Mariam)
  "70173", // Stuttgart (Nour)
  "90402", // Nürnberg (Safiya)
  "30159", // Hannover (Aisha)
  "01307", // Dresden (Halima)
  "45127", // Essen (Rahma)
  "22765", // Hamburg-Altona (Sumaya)
  "28195", // Bremen (Hanan)
  "53111", // Bonn (Noura)
  "99084", // Erfurt (Latifa)
  "76133", // Karlsruhe (Sahar - hidden)
  "12345", // Invalid for testing (Meryem - hidden)
];
