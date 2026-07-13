'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { MONTHLY } from '@/lib/mrv/data';

const data = MONTHLY.map((m) => ({
  month: m.label,
  feed: m.feedTon,
  co2e: +(m.savedG / 1_000_000).toFixed(2),
}));

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 min-w-[160px]">
        <p className="text-xs text-gray-500 font-medium mb-2">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-0.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-gray-600">{entry.name}</span>
            </div>
            <span className="text-xs font-bold text-gray-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function GrowthChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Growth Trajectory</h3>
          <p className="mt-1 text-sm text-gray-500">Feed distribution and cumulative CO₂e avoided over time (Jan 2025 – Jul 2026).</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-blue-500" />
            <span className="text-gray-500">Feed (Ton)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-gray-500">CO₂e (Ton)</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFeed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCo2e" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dy={8} interval={1} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="feed" name="Feed Distributed" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colorFeed)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="co2e" name="CO₂e Avoided" stroke="#10b981" strokeWidth={2.5} fill="url(#colorCo2e)" dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
