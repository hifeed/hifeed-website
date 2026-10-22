'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { aggregatePartnersForPeriod } from '@/lib/mrv/calc';
import { findPeriod, DEFAULT_PERIOD } from '@/lib/mrv/periods';

const period = findPeriod(DEFAULT_PERIOD);

const farms = aggregatePartnersForPeriod(period.fromMonth, period.toMonth).map((p) => ({
  name: p.name,
  region: p.region,
  cattle: p.cattle,
  feed: p.periodFeedTon,
  co2e: p.periodCO2eTon,
  status: p.status,
}));

const colors = [
  'bg-emerald-500', 'bg-blue-500', 'bg-violet-500', 'bg-rose-500', 'bg-teal-500',
  'bg-amber-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-pink-500', 'bg-lime-500',
];

export default function FarmPartnersTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Farm Partner Network</h3>
          <p className="mt-1 text-sm text-gray-500">
            Volume-based tracking of HiFeed distribution and estimated emission reductions per partner ({period.label}).
          </p>
        </div>
        <div className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
          {farms.length} partners
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Farm Partner</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Cattle</th>
              <th className="px-6 py-3.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Feed (Ton)</th>
              <th className="px-6 py-3.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Est. CO₂e Avoided</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {farms.map((farm, i) => (
              <tr key={farm.name} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${colors[i % colors.length]} flex items-center justify-center`}>
                      <span className="text-white text-[10px] font-bold">{farm.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{farm.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {farm.region}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">{farm.cattle.toLocaleString('en-US')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-right font-semibold">{farm.feed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 text-right font-bold">{farm.co2e} Ton</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {farm.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                      Onboarding
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary footer */}
      <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <p className="text-gray-500">Emission factor: <strong className="text-gray-700">0.36 Ton CO₂e per Ton feed</strong> (based on Verra VCS methodology)</p>
        <p className="text-gray-400">Period: {period.label}</p>
      </div>
    </div>
  );
}
