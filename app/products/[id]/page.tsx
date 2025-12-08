'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
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
  }, [productId]);

  const handleAskKAI = () => {
    if (product) {
      localStorage.setItem('kai-pending-question', `Tell me more about ${product.name}`);
      router.push('/chat');
    }
  };

  const handleBuyNow = async () => {
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
      alert(`🎉 Order placed successfully!\n\nOrder ID: ${order.id}\nTotal: ₹${order.totalPrice}\nEstimated Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}`);
      router.push('/orders');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  const handleAskAboutOrder = () => {
    if (product) {
      localStorage.setItem('kai-pending-question', `I want to order ${product.name}. Can you help me?`);
      router.push('/chat');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition">Products</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Featured Product
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:p-8">
            <div className="mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">{product.category}</p>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-baseline space-x-3 mb-2">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                <span className="text-gray-500 line-through text-xl">₹{Math.round(product.price * 1.3)}</span>
                <span className="text-green-600 font-semibold text-lg">
                  {Math.round((1 - product.price / (product.price * 1.3)) * 100)}% OFF
                </span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock & Platform Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500 mb-1">Availability</p>
                <p className="font-semibold text-gray-900">
                  {product.stock > 0 ? (
                    <span className="text-green-600">✓ In Stock ({product.stock} units)</span>
                  ) : (
                    <span className="text-red-600">✗ Out of Stock</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Available On</p>
                <p className="font-semibold text-gray-900">
                  {(product as any).platform || 'Amazon, Flipkart'}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
                <span className="text-gray-500 text-sm ml-2">(Max: {product.stock})</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">₹{(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0 || orderLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white text-lg font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                {orderLoading ? 'Processing...' : '🛒 Buy Now (Mock Order)'}
              </button>

              <button
                onClick={handleAskAboutOrder}
                className="w-full px-6 py-4 bg-white border-2 border-primary text-primary text-lg font-semibold rounded-lg hover:bg-indigo-50 transition"
              >
                💬 Order via KAI Chat
              </button>

              <button
                onClick={handleAskKAI}
                className="w-full px-6 py-4 bg-gray-100 text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                🤖 Ask KAI About This Product
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-semibold text-green-800 mb-1">Free Delivery in 5-7 days</p>
                  <p className="text-sm text-green-700">Cash on Delivery available</p>
                  <p className="text-sm text-green-700">Easy 7-day return & exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex py-3 border-b border-gray-200">
                  <span className="w-1/2 text-gray-600 font-medium capitalize">{key}:</span>
                  <span className="w-1/2 text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Buy This */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Buy This Product?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Authentic Product</h3>
                <p className="text-sm text-gray-600">100% genuine from authorized sellers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Best Price</h3>
                <p className="text-sm text-gray-600">Competitive pricing guaranteed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Trusted Quality</h3>
                <p className="text-sm text-gray-600">Top-rated by thousands of buyers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Have Questions?</h3>
          <p className="text-gray-600 mb-4">Chat with KAI for instant product assistance!</p>
          <button
            onClick={handleAskKAI}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition"
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
