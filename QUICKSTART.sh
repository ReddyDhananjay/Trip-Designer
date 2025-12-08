#!/bin/bash

# KAI Website - Quick Start Script
# This script sets up and runs the KAI website

echo "🛍️ KAI Website - Quick Start"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 18+ from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old (found v$NODE_VERSION)"
    echo "Please upgrade to Node.js 18+ from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your OpenRouter API key!"
    echo "Get your API key from: https://openrouter.ai/keys"
    echo ""
    read -p "Press Enter to continue after adding your API key..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies!"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
fi

# Check if data directory exists
if [ ! -d "data" ]; then
    echo "❌ Data directory not found!"
    exit 1
fi

# Check if products.json exists
if [ ! -f "data/products.json" ]; then
    echo "❌ products.json not found!"
    exit 1
fi

# Check if orders.json exists
if [ ! -f "data/orders.json" ]; then
    echo "⚠️  orders.json not found, creating empty file..."
    echo "[]" > data/orders.json
fi

echo "✅ All checks passed!"
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Start development server (npm run dev)"
echo "2) Build for production (npm run build)"
echo "3) Run production server (npm start)"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting development server..."
        echo "=============================="
        echo ""
        echo "Your website will be available at:"
        echo "👉 http://localhost:3000"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🏗️  Building for production..."
        echo "=============================="
        npm run build
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Build successful!"
            echo "You can now run 'npm start' to start the production server"
        else
            echo ""
            echo "❌ Build failed!"
            echo "Please check the errors above and fix them"
            exit 1
        fi
        ;;
    3)
        echo ""
        echo "🚀 Starting production server..."
        echo "=============================="
        echo ""
        echo "Your website will be available at:"
        echo "👉 http://localhost:3000"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        npm start
        ;;
    4)
        echo "Goodbye! 👋"
        exit 0
        ;;
    *)
        echo "Invalid choice! Please run the script again and select 1-4"
        exit 1
        ;;
esac
