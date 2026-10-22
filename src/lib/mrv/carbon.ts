// Carbon abatement HiFeed — port dari workbook "Carbon (Updated 7/9/26).xlsx".
// Tiga sumber abatement:
//   1. Enteric fermentation emission reduction   (sheet "EF 25" & "EF 26")
//   2. Raw material offtake carbon sequestration (sheet "RM Offtake C-Seq")
//   3. Carbon sequestration from carbon banks     (sheet "Carbon Banks Seq (0726)")
// Rekap bulanan mengikuti sheet "Graph" (kolom K–O).
// File ini sengaja tanpa import runtime agar bisa diverifikasi langsung dengan Node
// (lihat scripts/verify-carbon.ts).

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

/** Harga rata-rata VCM Indonesia 2024 yang dipakai workbook. */
export const VCM_PRICE_USD_PER_TCO2E = 3.66;

// ─── 1. Enteric fermentation ─────────────────────────────────────────────────

export type FeedProduct = 'indigofera' | 'greenConcentrate' | 'completeFeedPellets';

export const FEED_PRODUCT_LABELS: Record<FeedProduct, string> = {
  indigofera: 'Indigofera (silage / hay / mesh)',
  greenConcentrate: 'Green Concentrate',
  completeFeedPellets: 'Complete Feed Pellets',
};

export const ENTERIC_PARAMS = {
  bodyWeightKg: 300,
  /** Dry matter intake sebagai fraksi body weight per hari. */
  dmiFractionOfBw: {
    indigofera: 0.03,
    greenConcentrate: 0.01,
    completeFeedPellets: 0.025,
  } satisfies Record<FeedProduct, number>,
  /** FAO GLEAM, rata-rata Asia Tenggara (tCO₂e/ekor/tahun). */
  baselineEfTPerCattleYear: 1.01,
  /** EF formula pakan yang saat ini didistribusikan (tCO₂e/ekor/tahun). */
  projectEfTPerCattleYear: 0.597,
};

export function dmiKgPerDay(product: FeedProduct): number {
  return ENTERIC_PARAMS.bodyWeightKg * ENTERIC_PARAMS.dmiFractionOfBw[product];
}

/** 0.413 / 365 ≈ 0.0011315 tCO₂e per ekor per hari. */
export const ENTERIC_REDUCTION_T_PER_CATTLE_DAY =
  (ENTERIC_PARAMS.baselineEfTPerCattleYear - ENTERIC_PARAMS.projectEfTPerCattleYear) / 365;

export type FeedDistribution = { month: string } & Partial<Record<FeedProduct, number>>;

/** Kg produk yang didistribusikan per bulan (EF 25 kolom C–H, EF 26 kolom C–K). */
export const FEED_DISTRIBUTION: FeedDistribution[] = [
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
];

export function cattleDays(entry: FeedDistribution): number {
  return (Object.keys(FEED_PRODUCT_LABELS) as FeedProduct[]).reduce(
    (sum, product) => sum + (entry[product] ?? 0) / dmiKgPerDay(product),
    0,
  );
}

export function entericReductionT(entry: FeedDistribution): number {
  return cattleDays(entry) * ENTERIC_REDUCTION_T_PER_CATTLE_DAY;
}

// ─── 2. Raw material offtake ─────────────────────────────────────────────────

export const RAW_MATERIAL_PARAMS = {
  freshYieldTPerHarvest: 15,
  harvestsPerYear: 4,
  dryMatterFraction: 0.33,
  dryingSpoilageFraction: 0.14,
  /** Sekuestrasi plantation leguminosa (tCO₂e/ha/tahun). */
  plantationSeqTPerHaYear: 20,
};

/** 17,028 kg bahan kering per tahun dari satu unit plantation. */
export const NET_DRY_YIELD_KG_PER_YEAR =
  RAW_MATERIAL_PARAMS.freshYieldTPerHarvest *
  RAW_MATERIAL_PARAMS.harvestsPerYear *
  RAW_MATERIAL_PARAMS.dryMatterFraction *
  (1 - RAW_MATERIAL_PARAMS.dryingSpoilageFraction) *
  1000;

/** ≈ 0.0011745 tCO₂e per kg Indigofera yang di-offtake. */
export const OFFTAKE_SEQ_T_PER_KG = RAW_MATERIAL_PARAMS.plantationSeqTPerHaYear / NET_DRY_YIELD_KG_PER_YEAR;

export interface OfftakeProcurement {
  /** Label kolom di workbook (kolom pertama hanya berlabel "2025"). */
  periodLabel: string;
  kg: number;
}

/** "RM Offtake C-Seq" baris 17 (Indigofera offtake, pengadaan 2025). */
export const OFFTAKE_PROCUREMENT: OfftakeProcurement[] = [
  { periodLabel: '2025', kg: 5650 },
  { periodLabel: 'Jan 2025', kg: 6500 },
  { periodLabel: 'Mar 2025', kg: 6500 },
  { periodLabel: 'Apr 2025', kg: 6500 },
];

/** Sheet "Graph" membukukan seluruh sekuestrasi offtake pada bulan ini. */
export const OFFTAKE_RECOGNITION_MONTH = '2026-05';

export function offtakeSequestrationT(kg: number): number {
  return kg * OFFTAKE_SEQ_T_PER_KG;
}

// ─── 3. Carbon banks ─────────────────────────────────────────────────────────

export interface CarbonBankStation {
  id: string;
  name: string;
  areaHa: number;
  description: string;
  /** Total stok karbon stasiun (tCO₂e) per tanggal pengukuran, urut waktu. */
  measurements: Array<{ month: string; stockT: number; note: string }>;
}

// Stok = (AGB + BGB) × 0.47 × 3.67 + SOC × 3.67, root-to-shoot 0.258 (Indigofera) / 0.956 (Hybrid Napier).
export const CARBON_BANK_STATIONS: CarbonBankStation[] = [
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
];

/** Sekuestrasi = selisih antar pengukuran berurutan, diakui pada bulan pengukuran berikutnya. */
export function carbonBankEvents(): Array<{ stationId: string; month: string; seqT: number }> {
  return CARBON_BANK_STATIONS.flatMap((station) =>
    station.measurements.slice(1).map((m, i) => ({
      stationId: station.id,
      month: m.month,
      seqT: m.stockT - station.measurements[i].stockT,
    })),
  );
}

export const CARBON_BANK_TOTAL_AREA_HA = CARBON_BANK_STATIONS.reduce((s, st) => s + st.areaHa, 0);

// ─── Rekap bulanan (sheet "Graph") ───────────────────────────────────────────

export interface MonthlyAbatement {
  month: string;
  label: string;
  enteric: number;
  rawMaterial: number;
  carbonBank: number;
  total: number;
  cumulative: number;
}

function monthLabel(month: string): string {
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

export function buildMonthlyAbatement(): MonthlyAbatement[] {
  const byMonth = new Map<string, { enteric: number; rawMaterial: number; carbonBank: number }>();
  const add = (month: string, source: AbatementSource, value: number) => {
    const row = byMonth.get(month) ?? { enteric: 0, rawMaterial: 0, carbonBank: 0 };
    row[source] += value;
    byMonth.set(month, row);
  };

  FEED_DISTRIBUTION.forEach((entry) => add(entry.month, 'enteric', entericReductionT(entry)));
  add(
    OFFTAKE_RECOGNITION_MONTH,
    'rawMaterial',
    offtakeSequestrationT(OFFTAKE_PROCUREMENT.reduce((s, p) => s + p.kg, 0)),
  );
  carbonBankEvents().forEach((e) => add(e.month, 'carbonBank', e.seqT));

  const months = [...byMonth.keys()].sort();
  let cumulative = 0;
  return monthRange(months[0], months[months.length - 1]).map((month) => {
    const row = byMonth.get(month) ?? { enteric: 0, rawMaterial: 0, carbonBank: 0 };
    const total = row.enteric + row.rawMaterial + row.carbonBank;
    cumulative += total;
    return { month, label: monthLabel(month), ...row, total, cumulative };
  });
}

export const MONTHLY_ABATEMENT = buildMonthlyAbatement();

export function abatementTotals(upToMonth?: string) {
  const rows = upToMonth ? MONTHLY_ABATEMENT.filter((r) => r.month <= upToMonth) : MONTHLY_ABATEMENT;
  const enteric = rows.reduce((s, r) => s + r.enteric, 0);
  const rawMaterial = rows.reduce((s, r) => s + r.rawMaterial, 0);
  const carbonBank = rows.reduce((s, r) => s + r.carbonBank, 0);
  const total = enteric + rawMaterial + carbonBank;
  return {
    enteric,
    rawMaterial,
    carbonBank,
    total,
    valueUsd: total * VCM_PRICE_USD_PER_TCO2E,
    fromMonth: rows[0]?.month,
    toMonth: rows[rows.length - 1]?.month,
  };
}

export const FEED_DISTRIBUTED_KG = FEED_DISTRIBUTION.reduce(
  (s, e) => s + (e.indigofera ?? 0) + (e.greenConcentrate ?? 0) + (e.completeFeedPellets ?? 0),
  0,
);

export const CARBON_DATA_SOURCE = {
  file: 'Carbon (Updated 7/9/26).xlsx',
  updated: 'July 2026',
};

export function formatMonthRange(from?: string, to?: string): string {
  if (!from || !to) return '';
  return `${monthLabel(from).replace(" '", ' 20')} – ${monthLabel(to).replace(" '", ' 20')}`;
}

// ─── Status kredit ──────────────────────────────────────────────────────────
// Workbook belum memuat status verifikasi/penjualan kredit. Isi (tCO₂e) saat sudah ada
// hasil audit pihak ketiga; null ditampilkan sebagai "belum tercatat".
export const CREDIT_STATUS: { verifiedT: number | null; pendingT: number | null; retiredT: number | null } = {
  verifiedT: null,
  pendingT: null,
  retiredT: null,
};
