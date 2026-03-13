import type { NextApiRequest, NextApiResponse } from 'next';

interface SafetyFactorInput {
  streetLighting: number;
  crimeSafety: number;
  crowdDensity: number;
  cctvCoverage: number;
}

function calculateSafetyScore(factors: SafetyFactorInput): number {
  const weights = {
    streetLighting: 0.3,
    crimeSafety: 0.3,
    crowdDensity: 0.2,
    cctvCoverage: 0.2,
  };

  return Math.round(
    factors.streetLighting * weights.streetLighting +
    factors.crimeSafety * weights.crimeSafety +
    factors.crowdDensity * weights.crowdDensity +
    factors.cctvCoverage * weights.cctvCoverage
  );
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  // Generate safety scores for 3 routes
  const routes = [
    {
      id: 'route-a',
      name: 'Route A — Main Road (Safest)',
      factors: { streetLighting: 95, crimeSafety: 82, crowdDensity: 88, cctvCoverage: 90 },
      distance: '1.8 km',
      duration: '22 min',
    },
    {
      id: 'route-b',
      name: 'Route B — Market Road',
      factors: { streetLighting: 65, crimeSafety: 70, crowdDensity: 80, cctvCoverage: 60 },
      distance: '1.5 km',
      duration: '18 min',
    },
    {
      id: 'route-c',
      name: 'Route C — Back Lanes (Shortest)',
      factors: { streetLighting: 30, crimeSafety: 40, crowdDensity: 25, cctvCoverage: 20 },
      distance: '1.2 km',
      duration: '14 min',
    },
  ];

  const scoredRoutes = routes.map((route) => ({
    ...route,
    safetyScore: calculateSafetyScore(route.factors),
  }));

  scoredRoutes.sort((a, b) => b.safetyScore - a.safetyScore);

  res.status(200).json({
    origin,
    destination,
    timestamp: new Date().toISOString(),
    routes: scoredRoutes,
  });
}
