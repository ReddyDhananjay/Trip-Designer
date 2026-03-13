'use client';

import Link from 'next/link';

const emergencyContacts = [
  { name: 'Women Helpline', number: '181', description: 'National Commission for Women 24/7 helpline', icon: '👩', category: 'women' },
  { name: 'Police Emergency', number: '100', description: 'Immediate police assistance', icon: '👮', category: 'police' },
  { name: 'Ambulance', number: '108', description: 'Emergency medical services', icon: '🚑', category: 'medical' },
  { name: 'Women in Distress', number: '1091', description: 'Women in distress helpline', icon: '🆘', category: 'women' },
  { name: 'Domestic Abuse', number: '181', description: 'Report domestic violence', icon: '🏠', category: 'women' },
  { name: 'Cyber Crime', number: '1930', description: 'Report online harassment or cybercrime', icon: '💻', category: 'police' },
  { name: 'Child Helpline', number: '1098', description: 'For children in need of care and protection', icon: '👶', category: 'other' },
  { name: 'Fire Emergency', number: '101', description: 'Fire department emergency', icon: '🔥', category: 'fire' },
];

export default function EmergencyPage() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SOS Header */}
        <div className="bg-red-600 text-white rounded-xl p-8 mb-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-2">🆘 Emergency SOS</h1>
          <p className="text-red-100 mb-6">Tap any number below to call immediately</p>
          <button
            onClick={() => handleCall('112')}
            className="sos-pulse inline-flex items-center justify-center px-12 py-5 text-2xl font-bold bg-white text-red-600 rounded-full shadow-xl hover:shadow-2xl transition"
          >
            📞 Call 112 — Universal Emergency
          </button>
        </div>

        {/* Quick Safety Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Safety Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    const msg = `I need help! My location: https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
                    window.open(`sms:?body=${encodeURIComponent(msg)}`, '_self');
                  }, () => {
                    const msg = 'I need help! Please call me immediately.';
                    window.open(`sms:?body=${encodeURIComponent(msg)}`, '_self');
                  });
                }
              }}
              className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg text-center hover:bg-amber-100 transition"
            >
              <span className="text-3xl block mb-2">📍</span>
              <span className="font-semibold text-gray-900 text-sm">Share Location via SMS</span>
            </button>
            <Link href="/route-finder" className="p-4 bg-green-50 border-2 border-green-300 rounded-lg text-center hover:bg-green-100 transition block">
              <span className="text-3xl block mb-2">🗺️</span>
              <span className="font-semibold text-gray-900 text-sm">Find Safest Route Home</span>
            </Link>
            <Link href="/safety-tips" className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg text-center hover:bg-purple-100 transition block">
              <span className="text-3xl block mb-2">📋</span>
              <span className="font-semibold text-gray-900 text-sm">View Safety Tips</span>
            </Link>
          </div>
        </div>

        {/* Emergency Contacts */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency Contacts (India)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyContacts.map((contact) => (
            <button
              key={contact.number + contact.name}
              onClick={() => handleCall(contact.number)}
              className="bg-white rounded-xl shadow-md p-5 text-left hover:shadow-lg hover:scale-[1.02] transition flex items-center space-x-4"
            >
              <span className="text-4xl">{contact.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{contact.name}</h3>
                <p className="text-xs text-gray-500">{contact.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{contact.number}</span>
                <p className="text-xs text-gray-400">Tap to call</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
