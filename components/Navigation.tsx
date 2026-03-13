'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900">SafeRoute</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              href="/route-finder"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/route-finder') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Find Safe Route
            </Link>
            <Link
              href="/safety-tips"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/safety-tips') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Safety Tips
            </Link>
            <Link
              href="/emergency"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/emergency') 
                  ? 'bg-red-600 text-white' 
                  : 'text-red-600 hover:bg-red-50 font-bold'
              }`}
            >
              🆘 Emergency
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/about') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
