'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
  PieChart, Pie
} from 'recharts';

const barData = [
  { name: 'Jan', baseline: 4000, aktual: 3800, saved: 200 },
  { name: 'Feb', baseline: 4000, aktual: 3500, saved: 500 },
  { name: 'Mar', baseline: 4000, aktual: 3200, saved: 800 },
  { name: 'Apr', baseline: 4000, aktual: 2900, saved: 1100 },
  { name: 'Mei', baseline: 4000, aktual: 2600, saved: 1400 },
  { name: 'Jun', baseline: 4000, aktual: 2300, saved: 1700 },
];

const donutData = [
  { name: 'Reduksi Metana Enterik', value: 28.5, color: '#10b981' },
  { name: 'Sekuestrasi Bahan Baku', value: 16.7, color: '#3b82f6' },
];

const CustomTooltipBar = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 min-w-[180px]">
        <p className="text-xs text-gray-500 font-medium mb-2">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-gray-600">{entry.name}</span>
            </div>
            <span className="text-xs font-bold text-gray-900">{entry.value.toLocaleString('en-US')} g</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportingChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Laporan Emisi & Kontribusi Karbon</h3>
        <p className="mt-1 text-sm text-gray-500">
          Tren reduksi emisi bulanan dan proporsi kontribusi dari masing-masing sumber.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Bar Chart - 3/5 */}
        <div className="lg:col-span-3 p-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">Emisi Baseline vs Aktual (g CO2e)</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={4} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dx={-5} />
                <Tooltip content={<CustomTooltipBar />} cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
                />
                <Bar dataKey="baseline" name="Baseline" radius={[6, 6, 0, 0]} maxBarSize={28}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill="#fecaca" />
                  ))}
                </Bar>
                <Bar dataKey="aktual" name="Aktual" radius={[6, 6, 0, 0]} maxBarSize={28}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill="#6ee7b7" />
                  ))}
                </Bar>
                <Bar dataKey="saved" name="Terhindar" radius={[6, 6, 0, 0]} maxBarSize={28}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill="#10b981" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart - 2/5 */}
        <div className="lg:col-span-2 p-6 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4 text-center">Proporsi Kredit Karbon</p>
          <div className="h-52 w-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  formatter={(value) => [`${value} Ton CO2e`]}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-gray-900">45.2</span>
              <span className="text-[10px] text-gray-400 font-medium">Ton CO2e</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-2 w-full max-w-[200px]">
            {donutData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-900">{item.value}T</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
