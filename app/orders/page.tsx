'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '@/types';

const statusColors = {
  'Processing': 'bg-blue-100 text-blue-800',
  'Shipped': 'bg-purple-100 text-purple-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

const statusIcons = {
  'Processing': '⏳',
  'Shipped': '🚚',
  'Delivered': '✅',
  'Cancelled': '❌'
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data.reverse()); // Show newest first
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load orders:', err);
        setLoading(false);
      });
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to cancel order');

      alert('Order cancelled successfully!');
      loadOrders(); // Reload orders
    } catch (error) {
      console.error('Cancel order failed:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View and manage your mock order history</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Demo Mode:</strong> These are mock orders for demonstration purposes. You can create orders through the chatbot or product pages.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-600 mt-4">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">Start shopping and create your first order!</p>
            <div className="mt-6 flex justify-center space-x-4">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Browse Products
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-indigo-50 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with KAI
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="mb-4 lg:mb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{order.productName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                          {statusIcons[order.status]} {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${order.totalPrice.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(order.orderDate)}</p>
                      <p className="text-xs text-gray-500">{formatTime(order.orderDate)}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Estimated Delivery</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(order.estimatedDelivery)}</p>
                      <p className="text-xs text-gray-500">
                        {Math.ceil((new Date(order.estimatedDelivery).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                      <p className="text-sm font-medium text-gray-900">${order.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/products/${order.productId}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
                    >
                      View Product
                    </Link>
                    
                    <Link
                      href="/chat"
                      className="px-4 py-2 bg-indigo-100 text-primary text-sm font-medium rounded-lg hover:bg-indigo-200 transition"
                    >
                      💬 Ask KAI About Order
                    </Link>
                    
                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                      <span className="text-xs font-medium">Processing</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className={`flex items-center space-x-2 ${order.status === 'Shipped' || order.status === 'Delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                      <span className="text-xs font-medium">Shipped</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className={`flex items-center space-x-2 ${order.status === 'Delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                      <span className="text-xs font-medium">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {!loading && orders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-3xl font-bold text-primary">{orders.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Orders</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'Processing').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Processing</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {orders.filter(o => o.status === 'Shipped').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Shipped</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-3xl font-bold text-green-600">
                {orders.filter(o => o.status === 'Delivered').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Delivered</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
