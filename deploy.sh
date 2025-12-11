#!/bin/bash

###############################################################################
# KAI Voice of Commerce - Deployment Script
# 
# This script automates the deployment process
# Usage: ./deploy.sh [target]
# 
# Targets:
#   - netlify    Deploy to Netlify
#   - vercel     Deploy to Vercel
#   - aws        Deploy to AWS S3 + CloudFront
#   - custom     Deploy to custom server
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    print_success "Node.js $(node -v) found"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    print_success "npm $(npm -v) found"
}

# Install dependencies
install_deps() {
    print_info "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
}

# Run tests
run_tests() {
    print_info "Running tests..."
    npm test -- --passWithNoTests
    print_success "All tests passed"
}

# Build project
build_project() {
    print_info "Building project..."
    npm run build
    print_success "Project built successfully"
}

# Deploy to Netlify
deploy_netlify() {
    print_info "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod
    print_success "Deployed to Netlify!"
}

# Deploy to Vercel
deploy_vercel() {
    print_info "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    vercel --prod
    print_success "Deployed to Vercel!"
}

# Deploy to AWS S3
deploy_aws() {
    print_info "Deploying to AWS S3..."
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI not found. Please install AWS CLI first."
        exit 1
    fi
    
    BUCKET_NAME=${AWS_BUCKET_NAME:-"kai-commerce-web"}
    
    print_info "Syncing to S3 bucket: $BUCKET_NAME"
    aws s3 sync dist/ "s3://$BUCKET_NAME" \
        --delete \
        --cache-control max-age=31536000,public
    
    print_info "Invalidating CloudFront cache..."
    if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
        aws cloudfront create-invalidation \
            --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
            --paths "/*"
    fi
    
    print_success "Deployed to AWS!"
}

# Deploy to custom server
deploy_custom() {
    print_info "Deploying to custom server..."
    
    if [ -z "$SERVER_HOST" ] || [ -z "$SERVER_USER" ] || [ -z "$SERVER_PATH" ]; then
        print_error "Please set SERVER_HOST, SERVER_USER, and SERVER_PATH environment variables"
        exit 1
    fi
    
    print_info "Uploading to $SERVER_USER@$SERVER_HOST:$SERVER_PATH"
    scp -r dist/* "$SERVER_USER@$SERVER_HOST:$SERVER_PATH"
    
    print_info "Restarting web server..."
    ssh "$SERVER_USER@$SERVER_HOST" "sudo systemctl reload nginx"
    
    print_success "Deployed to custom server!"
}

# Main deployment flow
main() {
    echo ""
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║         KAI Voice of Commerce - Deployment Script         ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo ""
    
    TARGET=${1:-"netlify"}
    
    print_info "Deployment target: $TARGET"
    echo ""
    
    # Pre-flight checks
    print_info "Running pre-flight checks..."
    check_node
    check_npm
    echo ""
    
    # Install dependencies
    install_deps
    echo ""
    
    # Run tests
    run_tests
    echo ""
    
    # Build project
    build_project
    echo ""
    
    # Deploy based on target
    case $TARGET in
        netlify)
            deploy_netlify
            ;;
        vercel)
            deploy_vercel
            ;;
        aws)
            deploy_aws
            ;;
        custom)
            deploy_custom
            ;;
        *)
            print_error "Unknown deployment target: $TARGET"
            echo ""
            echo "Usage: ./deploy.sh [target]"
            echo ""
            echo "Available targets:"
            echo "  netlify    Deploy to Netlify (default)"
            echo "  vercel     Deploy to Vercel"
            echo "  aws        Deploy to AWS S3 + CloudFront"
            echo "  custom     Deploy to custom server"
            exit 1
            ;;
    esac
    
    echo ""
    print_success "Deployment complete! 🚀"
    echo ""
}

# Run main function
main "$@"
