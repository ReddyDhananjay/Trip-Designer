import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'SafeRoute - AI-Powered Women\'s Safety Route Finder',
  description: 'SafeRoute uses AI to analyze crime data, weather, lighting, and crowd density to suggest the safest routes for women. Real-time safety scoring and emergency features.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
