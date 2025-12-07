#!/bin/bash

echo "🚀 Starting KAI Website..."
echo ""
echo "📦 Installing dependencies (if needed)..."
npm install --silent

echo ""
echo "✨ Starting development server..."
echo ""
echo "🌐 The website will be available at:"
echo "   http://localhost:3000"
echo ""
echo "📄 Pages:"
echo "   • Homepage:        http://localhost:3000/"
echo "   • Chat with KAI:   http://localhost:3000/chat"
echo "   • Products:        http://localhost:3000/products"
echo "   • Orders:          http://localhost:3000/orders"
echo "   • Admin Panel:     http://localhost:3000/admin"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
