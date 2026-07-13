'use client';

import React from 'react';
import { Sprout, Wheat, Factory, Truck, Beef, TrendingDown, ArrowRight } from 'lucide-react';
import { buildSupplyChain } from '@/lib/mrv/calc';
import type { PeriodKey } from '@/lib/mrv/periods';
import { findPeriod } from '@/lib/mrv/periods';

interface SupplyChainFlowProps {
  periodKey: PeriodKey;
}

const STEPS = [
  {
    icon: Sprout,
    key: 'cultivation',
    label: 'Cultivation',
    unit: 'Ha',
    subUnit: 'active plantation',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
    highlightKey: 'totalHectares',
    subKey: null,
    detail: 'Indigofera + Pakcoy',
  },
  {
    icon: Wheat,
    key: 'harvest',
    label: 'Harvest',
    unit: 'Ton',
    subUnit: 'fresh biomass',
    gradient: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-500/10',
    border: 'border-teal-200',
    text: 'text-teal-600',
    highlightKey: 'totalFreshBiomassTon',
    subKey: 'totalDryBiomassTon',
    subLabel: 'dry',
    detail: 'Fresh → dried to 25%',
  },
  {
    icon: Factory,
    key: 'processing',
    label: 'Processing',
    unit: 'Kg',
    subUnit: 'pellet produced',
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-200',
    text: 'text-blue-600',
    highlightKey: 'totalPelletKg',
    subKey: null,
    detail: '62% yield rate',
  },
  {
    icon: Truck,
    key: 'distribution',
    label: 'Distribution',
    unit: 'Ton',
    subUnit: 'pellet shipped',
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-200',
    text: 'text-violet-600',
    highlightKey: 'totalDistributionTon',
    subKey: null,
    detail: 'Zero-waste distribution',
  },
  {
    icon: Beef,
    key: 'consumption',
    label: 'Consumption',
    unit: 'Kg',
    subUnit: 'fed to cattle',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-200',
    text: 'text-amber-600',
    highlightKey: 'totalConsumptionKg',
    subKey: null,
    detail: '12 kg/day × 1,740 cattle',
  },
  {
    icon: TrendingDown,
    key: 'carbon',
    label: 'Carbon Reduced',
    unit: 'Ton CO₂e',
    subUnit: 'total avoided',
    gradient: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-200',
    text: 'text-rose-600',
    highlightKey: 'totalCO2eTon',
    subKey: 'entericCO2eTon',
    subLabel: 'enteric',
    detail: 'Cultivation + Enteric + Sequestration',
  },
];

function formatNum(n: number, decimals = 1): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(decimals)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(decimals)}K`;
  return n.toFixed(decimals);
}

export default function SupplyChainFlow({ periodKey }: SupplyChainFlowProps) {
  const period = findPeriod(periodKey);
  const sc = buildSupplyChain(period.fromMonth, period.toMonth);

  const valueMap: Record<string, string | number> = {
    totalHectares: sc.totalHectares,
    indigoHectares: sc.indigoHectares,
    pakcoyHectares: sc.pakcoyHectares,
    totalFreshBiomassTon: sc.totalFreshBiomassTon,
    totalDryBiomassTon: sc.totalDryBiomassTon,
    totalPelletKg: sc.totalPelletKg,
    totalDistributionTon: sc.totalDistributionTon,
    totalConsumptionKg: sc.totalConsumptionKg,
    entericCO2eTon: sc.entericCO2eTon,
    cultivationCO2eTon: sc.cultivationCO2eTon,
    sequestrationCO2eTon: sc.sequestrationCO2eTon,
    totalCO2eTon: sc.totalCO2eTon,
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Upstream-to-Credit Supply Chain</h3>
        <p className="mt-1 text-sm text-gray-500">
          Full trace from {period.label} — cultivation hectares through to verified carbon reduction.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const value = valueMap[step.highlightKey];
            const subValue = step.subKey ? valueMap[step.subKey] : null;

            return (
              <React.Fragment key={step.key}>
                <div className={`relative rounded-2xl border ${step.border} ${step.bg} p-4 text-center transition-all hover:shadow-md`}>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.gradient} mx-auto flex items-center justify-center mb-3 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className={`text-[10px] uppercase tracking-widest font-bold ${step.text} mb-1`}>{step.label}</p>
                  <p className="text-2xl font-black text-gray-900 leading-tight">
                    {typeof value === 'number' ? formatNum(value) : value}
                    <span className="text-xs font-medium text-gray-400 ml-0.5">{step.unit}</span>
                  </p>
                  {subValue !== null && (
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      <span className="font-semibold text-gray-700">{step.subLabel}: </span>
                      {typeof subValue === 'number' ? formatNum(subValue) : subValue}{step.unit}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1 leading-tight">{step.subUnit}</p>
                  <p className="text-[10px] text-gray-500 mt-1 italic">{step.detail}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="hidden xl:flex absolute items-center justify-center" style={{ left: `calc(${(i + 1) * 16.667}% - 12px)` }}>
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <BreakdownCard label="Indigofera Planted" value={`${sc.indigoHectares} Ha`} color="emerald" sub="Carbon sequestered: 6.4 Ton CO₂e/Ha/yr" />
          <BreakdownCard label="Pakcoy Planted" value={`${sc.pakcoyHectares} Ha`} color="teal" sub="Carbon sequestered: 2.4 Ton CO₂e/Ha/yr" />
          <BreakdownCard label="Dry Biomass" value={`${sc.totalDryBiomassTon.toFixed(1)} Ton`} color="blue" sub="25% dry matter from fresh harvest" />
          <BreakdownCard label="Total CO₂e Avoided" value={`${sc.totalCO2eTon} Ton`} color="rose" sub={`Cultivation: ${sc.cultivationCO2eTon} + Enteric: ${sc.entericCO2eTon} + Seq: ${sc.sequestrationCO2eTon}`} />
        </div>
      </div>
    </div>
  );
}

function BreakdownCard({ label, value, color, sub }: { label: string; value: string; color: string; sub: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-200 bg-emerald-50/60',
    teal: 'border-teal-200 bg-teal-50/60',
    blue: 'border-blue-200 bg-blue-50/60',
    rose: 'border-rose-200 bg-rose-50/60',
  };
  return (
    <div className={`rounded-xl border p-3 ${colorMap[color] ?? ''}`}>
      <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 mb-0.5">{label}</p>
      <p className="text-base font-black text-gray-900">{value}</p>
      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{sub}</p>
    </div>
  );
}
