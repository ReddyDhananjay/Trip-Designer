'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage, Product } from '@/types';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('kai-chat-history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Welcome message
      const welcomeMessage: ChatMessage = {
        role: 'assistant',
        content: "👋 Hi! I'm KAI, your smart shopping assistant! I can help you find products, answer questions, and even create mock orders. What can I help you with today?",
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }

    // Check for pending question from product page
    const pendingQuestion = localStorage.getItem('kai-pending-question');
    if (pendingQuestion) {
      localStorage.removeItem('kai-pending-question');
      setTimeout(() => {
        handleSend(pendingQuestion);
      }, 500);
    }

    // Load featured products for sidebar
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  useEffect(() => {
    // Save chat history to localStorage
    if (messages.length > 0) {
      localStorage.setItem('kai-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  const clearChat = () => {
    const welcomeMessage: ChatMessage = {
      role: 'assistant',
      content: "👋 Hi! I'm KAI, your smart shopping assistant! I can help you find products, answer questions, and even create mock orders. What can I help you with today?",
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem('kai-chat-history');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">KAI Assistant</h2>
                <p className="text-sm text-gray-500">Online • Always here to help</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Clear Chat
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-fade-in`}
              >
                <div
                  className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-white text-gray-900 shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.timestamp && (
                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-indigo-100' : 'text-gray-400'}`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-3 bg-white border-t">
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => handleQuickAction('Recommend a product for me')}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-primary bg-indigo-50 rounded-lg hover:bg-indigo-100 transition disabled:opacity-50"
              >
                💡 Recommend a product
              </button>
              <button
                onClick={() => handleQuickAction('Show me popular items')}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-primary bg-indigo-50 rounded-lg hover:bg-indigo-100 transition disabled:opacity-50"
              >
                🔥 Popular items
              </button>
              <button
                onClick={() => handleQuickAction('What are today\'s deals?')}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-primary bg-indigo-50 rounded-lg hover:bg-indigo-100 transition disabled:opacity-50"
              >
                🎯 Find deals
              </button>
              <button
                onClick={() => handleQuickAction('I want to create a mock order')}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-primary bg-indigo-50 rounded-lg hover:bg-indigo-100 transition disabled:opacity-50"
              >
                🛒 Create mock order
              </button>
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:transform-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Popular Products */}
        <div className="hidden lg:block w-80 bg-white border-l overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Products</h3>
            <div className="space-y-4">
              {products.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleQuickAction(`Tell me about ${product.name}`)}
                  className="cursor-pointer bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition"
                >
                  <div className="flex space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <p className="text-lg font-bold text-primary">₹{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">💬 Try asking:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Show me electronics"</li>
                <li>• "Compare two products"</li>
                <li>• "Create an order for..."</li>
                <li>• "What's in stock?"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
