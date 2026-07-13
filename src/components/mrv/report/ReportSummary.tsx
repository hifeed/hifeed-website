'use client';

import React from 'react';
import { TrendingDown, Users, Award, Clock, Leaf, ArrowRight, Sprout, Wheat, Factory, Beef } from 'lucide-react';
import {
  aggregatePipelineForPeriod,
  aggregatePartnersForPeriod,
  aggregateCattleForPeriod,
  aggregateFeedForPeriod,
  buildSupplyChain,
} from '@/lib/mrv/calc';
import type { PeriodKey } from '@/lib/mrv/periods';
import { findPeriod } from '@/lib/mrv/periods';
import SupplyChainFlow from './SupplyChainFlow';

interface ReportSummaryProps {
  periodKey: PeriodKey;
}

export default function ReportSummary({ periodKey }: ReportSummaryProps) {
  const period = findPeriod(periodKey);
  const pipeline = aggregatePipelineForPeriod(period.fromMonth, period.toMonth);
  const partners = aggregatePartnersForPeriod(period.fromMonth, period.toMonth);
  const cattleRows = aggregateCattleForPeriod(period.fromMonth, period.toMonth);
  const feed = aggregateFeedForPeriod(period.fromMonth, period.toMonth);
  const sc = buildSupplyChain(period.fromMonth, period.toMonth);

  const activePartners = partners.filter((p) => p.status === 'active');
  const totalCattle = activePartners.reduce((s, p) => s + p.cattle, 0);

  const entericTon = cattleRows.reduce((s, c) => s + c.entericCO2eTon, 0);
  const sequestrationTon = feed.feedTon * 0.155;
  const measuredTon = pipeline.measuredTon;

  return (
    <div className="space-y-8">
      {/* Upstream KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Sprout} accent="emerald" label="Active Plantation" value={sc.totalHectares.toFixed(0)} unit="Ha" sub={`${sc.indigoHectares.toFixed(0)} Indigofera + ${sc.pakcoyHectares.toFixed(0)} Pakcoy`} />
        <KpiCard icon={Wheat} accent="teal" label="Biomass Harvested" value={sc.totalFreshBiomassTon.toFixed(0)} unit="Ton" sub="Fresh biomass (dry matter: 25%)" />
        <KpiCard icon={Factory} accent="blue" label="Pellet Produced" value={formatKg(sc.totalPelletKg)} unit="" sub={`${sc.totalDistributionTon.toFixed(1)} Ton distributed`} />
        <KpiCard icon={Beef} accent="violet" label="Fed to Cattle" value={formatKg(sc.totalConsumptionKg)} unit="" sub={`${totalCattle.toLocaleString()} cattle @ 12 kg/day`} />
      </section>

      {/* Supply Chain Flow */}
      <SupplyChainFlow periodKey={periodKey} />

      {/* Cultivation Details Table */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Cultivation Footprint ({period.label})</h3>
            <p className="text-xs text-gray-500">Per-partner plantation area, species breakdown, harvest yield, and carbon sequestration contribution.</p>
          </div>
          <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg font-mono">EF: Indigofera 6.4 | Pakcoy 2.4 Ton CO₂e/Ha/yr</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Farm Partner</th>
                <th className="px-4 py-3 text-center">Indigofera (Ha)</th>
                <th className="px-4 py-3 text-center">Pakcoy (Ha)</th>
                <th className="px-4 py-3 text-center">Total Ha</th>
                <th className="px-4 py-3 text-right">Harvests (Ton)</th>
                <th className="px-4 py-3 text-right">Pellet (Kg)</th>
                <th className="px-4 py-3 text-right">CO₂e Cult. (Ton)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sc.plotBreakdown.map((row) => (
                <tr key={row.partnerId} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 font-semibold text-gray-900">{row.partnerName}</td>
                  <td className="px-4 py-3 text-center text-emerald-600 font-semibold">{row.indigoHa}</td>
                  <td className="px-4 py-3 text-center text-teal-600 font-semibold">{row.pakcoyHa}</td>
                  <td className="px-4 py-3 text-center font-bold text-gray-900">{row.totalHa}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{row.harvestsTon.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-blue-600 font-semibold">{formatKg(row.pelletKg)}</td>
                  <td className="px-4 py-3 text-right text-emerald-700 font-bold">{row.co2eTon.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50/80 font-bold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-center text-emerald-600">{sc.indigoHectares.toFixed(1)}</td>
                <td className="px-4 py-3 text-center text-teal-600">{sc.pakcoyHectares.toFixed(1)}</td>
                <td className="px-4 py-3 text-center text-gray-900">{sc.totalHectares.toFixed(1)}</td>
                <td className="px-4 py-3 text-right text-gray-900">{sc.totalFreshBiomassTon.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-blue-600">{formatKg(sc.totalPelletKg)}</td>
                <td className="px-4 py-3 text-right text-emerald-700">{sc.cultivationCO2eTon.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Downstream KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={TrendingDown} accent="emerald" label="CO₂e Avoided" value={measuredTon.toFixed(2)} unit="Ton" sub={period.label} />
        <KpiCard icon={Users} accent="violet" label="Active Partners" value={activePartners.length.toString()} unit="Farms" sub={`${totalCattle.toLocaleString()} cattle`} />
        <KpiCard icon={Award} accent="amber" label="Verified Credits" value={pipeline.verified.toString()} unit="Credits" sub="Issued to date" />
        <KpiCard icon={Clock} accent="amber-soft" label="Pending Audit" value={pipeline.pending.toString()} unit="Credits" sub="In verification" />
      </section>

      {/* Methodology + Carbon Sources */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Methodology Snapshot</h3>
              <p className="text-xs text-gray-500">Standardized formula applied across all HiFeed farm partners.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormulaBox label="Standard" value="Verra VCS" hint="Voluntary Carbon Standard" />
            <FormulaBox label="Emission Factor" value="0.36" hint="Ton CO₂e per Ton feed" />
            <FormulaBox label="GWP₁₀₀ of CH₄" value="28" hint="IPCC AR5 metric" />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SourceCard title="Enteric CH₄ Reduction" desc="Methane avoided from rumen fermentation via anti-methanogenic feed compounds." value={`${entericTon.toFixed(2)} Ton CO₂e`} color="emerald" />
            <SourceCard title="Feedstock Sequestration" desc="CO₂ absorbed during cultivation of feed raw materials." value={`${sequestrationTon.toFixed(2)} Ton CO₂e`} color="blue" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl text-white p-6 shadow-lg shadow-emerald-900/20">
          <p className="text-emerald-300 text-[10px] uppercase tracking-widest font-semibold mb-2">Two Carbon Sources</p>
          <h3 className="text-xl font-bold leading-tight">Combined Credit Composition</h3>
          <p className="text-sm text-emerald-200/70 mt-2 leading-relaxed">
            Credits are generated from reduced methane emissions and from carbon sequestered during HiFeed&apos;s raw material cultivation.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <p className="text-[10px] text-emerald-300/80 uppercase tracking-widest font-semibold">Enteric</p>
              <p className="text-2xl font-black mt-1">{entericTon.toFixed(1)} <span className="text-xs font-medium text-emerald-300">T</span></p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <p className="text-[10px] text-emerald-300/80 uppercase tracking-widest font-semibold">Sequestration</p>
              <p className="text-2xl font-black mt-1">{sequestrationTon.toFixed(1)} <span className="text-xs font-medium text-emerald-300">T</span></p>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-center">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-emerald-50/90">Total Verified</p>
            <p className="text-3xl font-black mt-1">{(entericTon + sequestrationTon).toFixed(2)} <span className="text-sm font-medium">Ton CO₂e</span></p>
          </div>
        </div>
      </section>

      {/* Partner Performance */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Partner Performance ({period.label})</h3>
            <p className="text-xs text-gray-500">Per-farm feed volume and estimated CO₂e avoided.</p>
          </div>
          <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg font-mono">EF = 0.36 Ton CO₂e / Ton feed</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Farm Partner</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-right">Cattle</th>
                <th className="px-4 py-3 text-right">Feed (Ton)</th>
                <th className="px-4 py-3 text-right">CO₂e (Ton)</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 font-semibold text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.region}</td>
                  <td className="px-4 py-3 text-right">{p.cattle.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-blue-600 font-semibold">{p.periodFeedTon}</td>
                  <td className="px-4 py-3 text-right text-emerald-600 font-bold">{p.periodCO2eTon}</td>
                  <td className="px-4 py-3">
                    {p.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" /> Onboarding
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7-Step Audit Trail */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Audit Trail</h3>
            <p className="text-xs text-gray-500">How numbers flow from raw cultivation data through to verified carbon credits.</p>
          </div>
        </div>
        <ol className="space-y-3 text-sm">
          {[
            { n: 1, t: 'Cultivation', d: 'Land preparation and planting of Indigofera + Pakcoy across partner farms. Hectares tracked per plot; cycle days (Indigofera 75d, Pakcoy 50d) logged at planting date.', color: 'emerald' },
            { n: 2, t: 'Harvest', d: 'Biomass harvested per plot per month. Fresh yield per Ha per cycle multiplied by active hectares. Dry matter ratio: 25% of fresh weight.', color: 'teal' },
            { n: 3, t: 'Processing', d: 'Fresh biomass dried → milled → mixed → pelletized. Processing yield rate: 62% (dry biomass → pellet kg). Waste material composted.', color: 'blue' },
            { n: 4, t: 'Distribution', d: 'Pellets dispatched to farm partners via validated weighbridge logs. Monthly distribution matches partner feed requirements exactly (zero-waste assumption).', color: 'violet' },
            { n: 5, t: 'Consumption', d: 'Cattle consume pellets at 12 kg/day. Daily intake × herd size × days in period = total consumption. Methane reduction measured per individual.', color: 'amber' },
            { n: 6, t: 'Formula Application', d: 'CO₂e_avoided = Σ_feed × 0.36. Enteric credit = Σ_g_CH₄ × 28 (GWP₁₀₀). Cultivation sequestration = Σ_Ha × CO₂e_rate × months/12.', color: 'rose' },
            { n: 7, t: 'Verification', d: 'Pipeline: Measured → Verified (3rd party) → Pending → Sold/Retired. AI MRV pipeline pre-generates dataset; final credit issuance subject to Verra audit.', color: 'emerald' },
          ].map((s) => (
            <li key={s.n} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg text-white text-xs font-bold flex items-center justify-center flex-shrink-0 ${stepColor(s.color)}`}>{s.n}</div>
              <div>
                <p className="font-semibold text-gray-900">{s.t}</p>
                <p className="text-gray-500 text-xs">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl">
          View formula source <ArrowRight className="w-3 h-3" /> src/lib/mrv/calc.ts
        </div>
      </section>
    </div>
  );
}

function formatKg(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function stepColor(color: string): string {
  const map: Record<string, string> = {
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    blue: 'bg-blue-500',
    violet: 'bg-violet-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };
  return map[color] ?? 'bg-emerald-500';
}

function KpiCard({
  icon: Icon,
  label,
  value,
  unit,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  unit: string;
  sub: string;
  accent: 'emerald' | 'violet' | 'amber' | 'amber-soft' | 'teal' | 'blue';
}) {
  const map = {
    emerald: 'bg-emerald-500/10 text-emerald-600',
    violet: 'bg-violet-500/10 text-violet-600',
    amber: 'bg-amber-500/10 text-amber-600',
    'amber-soft': 'bg-amber-500/10 text-amber-600',
    teal: 'bg-teal-500/10 text-teal-600',
    blue: 'bg-blue-500/10 text-blue-600',
  } as const;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${map[accent]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-black text-gray-900 tracking-tight">{value}</span>
        {unit && <span className="text-xs font-medium text-gray-400">{unit}</span>}
      </div>
      <p className="text-[11px] text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function FormulaBox({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className="text-base font-black text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-500 mt-0.5">{hint}</p>
    </div>
  );
}

function SourceCard({ title, desc, value, color }: { title: string; desc: string; value: string; color: 'emerald' | 'blue' }) {
  const map = {
    emerald: 'border-emerald-500/30 bg-emerald-50/50',
    blue: 'border-blue-500/30 bg-blue-50/50',
  } as const;
  return (
    <div className={`border ${map[color]} rounded-xl p-4`}>
      <p className="font-semibold text-gray-900 text-sm">{title}</p>
      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{desc}</p>
      <p className={`mt-3 text-lg font-black ${color === 'emerald' ? 'text-emerald-700' : 'text-blue-700'}`}>{value}</p>
    </div>
  );
}
