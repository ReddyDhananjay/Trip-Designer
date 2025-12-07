'use client';

import { useEffect, useState } from 'react';
import { Product, Order } from '@/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state for new/edit product
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: 0,
    image: '',
    description: '',
    stock: 0,
    featured: false,
    specs: {} as Record<string, string>
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders')
      ]);
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();
      setProducts(productsData);
      setOrders(ordersData.reverse());
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to add product');

      alert('Product added successfully!');
      setShowAddProduct(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Add product failed:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update product');

      alert('Product updated successfully!');
      setEditingProduct(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Update product failed:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');

      alert('Product deleted successfully!');
      loadData();
    } catch (error) {
      console.error('Delete product failed:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update order');

      alert('Order status updated successfully!');
      loadData();
    } catch (error) {
      console.error('Update order failed:', error);
      alert('Failed to update order. Please try again.');
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      stock: product.stock,
      featured: product.featured,
      specs: product.specs
    });
    setShowAddProduct(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Electronics',
      price: 0,
      image: '',
      description: '',
      stock: 0,
      featured: false,
      specs: {}
    });
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage products and orders</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders ({orders.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => {
                      resetForm();
                      setShowAddProduct(!showAddProduct);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition"
                  >
                    {showAddProduct ? 'Cancel' : '+ Add New Product'}
                  </button>
                </div>

                {/* Add/Edit Product Form */}
                {showAddProduct && (
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option>Electronics</option>
                          <option>Wearables</option>
                          <option>Bags</option>
                          <option>Accessories</option>
                          <option>Shoes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700">Featured Product</span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                        className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                      >
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </button>
                      <button
                        onClick={() => {
                          setShowAddProduct(false);
                          resetForm();
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.featured ? (
                                <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">Yes</span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">No</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => startEdit(product)}
                                className="text-primary hover:text-indigo-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                {orders.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <p className="text-gray-500">No orders yet</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{order.totalPrice.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                                  className="text-sm border border-gray-300 rounded px-2 py-1"
                                >
                                  <option value="Processing">Processing</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.orderDate).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <a href={`/products/${order.productId}`} target="_blank" className="text-primary hover:text-indigo-700">
                                  View Product
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
