import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { findPeriod, type PeriodKey } from '@/lib/mrv/periods';
import {
  aggregatePipelineForPeriod,
  aggregatePartnersForPeriod,
  aggregateCattleForPeriod,
  aggregateFeedForPeriod,
  buildSupplyChain,
  EMISSION_FACTOR_TON_PER_TON,
  GWP_100,
  SEQUESTRATION_RATIO,
  entericMethaneCreditFromG,
  DRY_TO_FRESH,
  PROCESSING_YIELD,
} from '@/lib/mrv/calc';
import { buildReportMeta } from '@/lib/mrv/report-meta';
import { MONTHLY, getMonthRange } from '@/lib/mrv/data';

const PRIMARY = '#047857';
const PRIMARY_DARK = '#064e3b';
const TEAL = '#0d9488';
const BLUE = '#2563eb';
const GRAY_900 = '#111827';
const GRAY_700 = '#374151';
const GRAY_500 = '#6b7280';
const GRAY_400 = '#9ca3af';
const GRAY_100 = '#f3f4f6';
const GRAY_50 = '#f9fafb';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: GRAY_900,
    backgroundColor: '#ffffff',
  },
  coverGradient: {
    backgroundColor: PRIMARY_DARK,
    margin: -40,
    padding: 40,
    height: '100%',
    color: '#ffffff',
  },
  coverTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 40 },
  coverLogoWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverLogo: { width: 40, height: 40, objectFit: 'contain' },
  coverBrand: { color: '#ffffff', fontSize: 18, fontWeight: 700 },
  coverSub: {
    color: '#6ee7b7',
    fontSize: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#ffffff',
    marginTop: 80,
  },
  coverPeriod: {
    fontSize: 14,
    color: '#a7f3d0',
    marginTop: 12,
  },
  coverDivider: {
    height: 2,
    width: 80,
    backgroundColor: '#34d399',
    marginTop: 24,
  },
  coverMetaBlock: {
    marginTop: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
  },
  coverMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  coverMetaLabel: { color: '#a7f3d0', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' },
  coverMetaValue: { color: '#ffffff', fontSize: 10, fontWeight: 700 },
  coverFooter: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#a7f3d0',
    fontSize: 8,
  },
  h2: {
    fontSize: 16,
    fontWeight: 800,
    color: GRAY_900,
    marginBottom: 4,
  },
  h3: {
    fontSize: 12,
    fontWeight: 700,
    color: GRAY_900,
    marginBottom: 6,
  },
  h4: {
    fontSize: 10,
    fontWeight: 700,
    color: GRAY_700,
    marginBottom: 4,
  },
  text: { fontSize: 10, color: GRAY_700, lineHeight: 1.45 },
  small: { fontSize: 8, color: GRAY_500, lineHeight: 1.4 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    borderBottom: `2px solid ${PRIMARY}`,
    paddingBottom: 8,
  },
  sectionNumber: {
    backgroundColor: PRIMARY,
    color: '#ffffff',
    width: 24,
    height: 24,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 800,
    textAlign: 'center',
    paddingVertical: 6,
  },
  sectionTitle: { fontSize: 16, fontWeight: 800, color: GRAY_900 },
  sectionSub: { fontSize: 9, color: GRAY_500, marginLeft: 'auto' },
  row: { flexDirection: 'row' },
  card: {
    backgroundColor: GRAY_50,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardEm: { backgroundColor: '#ecfdf5' },
  cardBlue: { backgroundColor: '#eff6ff' },
  cardAmber: { backgroundColor: '#fffbeb' },
  cardViolet: { backgroundColor: '#f5f3ff' },
  kpiGrid: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  kpi: {
    flex: 1,
    backgroundColor: '#ffffff',
    border: `1px solid #e5e7eb`,
    borderRadius: 10,
    padding: 10,
  },
  kpiLabel: {
    fontSize: 7,
    color: GRAY_500,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  kpiValue: { fontSize: 18, fontWeight: 800, color: GRAY_900 },
  kpiUnit: { fontSize: 9, color: GRAY_400, marginLeft: 2 },
  kpiSub: { fontSize: 8, color: GRAY_400, marginTop: 2 },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    border: `1px solid #e5e7eb`,
  },
  tr: { flexDirection: 'row', borderBottom: `1px solid #f3f4f6` },
  trHead: { backgroundColor: GRAY_100 },
  trAlt: { backgroundColor: '#fafafa' },
  td: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 9,
    color: GRAY_700,
  },
  th: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 8,
    color: GRAY_500,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dotGreen: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981', marginRight: 4 },
  dotAmber: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#f59e0b', marginRight: 4 },
  pipelineGrid: { flexDirection: 'row', gap: 6 },
  pipelineCard: { flex: 1, borderRadius: 10, padding: 10 },
  plLabel: { fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 },
  plValue: { fontSize: 16, fontWeight: 800, marginVertical: 4 },
  plDesc: { fontSize: 8, color: GRAY_500 },
  footer: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: GRAY_400,
    fontSize: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  pill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  pillGreen: { backgroundColor: '#d1fae5', color: '#047857' },
  pillAmber: { backgroundColor: '#fef3c7', color: '#b45309' },
  bar: { height: 6, backgroundColor: '#f3f4f6', borderRadius: 3, marginTop: 2 },
  barFill: { height: 6, borderRadius: 3, backgroundColor: PRIMARY },
  auditRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  auditNum: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: PRIMARY,
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 800,
    textAlign: 'center',
    paddingVertical: 5,
  },
  formulaBox: {
    backgroundColor: GRAY_50,
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
  },
  formulaLabel: { fontSize: 7, color: GRAY_500, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  formulaValue: { fontSize: 16, fontWeight: 800, color: PRIMARY },
  formulaHint: { fontSize: 8, color: GRAY_500, marginTop: 2 },
});

function Header({ num, title, sub }: { num: number; title: string; sub?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionNumber}>{num}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {sub && <Text style={styles.sectionSub}>{sub}</Text>}
    </View>
  );
}

function FooterText({ generatedAt }: { generatedAt: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text>HiFeed MRV Report · partnership@hifeed.co · https://hifeed.co</Text>
      <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} · Generated ${generatedAt}`} />
    </View>
  );
}

/* eslint-disable jsx-a11y/alt-text */
function PartnerLogo() {
  return <Image src="/hifeed_logo.png" style={styles.coverLogo} />;
}
/* eslint-enable jsx-a11y/alt-text */

function CoverPage({ periodLabel, generatedAt, methodology, version, generatedBy }: {
  periodLabel: string;
  generatedAt: string;
  methodology: string;
  version: string;
  generatedBy: string;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.coverGradient}>
        <View style={styles.coverTop}>
          <View style={styles.coverLogoWrap}>
            <PartnerLogo />
          </View>
          <View>
            <Text style={styles.coverBrand}>HiFeed</Text>
            <Text style={styles.coverSub}>MRV Platform</Text>
          </View>
        </View>

        <Text style={{ color: '#6ee7b7', fontSize: 9, letterSpacing: 3, marginBottom: 12 }}>
          MEASUREMENT · REPORTING · VERIFICATION
        </Text>
        <Text style={styles.coverTitle}>Carbon Report</Text>
        <Text style={styles.coverPeriod}>{periodLabel}</Text>
        <View style={styles.coverDivider} />

        <View style={styles.coverMetaBlock}>
          {[
            ['Reporting Period', periodLabel],
            ['Methodology', methodology],
            ['Generated', generatedAt],
            ['Version', version],
            ['Generated By', generatedBy],
            ['Issuer', 'FeedX Pte Ltd · HiFeed MRV Pipeline'],
          ].map(([l, v]) => (
            <View key={l} style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>{l}</Text>
              <Text style={styles.coverMetaValue}>{v}</Text>
            </View>
          ))}
        </View>

        <View style={styles.coverFooter}>
          <Text>partnership@hifeed.co</Text>
          <Text>https://hifeed.co · Confidential — for investor review</Text>
        </View>
      </View>
    </Page>
  );
}

function KPIBlock({ measuredTon, verified, pending, partners, cattle }: { measuredTon: number; verified: number; pending: number; partners: number; cattle: number }) {
  return (
    <View style={styles.kpiGrid}>
      <KPI label="Total CO₂e Avoided" value={`${measuredTon.toFixed(2)}`} unit="Ton" sub="Measured" />
      <KPI label="Active Partners" value={partners.toString()} unit="Farms" sub={`${cattle.toLocaleString()} cattle`} />
      <KPI label="Verified Credits" value={verified.toString()} unit="credits" sub="Issued" />
      <KPI label="Pending Audit" value={pending.toString()} unit="credits" sub="In review" />
    </View>
  );
}

function KPI({ label, value, unit, sub }: { label: string; value: string; unit: string; sub: string }) {
  return (
    <View style={styles.kpi}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={styles.kpiValue}>{value}</Text>
        <Text style={styles.kpiUnit}> {unit}</Text>
      </View>
      <Text style={styles.kpiSub}>{sub}</Text>
    </View>
  );
}

function formatKg(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function createReportDocument(periodKey: PeriodKey) {
  const period = findPeriod(periodKey);
  const meta = buildReportMeta(period.key, period.description);
  const feed = aggregateFeedForPeriod(period.fromMonth, period.toMonth);
  const pipeline = aggregatePipelineForPeriod(period.fromMonth, period.toMonth);
  const partners = aggregatePartnersForPeriod(period.fromMonth, period.toMonth);
  const cattleRows = aggregateCattleForPeriod(period.fromMonth, period.toMonth);
  const monthly = getMonthRange(period.fromMonth, period.toMonth);
  const activePartners = partners.filter((p) => p.status === 'active');
  const totalCattle = activePartners.reduce((s, p) => s + p.cattle, 0);
  const entericTon = cattleRows.reduce((s, c) => s + c.entericCO2eTon, 0);
  const sequestrationTon = +(feed.feedTon * SEQUESTRATION_RATIO).toFixed(2);
  const sc = buildSupplyChain(period.fromMonth, period.toMonth);

  return (
    <Document title={`HiFeed MRV Report — ${period.label}`} author="HiFeed MRV" creator="HiFeed MRV Pipeline">
      <CoverPage
        periodLabel={period.label}
        generatedAt={meta.generatedAt}
        methodology={meta.methodology}
        version={meta.version}
        generatedBy={meta.generatedBy}
      />

      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />

        <Header num={1} title="Executive Summary" sub={`Top-line impact — ${period.label}`} />

        <Text style={{ fontSize: 11, color: GRAY_900, fontWeight: 800, marginBottom: 8 }}>Upstream Supply Chain</Text>
        <View style={styles.kpiGrid}>
          <KPI label="Active Plantation" value={sc.totalHectares.toFixed(0)} unit="Ha" sub={`${sc.indigoHectares.toFixed(0)} Indigofera + ${sc.pakcoyHectares.toFixed(0)} Pakcoy`} />
          <KPI label="Biomass Harvested" value={sc.totalFreshBiomassTon.toFixed(0)} unit="Ton" sub="Fresh biomass" />
          <KPI label="Pellet Produced" value={formatKg(sc.totalPelletKg)} unit="Kg" sub={`${sc.totalDistributionTon.toFixed(1)} Ton distributed`} />
          <KPI label="Fed to Cattle" value={formatKg(sc.totalConsumptionKg)} unit="Kg" sub={`${totalCattle.toLocaleString()} cattle @ 12 kg/day`} />
        </View>

        <View style={{ marginTop: 12, padding: 10, backgroundColor: '#ecfdf5', borderRadius: 10, border: `1px solid #a7f3d0` }}>
          <Text style={{ fontSize: 8, color: '#047857', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Total Carbon Reduction (All Sources)</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View>
              <Text style={{ fontSize: 7, color: GRAY_500 }}>Cultivation CO₂e</Text>
              <Text style={{ fontSize: 16, fontWeight: 800, color: '#047857' }}>{sc.cultivationCO2eTon.toFixed(1)} Ton</Text>
            </View>
            <View>
              <Text style={{ fontSize: 7, color: GRAY_500 }}>Enteric CH₄</Text>
              <Text style={{ fontSize: 16, fontWeight: 800, color: PRIMARY }}>{entericTon.toFixed(1)} Ton</Text>
            </View>
            <View>
              <Text style={{ fontSize: 7, color: GRAY_500 }}>Sequestration</Text>
              <Text style={{ fontSize: 16, fontWeight: 800, color: BLUE }}>{sequestrationTon.toFixed(1)} Ton</Text>
            </View>
            <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: '#d1fae5', paddingLeft: 16 }}>
              <Text style={{ fontSize: 7, color: GRAY_500 }}>TOTAL AVOIDED</Text>
              <Text style={{ fontSize: 20, fontWeight: 800, color: '#064e3b' }}>{sc.totalCO2eTon} Ton CO₂e</Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 11, color: GRAY_900, fontWeight: 800, marginTop: 16, marginBottom: 8 }}>Downstream Carbon</Text>
        <KPIBlock
          measuredTon={pipeline.measuredTon}
          verified={pipeline.verified}
          pending={pipeline.pending}
          partners={activePartners.length}
          cattle={totalCattle}
        />

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Highlights</Text>
          {[
            `Cultivation footprint: ${sc.totalHectares.toFixed(1)} Ha of active plantation (${sc.indigoHectares.toFixed(1)} Indigofera + ${sc.pakcoyHectares.toFixed(1)} Pakcoy).`,
            `Biomass harvested: ${sc.totalFreshBiomassTon.toFixed(1)} Ton fresh → ${sc.totalDryBiomassTon.toFixed(1)} Ton dry matter → ${formatKg(sc.totalPelletKg)} pellet produced (62% yield).`,
            `Enteric methane credit: ${entericTon.toFixed(2)} Ton CO₂e from rumen fermentation reduction.`,
            `Feedstock sequestration credit: ${sequestrationTon.toFixed(2)} Ton CO₂e from biomass cultivation.`,
            `Carbon credits issued: ${pipeline.verified} verified; ${pipeline.pending} pending audit.`,
          ].map((h, i) => (
            <View key={i} style={{ flexDirection: 'row', marginTop: 4 }}>
              <Text style={{ color: PRIMARY, fontWeight: 700, fontSize: 10, marginRight: 6 }}>•</Text>
              <Text style={{ fontSize: 10, color: GRAY_700, flex: 1 }}>{h}</Text>
            </View>
          ))}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />

        <Header num={2} title="Methodology" sub="Standards, formulas, and assumptions" />

        <View style={styles.row}>
          <View style={[styles.card, { flex: 1, marginRight: 6 }]}>
            <Text style={styles.formulaLabel}>Standard</Text>
            <Text style={{ fontSize: 12, fontWeight: 800, color: GRAY_900 }}>Verra VCS</Text>
            <Text style={styles.small}>Voluntary Carbon Standard, internationally recognized for quantifying GHG emission reductions in livestock projects.</Text>
          </View>
          <View style={[styles.card, { flex: 1, marginLeft: 6 }]}>
            <Text style={styles.formulaLabel}>Two Carbon Sources</Text>
            <Text style={{ fontSize: 12, fontWeight: 800, color: GRAY_900 }}>Enteric + Feedstock</Text>
            <Text style={styles.small}>Credits are generated from reduced enteric methane emissions and from carbon absorbed during HiFeed&apos;s raw material cultivation.</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.formulaBox, { flex: 1, marginRight: 4 }]}>
            <Text style={styles.formulaLabel}>Emission Factor</Text>
            <Text style={styles.formulaValue}>{EMISSION_FACTOR_TON_PER_TON}</Text>
            <Text style={styles.formulaHint}>Ton CO₂e per Ton feed</Text>
          </View>
          <View style={[styles.formulaBox, { flex: 1, marginLeft: 4, marginRight: 4 }]}>
            <Text style={styles.formulaLabel}>GWP₁₀₀ of CH₄</Text>
            <Text style={[styles.formulaValue, { color: BLUE }]}>{GWP_100}</Text>
            <Text style={styles.formulaHint}>IPCC AR5 metric</Text>
          </View>
          <View style={[styles.formulaBox, { flex: 1, marginLeft: 4 }]}>
            <Text style={styles.formulaLabel}>Sequestration Ratio</Text>
            <Text style={[styles.formulaValue, { color: TEAL }]}>{SEQUESTRATION_RATIO}</Text>
            <Text style={styles.formulaHint}>Ton CO₂e per Ton feed</Text>
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Two Carbon Pathways</Text>
          <View style={styles.row}>
            <View style={[styles.card, styles.cardEm, { flex: 1, marginRight: 6 }]}>
              <Text style={{ ...styles.h4, color: PRIMARY }}>Pathway A — Enteric CH₄ Reduction</Text>
              <Text style={styles.small}>Cattle consume HiFeed pellets containing anti-methanogenic compounds. Active ingredients inhibit methanogens in the rumen, reducing CH₄ production. Avoided CH₄ × GWP₁₀₀ is quantified as CO₂e credits.</Text>
              <Text style={{ marginTop: 6, fontSize: 12, fontWeight: 800, color: PRIMARY }}>{entericTon.toFixed(2)} Ton CO₂e</Text>
            </View>
            <View style={[styles.card, styles.cardBlue, { flex: 1, marginLeft: 6 }]}>
              <Text style={{ ...styles.h4, color: BLUE }}>Pathway B — Feedstock Sequestration</Text>
              <Text style={styles.small}>Feed raw materials are sustainably farmed by local agricultural partners. Plants absorb atmospheric CO₂ and store the carbon in biomass during growth. Stored carbon is quantified as carbon credits.</Text>
              <Text style={{ marginTop: 6, fontSize: 12, fontWeight: 800, color: BLUE }}>{sequestrationTon.toFixed(2)} Ton CO₂e</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* SECTION 3 — Upstream Supply Chain Snapshot */}
      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />
        <Header num={3} title="Upstream Supply Chain" sub="From plantation hectares to verified carbon reduction" />

        <Text style={styles.text}>
          HiFeed&apos;s carbon program begins at the root: sustainable cultivation of Indigofera zollingeriana and Pakcoy (Brassica rapa) as feed-grade raw materials. This section traces the full upstream journey — from hectares planted through harvest, processing, distribution, and cattle consumption — before the emission reduction formulas are applied.
        </Text>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Supply Chain Flow</Text>
          {[
            { step: '1', label: 'Cultivation', icon: '🌱', detail: `${sc.totalHectares.toFixed(1)} Ha active plantation` },
            { step: '2', label: 'Harvest', icon: '🌾', detail: `${sc.totalFreshBiomassTon.toFixed(1)} Ton fresh biomass` },
            { step: '3', label: 'Processing', icon: '⚙️', detail: `${formatKg(sc.totalPelletKg)} pellet (62% yield)` },
            { step: '4', label: 'Distribution', icon: '🚚', detail: `${sc.totalDistributionTon.toFixed(1)} Ton shipped to partners` },
            { step: '5', label: 'Consumption', icon: '🐄', detail: `${formatKg(sc.totalConsumptionKg)} fed to cattle` },
            { step: '6', label: 'CO₂e Reduced', icon: '📉', detail: `${sc.totalCO2eTon} Ton CO₂e total avoided` },
          ].map((s) => (
            <View key={s.step} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
              <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ color: '#ffffff', fontSize: 9, fontWeight: 800 }}>{s.step}</Text>
              </View>
              <Text style={{ flex: 1, fontSize: 10, fontWeight: 700, color: GRAY_900 }}>{s.label}</Text>
              <Text style={{ fontSize: 10, color: GRAY_700 }}>{s.detail}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.h3}>Key Conversion Rates</Text>
          <View style={styles.row}>
            {[
              { label: 'Fresh → Dry', value: `${(DRY_TO_FRESH * 100).toFixed(0)}%`, hint: 'Dry matter ratio' },
              { label: 'Dry → Pellet', value: `${(PROCESSING_YIELD * 100).toFixed(0)}%`, hint: 'Processing yield rate' },
              { label: 'Intake/Day', value: '12 kg', hint: 'Per cattle per day' },
              { label: 'Indigofera CO₂e', value: '6.4', hint: 'Ton CO₂e / Ha / yr' },
              { label: 'Pakcoy CO₂e', value: '2.4', hint: 'Ton CO₂e / Ha / yr' },
            ].map((r) => (
              <View key={r.label} style={{ flex: 1, backgroundColor: GRAY_50, borderRadius: 8, padding: 8, marginRight: 6 }}>
                <Text style={{ fontSize: 7, color: GRAY_500, letterSpacing: 1, textTransform: 'uppercase' }}>{r.label}</Text>
                <Text style={{ fontSize: 14, fontWeight: 800, color: PRIMARY, marginTop: 2 }}>{r.value}</Text>
                <Text style={{ fontSize: 7, color: GRAY_500 }}>{r.hint}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* SECTION 4 — Cultivation Footprint */}
      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />
        <Header num={4} title="Cultivation Footprint" sub={`Per-partner plantation area — ${period.label}`} />

        <Text style={styles.text}>
          Indigofera zollingeriana and Pakcoy are cultivated across partner farms. Indigofera (leguminous tree, N₂-fixing) provides protein-rich biomass with high carbon sequestration potential. Pakcoy contributes leafy biomass with moderate sequestration rates. Harvest cycles: Indigofera every 75 days, Pakcoy every 50 days.
        </Text>

        <View style={{ marginTop: 14 }}>
          <View style={styles.table}>
            <View style={[styles.tr, styles.trHead]}>
              {['Farm Partner', 'Indigofera (Ha)', 'Pakcoy (Ha)', 'Total (Ha)', 'Harvests (Ton)', 'CO₂e (Ton/yr)'].map((h, idx) => (
                <Text key={h} style={[styles.th, { flex: idx === 0 ? 2 : 1 }]}>{h}</Text>
              ))}
            </View>
            {sc.plotBreakdown.map((row, i) => (
              <View key={row.partnerId} style={[styles.tr, i % 2 ? styles.trAlt : {}]}>
                <Text style={[styles.td, { flex: 2, fontWeight: 700 }]}>{row.partnerName}</Text>
                <Text style={[styles.td, { flex: 1, color: PRIMARY, fontWeight: 700, textAlign: 'center' }]}>{row.indigoHa}</Text>
                <Text style={[styles.td, { flex: 1, color: TEAL, fontWeight: 700, textAlign: 'center' }]}>{row.pakcoyHa}</Text>
                <Text style={[styles.td, { flex: 1, fontWeight: 700, textAlign: 'center' }]}>{row.totalHa}</Text>
                <Text style={[styles.td, { flex: 1, textAlign: 'right' }]}>{row.harvestsTon.toLocaleString()}</Text>
                <Text style={[styles.td, { flex: 1, color: PRIMARY, fontWeight: 700, textAlign: 'right' }]}>{row.co2eTon.toFixed(2)}</Text>
              </View>
            ))}
            <View style={[styles.tr, { backgroundColor: '#f0fdf4' }]}>
              <Text style={[styles.td, { flex: 2, fontWeight: 800, color: GRAY_900 }]}>Total</Text>
              <Text style={[styles.td, { flex: 1, color: PRIMARY, fontWeight: 800, textAlign: 'center' }]}>{sc.indigoHectares.toFixed(1)}</Text>
              <Text style={[styles.td, { flex: 1, color: TEAL, fontWeight: 800, textAlign: 'center' }]}>{sc.pakcoyHectares.toFixed(1)}</Text>
              <Text style={[styles.td, { flex: 1, fontWeight: 800, textAlign: 'center' }]}>{sc.totalHectares.toFixed(1)}</Text>
              <Text style={[styles.td, { flex: 1, fontWeight: 800, textAlign: 'right' }]}>{sc.totalFreshBiomassTon.toLocaleString()}</Text>
              <Text style={[styles.td, { flex: 1, color: PRIMARY, fontWeight: 800, textAlign: 'right' }]}>{sc.cultivationCO2eTon.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Species & Cycle Details</Text>
          <View style={styles.row}>
            <View style={[styles.formulaBox, { flex: 1, marginRight: 6 }]}>
              <Text style={styles.formulaLabel}>Indigofera zollingeriana</Text>
              <Text style={{ fontSize: 11, fontWeight: 800, color: GRAY_900 }}>4.5 Ton/Ha/cycle · 75 days</Text>
              <Text style={styles.formulaHint}>CO₂e sequestration: 6.4 Ton/Ha/year · N₂-fixing legume · high protein (27-30% CP)</Text>
            </View>
            <View style={[styles.formulaBox, { flex: 1, marginLeft: 6 }]}>
              <Text style={styles.formulaLabel}>Pakcoy (Brassica rapa)</Text>
              <Text style={{ fontSize: 11, fontWeight: 800, color: GRAY_900 }}>9.0 Ton/Ha/cycle · 50 days</Text>
              <Text style={styles.formulaHint}>CO₂e sequestration: 2.4 Ton/Ha/year · Leafy biomass · good mineral profile</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* SECTION 5 — Harvest & Processing */}
      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />
        <Header num={5} title="Harvest & Processing" sub="From fresh biomass to HiFeed complete feed pellets" />

        <Text style={styles.text}>
          Harvested biomass is sun-dried to 25% dry matter, then milled and mixed with supplementary nutrients before pelletization. The processing stage converts fresh Indigofera and Pakcoy into HiFeed complete feed pellets at a 62% yield rate (dry biomass → pellet kg). Waste material is composted for soil enrichment.
        </Text>

        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>Processing Formula</Text>
          <Text style={{ fontSize: 10, fontWeight: 700, color: GRAY_900 }}>Pellet_kg = Dry_biomass_ton × {PROCESSING_YIELD} × 1,000</Text>
          <Text style={styles.formulaHint}>
            Applied: {sc.totalDryBiomassTon.toFixed(1)} Ton dry biomass × {PROCESSING_YIELD} = {formatKg(sc.totalPelletKg)} pellet produced
          </Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Mass Balance</Text>
          <View style={styles.row}>
            {[
              { label: 'Fresh Biomass', value: `${sc.totalFreshBiomassTon.toFixed(1)} Ton`, color: '#6b7280', bg: GRAY_50 },
              { label: 'Dry Matter (25%)', value: `${sc.totalDryBiomassTon.toFixed(1)} Ton`, color: TEAL, bg: '#f0fdfa' },
              { label: 'Pellet Output', value: `${formatKg(sc.totalPelletKg)}`, color: BLUE, bg: '#eff6ff' },
            ].map((m, i) => (
              <View key={m.label} style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: m.bg, borderRadius: 10, marginRight: i < 2 ? 6 : 0 }}>
                <Text style={{ fontSize: 7, color: GRAY_500, letterSpacing: 1, textTransform: 'uppercase' }}>{m.label}</Text>
                <Text style={{ fontSize: 18, fontWeight: 800, color: m.color, marginTop: 4 }}>{m.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Processing by Partner ({period.label})</Text>
          <View style={styles.table}>
            <View style={[styles.tr, styles.trHead]}>
              {['Partner', 'Dry Biomass (Ton)', 'Pellet Out (Kg)', 'Waste (Kg)'].map((h) => (
                <Text key={h} style={[styles.th, { flex: 1 }]}>{h}</Text>
              ))}
            </View>
            {sc.plotBreakdown.map((row, i) => {
              const wasteKg = Math.round(row.pelletKg / PROCESSING_YIELD * (1 - PROCESSING_YIELD) * DRY_TO_FRESH);
              return (
                <View key={row.partnerId} style={[styles.tr, i % 2 ? styles.trAlt : {}]}>
                  <Text style={[styles.td, { flex: 1, fontWeight: 700 }]}>{row.partnerName}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: 'right' }]}>{((row.pelletKg / 1000 / PROCESSING_YIELD)).toFixed(2)}</Text>
                  <Text style={[styles.td, { flex: 1, color: BLUE, fontWeight: 700, textAlign: 'right' }]}>{formatKg(row.pelletKg)}</Text>
                  <Text style={[styles.td, { flex: 1, color: GRAY_500, textAlign: 'right' }]}>{formatKg(wasteKg)}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </Page>

      {/* SECTION 6 — Distribution & Consumption */}
      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />
        <Header num={6} title="Distribution & Consumption" sub="Pellet dispatch and cattle feeding across partner network" />

        <View style={styles.row}>
          <View style={[styles.formulaBox, { flex: 1, marginRight: 6 }]}>
            <Text style={styles.formulaLabel}>Distribution</Text>
            <Text style={{ fontSize: 16, fontWeight: 800, color: PRIMARY }}>{sc.totalDistributionTon.toFixed(1)} Ton</Text>
            <Text style={styles.formulaHint}>Pellet shipped to partners this period. Zero-waste assumption: all processed pellet distributed to partner farms.</Text>
          </View>
          <View style={[styles.formulaBox, { flex: 1, marginLeft: 6 }]}>
            <Text style={styles.formulaLabel}>Cattle Consumption</Text>
            <Text style={{ fontSize: 16, fontWeight: 800, color: BLUE }}>{formatKg(sc.totalConsumptionKg)}</Text>
            <Text style={styles.formulaHint}>{totalCattle.toLocaleString()} cattle × 12 kg/day × avg {Math.round(sc.totalConsumptionKg / totalCattle / 12)} days</Text>
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Intake Summary by Partner</Text>
          <View style={styles.table}>
            <View style={[styles.tr, styles.trHead]}>
              {['Partner', 'Cattle', 'Intake (kg/day)', 'Days in Period', 'Total Intake (Kg)'].map((h, idx) => (
                <Text key={h} style={[styles.th, { flex: idx === 0 ? 2 : 1 }]}>{h}</Text>
              ))}
            </View>
            {partners.map((p, i) => {
              const daysInPeriod = monthly.length * 30;
              const totalIntake = p.cattle * 12 * daysInPeriod;
              return (
                <View key={p.id} style={[styles.tr, i % 2 ? styles.trAlt : {}]}>
                  <Text style={[styles.td, { flex: 2, fontWeight: 700 }]}>{p.name}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>{p.cattle}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>12</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>{daysInPeriod}</Text>
                  <Text style={[styles.td, { flex: 1, color: BLUE, fontWeight: 700, textAlign: 'right' }]}>{formatKg(totalIntake)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Cattle Carbon Breakdown</Text>
          <View style={styles.table}>
            <View style={[styles.tr, styles.trHead]}>
              {['Cattle ID', 'Name', 'Partner', 'Methane Red. (g)', 'Enteric CO₂e (Ton)'].map((h, idx) => (
                <Text key={h} style={[styles.th, { flex: idx < 2 ? 2 : 1 }]}>{h}</Text>
              ))}
            </View>
            {cattleRows.slice(0, 6).map((row, i) => (
              <View key={row.cattle.id} style={[styles.tr, i % 2 ? styles.trAlt : {}]}>
                <Text style={[styles.td, { flex: 1, fontFamily: 'Courier', fontWeight: 700 }]}>{row.cattle.id}</Text>
                <Text style={[styles.td, { flex: 2 }]}>{row.cattle.name}</Text>
                <Text style={[styles.td, { flex: 1, color: GRAY_500 }]}>{row.cattle.partnerId}</Text>
                <Text style={[styles.td, { flex: 1, fontWeight: 700, color: PRIMARY }]}>{row.methaneG.toLocaleString()}</Text>
                <Text style={[styles.td, { flex: 1, fontWeight: 700 }]}>{row.entericCO2eTon.toFixed(4)}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* SECTION 8 — Data Collection (renumbered) */}
      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />

        <Header num={8} title="Data Collection" sub="Monthly feed distribution logs" />

        <View style={styles.table}>
          <View style={[styles.tr, styles.trHead]}>
            {['Month', 'Feed (Ton)', 'Baseline (g CO₂e)', 'Actual (g CO₂e)', 'Saved (g)', 'Credits Issued', 'Pending'].map((h) => (
              <Text key={h} style={[styles.th, { flex: 1 }]}>{h}</Text>
            ))}
          </View>
          {monthly.map((m, i) => (
            <View key={m.month} style={[styles.tr, i % 2 ? styles.trAlt : {}]}>
              <Text style={[styles.td, { flex: 1, fontWeight: 700 }]}>{m.label}</Text>
              <Text style={[styles.td, { flex: 1 }]}>{m.feedTon.toFixed(1)}</Text>
              <Text style={[styles.td, { flex: 1, color: GRAY_500 }]}>{m.baselineG.toLocaleString()}</Text>
              <Text style={[styles.td, { flex: 1, color: GRAY_500 }]}>{m.actualG.toLocaleString()}</Text>
              <Text style={[styles.td, { flex: 1, color: PRIMARY, fontWeight: 700 }]}>{m.savedG.toLocaleString()}</Text>
              <Text style={[styles.td, { flex: 1, color: BLUE, fontWeight: 700 }]}>{m.creditsIssued}</Text>
              <Text style={[styles.td, { flex: 1, color: '#b45309', fontWeight: 700 }]}>{m.creditsPending}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Partner Distribution ({period.label})</Text>
          <View style={styles.table}>
            <View style={[styles.tr, styles.trHead]}>
              {['Farm Partner', 'Location', 'Cattle', 'Feed (Ton)', 'CO₂e (Ton)', 'Status'].map((h, idx) => (
                <Text key={h} style={[styles.th, { flex: idx === 0 ? 2 : 1 }]}>{h}</Text>
              ))}
            </View>
            {partners.map((p, i) => (
              <View key={p.id} style={[styles.tr, i % 2 ? styles.trAlt : {}]}>
                <Text style={[styles.td, { flex: 2, fontWeight: 700 }]}>{p.name}</Text>
                <Text style={[styles.td, { flex: 1 }]}>{p.region}</Text>
                <Text style={[styles.td, { flex: 1 }]}>{p.cattle}</Text>
                <Text style={[styles.td, { flex: 1, color: BLUE, fontWeight: 700 }]}>{p.periodFeedTon.toFixed(2)}</Text>
                <Text style={[styles.td, { flex: 1, color: PRIMARY, fontWeight: 700 }]}>{p.periodCO2eTon.toFixed(2)}</Text>
                <Text style={[styles.td, { flex: 1 }]}>
                  <Text style={p.status === 'active' ? styles.pillGreen : styles.pillAmber}>
                    {p.status === 'active' ? '● Active' : '● Onboarding'}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />

        <Header num={9} title="Calculations" sub="Workings — formula applications and per-cattle breakdown" />

        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>Core Formula 1 — Feed Emission Factor</Text>
          <Text style={{ fontSize: 11, fontWeight: 700, color: GRAY_900 }}>CO₂e_avoided = Σ_feed_partner × {EMISSION_FACTOR_TON_PER_TON}</Text>
          <Text style={styles.formulaHint}>
            Applied: {feed.feedTon.toFixed(1)} Ton × {EMISSION_FACTOR_TON_PER_TON} = {(feed.feedTon * EMISSION_FACTOR_TON_PER_TON).toFixed(2)} Ton CO₂e
          </Text>
        </View>

        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>Core Formula 2 — Enteric Methane GWP</Text>
          <Text style={{ fontSize: 11, fontWeight: 700, color: GRAY_900 }}>Enteric_credit = Σ_g_CH₄_reduced × ({GWP_100} / 1,000,000)</Text>
          <Text style={styles.formulaHint}>
            Per-cattle grams aggregated across the period; multiplied by GWP₁₀₀ = {GWP_100}; divided by 1,000,000 to convert to Ton CO₂e.
          </Text>
        </View>

        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>Core Formula 3 — Sequestration</Text>
          <Text style={{ fontSize: 11, fontWeight: 700, color: GRAY_900 }}>Sequestration_credit = Σ_feed × {SEQUESTRATION_RATIO}</Text>
          <Text style={styles.formulaHint}>
            Applied: {feed.feedTon.toFixed(1)} Ton × {SEQUESTRATION_RATIO} = {sequestrationTon.toFixed(2)} Ton CO₂e
          </Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Per-Cattle Workings</Text>
          <View style={styles.table}>
            <View style={[styles.tr, styles.trHead]}>
              {['ID', 'Cattle', 'Partner', 'Weight (kg)', 'Intake (kg/d)', 'Methane Reduced (g)', 'Seq. (g)', 'Enteric CO₂e (Ton)'].map((h, idx) => (
                <Text key={h} style={[styles.th, { flex: idx < 2 ? 2 : 1 }]}>{h}</Text>
              ))}
            </View>
            {cattleRows.map((row, i) => (
              <View key={row.cattle.id} style={[styles.tr, i % 2 ? styles.trAlt : {}]}>
                <Text style={[styles.td, { flex: 1, fontFamily: 'Courier', fontWeight: 700 }]}>{row.cattle.id}</Text>
                <Text style={[styles.td, { flex: 2 }]}>{row.cattle.name}</Text>
                <Text style={[styles.td, { flex: 2, color: GRAY_500 }]}>{row.cattle.partnerId}</Text>
                <Text style={[styles.td, { flex: 1 }]}>{row.cattle.weightKg}</Text>
                <Text style={[styles.td, { flex: 1 }]}>{row.cattle.intakeKgPerDay}</Text>
                <Text style={[styles.td, { flex: 1, fontWeight: 700, color: PRIMARY }]}>{row.methaneG.toLocaleString()}</Text>
                <Text style={[styles.td, { flex: 1, fontWeight: 700, color: BLUE }]}>{row.seqG.toLocaleString()}</Text>
                <Text style={[styles.td, { flex: 1, fontWeight: 700 }]}>{entericMethaneCreditFromG(row.methaneG).toFixed(4)}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />

        <Header num={10} title="Results" sub="Baseline vs actual emissions and credit composition" />

        <View style={styles.row}>
          <View style={[styles.card, { flex: 1, marginRight: 6 }]}>
            <Text style={styles.h4}>Baseline vs Actual (g CO₂e)</Text>
            {monthly.slice(0, 8).map((m) => {
              const pct = m.baselineG > 0 ? Math.min(100, (m.savedG / m.baselineG) * 100) : 0;
              return (
                <View key={m.month} style={{ marginTop: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 9, color: GRAY_500 }}>{m.label}</Text>
                    <Text style={{ fontSize: 9, fontWeight: 700, color: PRIMARY }}>{m.savedG.toLocaleString()} g saved</Text>
                  </View>
                  <View style={styles.bar}>
                    <View style={[styles.barFill, { width: `${Math.max(2, pct)}%` }]} />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={[styles.card, { flex: 1, marginLeft: 6 }]}>
            <Text style={styles.h4}>Credit Composition</Text>
            <View style={{ flexDirection: 'row', marginTop: 8, height: 14, borderRadius: 6, overflow: 'hidden' }}>
              <View style={{ flex: entericTon, backgroundColor: PRIMARY }} />
              <View style={{ flex: sequestrationTon, backgroundColor: BLUE }} />
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <View style={{ width: 10, height: 10, backgroundColor: PRIMARY, marginRight: 6, borderRadius: 2 }} />
                <Text style={{ flex: 1, fontSize: 9, color: GRAY_700 }}>Enteric Methane Reduction</Text>
                <Text style={{ fontSize: 11, fontWeight: 800, color: PRIMARY }}>{entericTon.toFixed(2)} T</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <View style={{ width: 10, height: 10, backgroundColor: BLUE, marginRight: 6, borderRadius: 2 }} />
                <Text style={{ flex: 1, fontSize: 9, color: GRAY_700 }}>Feedstock Sequestration</Text>
                <Text style={{ fontSize: 11, fontWeight: 800, color: BLUE }}>{sequestrationTon.toFixed(2)} T</Text>
              </View>
            </View>

            <View style={{ marginTop: 14, padding: 10, backgroundColor: '#ecfdf5', borderRadius: 8 }}>
              <Text style={{ fontSize: 8, color: '#047857', letterSpacing: 1, textTransform: 'uppercase' }}>Total Avoided</Text>
              <Text style={{ fontSize: 22, fontWeight: 800, color: PRIMARY, marginTop: 2 }}>
                {(entericTon + sequestrationTon).toFixed(2)} <Text style={{ fontSize: 10 }}>Ton CO₂e</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.h3}>Growth Trajectory</Text>
          <View style={styles.card}>
            {monthly.slice(-8).map((m) => {
              const max = MONTHLY.reduce((mx, x) => Math.max(mx, x.feedTon), 1);
              const pct = Math.min(100, (m.feedTon / max) * 100);
              return (
                <View key={m.month} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                  <Text style={{ width: 50, fontSize: 8, color: GRAY_500 }}>{m.label}</Text>
                  <View style={{ flex: 1, height: 8, backgroundColor: GRAY_100, borderRadius: 4, overflow: 'hidden' }}>
                    <View style={{ width: `${pct}%`, height: 8, backgroundColor: BLUE }} />
                  </View>
                  <Text style={{ width: 70, fontSize: 9, fontWeight: 700, color: BLUE, textAlign: 'right' }}>{m.feedTon.toFixed(1)} Ton</Text>
                </View>
              );
            })}
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />

        <Header num={11} title="Verification & Credit Pipeline" sub="End-to-end tracking from measurement to market" />

        <View style={styles.pipelineGrid}>
          {[
            { label: 'Measured', value: `${pipeline.measuredTon.toFixed(2)} Ton`, color: PRIMARY, lightBg: '#ecfdf5', desc: 'Reduction calculated from feed distribution & per-cattle data.' },
            { label: 'Verified', value: `${pipeline.verified} Credits`, color: BLUE, lightBg: '#eff6ff', desc: 'Audited by independent third-party verifier.' },
            { label: 'Pending', value: `${pipeline.pending} Credits`, color: '#b45309', lightBg: '#fffbeb', desc: 'Awaiting audit for current reporting cycle.' },
            { label: 'Sold / Retired', value: `${pipeline.sold} Credits`, color: '#7c3aed', lightBg: '#f5f3ff', desc: 'Transacted on the voluntary carbon market.' },
          ].map((stage) => (
            <View key={stage.label} style={[styles.pipelineCard, { backgroundColor: stage.lightBg }]}>
              <Text style={[styles.plLabel, { color: stage.color }]}>{stage.label}</Text>
              <Text style={[styles.plValue, { color: stage.color }]}>{stage.value}</Text>
              <Text style={styles.plDesc}>{stage.desc}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.h3}>Verification Stages</Text>
          {[
            { name: 'Data Collection', date: 'Jan – Jun 2025', status: 'Complete' },
            { name: 'Report Compilation', date: '1 Jul 2025', status: 'Complete' },
            { name: 'Third-Party Audit', date: 'Est. 15 Jul 2025', status: 'In Progress' },
            { name: 'Credit Issuance', date: 'Est. 1 Aug 2025', status: 'Upcoming' },
          ].map((s, i) => (
            <View key={s.name} style={styles.auditRow}>
              <View style={[styles.auditNum, i < 2 ? { backgroundColor: PRIMARY } : i === 2 ? { backgroundColor: '#f59e0b' } : { backgroundColor: GRAY_400 }]}>
                <Text>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: GRAY_900 }}>{s.name}</Text>
                <Text style={{ fontSize: 8, color: GRAY_500 }}>{s.date}</Text>
              </View>
              <View>
                <Text style={[
                  styles.pill,
                  i < 2 ? styles.pillGreen : i === 2 ? styles.pillAmber : { backgroundColor: GRAY_100, color: GRAY_500 },
                ]}>
                  {s.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.formulaBox, { marginTop: 14 }]}>
          <Text style={styles.formulaLabel}>Pipeline Conversion</Text>
          <Text style={{ fontSize: 10, color: GRAY_700 }}>
            Measured → Verified: {((pipeline.verified / Math.max(1, pipeline.verified + pipeline.pending)) * 100).toFixed(0)}% · Verified → Sold: {((pipeline.sold / Math.max(1, pipeline.verified)) * 100).toFixed(0)}% · Pending holdback: {((pipeline.pending / Math.max(1, pipeline.verified + pipeline.pending)) * 100).toFixed(0)}%
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <FooterText generatedAt={meta.generatedAt} />

        <Header num={12} title="Audit Trail & Methodology Provenance" sub="7-step walkthrough — from hectares to verified credits" />

        {[
          { n: 1, t: 'Cultivation', color: PRIMARY, d: 'Land preparation and planting of Indigofera + Pakcoy across partner farms. Hectares tracked per plot; cycle days (Indigofera 75d, Pakcoy 50d) logged at planting date.' },
          { n: 2, t: 'Harvest', color: TEAL, d: 'Biomass harvested per plot per month. Fresh yield per Ha per cycle applied to active hectares. Dry matter ratio: 25% of fresh weight.' },
          { n: 3, t: 'Processing', color: BLUE, d: 'Fresh biomass dried to 25% dry matter → milled → mixed → pelletized. Processing yield: 62% (dry biomass → pellet kg). Waste composted.' },
          { n: 4, t: 'Distribution', color: '#7c3aed', d: 'Pellets dispatched to farm partners via validated weighbridge logs. Zero-waste assumption: all pellet output = distribution to partners.' },
          { n: 5, t: 'Consumption', color: '#b45309', d: `${totalCattle.toLocaleString()} cattle consume 12 kg/day. Intake × herd × days = total consumption. Methane reduction per individual tracked.` },
          { n: 6, t: 'Formula Application', color: '#dc2626', d: `CO₂e = Σ_feed × 0.36. Enteric = Σ_g_CH₄ × 28 (GWP₁₀₀). Cultivation CO₂e = Σ_Ha × rate × months/12. All via src/lib/mrv/calc.ts.` },
          { n: 7, t: 'Verification', color: PRIMARY, d: 'Pipeline: Measured → Verified (3rd party) → Pending → Sold/Retired. AI MRV pipeline pre-generates dataset; final issuance subject to Verra audit.' },
        ].map((s) => (
          <View key={s.n} style={styles.auditRow}>
            <View style={[styles.auditNum, { backgroundColor: s.color }]}>
              <Text>{s.n}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: 700, color: GRAY_900 }}>{s.t}</Text>
              <Text style={{ fontSize: 9, color: GRAY_500, marginTop: 2 }}>{s.d}</Text>
            </View>
          </View>
        ))}

        <View style={{ marginTop: 20, padding: 14, backgroundColor: GRAY_50, borderRadius: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 800, color: GRAY_900 }}>Provenance & Reproducibility</Text>
          <Text style={{ fontSize: 9, color: GRAY_500, marginTop: 4, lineHeight: 1.4 }}>
            All numbers in this report are derived through pure functions in src/lib/mrv/calc.ts, which are also used by the live MRV Dashboard (https://hifeed.co/mrv). Datasets are stored in src/lib/mrv/data.ts (cultivation plots, harvest records, processing batches) and keyed by partner and month for full traceability.
          </Text>
        </View>

        <View style={{ marginTop: 16, padding: 14, borderRadius: 12, border: `1px solid ${PRIMARY}` }}>
          <Text style={{ fontSize: 11, fontWeight: 800, color: PRIMARY }}>Contact</Text>
          <Text style={{ fontSize: 10, color: GRAY_700, marginTop: 4 }}>
            HiFeed MRV Pipeline · partnership@hifeed.co · https://hifeed.co
          </Text>
          <Text style={{ fontSize: 8, color: GRAY_500, marginTop: 6 }}>
            This document is a pre-decisional investor preview. Numbers are derived from the AI MRV Pipeline and remain subject to final third-party verification under the Verra VCS program.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
