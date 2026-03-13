'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SafeRoute</h1>
          <p className="text-lg text-gray-600 mb-6">
            SafeRoute is an AI-powered women&apos;s safety application that helps women find the safest walking route
            to their destination — especially at night.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Problem</h2>
          <p className="text-gray-600 mb-6">
            Women often don&apos;t know which routes are safe when walking home at night. Existing map apps optimize for
            speed or distance — not safety. There&apos;s no easy way to compare routes based on real-time crime data,
            street lighting, crowd density, or police presence.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Solution</h2>
          <p className="text-gray-600 mb-6">
            SafeRoute uses AI to aggregate multiple data sources and generate a <strong>safety score</strong> for
            each route. Users can compare up to 3 routes side-by-side with clear reasoning like
            &quot;Route A is 30% safer because it has better street lighting and CCTV coverage.&quot;
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Technical Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js 14 + React 18</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for responsive UI</li>
                <li>• Leaflet.js for interactive maps</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Backend / AI</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Node.js API routes</li>
                <li>• Safety scoring algorithm</li>
                <li>• Real-time data aggregation</li>
                <li>• Crime, weather, lighting APIs</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Sources</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Crime Data', icon: '🚨' },
              { label: 'Weather', icon: '🌧️' },
              { label: 'Street Lights', icon: '💡' },
              { label: 'Crowd Density', icon: '👥' },
              { label: 'CCTV Cameras', icon: '📹' },
              { label: 'Police Patrols', icon: '👮' },
              { label: 'Open Shops', icon: '🏪' },
              { label: 'Hospitals', icon: '🏥' },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 bg-rose-50 rounded-lg">
                <span className="text-2xl block mb-1">{item.icon}</span>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Track: AI/ML for Women Empowerment</h2>
          <p className="text-gray-600">
            This project fits the <strong>Intelligent Safety &amp; Assistive Technology</strong> track,
            using AI and real-time data analysis to provide an emergency safety alert and route guidance
            system specifically designed for women&apos;s safety.
          </p>
        </div>
      </div>
    </div>
  );
}
