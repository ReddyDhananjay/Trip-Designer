export interface RoutePoint {
  lat: number;
  lng: number;
  name: string;
}

export interface SafetyFactor {
  name: string;
  score: number;
  description: string;
  icon: string;
}

export interface RouteOption {
  id: string;
  name: string;
  safetyScore: number;
  distance: string;
  duration: string;
  safetyFactors: SafetyFactor[];
  waypoints: [number, number][];
  highlights: string[];
  color: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: string;
  category: 'police' | 'medical' | 'women' | 'fire' | 'other';
}

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface IncidentReport {
  id: string;
  type: string;
  location: [number, number];
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface SafetyFeature {
  location: [number, number];
  type: 'police_station' | 'hospital' | 'street_light' | 'cctv' | 'open_shop';
  name: string;
}
