'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetch(`/api/products/${params.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Product not found');
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load product:', err);
          setLoading(false);
        });
    }
  }, [params?.id]);

  const handleAskKAI = () => {
    if (product) {
      localStorage.setItem('kai-pending-question', `Tell me more about ${product.name}`);
      router.push('/chat');
    }
  };

  const handleMockOrder = async () => {
    if (!product) return;

    setOrderLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity
        })
      });

      if (!response.ok) throw new Error('Failed to create order');

      const order = await response.json();
      
      // Show success and redirect to orders
      alert(`Order ${order.id} created successfully! Redirecting to orders page...`);
      router.push('/orders');
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-gray-600 mt-4">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-2 text-lg font-medium text-gray-900">Product not found</h2>
          <p className="mt-1 text-gray-500">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-96 lg:h-full bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ Featured Product
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-primary text-sm font-semibold rounded-full mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
              </div>
              <p className="text-sm text-gray-600">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Out of Stock</span>
                )}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  −
                </button>
                <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleMockOrder}
                disabled={product.stock === 0 || orderLoading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50 disabled:transform-none"
              >
                {orderLoading ? 'Creating Order...' : '🛒 Create Mock Order'}
              </button>
              
              <button
                onClick={handleAskKAI}
                className="w-full py-3 bg-white border-2 border-primary text-primary font-semibold rounded-lg hover:bg-indigo-50 transition"
              >
                💬 Ask KAI About This Product
              </button>
            </div>

            <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
              <strong>Note:</strong> This is a mock order system for demonstration purposes. Orders created here are not real.
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-medium text-gray-500 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="text-lg text-gray-900">{value}</dd>
              </div>
            ))}
          </div>
        </div>

        {/* KAI Assistant CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Have Questions?</h3>
          <p className="text-indigo-100 mb-6">
            Ask KAI for personalized recommendations, detailed information, or help with your purchase decision
          </p>
          <button
            onClick={handleAskKAI}
            className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat with KAI Now
          </button>
        </div>
      </div>
    </div>
  );
}
