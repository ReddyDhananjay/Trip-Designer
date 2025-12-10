#!/bin/bash

###############################################################################
# KAI Voice of Commerce - Quick Start Script
# 
# This script sets up and runs the development environment
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║      KAI — The Voice of Commerce                         ║"
echo "║      Quick Start Script                                  ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
fi

# Start mock server in background
echo -e "${BLUE}🚀 Starting mock API server...${NC}"
npm run mock-server > /dev/null 2>&1 &
MOCK_SERVER_PID=$!
echo -e "${GREEN}✓ Mock API server running on http://localhost:3001${NC}"
echo ""

# Wait a moment for mock server to start
sleep 2

# Start dev server
echo -e "${BLUE}🚀 Starting development server...${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}  ✓ KAI is ready!${NC}"
echo ""
echo -e "  🌐 Web:        ${BLUE}http://localhost:3000${NC}"
echo -e "  📡 Mock API:   ${BLUE}http://localhost:3001${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}Try it out:${NC}"
echo "  1. Open http://localhost:3000 in your browser"
echo "  2. Click the chat button (bottom right)"
echo "  3. Type: 'Show me blue cotton shirts'"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down servers...${NC}"
    kill $MOCK_SERVER_PID 2>/dev/null || true
    echo -e "${GREEN}✓ Goodbye!${NC}"
    exit 0
}

trap cleanup INT TERM

# Start dev server (this will block)
npm run dev

# If we get here, dev server stopped
cleanup
