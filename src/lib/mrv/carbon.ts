// Carbon abatement HiFeed — rumus dari workbook "Carbon (Updated 7/9/26).xlsx".
// Tiga sumber abatement:
//   1. Enteric fermentation emission reduction   (sheet "EF 25" & "EF 26")
//   2. Raw material offtake carbon sequestration (sheet "RM Offtake C-Seq")
//   3. Carbon sequestration from carbon banks     (sheet "Carbon Banks Seq (0726)")
// Rekap bulanan mengikuti sheet "Graph" (kolom K–O).
//
// Data (CarbonDataset) bisa diubah di Sanity (dokumen "Carbon accounting"); DEFAULT_CARBON_DATA
// adalah isi workbook dan dipakai bila CMS kosong. Rumus ada di computeCarbon().
// File ini sengaja tanpa import runtime agar bisa diverifikasi langsung dengan Node
// (scripts/verify-carbon.mjs).

export type AbatementSource = 'enteric' | 'rawMaterial' | 'carbonBank';

export const ABATEMENT_SOURCES: Record<AbatementSource, { label: string; short: string; description: string }> = {
  enteric: {
    label: 'Enteric fermentation emission reduction',
    short: 'Enteric CH₄ reduction',
    description: 'Methane avoided when cattle are fed HiFeed products instead of the baseline diet.',
  },
  rawMaterial: {
    label: 'Raw material offtake carbon sequestration',
    short: 'Raw material offtake',
    description: 'Carbon sequestered by leguminous (Indigofera) plantations whose harvest HiFeed procures.',
  },
  carbonBank: {
    label: 'Carbon sequestration from carbon banks',
    short: 'Carbon banks',
    description: 'Measured increase of ecosystem carbon stock (AGB + BGB + SOC) at HiFeed plantation stations.',
  },
};

export type FeedProduct = 'indigofera' | 'greenConcentrate' | 'completeFeedPellets';

export const FEED_PRODUCTS: FeedProduct[] = ['indigofera', 'greenConcentrate', 'completeFeedPellets'];

export const FEED_PRODUCT_LABELS: Record<FeedProduct, string> = {
  indigofera: 'Indigofera (silage / hay / mesh)',
  greenConcentrate: 'Green Concentrate',
  completeFeedPellets: 'Complete Feed Pellets',
};

export type FeedDistribution = { month: string } & Partial<Record<FeedProduct, number>>;

export interface OfftakeProcurement {
  /** Label periode pengadaan (kolom pertama workbook hanya berlabel "2025"). */
  periodLabel: string;
  kg: number;
}

export interface CarbonBankStation {
  id: string;
  name: string;
  areaHa: number;
  description: string;
  /** Total stok karbon stasiun (tCO₂e) per tanggal pengukuran, urut waktu. */
  measurements: Array<{ month: string; stockT: number; note: string }>;
}

export interface CreditStatus {
  verifiedT: number | null;
  pendingT: number | null;
  retiredT: number | null;
}

export interface CarbonDataset {
  source: { label: string; updated: string };
  /** Harga acuan VCM (USD per tCO₂e). */
  vcmPriceUsdPerT: number;
  enteric: {
    bodyWeightKg: number;
    /** Dry matter intake sebagai fraksi body weight per hari. */
    dmiFractionOfBw: Record<FeedProduct, number>;
    /** FAO GLEAM, rata-rata Asia Tenggara (tCO₂e/ekor/tahun). */
    baselineEfTPerCattleYear: number;
    /** EF formula pakan yang saat ini didistribusikan (tCO₂e/ekor/tahun). */
    projectEfTPerCattleYear: number;
  };
  feedDistribution: FeedDistribution[];
  rawMaterial: {
    freshYieldTPerHarvest: number;
    harvestsPerYear: number;
    dryMatterFraction: number;
    dryingSpoilageFraction: number;
    /** Sekuestrasi plantation leguminosa (tCO₂e/ha/tahun). */
    plantationSeqTPerHaYear: number;
    procurement: OfftakeProcurement[];
    /** Bulan saat sekuestrasi offtake dibukukan (sheet "Graph"). */
    recognitionMonth: string;
  };
  // Stok = (AGB + BGB) × 0.47 × 3.67 + SOC × 3.67, root-to-shoot 0.258 (Indigofera) / 0.956 (Hybrid Napier).
  carbonBankStations: CarbonBankStation[];
  /** Workbook belum memuat status kredit; null ditampilkan sebagai "belum tercatat". */
  creditStatus: CreditStatus;
}

/** Isi workbook "Carbon (Updated 7/9/26).xlsx". */
export const DEFAULT_CARBON_DATA: CarbonDataset = {
  source: { label: 'Carbon (Updated 7/9/26).xlsx', updated: 'July 2026' },
  vcmPriceUsdPerT: 3.66, // Indonesia VCM 2024 average
  enteric: {
    bodyWeightKg: 300,
    dmiFractionOfBw: { indigofera: 0.03, greenConcentrate: 0.01, completeFeedPellets: 0.025 },
    baselineEfTPerCattleYear: 1.01,
    projectEfTPerCattleYear: 0.597,
  },
  // EF 25 kolom C–H, EF 26 kolom C–K (kg produk per bulan).
  feedDistribution: [
    { month: '2025-07' },
    { month: '2025-08', indigofera: 2075 },
    { month: '2025-09', indigofera: 7000 + 75 + 720 },
    { month: '2025-10', greenConcentrate: 370 },
    { month: '2025-11', greenConcentrate: 120 + 30 + 1530 + 475 + 7025 },
    { month: '2025-12', greenConcentrate: 500 + 7000, completeFeedPellets: 1500 },
    { month: '2026-01', greenConcentrate: 4950 + 3050 + 75 },
    { month: '2026-02', greenConcentrate: 25 + 25 + 500 },
    { month: '2026-03', greenConcentrate: 8125 },
    { month: '2026-04', greenConcentrate: 15700 },
    { month: '2026-05' },
    { month: '2026-06' },
    { month: '2026-07', indigofera: 6000 },
  ],
  rawMaterial: {
    freshYieldTPerHarvest: 15,
    harvestsPerYear: 4,
    dryMatterFraction: 0.33,
    dryingSpoilageFraction: 0.14,
    plantationSeqTPerHaYear: 20,
    // "RM Offtake C-Seq" baris 17 (Indigofera offtake, pengadaan 2025).
    procurement: [
      { periodLabel: '2025', kg: 5650 },
      { periodLabel: 'Jan 2025', kg: 6500 },
      { periodLabel: 'Mar 2025', kg: 6500 },
      { periodLabel: 'Apr 2025', kg: 6500 },
    ],
    recognitionMonth: '2026-05',
  },
  carbonBankStations: [
    {
      id: 'C1',
      name: 'Canggu 1',
      areaHa: 5.6,
      description: 'Indigofera plantation (3.65 ha) + unvegetated strata (1.95 ha)',
      measurements: [
        { month: '2024-11', stockT: 40.47 * 5.6, note: 'Baseline, unvegetated (SOC only)' },
        { month: '2025-06', stockT: 113.3098853 + 274.6629394, note: 'Y0, Indigofera 4 months, pre-harvest' },
        { month: '2026-06', stockT: 405.64, note: 'Y1, annual monitoring (pre-harvest corrected)' },
      ],
    },
    {
      id: 'C2',
      name: 'Canggu 2',
      areaHa: 0.51,
      description: 'Hybrid Napier (Pakchong) plantation',
      measurements: [
        { month: '2024-11', stockT: 32.86 * 0.51, note: 'Baseline, unvegetated (SOC only)' },
        { month: '2025-06', stockT: 33.81307687, note: 'Y0, Hybrid Napier 2 months' },
        { month: '2026-06', stockT: 49.39, note: 'Y1, Hybrid Napier 1 year 2 months' },
      ],
    },
    {
      id: 'TS1',
      name: 'TS1',
      areaHa: 0.4,
      description: 'Carbon bank station',
      measurements: [
        { month: '2025-06', stockT: 25.36, note: 'First measurement' },
        { month: '2025-10', stockT: 27.03, note: 'Follow-up measurement' },
      ],
    },
    {
      id: 'GT1',
      name: 'GT1',
      areaHa: 0.72,
      description: 'Carbon bank station (single measurement, no sequestration claimed yet)',
      measurements: [{ month: '2025-09', stockT: 31.82, note: 'First measurement' }],
    },
  ],
  creditStatus: { verifiedT: null, pendingT: null, retiredT: null },
};

// ─── Utilitas bulan ──────────────────────────────────────────────────────────

export function monthLabel(month: string): string {
  const d = new Date(`${month}-01T00:00:00Z`);
  return `${d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })} '${String(d.getUTCFullYear()).slice(-2)}`;
}

function monthRange(from: string, to: string): string[] {
  const out: string[] = [];
  let [y, m] = from.split('-').map(Number);
  const [ty, tm] = to.split('-').map(Number);
  while (y < ty || (y === ty && m <= tm)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`);
    m += 1;
    if (m > 12) { m = 1; y += 1; }
  }
  return out;
}

export function formatMonthRange(from?: string, to?: string): string {
  if (!from || !to) return '';
  return `${monthLabel(from).replace(" '", ' 20')} – ${monthLabel(to).replace(" '", ' 20')}`;
}

// ─── Rumus ───────────────────────────────────────────────────────────────────

export interface MonthlyAbatement {
  month: string;
  label: string;
  enteric: number;
  rawMaterial: number;
  carbonBank: number;
  total: number;
  cumulative: number;
}

export type CarbonModel = ReturnType<typeof computeCarbon>;

export function computeCarbon(data: CarbonDataset) {
  const { enteric, rawMaterial } = data;

  const dmiKgPerDay = (product: FeedProduct) => enteric.bodyWeightKg * enteric.dmiFractionOfBw[product];

  /** 0.413 / 365 ≈ 0.0011315 tCO₂e per ekor per hari. */
  const entericReductionPerCattleDay = (enteric.baselineEfTPerCattleYear - enteric.projectEfTPerCattleYear) / 365;

  const cattleDays = (entry: FeedDistribution) =>
    FEED_PRODUCTS.reduce((sum, product) => sum + (entry[product] ?? 0) / dmiKgPerDay(product), 0);

  const entericReductionT = (entry: FeedDistribution) => cattleDays(entry) * entericReductionPerCattleDay;

  /** 17,028 kg bahan kering per tahun dari satu unit plantation. */
  const netDryYieldKgPerYear =
    rawMaterial.freshYieldTPerHarvest *
    rawMaterial.harvestsPerYear *
    rawMaterial.dryMatterFraction *
    (1 - rawMaterial.dryingSpoilageFraction) *
    1000;

  /** ≈ 0.0011745 tCO₂e per kg Indigofera yang di-offtake. */
  const offtakeSeqPerKg = rawMaterial.plantationSeqTPerHaYear / netDryYieldKgPerYear;
  const offtakeSequestrationT = (kg: number) => kg * offtakeSeqPerKg;
  const offtakeKg = rawMaterial.procurement.reduce((s, p) => s + p.kg, 0);

  /** Sekuestrasi = selisih antar pengukuran berurutan, diakui pada bulan pengukuran berikutnya. */
  const carbonBankEvents = data.carbonBankStations.flatMap((station) => {
    const sorted = [...station.measurements].sort((a, b) => a.month.localeCompare(b.month));
    return sorted.slice(1).map((m, i) => ({ stationId: station.id, month: m.month, seqT: m.stockT - sorted[i].stockT }));
  });

  const byMonth = new Map<string, { enteric: number; rawMaterial: number; carbonBank: number }>();
  const add = (month: string, source: AbatementSource, value: number) => {
    const row = byMonth.get(month) ?? { enteric: 0, rawMaterial: 0, carbonBank: 0 };
    row[source] += value;
    byMonth.set(month, row);
  };
  data.feedDistribution.forEach((entry) => add(entry.month, 'enteric', entericReductionT(entry)));
  if (offtakeKg > 0) add(rawMaterial.recognitionMonth, 'rawMaterial', offtakeSequestrationT(offtakeKg));
  carbonBankEvents.forEach((e) => add(e.month, 'carbonBank', e.seqT));

  const months = [...byMonth.keys()].sort();
  let cumulative = 0;
  const monthly: MonthlyAbatement[] = months.length
    ? monthRange(months[0], months[months.length - 1]).map((month) => {
        const row = byMonth.get(month) ?? { enteric: 0, rawMaterial: 0, carbonBank: 0 };
        const total = row.enteric + row.rawMaterial + row.carbonBank;
        cumulative += total;
        return { month, label: monthLabel(month), ...row, total, cumulative };
      })
    : [];

  const totals = (upToMonth?: string) => {
    const rows = upToMonth ? monthly.filter((r) => r.month <= upToMonth) : monthly;
    const entericT = rows.reduce((s, r) => s + r.enteric, 0);
    const rawMaterialT = rows.reduce((s, r) => s + r.rawMaterial, 0);
    const carbonBankT = rows.reduce((s, r) => s + r.carbonBank, 0);
    const total = entericT + rawMaterialT + carbonBankT;
    return {
      enteric: entericT,
      rawMaterial: rawMaterialT,
      carbonBank: carbonBankT,
      total,
      valueUsd: total * data.vcmPriceUsdPerT,
      fromMonth: rows[0]?.month,
      toMonth: rows[rows.length - 1]?.month,
    };
  };

  return {
    data,
    dmiKgPerDay,
    entericReductionPerCattleDay,
    cattleDays,
    entericReductionT,
    netDryYieldKgPerYear,
    offtakeSeqPerKg,
    offtakeSequestrationT,
    offtakeKg,
    carbonBankEvents,
    carbonBankTotalAreaHa: data.carbonBankStations.reduce((s, st) => s + st.areaHa, 0),
    feedDistributedKg: data.feedDistribution.reduce(
      (s, e) => s + FEED_PRODUCTS.reduce((ss, p) => ss + (e[p] ?? 0), 0),
      0,
    ),
    monthly,
    totals,
  };
}

/** Model dari data workbook (fallback & verifikasi). */
export const DEFAULT_CARBON = computeCarbon(DEFAULT_CARBON_DATA);
