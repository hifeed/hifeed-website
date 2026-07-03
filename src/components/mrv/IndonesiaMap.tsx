'use client';

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// Farm partner locations with approximate longitude and latitude
const farmLocations = [
  { id: 1, name: 'PT Jaya Makmur', region: 'Blitar, East Java', cattle: 240, coordinates: [112.1783, -8.0983], status: 'active' },
  { id: 2, name: 'CV Sejahtera Farm', region: 'Boyolali, Central Java', cattle: 180, coordinates: [110.5975, -7.5317], status: 'active' },
  { id: 3, name: 'Peternakan Maju', region: 'Lampung', cattle: 320, coordinates: [105.1500, -4.9500], status: 'active' },
  { id: 4, name: 'Bali Cattle Co.', region: 'Tabanan, Bali', cattle: 95, coordinates: [115.1167, -8.4500], status: 'active' },
  { id: 5, name: 'NTB Livestock', region: 'Dompu, NTB', cattle: 210, coordinates: [118.4667, -8.5333], status: 'active' },
  { id: 6, name: 'Sulawesi Hijau', region: 'Bone, South Sulawesi', cattle: 150, coordinates: [120.1500, -4.8000], status: 'onboarding' },
  { id: 7, name: 'Kalimantan Feed', region: 'Kotawaringin, Kalimantan', cattle: 75, coordinates: [111.7333, -2.2000], status: 'onboarding' },
  { id: 8, name: 'Sumatra Ternak', region: 'Deli Serdang, North Sumatra', cattle: 130, coordinates: [98.7000, 3.4333], status: 'active' },
  { id: 9, name: 'NTT Ranchers', region: 'Kupang, NTT', cattle: 180, coordinates: [123.5833, -10.1667], status: 'active' },
  { id: 10, name: 'Pasundan Farm', region: 'Bandung, West Java', cattle: 160, coordinates: [107.6191, -6.9175], status: 'active' },
];

export default function IndonesiaMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[500px] animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Partner Distribution</h3>
          <p className="mt-1 text-sm text-gray-500">Geographic spread of HiFeed farm partners across Indonesia.</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/40" />
            <span className="text-gray-500">Active Partner</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md shadow-amber-500/40" />
            <span className="text-gray-500">Onboarding</span>
          </div>
        </div>
      </div>

      <div className="relative bg-slate-900 p-0 overflow-hidden">
        {/* SVG Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [118, -2], // Focus on Indonesia
              scale: 1100, // Zoom level
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography="/indonesia.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: 'rgba(16, 185, 129, 0.1)',
                        stroke: 'rgba(16, 185, 129, 0.3)',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: 'rgba(16, 185, 129, 0.2)',
                        stroke: 'rgba(16, 185, 129, 0.5)',
                        strokeWidth: 1,
                        outline: 'none',
                      },
                      pressed: {
                        fill: 'rgba(16, 185, 129, 0.3)',
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Farm Markers */}
            {farmLocations.map((loc) => {
              const isStatusActive = loc.status === 'active';
              return (
                <Marker key={loc.name} coordinates={loc.coordinates as [number, number]}>
                  {/* Outer glow/pulse */}
                  <circle
                    r={8}
                    fill={isStatusActive ? 'rgba(52, 211, 153, 0.2)' : 'rgba(251, 191, 36, 0.2)'}
                    className="animate-pulse"
                    style={{ animationDuration: `${2 + loc.id * 0.1}s` }}
                  />
                  {/* Core dot */}
                  <circle
                    r={3}
                    fill={isStatusActive ? '#34d399' : '#fbbf24'}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                  
                  {/* Tooltip Group */}
                  <g className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    {/* Invisible larger hit area for hover */}
                    <circle r={15} fill="transparent" />
                    
                    <g transform="translate(0, -35)">
                      <rect x="-60" y="-25" width="120" height="45" rx="6" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
                      <text x="0" y="-12" textAnchor="middle" fill="#111827" fontSize="9" fontWeight="700" fontFamily="sans-serif">{loc.name}</text>
                      <text x="0" y="0" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="sans-serif">{loc.region}</text>
                      <text x="0" y="10" textAnchor="middle" fill={isStatusActive ? '#059669' : '#d97706'} fontSize="8" fontWeight="700" fontFamily="sans-serif">{loc.cattle} cattle</text>
                      <polygon points="-5,20 5,20 0,25" fill="white" />
                    </g>
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>
        </div>
      </div>
      
      {/* Bottom stats row */}
      <div className="bg-slate-900 border-t border-white/5 p-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
          <p className="text-xl font-black text-white">10</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Provinces</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
          <p className="text-xl font-black text-emerald-400">47</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Active Partners</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
          <p className="text-xl font-black text-white">1,740</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Total Cattle</p>
        </div>
      </div>
    </div>
  );
}
