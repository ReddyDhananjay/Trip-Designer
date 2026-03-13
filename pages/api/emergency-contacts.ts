import type { NextApiRequest, NextApiResponse } from 'next';

const emergencyContacts = [
  { id: '1', name: 'Women Helpline', number: '181', description: 'National Commission for Women 24/7 helpline', icon: '👩', category: 'women' },
  { id: '2', name: 'Police Emergency', number: '100', description: 'Immediate police assistance', icon: '👮', category: 'police' },
  { id: '3', name: 'Ambulance', number: '108', description: 'Emergency medical services', icon: '🚑', category: 'medical' },
  { id: '4', name: 'Women in Distress', number: '1091', description: 'Women in distress helpline', icon: '🆘', category: 'women' },
  { id: '5', name: 'Universal Emergency', number: '112', description: 'Single emergency number for India', icon: '📞', category: 'police' },
  { id: '6', name: 'Cyber Crime', number: '1930', description: 'Report online harassment or cybercrime', icon: '💻', category: 'police' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.query;

  let filtered = emergencyContacts;
  if (category && typeof category === 'string') {
    filtered = filtered.filter((c) => c.category === category);
  }

  res.status(200).json(filtered);
}
