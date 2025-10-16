// Location types for interactive member location map
export interface MemberLocation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  postal_code: string | null;
  location_visible: boolean;
  display_name: string; // "Vorname N." for privacy
  role: "member" | "helper" | "member+helper";
  created_at: string;
  updated_at: string;
}

// Extended type for map display with coordinates
export interface MemberLocationWithCoordinates extends MemberLocation {
  coordinates: PLZCoordinates | null;
}

export interface PLZCoordinates {
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export interface PLZLocation {
  plz: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export interface MapMarker {
  plz: string;
  position: { lat: number; lng: number };
  members: MemberLocation[];
  memberCount: number;
  isSelected: boolean;
}

export interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  selectedPLZ: string | null;
  showPopup: boolean;
}

export interface MapFilters {
  searchPLZ: string;
  showClusters: boolean;
  radius: number; // km radius for future features
}

// API Response types
export interface LocationResponse {
  success: true;
  data: {
    members: MemberLocation[];
    total_count: number;
    plz_regions: string[];
  };
  timestamp: string;
}

export interface LocationUpdateRequest {
  postal_code?: string | null;
  location_visible?: boolean;
}

export interface LocationUpdateResponse {
  success: true;
  data: {
    member_id: string;
    postal_code: string | null;
    location_visible: boolean;
    updated_at: string;
  };
  message: string;
}

export interface APIError {
  success: false;
  error: string;
  code: string;
  details?: any;
  timestamp: string;
}

// Google Maps types
export interface GoogleMapsConfig {
  apiKey: string;
  libraries: string[];
  center: { lat: number; lng: number };
  zoom: number;
}

// Constants
export const GERMANY_CENTER = { lat: 51.1657, lng: 10.4515 };
export const DEFAULT_ZOOM = 6;
