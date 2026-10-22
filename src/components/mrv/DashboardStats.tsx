'use client';

import React from 'react';
import { Leaf, Package, Trees, CircleDollarSign } from 'lucide-react';
import { formatMonthRange, type CarbonModel } from '@/lib/mrv/carbon';
import { useCarbon } from '@/components/mrv/CarbonProvider';

function buildStats(carbon: CarbonModel) {
  const totals = carbon.totals();
  return [
  {
    name: 'Total Carbon Abatement',
    value: totals.total.toFixed(1),
    unit: 'tCO₂e',
    caption: formatMonthRange(totals.fromMonth, totals.toMonth),
    icon: Leaf,
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    name: 'Feed Distributed',
    value: (carbon.feedDistributedKg / 1000).toFixed(1),
    unit: 'Ton',
    caption: 'Indigofera, Green Concentrate & Pellets',
    icon: Package,
    gradient: 'from-blue-500 to-cyan-600',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Carbon Bank Area',
    value: carbon.carbonBankTotalAreaHa.toFixed(2),
    unit: 'Ha',
    caption: `${carbon.data.carbonBankStations.length} monitoring stations`,
    icon: Trees,
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
  {
    name: 'Estimated Value',
    value: Math.round(totals.valueUsd).toLocaleString('en-US'),
    unit: 'USD',
    caption: `@ USD ${carbon.data.vcmPriceUsdPerT} / tCO₂e (reference carbon price)`,
    icon: CircleDollarSign,
    gradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
];
}

export default function DashboardStats() {
  const stats = buildStats(useCarbon());
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
        >
          {/* Background gradient blob */}
          <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${item.gradient} opacity-[0.07] group-hover:opacity-[0.12] group-hover:scale-125 transition-all duration-500`} />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
            </div>

            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{item.name}</p>

            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-gray-900 tracking-tight">{item.value}</span>
              {item.unit && <span className="text-sm font-medium text-gray-400">{item.unit}</span>}
            </div>

            <p className="text-gray-400 text-[11px] mt-1.5">{item.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
