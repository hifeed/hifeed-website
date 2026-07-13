'use client';

import React from 'react';
import { Users, Package, TrendingDown, Award, ArrowUpRight } from 'lucide-react';
import { aggregatePipelineForPeriod, aggregatePartnersForPeriod } from '@/lib/mrv/calc';
import { findPeriod, DEFAULT_PERIOD } from '@/lib/mrv/periods';

const period = findPeriod(DEFAULT_PERIOD);

const partners = aggregatePartnersForPeriod(period.fromMonth, period.toMonth);
const pipeline = aggregatePipelineForPeriod(period.fromMonth, period.toMonth);
const activePartners = partners.filter((p) => p.status === 'active');

const newThisCycle = 8;

const periodFeedTon = partners.reduce((s, p) => s + p.periodFeedTon, 0);
const previousFeedTon = periodFeedTon * 0.78;
const feedDeltaPct = ((periodFeedTon - previousFeedTon) / previousFeedTon) * 100;

const stats = [
  {
    name: 'Farm Partners',
    value: activePartners.length.toString(),
    change: `+${newThisCycle}`,
    changeLabel: 'new this quarter',
    icon: Users,
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
  {
    name: 'Feed Distributed',
    value: Math.round(periodFeedTon).toString(),
    unit: 'Ton',
    change: `+${feedDeltaPct.toFixed(0)}%`,
    changeLabel: 'vs previous cycle',
    icon: Package,
    gradient: 'from-blue-500 to-cyan-600',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    name: 'CO₂e Avoided',
    value: pipeline.measuredTon.toFixed(1),
    unit: 'Ton',
    change: `+${pipeline.measuredTon.toFixed(1)}`,
    changeLabel: period.label,
    icon: TrendingDown,
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    name: 'Carbon Credits',
    value: pipeline.verified.toString(),
    unit: 'Credits',
    change: `+${pipeline.verified}`,
    changeLabel: 'verified to date',
    icon: Award,
    gradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
];

export default function DashboardStats() {
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
              <span className="inline-flex items-center gap-0.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3" />
                {item.change}
              </span>
            </div>

            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{item.name}</p>

            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-gray-900 tracking-tight">{item.value}</span>
              {item.unit && <span className="text-sm font-medium text-gray-400">{item.unit}</span>}
            </div>

            <p className="text-gray-400 text-[11px] mt-1.5">{item.changeLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
