#!/bin/bash

echo "🤖 Starting KAI - Smart Shopping Assistant..."
echo ""
echo "=========================================="
echo "  KAI Website Launch Script"
echo "=========================================="
echo ""

# Check if running in browser environment
if command -v python3 &> /dev/null; then
    echo "✅ Python3 found - Starting local server..."
    echo ""
    echo "🌐 Opening KAI at: http://localhost:8000"
    echo ""
    echo "📝 Features:"
    echo "   ✨ AI-powered chatbot with Google Gemini"
    echo "   🛍️ Smart product recommendations"
    echo "   💰 All prices in INR (₹)"
    echo "   📦 Mock order system"
    echo "   🎨 Vibrant 3D animations"
    echo ""
    echo "⚠️  Press Ctrl+C to stop the server"
    echo ""
    
    # Open browser (try different commands for different OS)
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000/index.html &
    elif command -v open &> /dev/null; then
        open http://localhost:8000/index.html &
    fi
    
    # Start Python server
    cd /workspace
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "✅ Python found - Starting local server..."
    echo ""
    echo "🌐 Opening KAI at: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    cd /workspace
    python -m SimpleHTTPServer 8000
    
else
    echo "❌ Python not found!"
    echo ""
    echo "📝 To run KAI, you can:"
    echo "   1. Simply open 'index.html' in your browser"
    echo "   2. Or install Python and run this script again"
    echo "   3. Or use any other local server"
    echo ""
    echo "🔗 Direct file path:"
    echo "   file:///workspace/index.html"
    echo ""
fi
