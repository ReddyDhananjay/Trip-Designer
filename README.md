# SafeRoute — AI-Powered Women's Safety Route Finder

SafeRoute uses AI to analyze multiple real-time data sources (crime data, street lighting, crowd density, weather) and suggests the **safest walking route** for women — especially at night.

## Features (MVP)

- **Safe Route Finder** — Enter origin & destination, get 3 routes compared by safety score
- **Safety Score Breakdown** — See exactly why one route is safer (lighting, CCTV, crowds, crime)
- **Interactive Map** — Leaflet.js map showing routes, police stations, cameras, open shops
- **Emergency SOS** — One-tap emergency calling with Indian helpline numbers
- **Safety Tips** — Practical safety advice for walking, transport, online, and more
- **Real-time Updates** — Scores refresh with latest incident data

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | Next.js 14, React 18, TypeScript  |
| Styling   | Tailwind CSS                      |
| Maps      | Leaflet.js + OpenStreetMap (free) |
| Backend   | Next.js API Routes (Node.js)      |
| AI/ML     | Safety scoring algorithm           |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route           | Description                          |
|-----------------|--------------------------------------|
| `/`             | Landing page                         |
| `/route-finder` | Interactive safe route finder        |
| `/safety-tips`  | Safety tips for women                |
| `/emergency`    | Emergency SOS contacts               |
| `/about`        | About the project and architecture   |

## API Routes

| Endpoint                  | Method | Description                    |
|---------------------------|--------|--------------------------------|
| `/api/route-safety`       | POST   | Calculate safety scores        |
| `/api/emergency-contacts` | GET    | Get emergency contact numbers  |

## Track

**AI/ML for Women Empowerment** — Intelligent Safety & Assistive Technology
