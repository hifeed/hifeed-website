'use client';

import React from 'react';
import { Beef, Sprout, Trees } from 'lucide-react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { ABATEMENT_SOURCES, formatMonthRange, type AbatementSource } from '@/lib/mrv/carbon';
import { useCarbon } from '@/components/mrv/CarbonProvider';

const SOURCE_STYLE: Record<AbatementSource, { color: string; icon: typeof Beef; light: string; text: string }> = {
  enteric: { color: '#10b981', icon: Beef, light: 'bg-emerald-50', text: 'text-emerald-600' },
  rawMaterial: { color: '#3b82f6', icon: Sprout, light: 'bg-blue-50', text: 'text-blue-600' },
  carbonBank: { color: '#8b5cf6', icon: Trees, light: 'bg-violet-50', text: 'text-violet-600' },
};

const SOURCES = Object.keys(ABATEMENT_SOURCES) as AbatementSource[];


const SERIES_NAMES: Record<string, string> = {
  ...Object.fromEntries(SOURCES.map((s) => [s, ABATEMENT_SOURCES[s].short])),
  cumulative: 'Cumulative',
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 min-w-[200px]">
      <p className="text-xs text-gray-500 font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs text-gray-600">{SERIES_NAMES[entry.dataKey]}</span>
          </div>
          <span className="text-xs font-bold text-gray-900">{entry.value.toFixed(2)} t</span>
        </div>
      ))}
    </div>
  );
};

export default function AbatementBreakdown() {
  const carbon = useCarbon();
  const totals = carbon.totals();
  const chartData = carbon.monthly.map((m) => ({
    month: m.label,
    enteric: +m.enteric.toFixed(2),
    rawMaterial: +m.rawMaterial.toFixed(2),
    carbonBank: +m.carbonBank.toFixed(2),
    cumulative: +m.cumulative.toFixed(2),
  }));
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Carbon Abatement by Source</h3>
        <p className="mt-1 text-sm text-gray-500">
          {formatMonthRange(totals.fromMonth, totals.toMonth)} · tCO₂e · source: {carbon.data.source.label}
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOURCES.map((source) => {
            const style = SOURCE_STYLE[source];
            const value = totals[source];
            const share = totals.total > 0 ? (value / totals.total) * 100 : 0;
            return (
              <div key={source} className={`rounded-xl ${style.light} p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                    <style.icon className={`w-5 h-5 ${style.text}`} />
                  </div>
                  <p className="text-xs font-bold text-gray-700 leading-tight">{ABATEMENT_SOURCES[source].label}</p>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl font-black ${style.text}`}>{value.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">tCO₂e</span>
                  <span className="ml-auto text-xs font-semibold text-gray-500">{share.toFixed(1)}%</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 leading-snug">{ABATEMENT_SOURCES[source].description}</p>
              </div>
            );
          })}
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="monthly" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="cumulative" orientation="right" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(key: string) => <span className="text-xs text-gray-600">{SERIES_NAMES[key]}</span>} />
              {SOURCES.map((source) => (
                <Bar key={source} yAxisId="monthly" dataKey={source} stackId="abatement" fill={SOURCE_STYLE[source].color} maxBarSize={36} />
              ))}
              <Line yAxisId="cumulative" type="monotone" dataKey="cumulative" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-gray-400">
          Bars: abatement recognised per month (left axis). Line: cumulative total (right axis). Raw material offtake is booked in May 2026 and carbon bank sequestration at each station re-measurement, following the workbook&apos;s recognition dates.
        </p>
      </div>
    </div>
  );
}
