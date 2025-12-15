'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatINR } from '@/lib/format';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-8 shadow-lg">
              <span className="text-white font-bold text-3xl">KAI</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              KAI — <span className="text-gray-600">The Voice of Commerce</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              An AI-driven conversational retail assistant built by <strong>Team AIGNITE</strong> (SRM University, AP) for
              <strong> EY Techathon 6.0</strong>. KAI unifies shopping across online, mobile, messaging apps, and in-store
              touchpoints—delivering a seamless, personalized journey from discovery to post‑purchase support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition duration-200"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with KAI
              </Link>
              
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition duration-200"
              >
                Browse Products
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 justify-center text-sm text-gray-600">
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200">Agentic AI architecture</span>
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200">Omnichannel retail</span>
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200">Personalized recommendations</span>
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200">Automation + ROI focus</span>
            </div>
          </div>
        </div>
      </section>

      {/* What makes KAI different */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">
            Built for modern retail journeys
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            KAI reduces fragmentation across channels and supports the full journey—discovery, purchase, and support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-left p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-xl mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Omnichannel continuity</h3>
              <p className="text-gray-600 leading-relaxed">One consistent assistant across web, mobile, messaging, and in-store.</p>
            </div>
            
            <div className="text-left p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-xl mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agentic architecture</h3>
              <p className="text-gray-600 leading-relaxed">
                A master agent coordinates worker agents for recommendations, inventory, payments, loyalty, fulfillment, and support.
              </p>
            </div>
            
            <div className="text-left p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-xl mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Higher conversion & AOV</h3>
              <p className="text-gray-600 leading-relaxed">
                Personalized discovery and guided decision-making to increase conversion rates and average order value.
              </p>
            </div>
            
            <div className="text-left p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-xl mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation & ROI</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduces dependency on human associates and improves satisfaction—targeting 3–4× ROI via sales + efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Demo product catalog</h2>
            <p className="text-gray-600">Prices are shown in INR (₹). Use the chatbot to ask questions or create mock orders.</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.slice(0, 4).map(product => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer transform hover:scale-105">
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          {formatINR(product.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to see KAI in action?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Ask for recommendations, compare products, and place a mock order in seconds.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-200"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Open chat
          </Link>
        </div>
      </section>
    </div>
  );
}
