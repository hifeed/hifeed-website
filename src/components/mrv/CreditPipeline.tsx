'use client';

import React from 'react';
import { CheckCircle2, Clock, ShoppingCart, ArrowRight, Ruler } from 'lucide-react';
import { useCarbon } from '@/components/mrv/CarbonProvider';

const fmt = (t: number | null) => (t == null ? '—' : `${t.toFixed(1)} t`);

function buildStages(measuredT: number, credit: { verifiedT: number | null; pendingT: number | null; retiredT: number | null }) {
  return [
  {
    label: 'Measured',
    desc: 'tCO₂e abated across enteric, raw material offtake and carbon banks',
    amount: measuredT,
    icon: Ruler,
    bgClass: 'bg-emerald-500',
    textClass: 'text-emerald-600',
    lightBg: 'bg-emerald-50',
  },
  {
    label: 'Verified',
    desc: 'Audited and certified by third-party verifier',
    amount: credit.verifiedT,
    icon: CheckCircle2,
    bgClass: 'bg-blue-500',
    textClass: 'text-blue-600',
    lightBg: 'bg-blue-50',
  },
  {
    label: 'Pending',
    desc: 'Awaiting audit for current reporting cycle',
    amount: credit.pendingT,
    icon: Clock,
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-600',
    lightBg: 'bg-amber-50',
  },
  {
    label: 'Sold / Retired',
    desc: 'Credits transacted on voluntary carbon market',
    amount: credit.retiredT,
    icon: ShoppingCart,
    bgClass: 'bg-violet-500',
    textClass: 'text-violet-600',
    lightBg: 'bg-violet-50',
  },
] as Array<{
  label: string;
  desc: string;
  amount: number | null;
  icon: typeof Ruler;
  bgClass: string;
  textClass: string;
  lightBg: string;
}>;
}

export default function CreditPipeline() {
  const carbon = useCarbon();
  const stages = buildStages(carbon.totals().total, carbon.data.creditStatus);
  const recorded = stages.filter((s) => s.amount != null && s.amount > 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Carbon Credit Pipeline</h3>
        <p className="mt-1 text-sm text-gray-500">End-to-end tracking from measurement to market.</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, i) => (
            <div key={stage.label} className={`relative rounded-xl ${stage.lightBg} p-5 text-center`}>
              <div className={`w-10 h-10 rounded-xl ${stage.bgClass} mx-auto flex items-center justify-center mb-3`}>
                <stage.icon className="w-5 h-5 text-white" />
              </div>
              <p className={`text-2xl font-black ${stage.textClass}`}>{fmt(stage.amount)}</p>
              <p className="text-xs font-bold text-gray-700 mt-1">{stage.label}</p>
              <p className="text-[11px] text-gray-400 mt-1 leading-tight">
                {stage.amount == null ? 'Not yet recorded' : stage.desc}
              </p>

              {i < stages.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-gray-200 items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex rounded-full overflow-hidden h-3 bg-gray-100">
          {recorded.map((stage) => (
            <div
              key={stage.label}
              className={stage.bgClass}
              style={{ flex: stage.amount ?? 0 }}
              title={`${stage.label}: ${fmt(stage.amount)}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          <span>Measured</span>
          <span>Sold / Retired</span>
        </div>
      </div>
    </div>
  );
}
