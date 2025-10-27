// Mock user data for development and testing
// Personas from flow.md with proper helper registration status

export type User = {
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

export const mockUsers: Record<string, User> = {
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
