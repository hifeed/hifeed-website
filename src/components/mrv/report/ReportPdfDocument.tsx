import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import {
  ABATEMENT_SOURCES,
  FEED_PRODUCTS,
  FEED_PRODUCT_LABELS,
  monthLabel,
  type AbatementSource,
  type CarbonModel,
  type ReportPeriod,
} from '@/lib/mrv/carbon';
import { buildReportData, fmtInt, fmtT, pct } from '@/lib/mrv/report';

const PRIMARY = '#047857';
const PRIMARY_DARK = '#064e3b';
const SOURCE_COLOR: Record<AbatementSource, string> = { enteric: '#059669', rawMaterial: '#2563eb', carbonBank: '#7c3aed' };
const GRAY_900 = '#111827';
const GRAY_700 = '#374151';
const GRAY_500 = '#6b7280';
const GRAY_200 = '#e5e7eb';
const GRAY_50 = '#f9fafb';
const SOURCES = Object.keys(ABATEMENT_SOURCES) as AbatementSource[];

// Font standar PDF (WinAnsi) tidak punya glyph subscript/panah; ganti dengan padanan ASCII.
const T = (text: string) =>
  text.replace(/₂/g, '2').replace(/₄/g, '4').replace(/→/g, '->').replace(/≈/g, '~').replace(/−/g, '-').replace(/Σ/g, 'sum');

const s = StyleSheet.create({
  page: { padding: 40, paddingBottom: 56, fontSize: 9.5, fontFamily: 'Helvetica', color: GRAY_900 },
  coverPage: { padding: 0, fontFamily: 'Helvetica', backgroundColor: PRIMARY_DARK },
  cover: { backgroundColor: PRIMARY_DARK, padding: 48, height: '100%', color: '#ffffff' },
  coverTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 120 },
  logo: { width: 44, height: 44, marginRight: 12, borderRadius: 8, backgroundColor: '#ffffff', padding: 4 },
  brand: { fontSize: 18, fontFamily: 'Helvetica-Bold' },
  brandSub: { fontSize: 8, color: '#a7f3d0', letterSpacing: 1.5 },
  kicker: { fontSize: 9, color: '#6ee7b7', letterSpacing: 2, marginBottom: 10 },
  coverTitle: { fontSize: 30, fontFamily: 'Helvetica-Bold', marginBottom: 8 },
  coverPeriod: { fontSize: 14, color: '#d1fae5', marginBottom: 40 },
  coverBig: { fontSize: 44, fontFamily: 'Helvetica-Bold' },
  coverUnit: { fontSize: 12, color: '#a7f3d0', marginBottom: 30 },
  coverRow: { flexDirection: 'row', marginTop: 8 },
  coverCell: { flex: 1, borderTopWidth: 1, borderTopColor: '#065f46', paddingTop: 8, marginRight: 12 },
  coverCellLabel: { fontSize: 8, color: '#a7f3d0', marginBottom: 4 },
  coverCellValue: { fontSize: 14, fontFamily: 'Helvetica-Bold' },
  coverFoot: { position: 'absolute', bottom: 48, left: 48, right: 48, fontSize: 8, color: '#a7f3d0', lineHeight: 1.5 },
  h1: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: PRIMARY_DARK, marginBottom: 4 },
  h2: { fontSize: 11.5, fontFamily: 'Helvetica-Bold', color: GRAY_900, marginTop: 16, marginBottom: 6 },
  lead: { fontSize: 9, color: GRAY_500, marginBottom: 12, lineHeight: 1.4 },
  p: { fontSize: 9, color: GRAY_700, lineHeight: 1.45, marginBottom: 4 },
  kpiRow: { flexDirection: 'row', marginBottom: 6 },
  kpi: { flex: 1, borderRadius: 6, padding: 10, marginRight: 8, backgroundColor: GRAY_50 },
  kpiLabel: { fontSize: 7.5, color: GRAY_500, marginBottom: 4 },
  kpiValue: { fontSize: 15, fontFamily: 'Helvetica-Bold' },
  kpiSub: { fontSize: 7.5, color: GRAY_500, marginTop: 2 },
  table: { borderWidth: 1, borderColor: GRAY_200, borderRadius: 4 },
  tr: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: GRAY_200 },
  trHead: { flexDirection: 'row', backgroundColor: GRAY_50, borderBottomWidth: 1, borderBottomColor: GRAY_200 },
  trTotal: { flexDirection: 'row', backgroundColor: '#ecfdf5' },
  th: { flex: 1, padding: 5, fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: GRAY_500, textAlign: 'right' },
  td: { flex: 1, padding: 5, fontSize: 8.5, textAlign: 'right', color: GRAY_700 },
  left: { textAlign: 'left' },
  bold: { fontFamily: 'Helvetica-Bold', color: GRAY_900 },
  formula: { fontFamily: 'Courier', fontSize: 8.5, backgroundColor: '#ecfdf5', color: PRIMARY_DARK, padding: 6, borderRadius: 4, marginBottom: 6 },
  footer: { position: 'absolute', bottom: 24, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between', fontSize: 7.5, color: GRAY_500 },
});

function Footer({ periodLabel }: { periodLabel: string }) {
  return (
    <View style={s.footer} fixed>
      <Text>HiFeed · Carbon Abatement Report · {periodLabel}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

export function createReportDocument(model: CarbonModel, period: ReportPeriod, logoUrl: string) {
  const r = buildReportData(model, period);
  const { totals } = r;
  const d = model.data;
  const generated = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <Document title={`HiFeed Carbon Abatement Report — ${period.label}`} author="HiFeed" creator="HiFeed MRV">
      {/* ── Cover ── */}
      <Page size="A4" style={s.coverPage}>
        <View style={s.cover}>
          <View style={s.coverTop}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- Image react-pdf tidak punya prop alt */}
            <Image src={logoUrl} style={s.logo} />
            <View>
              <Text style={s.brand}>HiFeed</Text>
              <Text style={s.brandSub}>MEASUREMENT · REPORTING · VERIFICATION</Text>
            </View>
          </View>
          <Text style={s.kicker}>CARBON ABATEMENT REPORT</Text>
          <Text style={s.coverTitle}>{period.label === 'All data' ? 'Cumulative report' : `${period.label} report`}</Text>
          <Text style={s.coverPeriod}>{r.rangeLabel}</Text>
          <Text style={s.coverBig}>{fmtT(totals.total)}</Text>
          <Text style={s.coverUnit}>tCO2e abated in period</Text>
          <View style={s.coverRow}>
            {SOURCES.map((src) => (
              <View key={src} style={s.coverCell}>
                <Text style={s.coverCellLabel}>{T(ABATEMENT_SOURCES[src].short)}</Text>
                <Text style={s.coverCellValue}>{fmtT(totals[src])} t</Text>
              </View>
            ))}
          </View>
          <Text style={s.coverFoot}>
            Generated {generated}. Source: HiFeed carbon accounting ({d.source.label}, updated {d.source.updated}).
            Figures have not yet been verified by a third party.
          </Text>
        </View>
      </Page>

      {/* ── Summary ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.h1}>Summary</Text>
        <Text style={s.lead}>
          Carbon abatement recognised between {r.rangeLabel}, by source. Cumulative abatement to {monthLabel(period.toMonth)}:{' '}
          {fmtT(r.cumulativeToDate.total)} tCO2e. Estimated value in period ~ USD {fmtInt(totals.valueUsd)} at USD {d.vcmPriceUsdPerT}/tCO2e.
        </Text>
        <View style={s.kpiRow}>
          {SOURCES.map((src) => (
            <View key={src} style={s.kpi}>
              <Text style={s.kpiLabel}>{T(ABATEMENT_SOURCES[src].label)}</Text>
              <Text style={[s.kpiValue, { color: SOURCE_COLOR[src] }]}>{fmtT(totals[src])}</Text>
              <Text style={s.kpiSub}>tCO2e · {pct(totals[src], totals.total).toFixed(1)}%</Text>
            </View>
          ))}
        </View>

        <Text style={s.h2}>Monthly abatement (tCO2e)</Text>
        <View style={s.table}>
          <View style={s.trHead}>
            <Text style={[s.th, s.left]}>Month</Text>
            {SOURCES.map((src) => <Text key={src} style={s.th}>{T(ABATEMENT_SOURCES[src].short)}</Text>)}
            <Text style={s.th}>Total</Text>
            <Text style={s.th}>Cumulative</Text>
          </View>
          {r.monthly.map((m) => (
            <View key={m.month} style={s.tr} wrap={false}>
              <Text style={[s.td, s.left]}>{m.label}</Text>
              {SOURCES.map((src) => <Text key={src} style={s.td}>{m[src] ? fmtT(m[src]) : '—'}</Text>)}
              <Text style={[s.td, s.bold]}>{fmtT(m.total)}</Text>
              <Text style={s.td}>{fmtT(m.cumulative)}</Text>
            </View>
          ))}
          <View style={s.trTotal}>
            <Text style={[s.td, s.left, s.bold]}>Period total</Text>
            {SOURCES.map((src) => <Text key={src} style={[s.td, s.bold]}>{fmtT(totals[src])}</Text>)}
            <Text style={[s.td, s.bold, { color: PRIMARY }]}>{fmtT(totals.total)}</Text>
            <Text style={s.td} />
          </View>
        </View>
        <Footer periodLabel={period.label} />
      </Page>

      {/* ── Detail per source ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.h1}>Data by source</Text>

        <Text style={s.h2}>1 · {T(ABATEMENT_SOURCES.enteric.label)}</Text>
        {r.feedRows.length ? (
          <View style={s.table}>
            <View style={s.trHead}>
              <Text style={[s.th, s.left]}>Month</Text>
              {FEED_PRODUCTS.map((p) => <Text key={p} style={s.th}>{T(FEED_PRODUCT_LABELS[p])} (kg)</Text>)}
              <Text style={s.th}>Cattle-days</Text>
              <Text style={s.th}>tCO2e</Text>
            </View>
            {r.feedRows.map((row) => (
              <View key={row.month} style={s.tr} wrap={false}>
                <Text style={[s.td, s.left]}>{row.label}</Text>
                {FEED_PRODUCTS.map((p) => <Text key={p} style={s.td}>{row[p] ? fmtInt(row[p]!) : '—'}</Text>)}
                <Text style={s.td}>{fmtInt(row.cattleDays)}</Text>
                <Text style={[s.td, s.bold]}>{fmtT(row.reductionT)}</Text>
              </View>
            ))}
            <View style={s.trTotal}>
              <Text style={[s.td, s.left, s.bold]}>Total</Text>
              {FEED_PRODUCTS.map((p) => <Text key={p} style={[s.td, s.bold]}>{fmtInt(r.feedTotalsKg[p])}</Text>)}
              <Text style={s.td} />
              <Text style={[s.td, s.bold, { color: SOURCE_COLOR.enteric }]}>{fmtT(totals.enteric)}</Text>
            </View>
          </View>
        ) : (
          <Text style={s.p}>No feed distributed in this period.</Text>
        )}

        <Text style={s.h2}>2 · {T(ABATEMENT_SOURCES.rawMaterial.label)}</Text>
        {r.offtake ? (
          <>
            <Text style={s.p}>
              Recognised in {monthLabel(r.offtake.recognitionMonth)}: {fmtInt(r.offtake.kg)} kg Indigofera offtake ×{' '}
              {fmtT(model.offtakeSeqPerKg, 6)} tCO2e/kg = {fmtT(r.offtake.seqT)} tCO2e.
            </Text>
            <Text style={s.p}>Procurement: {r.offtake.procurement.map((p) => `${p.periodLabel} ${fmtInt(p.kg)} kg`).join(' · ')}</Text>
          </>
        ) : (
          <Text style={s.p}>No raw material offtake recognised in this period.</Text>
        )}

        <Text style={s.h2}>3 · {T(ABATEMENT_SOURCES.carbonBank.label)}</Text>
        {r.carbonBankRows.length ? (
          <View style={s.table}>
            <View style={s.trHead}>
              <Text style={[s.th, s.left, { flex: 1.6 }]}>Station</Text>
              <Text style={[s.th, s.left]}>Interval</Text>
              <Text style={s.th}>Stock from</Text>
              <Text style={s.th}>Stock to</Text>
              <Text style={s.th}>Sequestration</Text>
            </View>
            {r.carbonBankRows.map((row) => (
              <View key={`${row.stationId}-${row.toMonth}`} style={s.tr} wrap={false}>
                <Text style={[s.td, s.left, { flex: 1.6 }]}>{row.stationId} · {row.areaHa} ha{row.note ? T(` · ${row.note}`) : ''}</Text>
                <Text style={[s.td, s.left]}>{monthLabel(row.fromMonth)} {'->'} {monthLabel(row.toMonth)}</Text>
                <Text style={s.td}>{fmtT(row.fromStockT)}</Text>
                <Text style={s.td}>{fmtT(row.toStockT)}</Text>
                <Text style={[s.td, s.bold]}>{fmtT(row.seqT)}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={s.p}>No carbon bank re-measurement in this period.</Text>
        )}
        <Footer periodLabel={period.label} />
      </Page>

      {/* ── Methodology ── */}
      <Page size="A4" style={s.page}>
        <Text style={s.h1}>Methodology &amp; parameters</Text>
        <Text style={s.lead}>Calculations follow HiFeed's carbon accounting workbook ({d.source.label}).</Text>

        <Text style={s.h2}>1 · Enteric fermentation emission reduction</Text>
        <Text style={s.formula}>ER = sum (feed kg ÷ daily DMI) × ER per cattle-day</Text>
        <Text style={s.p}>Baseline EF {d.enteric.baselineEfTPerCattleYear} tCO2e/cattle/yr (FAO GLEAM, South-East Asia) - project EF {d.enteric.projectEfTPerCattleYear} tCO2e/cattle/yr (current feed formula) = {fmtT(d.enteric.baselineEfTPerCattleYear - d.enteric.projectEfTPerCattleYear, 3)} tCO2e/cattle/yr {'->'} {fmtT(model.entericReductionPerCattleDay, 6)} tCO2e/cattle/day.</Text>
        <Text style={s.p}>Reference animal {d.enteric.bodyWeightKg} kg; daily DMI {FEED_PRODUCTS.map((p) => `${FEED_PRODUCT_LABELS[p]} ${fmtT(model.dmiKgPerDay(p), 1)} kg`).join(', ')}.</Text>

        <Text style={s.h2}>2 · Raw material offtake carbon sequestration</Text>
        <Text style={s.formula}>Seq = offtake kg × (plantation tCO2e/ha/yr ÷ net dry yield kg/yr)</Text>
        <Text style={s.p}>{d.rawMaterial.freshYieldTPerHarvest} t fresh/harvest × {d.rawMaterial.harvestsPerYear} harvests × {Math.round(d.rawMaterial.dryMatterFraction * 100)}% dry matter × (1 - {Math.round(d.rawMaterial.dryingSpoilageFraction * 100)}% spoilage) = {fmtInt(model.netDryYieldKgPerYear)} kg/yr. Plantation sequestration {d.rawMaterial.plantationSeqTPerHaYear} tCO2e/ha/yr {'->'} {fmtT(model.offtakeSeqPerKg, 6)} tCO2e per kg offtake.</Text>

        <Text style={s.h2}>3 · Carbon sequestration from carbon banks</Text>
        <Text style={s.formula}>Stock = (AGB + BGB) × 0.47 × 3.67 + SOC × 3.67</Text>
        <Text style={s.p}>AGB from Chave et al. (2005) allometry (field measurement); BGB = AGB × root-to-shoot ratio (0.258 Indigofera, 0.956 Hybrid Napier); SOC from laboratory analysis at 0–10, 10–20 and 20–30 cm. Sequestration is the stock increase between consecutive measurements of a station, recognised at the later measurement.</Text>
        <View style={[s.table, { marginTop: 6 }]}>
          <View style={s.trHead}>
            <Text style={[s.th, s.left, { flex: 2 }]}>Station</Text>
            <Text style={s.th}>Area (ha)</Text>
            <Text style={[s.th, { flex: 2.4 }]}>Measurements (tCO2e)</Text>
          </View>
          {d.carbonBankStations.map((st) => (
            <View key={st.id} style={s.tr} wrap={false}>
              <Text style={[s.td, s.left, { flex: 2 }]}>{st.id}{st.name !== st.id ? ` · ${st.name}` : ''} — {T(st.description)}</Text>
              <Text style={s.td}>{st.areaHa}</Text>
              <Text style={[s.td, { flex: 2.4 }]}>{st.measurements.map((m) => `${monthLabel(m.month)}: ${fmtT(m.stockT)}`).join('  ·  ')}</Text>
            </View>
          ))}
        </View>

        <Text style={s.h2}>Notes</Text>
        <Text style={s.p}>Estimated value uses a reference carbon price of USD {d.vcmPriceUsdPerT}/tCO2e. Figures come from HiFeed's internal carbon accounting and have not yet been verified by a third party.</Text>
        <Footer periodLabel={period.label} />
      </Page>
    </Document>
  );
}
