'use client';

import { useState } from 'react';

interface RouteData {
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

interface SafeRouteResponse {
  safestRouteId: string;
  safestRouteName: string;
  safetyImprovement: string;
  routes: RouteData[];
  lastUpdated: string;
  origin: string;
  destination: string;
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
      <div
        className={`h-3 rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const bg =
    score >= 75
      ? 'bg-green-100 text-green-800 border-green-300'
      : score >= 50
      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
      : 'bg-red-100 text-red-800 border-red-300';
  return (
    <span className={`text-3xl font-bold px-3 py-1 rounded-xl border ${bg}`}>
      {score}
    </span>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default function SafeRoutePage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SafeRouteResponse | null>(null);
  const [error, setError] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const fetchRoutes = async (orig: string, dest: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/safe-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: orig, destination: dest }),
      });
      if (!res.ok) throw new Error('Failed to fetch route data');
      const data: SafeRouteResponse = await res.json();
      setResult(data);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch {
      setError('Unable to load route data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    fetchRoutes(origin.trim(), destination.trim());
  };

  const handleRefresh = () => {
    if (result) fetchRoutes(result.origin, result.destination);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-700 to-pink-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">SafeRoute</h1>
          <p className="text-lg sm:text-xl text-purple-100 mb-2">
            AI-powered safe route recommendations for women travelling at night
          </p>
          <p className="text-sm text-purple-200">
            Analyses crime data · street lighting · police patrols · crowd density · weather
          </p>
        </div>
      </section>

      {/* Input Form */}
      <section className="max-w-3xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  📍 Current Location
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  placeholder="e.g. Connaught Place, Delhi"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  🏁 Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="e.g. Lajpat Nagar, Delhi"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !origin.trim() || !destination.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow hover:shadow-lg transform hover:scale-[1.01] transition disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analysing Routes…
                </span>
              ) : (
                '🔍 Find Safest Route'
              )}
            </button>
          </form>

          {error && (
            <p className="mt-3 text-red-600 text-sm text-center">{error}</p>
          )}
        </div>
      </section>

      {/* Results */}
      {result && !loading && (
        <section className="max-w-5xl mx-auto px-4 py-10">
          {/* Summary Banner */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✅</span>
                <h2 className="text-xl font-bold text-green-800">
                  Recommended: {result.safestRouteName}
                </h2>
              </div>
              <p className="text-green-700 text-sm">{result.safetyImprovement}</p>
              <p className="text-gray-500 text-xs mt-1">
                {result.origin} → {result.destination}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg text-sm hover:bg-green-50 transition"
              >
                🔄 Refresh
              </button>
              {lastRefreshed && (
                <span className="text-xs text-gray-400">
                  Updated {lastRefreshed}
                </span>
              )}
            </div>
          </div>

          {/* Route Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.routes.map(route => {
              const isBest = route.id === result.safestRouteId;
              return (
                <div
                  key={route.id}
                  className={`relative bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 transition hover:shadow-lg ${
                    isBest ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  {isBest && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                      SAFEST ROUTE
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{route.name}</h3>
                      <p className="text-xs text-gray-500">{route.description}</p>
                    </div>
                    <ScoreBadge score={route.safetyScore} />
                  </div>

                  {/* Safety bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Safety Score</span>
                      <span>{route.safetyScore}/100</span>
                    </div>
                    <ScoreBar score={route.safetyScore} />
                  </div>

                  {/* Trip info */}
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">🕐 {route.duration}</span>
                    <span className="text-gray-600">📏 {route.distance}</span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-1.5 border-t pt-3">
                    <StatItem icon="🚔" label="Police Patrols" value={route.policePatrols} />
                    <StatItem
                      icon="💡"
                      label="Street Lights"
                      value={`${route.streetLightCoverage}%`}
                    />
                    <StatItem
                      icon="🏪"
                      label="Open Shops"
                      value={route.openBusinesses}
                    />
                    <StatItem
                      icon="👥"
                      label="Crowd"
                      value={route.crowdDensity}
                    />
                    <StatItem
                      icon="🌦️"
                      label="Weather"
                      value={route.weatherCondition}
                    />
                    <StatItem
                      icon="⚠️"
                      label="Incidents"
                      value={route.crimeIncidents}
                    />
                  </div>

                  {/* Highlights */}
                  {route.highlights.length > 0 && (
                    <div className="space-y-1">
                      {route.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1 text-xs text-green-700 bg-green-50 rounded-md px-2 py-1"
                        >
                          <span className="mt-0.5">✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Warnings */}
                  {route.warnings.length > 0 && (
                    <div className="space-y-1">
                      {route.warnings.map((w, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1 text-xs text-red-700 bg-red-50 rounded-md px-2 py-1"
                        >
                          <span className="mt-0.5">!</span>
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Info Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            🔁 Data simulates real-time crime reports, street lighting, police patrols, crowd density &amp;
            weather. In production this connects to live APIs. Refreshes every minute.
          </p>
        </section>
      )}

      {/* How it works */}
      {!result && (
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            How SafeRoute Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📍',
                title: 'Enter Locations',
                desc: 'Input your current location and destination',
              },
              {
                icon: '📡',
                title: 'Data Collection',
                desc: 'AI pulls crime data, weather, lighting, and crowd density',
              },
              {
                icon: '🧮',
                title: 'Safety Scoring',
                desc: 'Each of 3 routes is scored across multiple safety factors',
              },
              {
                icon: '🛡️',
                title: 'Safest Route',
                desc: 'The recommended route is shown with full reasoning',
              },
            ].map(item => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-5 shadow-sm text-center hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <h3 className="font-bold text-purple-900 mb-3 text-lg">
              🔍 Safety Factors Analysed
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-purple-800">
              {[
                '🚨 Real-time crime incidents',
                '💡 Street light coverage',
                '🚔 Live police patrols',
                '🏪 Open shops nearby',
                '👥 Crowd density',
                '🌧️ Weather conditions',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                  {f}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
