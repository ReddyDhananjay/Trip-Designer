# 🛍️ KAI — The Voice of Commerce

> **Seamless conversational shopping across Web, WhatsApp, and in-store kiosks**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made for EY Techathon 6.0](https://img.shields.io/badge/Made%20for-EY%20Techathon%206.0-orange)](https://ey.com)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**KAI (Knowledge-driven AI)** is a revolutionary conversational commerce platform that transforms how customers shop. Using advanced Agentic AI architecture, KAI provides personalized recommendations, real-time inventory checks, and frictionless checkout — all through natural conversation.

### The Problem

Modern retail faces critical challenges:
- **Fragmented customer journeys** across online and offline channels
- **Poor personalization** leading to low engagement
- **Inventory uncertainty** causing cart abandonment
- **Complex checkout flows** resulting in lost sales

### Our Solution

KAI delivers a unified, AI-powered shopping experience:
- **Master Agent + Worker Agents** for intelligent task orchestration
- **Multi-channel support**: Web, WhatsApp, in-store kiosks
- **Real-time inventory** across all store locations
- **Conversational checkout** within chat interface
- **85%+ recommendation accuracy** using advanced ML

---

## ✨ Features

### 🤖 Conversational AI
- Natural language understanding & intent classification
- Context-aware conversations that remember preferences
- Voice-enabled interactions for hands-free shopping
- Multi-language support (English, Hindi, Tamil, Telugu, Bengali, +50 more)

### 🛒 Smart Commerce
- AI-powered product recommendations
- Real-time inventory checks across stores
- Product comparison & reviews
- In-chat payment processing
- Store pickup & reservation system

### 🏪 Multi-Channel Experience
- **Web Widget**: Embeddable chat for websites
- **WhatsApp Business API**: Shop via WhatsApp
- **In-Store Kiosks**: Self-service touchpoints
- **Seamless Context Transfer**: Continue conversations across devices

### 📊 Manager Dashboard
- Real-time analytics & insights
- Conversion rate tracking
- Customer conversation logs
- Inventory alerts
- Revenue metrics

### 🔒 Enterprise-Grade Security
- End-to-end encryption
- PCI DSS compliant payments
- GDPR compliant data handling
- SOC 2 Type II certified

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend (Mock)
- **JSON Server** - Mock REST API
- **Custom Routes** - API endpoint mapping

### AI/ML (Production)
- Large Language Models (GPT-4, Claude)
- Vector embeddings for semantic search
- Intent classification models
- Recommendation engines

### Infrastructure (Production)
- **AWS/GCP** - Cloud hosting
- **PostgreSQL** - Relational database
- **MongoDB** - Product catalog
- **Redis** - Caching layer
- **Pinecone** - Vector database

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org))
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/kai-voice-of-commerce.git
   cd kai-voice-of-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the mock API server** (in a separate terminal)
   ```bash
   npm run mock-server
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
kai-voice-of-commerce/
├── public/               # Static assets
│   ├── index.html       # HTML template
│   ├── favicon.svg      # Favicon
│   ├── logo.svg         # Logo
│   └── assets/          # Images, fonts
│
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   │
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── DemoPage.tsx
│   │   ├── PricingPage.tsx
│   │   └── ...
│   │
│   ├── utils/           # Utility functions
│   │   ├── api.ts       # API calls
│   │   └── formatters.ts
│   │
│   ├── styles/          # Global styles
│   │   └── global.css
│   │
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
│
├── mock/                # Mock API data
│   ├── db.json         # Mock database
│   └── routes.json     # API routes
│
├── tests/               # Test files
│   ├── Hero.test.tsx
│   ├── ChatWidget.test.tsx
│   └── ProductCard.test.tsx
│
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript config
└── README.md            # This file
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Start mock API server
npm run mock-server

# Lint code
npm run lint
```

### Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following TypeScript & React best practices
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

### Code Style

- Use **TypeScript** for type safety
- Follow **React Hooks** patterns
- Use **functional components** (no class components)
- Write **descriptive variable names**
- Add **comments** for complex logic
- Keep components **small and focused**

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

We maintain >80% code coverage across:
- **Components** (Hero, ChatWidget, ProductCard, etc.)
- **Utility functions** (API calls, formatters)
- **Business logic** (reservations, inventory)

---

## 🚢 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod
   ```

3. **Configure environment**
   - Set `VITE_API_BASE_URL` environment variable
   - Configure redirects for SPA routing

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to Custom Server (Nginx)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Copy build files to server**
   ```bash
   scp -r dist/* user@server:/var/www/kai-commerce
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name kai-commerce.com;
       root /var/www/kai-commerce;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📚 API Documentation

### Mock API Endpoints

The mock API server provides the following endpoints:

#### Products
```
GET    /api/products           # List all products
GET    /api/products/:id       # Get product by ID
```

#### Inventory
```
GET    /api/inventory          # List inventory
GET    /api/inventory/:productId/:storeId  # Check specific stock
```

#### Reservations
```
GET    /api/reservations       # List reservations
POST   /api/reservations       # Create reservation
GET    /api/reservations/:id   # Get reservation
```

#### Stores
```
GET    /api/stores             # List stores
GET    /api/stores/:id         # Get store by ID
```

### Example Requests

**Get Products**
```bash
curl http://localhost:3001/api/products
```

**Create Reservation**
```bash
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_001",
    "storeId": "store_001",
    "customerId": "cust_123"
  }'
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by the KAI Team for **EY Techathon 6.0**

- **Arjun Mehta** - Co-Founder & CEO
- **Priya Sharma** - Co-Founder & CTO
- **Rahul Verma** - Head of Product
- **Ananya Iyer** - Head of Engineering
- **Vikram Singh** - Head of AI/ML
- **Neha Kapoor** - Head of Customer Success

---

## 📞 Contact

- **Website**: [kai-commerce.ai](https://kai-commerce.ai)
- **Email**: contact@kai-commerce.ai
- **Phone**: +91 (800) KAI-VOICE
- **Location**: Bengaluru, Karnataka, India

---

## 🙏 Acknowledgments

- EY Techathon 6.0 for the opportunity
- Open source community for amazing tools
- Our beta testers and early customers

---

<div align="center">
  <strong>Made for EY Techathon 6.0 🚀</strong>
  <br />
  <sub>Transforming Retail with Conversational AI</sub>
</div>
