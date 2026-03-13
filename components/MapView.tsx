'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteOption } from '@/types';

interface MapViewProps {
  routes: RouteOption[];
  selectedRoute: string | null;
}

export default function MapView({ routes, selectedRoute }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([12.9750, 77.5990], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || routes.length === 0) return;

    // Clear previous layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Draw routes
    routes.forEach((route) => {
      const isSelected = route.id === selectedRoute;
      const line = L.polyline(route.waypoints, {
        color: route.color,
        weight: isSelected ? 6 : 3,
        opacity: isSelected ? 1 : 0.4,
      }).addTo(map);

      if (isSelected) {
        line.bindPopup(
          `<strong>${route.name}</strong><br/>Safety Score: ${route.safetyScore}/100<br/>${route.distance} • ${route.duration}`
        ).openPopup();
      }
    });

    // Start marker
    const startIcon = L.divIcon({
      html: '<div style="background:#16a34a;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">📍</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      className: '',
    });

    // End marker
    const endIcon = L.divIcon({
      html: '<div style="background:#e11d48;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">🏠</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      className: '',
    });

    if (routes[0]?.waypoints.length > 0) {
      const first = routes[0].waypoints[0];
      const last = routes[0].waypoints[routes[0].waypoints.length - 1];

      L.marker(first, { icon: startIcon }).addTo(map).bindPopup('Your Location');
      L.marker(last, { icon: endIcon }).addTo(map).bindPopup('Destination');

      // Safety features markers
      const features = [
        { pos: [12.9735, 77.5955] as [number, number], label: '👮 Police Station', type: 'police' },
        { pos: [12.9760, 77.5975] as [number, number], label: '📹 CCTV Camera', type: 'cctv' },
        { pos: [12.9745, 77.5990] as [number, number], label: '💡 Well-lit Area', type: 'light' },
        { pos: [12.9770, 77.6005] as [number, number], label: '🏪 Open Shop', type: 'shop' },
        { pos: [12.9755, 77.6020] as [number, number], label: '🏥 Hospital', type: 'hospital' },
      ];

      features.forEach((f) => {
        L.circleMarker(f.pos, {
          radius: 8,
          fillColor: f.type === 'police' ? '#2563eb' : f.type === 'hospital' ? '#dc2626' : '#16a34a',
          color: '#fff',
          weight: 2,
          fillOpacity: 0.8,
        })
          .addTo(map)
          .bindPopup(f.label);
      });
    }
  }, [routes, selectedRoute]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}
