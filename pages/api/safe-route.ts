import type { NextApiRequest, NextApiResponse } from 'next';

export interface RouteData {
  id: string;
  name: string;
  distance: string;
  duration: string;
  safetyScore: number;
  crimeIncidents: number;
  streetLightCoverage: number;
  policePatrols: number;
  openBusinesses: number;
  crowdDensity: 'Low' | 'Medium' | 'High';
  weatherCondition: string;
  description: string;
  highlights: string[];
  warnings: string[];
}

export interface SafeRouteResponse {
  safestRouteId: string;
  safestRouteName: string;
  safetyImprovement: string;
  routes: RouteData[];
  lastUpdated: string;
  origin: string;
  destination: string;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }
  return Math.abs(hash);
}

function calculateSafetyScore(params: {
  crimeIncidents: number;
  streetLightCoverage: number;
  policePatrols: number;
  openBusinesses: number;
  crowdDensity: 'Low' | 'Medium' | 'High';
  isNight: boolean;
}): number {
  const { crimeIncidents, streetLightCoverage, policePatrols, openBusinesses, crowdDensity, isNight } = params;

  const crimeScore = Math.max(0, 100 - crimeIncidents * 15);
  const lightScore = streetLightCoverage;
  const patrolScore = Math.min(100, policePatrols * 25);
  const businessScore = Math.min(100, openBusinesses * 10);
  const crowdScore = crowdDensity === 'High' ? 80 : crowdDensity === 'Medium' ? 60 : 40;

  const nightPenalty = isNight ? 10 : 0;

  const raw =
    crimeScore * 0.35 +
    lightScore * 0.25 +
    patrolScore * 0.2 +
    businessScore * 0.1 +
    crowdScore * 0.1 -
    nightPenalty;

  return Math.min(99, Math.max(20, Math.round(raw)));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  const seed = hashString(`${origin.toLowerCase()}${destination.toLowerCase()}`);
  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour < 6;

  const routeConfigs = [
    {
      id: 'route-a',
      name: 'Route A',
      distanceBase: 2.1,
      durationBase: 8,
      crimeBase: 1,
      lightBase: 85,
      patrolBase: 3,
      businessBase: 7,
    },
    {
      id: 'route-b',
      name: 'Route B',
      distanceBase: 2.8,
      durationBase: 11,
      crimeBase: 3,
      lightBase: 65,
      patrolBase: 2,
      businessBase: 5,
    },
    {
      id: 'route-c',
      name: 'Route C',
      distanceBase: 3.4,
      durationBase: 14,
      crimeBase: 2,
      lightBase: 75,
      patrolBase: 2,
      businessBase: 6,
    },
  ];

  const crowdOptions: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];
  const weatherOptions = ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain'];

  const routes: RouteData[] = routeConfigs.map((cfg, idx) => {
    const r1 = seededRandom(seed + idx * 7);
    const r2 = seededRandom(seed + idx * 13);
    const r3 = seededRandom(seed + idx * 17);

    const crimeIncidents = Math.max(0, Math.round(cfg.crimeBase + (r1 - 0.5) * 2));
    const streetLightCoverage = Math.min(100, Math.max(30, Math.round(cfg.lightBase + (r2 - 0.5) * 20)));
    const policePatrols = Math.max(0, Math.round(cfg.patrolBase + (r3 - 0.5) * 2));
    const openBusinesses = Math.max(0, Math.round(cfg.businessBase + (r1 - 0.5) * 4));
    const crowdDensity = crowdOptions[Math.floor(seededRandom(seed + idx * 23) * 3)];
    const weatherCondition = weatherOptions[Math.floor(seededRandom(seed + idx * 31) * weatherOptions.length)];

    const distance = (cfg.distanceBase + (seededRandom(seed + idx * 3) - 0.5) * 0.4).toFixed(1);
    const duration = Math.round(cfg.durationBase + (seededRandom(seed + idx * 5) - 0.5) * 3);

    const safetyScore = calculateSafetyScore({
      crimeIncidents,
      streetLightCoverage,
      policePatrols,
      openBusinesses,
      crowdDensity,
      isNight,
    });

    const highlights: string[] = [];
    if (policePatrols >= 3) highlights.push(`${policePatrols} active police patrols nearby`);
    if (streetLightCoverage >= 80) highlights.push(`${streetLightCoverage}% street light coverage`);
    if (openBusinesses >= 6) highlights.push(`${openBusinesses} open shops along route`);
    if (crowdDensity === 'High') highlights.push('Busy, well-populated area');
    if (crimeIncidents === 0) highlights.push('No recent incidents reported');
    if (highlights.length === 0) highlights.push('Standard route');

    const warnings: string[] = [];
    if (crimeIncidents >= 3) warnings.push(`${crimeIncidents} recent incidents in area`);
    if (streetLightCoverage < 60) warnings.push('Limited street lighting');
    if (isNight && crowdDensity === 'Low') warnings.push('Low foot traffic at night');
    if (weatherCondition === 'Light Rain') warnings.push('Wet conditions — reduced visibility');

    return {
      id: cfg.id,
      name: cfg.name,
      distance: `${distance} km`,
      duration: `${duration} min`,
      safetyScore,
      crimeIncidents,
      streetLightCoverage,
      policePatrols,
      openBusinesses,
      crowdDensity,
      weatherCondition,
      description: `Via ${cfg.name === 'Route A' ? 'Main Road' : cfg.name === 'Route B' ? 'Side Street' : 'Highway Bypass'}`,
      highlights,
      warnings,
    };
  });

  const safestRoute = routes.reduce((best, r) => (r.safetyScore > best.safetyScore ? r : best));
  const secondBest = routes
    .filter(r => r.id !== safestRoute.id)
    .reduce((best, r) => (r.safetyScore > best.safetyScore ? r : best));

  const improvement = safestRoute.safetyScore - secondBest.safetyScore;
  const safetyImprovement = `${safestRoute.name} is ${improvement}% safer than the next best option`;

  const response: SafeRouteResponse = {
    safestRouteId: safestRoute.id,
    safestRouteName: safestRoute.name,
    safetyImprovement,
    routes,
    lastUpdated: new Date().toISOString(),
    origin,
    destination,
  };

  res.status(200).json(response);
}
