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
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="font-bold text-xl text-gray-900">KAI</span>
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
              href="/chat"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/chat') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Chat with KAI
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/products') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Products
            </Link>
            <Link
              href="/orders"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/orders') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Orders
            </Link>
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/admin') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
