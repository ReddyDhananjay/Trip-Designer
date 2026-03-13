'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { RouteOption } from '@/types';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const DEMO_ROUTES: RouteOption[] = [
  {
    id: 'route-a',
    name: 'Route A — Main Road (Safest)',
    safetyScore: 87,
    distance: '1.8 km',
    duration: '22 min',
    color: '#16a34a',
    waypoints: [
      [12.9716, 77.5946],
      [12.9730, 77.5960],
      [12.9750, 77.5980],
      [12.9770, 77.6010],
      [12.9785, 77.6030],
    ],
    highlights: ['Well-lit main road', 'CCTV coverage', '2 police stations nearby', 'Open shops along route'],
    safetyFactors: [
      { name: 'Street Lighting', score: 95, description: 'Fully lit main road', icon: '💡' },
      { name: 'Crime Rate', score: 82, description: 'Low crime area', icon: '🚨' },
      { name: 'Crowd Density', score: 88, description: 'Moderate foot traffic', icon: '👥' },
      { name: 'CCTV Coverage', score: 90, description: '12 cameras along route', icon: '📹' },
    ],
  },
  {
    id: 'route-b',
    name: 'Route B — Market Road',
    safetyScore: 72,
    distance: '1.5 km',
    duration: '18 min',
    color: '#f59e0b',
    waypoints: [
      [12.9716, 77.5946],
      [12.9725, 77.5970],
      [12.9745, 77.5995],
      [12.9765, 77.6015],
      [12.9785, 77.6030],
    ],
    highlights: ['Shorter route through market', 'Some dark patches', '1 police station nearby'],
    safetyFactors: [
      { name: 'Street Lighting', score: 65, description: 'Partial lighting gaps', icon: '💡' },
      { name: 'Crime Rate', score: 70, description: 'Moderate crime area', icon: '🚨' },
      { name: 'Crowd Density', score: 80, description: 'Busy market area', icon: '👥' },
      { name: 'CCTV Coverage', score: 60, description: '5 cameras along route', icon: '📹' },
    ],
  },
  {
    id: 'route-c',
    name: 'Route C — Back Lanes (Shortest)',
    safetyScore: 45,
    distance: '1.2 km',
    duration: '14 min',
    color: '#dc2626',
    waypoints: [
      [12.9716, 77.5946],
      [12.9728, 77.5965],
      [12.9748, 77.5990],
      [12.9768, 77.6020],
      [12.9785, 77.6030],
    ],
    highlights: ['Shortest but poorly lit', 'Isolated lanes', 'No police presence', 'Recent incidents reported'],
    safetyFactors: [
      { name: 'Street Lighting', score: 30, description: 'Very poor lighting', icon: '💡' },
      { name: 'Crime Rate', score: 40, description: '3 incidents this week', icon: '🚨' },
      { name: 'Crowd Density', score: 25, description: 'Deserted at night', icon: '👥' },
      { name: 'CCTV Coverage', score: 20, description: '1 camera only', icon: '📹' },
    ],
  },
];

export default function RouteFinderPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const handleFindRoutes = async () => {
    if (!origin.trim() || !destination.trim()) return;
    setLoading(true);
    setSearched(false);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setRoutes(DEMO_ROUTES);
    setSelectedRoute('route-a');
    setSearched(true);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return 'bg-green-100';
    if (score >= 50) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const selectedRouteData = routes.find((r) => r.id === selectedRoute);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Find Your Safest Route</h1>
          <p className="text-gray-600">Enter your start and end points to compare routes by safety score. <span className="text-xs text-gray-400">(Demo data)</span></p>
        </div>

        {/* Search Inputs */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">📍 Your Location</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. MG Road Metro Station"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">🏠 Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Indiranagar Home"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={handleFindRoutes}
              disabled={loading || !origin.trim() || !destination.trim()}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Find Safe Routes'
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {searched && routes.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ height: '500px' }}>
                <MapView routes={routes} selectedRoute={selectedRoute} />
              </div>
              {lastUpdated && (
                <p className="text-xs text-gray-500 mt-2 text-right">
                  🔄 Last updated: {lastUpdated} • Updates every 60 seconds
                </p>
              )}
            </div>

            {/* Route Cards */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Route Comparison</h2>
              {routes.map((route) => {
                const safest = routes[0];
                const diff = safest.id !== route.id
                  ? Math.round(((safest.safetyScore - route.safetyScore) / route.safetyScore) * 100)
                  : 0;
                return (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                      selectedRoute === route.id
                        ? 'border-primary bg-rose-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{route.name}</h3>
                        <p className="text-xs text-gray-500">{route.distance} • {route.duration} walk</p>
                      </div>
                      <div className={`text-right ${getScoreBg(route.safetyScore)} px-3 py-1 rounded-full`}>
                        <span className={`text-lg font-bold ${getScoreColor(route.safetyScore)}`}>
                          {route.safetyScore}
                        </span>
                        <span className="text-xs text-gray-500">/100</span>
                      </div>
                    </div>

                    {route.id === safest.id ? (
                      <span className="inline-block text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full mb-2">
                        ✅ SAFEST ROUTE
                      </span>
                    ) : (
                      <span className="inline-block text-xs text-gray-500 mb-2">
                        Route A is {diff}% safer
                      </span>
                    )}

                    <div className="space-y-1">
                      {route.highlights.map((h, i) => (
                        <p key={i} className="text-xs text-gray-600">• {h}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Safety Factor Breakdown */}
        {searched && selectedRouteData && (
          <div className="mt-6 bg-white rounded-xl shadow-md p-6 fade-in">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Safety Breakdown — {selectedRouteData.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedRouteData.safetyFactors.map((factor) => (
                <div key={factor.name} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{factor.icon}</span>
                    <span className={`text-lg font-bold ${getScoreColor(factor.score)}`}>
                      {factor.score}%
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{factor.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{factor.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getScoreBarColor(factor.score)}`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!searched && !loading && (
          <div className="text-center py-20">
            <svg className="mx-auto w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0020 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-lg font-medium text-gray-500 mb-2">Enter your locations above</h3>
            <p className="text-gray-400">We&apos;ll analyze 3 routes and show you the safest one</p>
          </div>
        )}
      </div>
    </div>
  );
}
