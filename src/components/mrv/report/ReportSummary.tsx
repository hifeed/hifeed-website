'use client';

import React, { useMemo } from 'react';
import { Beef, Sprout, Trees, Leaf } from 'lucide-react';
import { useCarbon } from '@/components/mrv/CarbonProvider';
import {
  ABATEMENT_SOURCES,
  FEED_PRODUCTS,
  FEED_PRODUCT_LABELS,
  monthLabel,
  type AbatementSource,
  type ReportPeriod,
} from '@/lib/mrv/carbon';
import { buildReportData, fmtInt, fmtT, pct } from '@/lib/mrv/report';

const SOURCE_STYLE: Record<AbatementSource, { icon: typeof Beef; light: string; text: string }> = {
  enteric: { icon: Beef, light: 'bg-emerald-50', text: 'text-emerald-600' },
  rawMaterial: { icon: Sprout, light: 'bg-blue-50', text: 'text-blue-600' },
  carbonBank: { icon: Trees, light: 'bg-violet-50', text: 'text-violet-600' },
};
const SOURCES = Object.keys(ABATEMENT_SOURCES) as AbatementSource[];

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

const th = 'px-4 py-3 text-left font-semibold';
const thR = 'px-4 py-3 text-right font-semibold';
const td = 'px-4 py-2.5 text-gray-700';
const tdR = 'px-4 py-2.5 text-right text-gray-700';

export default function ReportSummary({ period }: { period: ReportPeriod }) {
  const carbon = useCarbon();
  const r = useMemo(() => buildReportData(carbon, period), [carbon, period]);
  const { totals } = r;

  return (
    <div className="space-y-8">
      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white p-5">
          <div className="flex items-center gap-2 text-emerald-100 text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-4 h-4" /> Total abatement · {period.label}
          </div>
          <p className="mt-3 text-3xl font-black">{fmtT(totals.total)} <span className="text-sm font-medium">tCO₂e</span></p>
          <p className="mt-1 text-xs text-emerald-100">{r.rangeLabel}</p>
          <p className="mt-3 text-xs text-emerald-50">
            Cumulative to {monthLabel(period.toMonth)}: <strong>{fmtT(r.cumulativeToDate.total)} tCO₂e</strong>
            {' · '}≈ USD {fmtInt(totals.valueUsd)} in period
          </p>
        </div>
        {SOURCES.map((source) => {
          const s = SOURCE_STYLE[source];
          return (
            <div key={source} className={`rounded-2xl ${s.light} p-5`}>
              <div className="flex items-center gap-2">
                <s.icon className={`w-4 h-4 ${s.text}`} />
                <p className="text-xs font-bold text-gray-700 leading-tight">{ABATEMENT_SOURCES[source].label}</p>
              </div>
              <p className={`mt-3 text-3xl font-black ${s.text}`}>{fmtT(totals[source])}</p>
              <p className="text-xs text-gray-500">tCO₂e · {pct(totals[source], totals.total).toFixed(1)}% of period</p>
            </div>
          );
        })}
      </div>

      {/* Monthly */}
      <Card title="Monthly abatement" subtitle="tCO₂e recognised per month, by source.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
              <tr>
                <th className={th}>Month</th>
                {SOURCES.map((s) => <th key={s} className={thR}>{ABATEMENT_SOURCES[s].short}</th>)}
                <th className={thR}>Total</th>
                <th className={thR}>Cumulative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {r.monthly.map((m) => (
                <tr key={m.month}>
                  <td className={td}>{m.label}</td>
                  {SOURCES.map((s) => <td key={s} className={tdR}>{m[s] ? fmtT(m[s]) : '—'}</td>)}
                  <td className={`${tdR} font-semibold text-gray-900`}>{fmtT(m.total)}</td>
                  <td className={tdR}>{fmtT(m.cumulative)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className={td}>Period total</td>
                {SOURCES.map((s) => <td key={s} className={tdR}>{fmtT(totals[s])}</td>)}
                <td className={`${tdR} text-emerald-700`}>{fmtT(totals.total)}</td>
                <td className={tdR} />
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
        {/* Enteric */}
        <Card
          title="1 · Enteric fermentation emission reduction"
          subtitle={`Feed distributed in period, converted to cattle-days × ${fmtT(carbon.entericReductionPerCattleDay, 6)} tCO₂e/cattle-day.`}
        >
          {r.feedRows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className={th}>Month</th>
                    {FEED_PRODUCTS.map((p) => <th key={p} className={thR}>{FEED_PRODUCT_LABELS[p]} (kg)</th>)}
                    <th className={thR}>Cattle-days</th>
                    <th className={thR}>tCO₂e</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {r.feedRows.map((row) => (
                    <tr key={row.month}>
                      <td className={td}>{row.label}</td>
                      {FEED_PRODUCTS.map((p) => <td key={p} className={tdR}>{row[p] ? fmtInt(row[p]!) : '—'}</td>)}
                      <td className={tdR}>{fmtInt(row.cattleDays)}</td>
                      <td className={`${tdR} font-semibold text-emerald-600`}>{fmtT(row.reductionT)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-6 py-5 text-sm text-gray-500">No feed distributed in this period.</p>
          )}
        </Card>

        {/* Carbon banks */}
        <Card
          title="3 · Carbon sequestration from carbon banks"
          subtitle="Stock increase between consecutive measurements, recognised at the later measurement."
        >
          {r.carbonBankRows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className={th}>Station</th>
                    <th className={th}>Interval</th>
                    <th className={thR}>Stock (tCO₂e)</th>
                    <th className={thR}>Sequestration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {r.carbonBankRows.map((row) => (
                    <tr key={`${row.stationId}-${row.toMonth}`} className="align-top">
                      <td className={td}>
                        <p className="font-semibold text-gray-900">{row.stationId}{row.stationName !== row.stationId ? ` · ${row.stationName}` : ''}</p>
                        <p className="text-xs text-gray-500">{row.areaHa} ha · {row.note}</p>
                      </td>
                      <td className={td}>{monthLabel(row.fromMonth)} → {monthLabel(row.toMonth)}</td>
                      <td className={tdR}>{fmtT(row.fromStockT)} → {fmtT(row.toStockT)}</td>
                      <td className={`${tdR} font-semibold text-violet-600`}>{fmtT(row.seqT)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-6 py-5 text-sm text-gray-500">No carbon bank re-measurement in this period.</p>
          )}
        </Card>
      </div>

      {/* Raw material */}
      <Card
        title="2 · Raw material offtake carbon sequestration"
        subtitle={`Indigofera offtake × ${fmtT(carbon.offtakeSeqPerKg, 6)} tCO₂e/kg (plantation ${carbon.data.rawMaterial.plantationSeqTPerHaYear} tCO₂e/ha/yr ÷ ${fmtInt(carbon.netDryYieldKgPerYear)} kg net dry yield/yr).`}
      >
        {r.offtake ? (
          <div className="px-6 py-5 text-sm text-gray-700 space-y-2">
            <p>
              Recognised in <strong>{monthLabel(r.offtake.recognitionMonth)}</strong>:{' '}
              {fmtInt(r.offtake.kg)} kg Indigofera → <strong className="text-blue-600">{fmtT(r.offtake.seqT)} tCO₂e</strong>
            </p>
            <p className="text-xs text-gray-500">
              Procurement: {r.offtake.procurement.map((p) => `${p.periodLabel} ${fmtInt(p.kg)} kg`).join(' · ')}
            </p>
          </div>
        ) : (
          <p className="px-6 py-5 text-sm text-gray-500">No raw material offtake recognised in this period.</p>
        )}
      </Card>
    </div>
  );
}
