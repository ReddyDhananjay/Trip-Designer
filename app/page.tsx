'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SafeRoute</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              AI-Powered Safe Route Finder for Women
            </p>

            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Get the safest walking route home — powered by real-time crime data, street lighting, crowd density, and weather analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/route-finder"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0020 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Find Safest Route
              </Link>

              <Link
                href="/emergency"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-red-600 bg-white border-2 border-red-600 rounded-lg shadow hover:shadow-md hover:bg-red-50 transform hover:scale-105 transition duration-200"
              >
                🆘 Emergency SOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            How SafeRoute Keeps You Safe
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our AI analyzes multiple real-time data sources to recommend the safest path
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Locations</h3>
              <p className="text-gray-600">Input your current location and destination</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analyzes Data</h3>
              <p className="text-gray-600">Crime data, lighting, crowds & weather are scored</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compare 3 Routes</h3>
              <p className="text-gray-600">&quot;Route A is 30% safer&quot; — clear, actionable results</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Updates</h3>
              <p className="text-gray-600">Safety scores update every minute with new incidents</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            What Our AI Analyzes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🚨 Crime Data</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Recent incident reports near each route</li>
                <li>• Historical crime hotspot analysis</li>
                <li>• Time-of-day risk patterns</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Street Infrastructure</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Street light coverage along path</li>
                <li>• CCTV camera locations</li>
                <li>• Open shops and businesses nearby</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">👥 Environment</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Crowd density at current time</li>
                <li>• Weather and visibility conditions</li>
                <li>• Nearby police patrols & stations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Safety Matters
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Try SafeRoute now — find the safest path to your destination
          </p>
          <Link
            href="/route-finder"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-primary bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0020 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Find My Safe Route
          </Link>
        </div>
      </section>

      {/* Floating Emergency Button */}
      <Link
        href="/emergency"
        className="sos-pulse fixed bottom-6 right-6 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition duration-300 flex items-center justify-center z-50"
        title="Emergency SOS"
      >
        <span className="text-2xl font-bold">SOS</span>
      </Link>
    </div>
  );
}
