'use client';

import React from 'react';
import {
  ABATEMENT_SOURCES,
  ENTERIC_PARAMS,
  ENTERIC_REDUCTION_T_PER_CATTLE_DAY,
  RAW_MATERIAL_PARAMS,
  NET_DRY_YIELD_KG_PER_YEAR,
  OFFTAKE_SEQ_T_PER_KG,
  OFFTAKE_PROCUREMENT,
  CARBON_BANK_STATIONS,
  FEED_DISTRIBUTION,
  FEED_PRODUCT_LABELS,
  dmiKgPerDay,
  cattleDays,
  entericReductionT,
  offtakeSequestrationT,
  abatementTotals,
  type FeedProduct,
} from '@/lib/mrv/carbon';

const totals = abatementTotals();
const PRODUCTS = Object.keys(FEED_PRODUCT_LABELS) as FeedProduct[];
const n = (v: number, digits = 2) => v.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits });

function MethodCard({ index, title, formula, children }: { index: number; title: string; formula: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 flex flex-col">
      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Source {index}</p>
      <p className="text-sm font-bold text-gray-900">{title}</p>
      <p className="mt-3 font-mono text-[11px] text-emerald-800 bg-white border border-emerald-100 rounded-lg px-3 py-2 leading-relaxed">{formula}</p>
      <ul className="mt-3 space-y-1 text-xs text-gray-600">{children}</ul>
    </div>
  );
}

export default function CarbonMethodology() {
  const offtakeKg = OFFTAKE_PROCUREMENT.reduce((s, p) => s + p.kg, 0);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900">Methodology</h3>
        <p className="mt-1 text-sm text-gray-500">Three carbon abatement sources, calculated with the formulas and parameters of HiFeed&apos;s carbon accounting workbook.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          <MethodCard
            index={1}
            title={ABATEMENT_SOURCES.enteric.label}
            formula="ER = Σ (feed kg ÷ daily DMI) × ER/cattle-day"
          >
            <li>Baseline EF {ENTERIC_PARAMS.baselineEfTPerCattleYear} tCO₂e/cattle/yr (FAO GLEAM, SE Asia)</li>
            <li>Project EF {ENTERIC_PARAMS.projectEfTPerCattleYear} tCO₂e/cattle/yr (current formula)</li>
            <li>ER/cattle-day = {n(ENTERIC_REDUCTION_T_PER_CATTLE_DAY, 6)} tCO₂e</li>
            <li>Reference animal {ENTERIC_PARAMS.bodyWeightKg} kg; DMI {PRODUCTS.map((p) => `${dmiKgPerDay(p)} kg`).join(' / ')} (Indigofera / GC / pellets)</li>
          </MethodCard>
          <MethodCard
            index={2}
            title={ABATEMENT_SOURCES.rawMaterial.label}
            formula="Seq = offtake kg × (20 tCO₂e/ha/yr ÷ net dry yield kg/yr)"
          >
            <li>{RAW_MATERIAL_PARAMS.freshYieldTPerHarvest} t fresh × {RAW_MATERIAL_PARAMS.harvestsPerYear} harvests × {Math.round(RAW_MATERIAL_PARAMS.dryMatterFraction * 100)}% DM × (1 − {Math.round(RAW_MATERIAL_PARAMS.dryingSpoilageFraction * 100)}% spoilage)</li>
            <li>Net dry yield = {n(NET_DRY_YIELD_KG_PER_YEAR, 0)} kg/yr</li>
            <li>Factor = {n(OFFTAKE_SEQ_T_PER_KG, 6)} tCO₂e/kg</li>
            <li>Indigofera offtake {n(offtakeKg, 0)} kg → {n(offtakeSequestrationT(offtakeKg))} tCO₂e</li>
          </MethodCard>
          <MethodCard
            index={3}
            title={ABATEMENT_SOURCES.carbonBank.label}
            formula="Stock = (AGB + BGB) × 0.47 × 3.67 + SOC × 3.67"
          >
            <li>AGB: Chave et al. (2005) allometry, field measurement</li>
            <li>BGB = AGB × R (0.258 Indigofera, 0.956 Hybrid Napier)</li>
            <li>SOC: lab analysis at 0–10, 10–20, 20–30 cm</li>
            <li>Sequestration = stock increase between consecutive measurements</li>
          </MethodCard>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Carbon Bank Stations</h3>
          <p className="mt-1 text-sm text-gray-500">Measured carbon stock per station (tCO₂e). Total sequestration: {n(totals.carbonBank)} tCO₂e.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Station</th>
                <th className="px-4 py-3 text-right">Area (ha)</th>
                <th className="px-4 py-3 text-left">Measurements</th>
                <th className="px-4 py-3 text-right">Sequestration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CARBON_BANK_STATIONS.map((st) => {
                const first = st.measurements[0];
                const last = st.measurements[st.measurements.length - 1];
                const seq = last.stockT - first.stockT;
                return (
                  <tr key={st.id} className="align-top">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{st.name === st.id ? st.id : `${st.id} · ${st.name}`}</p>
                      <p className="text-xs text-gray-500">{st.description}</p>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">{st.areaHa}</td>
                    <td className="px-4 py-3">
                      <ul className="space-y-0.5 text-xs text-gray-600">
                        {st.measurements.map((m) => (
                          <li key={m.month}><span className="font-mono text-gray-400">{m.month}</span> · {n(m.stockT)} — {m.note}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-violet-600">
                      {st.measurements.length > 1 ? n(seq) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Feed Distribution &amp; Enteric Reduction</h3>
          <p className="mt-1 text-sm text-gray-500">Kg distributed per month, converted to cattle-days and tCO₂e. Total: {n(totals.enteric)} tCO₂e.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">Month</th>
                {PRODUCTS.map((p) => <th key={p} className="px-4 py-3 text-right">{FEED_PRODUCT_LABELS[p]} (kg)</th>)}
                <th className="px-4 py-3 text-right">Cattle-days</th>
                <th className="px-4 py-3 text-right">tCO₂e</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FEED_DISTRIBUTION.map((row) => (
                <tr key={row.month}>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{row.month}</td>
                  {PRODUCTS.map((p) => <td key={p} className="px-4 py-2.5 text-right text-gray-700">{row[p] ? n(row[p]!, 0) : '—'}</td>)}
                  <td className="px-4 py-2.5 text-right text-gray-700">{n(cattleDays(row), 0)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-emerald-600">{n(entericReductionT(row))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
