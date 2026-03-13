'use client';

const safetyTips = [
  {
    category: 'Walking at Night',
    icon: '🌙',
    tips: [
      'Stick to well-lit, busy streets — avoid shortcuts through alleys',
      'Share your live location with a trusted contact',
      'Keep your phone charged and easily accessible',
      'Walk confidently and stay aware of your surroundings',
      'Avoid wearing headphones in both ears — stay alert',
    ],
  },
  {
    category: 'Using Public Transport',
    icon: '🚌',
    tips: [
      'Wait in well-lit areas at stops and stations',
      'Sit near the driver or in a busy compartment',
      'Note the vehicle number and share it with someone',
      'Use official taxi apps that track your ride',
      'Trust your instincts — change seats or vehicles if uncomfortable',
    ],
  },
  {
    category: 'Online Safety',
    icon: '💻',
    tips: [
      'Never share your real-time location on social media',
      'Use strong, unique passwords for all accounts',
      'Be cautious about sharing personal info with strangers online',
      'Report online harassment immediately',
      'Use two-factor authentication on all important accounts',
    ],
  },
  {
    category: 'If You Feel Unsafe',
    icon: '🆘',
    tips: [
      'Call 112 (universal emergency) or 181 (women helpline) immediately',
      'Enter the nearest open shop, restaurant, or public place',
      'Make noise — shout, use a whistle, or trigger a car alarm',
      'Head toward a crowded area or main road',
      'Use your phone to record audio/video discreetly as evidence',
    ],
  },
  {
    category: 'Self-Defense Basics',
    icon: '💪',
    tips: [
      'Target vulnerable areas: eyes, nose, throat, groin, knees',
      'Use everyday items as tools — keys, umbrella, bag, water bottle',
      'Practice breaking free from common grabs',
      'Take a basic self-defense class in your area',
      'Your safety is the priority — run and seek help if possible',
    ],
  },
  {
    category: 'At Home Safety',
    icon: '🏠',
    tips: [
      'Don\'t open the door for unknown visitors — verify identity first',
      'Keep emergency numbers on speed dial',
      'Install a peephole or video doorbell if possible',
      'Let neighbors or friends know your routine',
      'Keep doors and windows locked, especially at night',
    ],
  },
];

export default function SafetyTipsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Safety Tips for Women</h1>
          <p className="text-gray-600">
            Practical, actionable advice to stay safe in everyday situations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyTips.map((section) => (
            <div key={section.category} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-xl font-bold text-gray-900">{section.category}</h2>
              </div>
              <ul className="space-y-3">
                {section.tips.map((tip, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span className="text-gray-600 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
