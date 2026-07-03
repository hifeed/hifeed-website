'use client';

import React from 'react';
import { CheckCircle2, Clock, ShoppingCart, ArrowRight } from 'lucide-react';

const stages = [
  {
    label: 'Measured',
    desc: 'CO₂e reduction calculated from feed distribution data',
    value: '45.2 Ton',
    icon: CheckCircle2,
    color: 'emerald',
    bgClass: 'bg-emerald-500',
    textClass: 'text-emerald-600',
    lightBg: 'bg-emerald-50',
  },
  {
    label: 'Verified',
    desc: 'Audited and certified by third-party verifier',
    value: '32 Credits',
    icon: CheckCircle2,
    color: 'blue',
    bgClass: 'bg-blue-500',
    textClass: 'text-blue-600',
    lightBg: 'bg-blue-50',
  },
  {
    label: 'Pending',
    desc: 'Awaiting audit for current reporting cycle',
    value: '9 Credits',
    icon: Clock,
    color: 'amber',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-600',
    lightBg: 'bg-amber-50',
  },
  {
    label: 'Sold / Retired',
    desc: 'Credits transacted on voluntary carbon market',
    value: '18 Credits',
    icon: ShoppingCart,
    color: 'violet',
    bgClass: 'bg-violet-500',
    textClass: 'text-violet-600',
    lightBg: 'bg-violet-50',
  },
];

export default function CreditPipeline() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Carbon Credit Pipeline</h3>
        <p className="mt-1 text-sm text-gray-500">End-to-end tracking from measurement to market.</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.label}>
              <div className={`relative rounded-xl ${stage.lightBg} p-5 text-center`}>
                <div className={`w-10 h-10 rounded-xl ${stage.bgClass} mx-auto flex items-center justify-center mb-3`}>
                  <stage.icon className="w-5 h-5 text-white" />
                </div>
                <p className={`text-2xl font-black ${stage.textClass}`}>{stage.value}</p>
                <p className="text-xs font-bold text-gray-700 mt-1">{stage.label}</p>
                <p className="text-[11px] text-gray-400 mt-1 leading-tight">{stage.desc}</p>

                {/* Arrow connector (hidden on last item and mobile) */}
                {i < stages.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-gray-200 items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Conversion funnel bar */}
        <div className="mt-6 flex rounded-full overflow-hidden h-3">
          <div className="bg-emerald-500 flex-[45.2]" title="Measured: 45.2 Ton" />
          <div className="bg-blue-500 flex-[32]" title="Verified: 32 Credits" />
          <div className="bg-amber-400 flex-[9]" title="Pending: 9 Credits" />
          <div className="bg-violet-500 flex-[18]" title="Sold: 18 Credits" />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          <span>Measured</span>
          <span>Sold / Retired</span>
        </div>
      </div>
    </div>
  );
}
