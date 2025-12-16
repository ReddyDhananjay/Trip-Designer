#!/bin/bash

# KAI Website Quick Start Script
# Team AIGNITE - EY Techathon 6.0

echo "=================================================="
echo "   KAI - The Voice of Commerce"
echo "   Quick Start Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "🔑 IMPORTANT: Please add your OpenRouter API key to .env.local"
    echo "   Get your key from: https://openrouter.ai/keys"
    echo ""
    read -p "Press Enter to continue or Ctrl+C to exit and add your API key first..."
    echo ""
fi

# Display instructions
echo "=================================================="
echo "   Starting Development Server..."
echo "=================================================="
echo ""
echo "📝 Instructions:"
echo "   1. The website will open at: http://localhost:3000"
echo "   2. Make sure you have added your OpenRouter API key to .env.local"
echo "   3. Press Ctrl+C to stop the server"
echo ""
echo "🌟 Pages available:"
echo "   - Home:     http://localhost:3000"
echo "   - Chat:     http://localhost:3000/chat"
echo "   - Products: http://localhost:3000/products"
echo "   - Orders:   http://localhost:3000/orders"
echo "   - Admin:    http://localhost:3000/admin"
echo ""
echo "=================================================="
echo ""

# Start development server
npm run dev
