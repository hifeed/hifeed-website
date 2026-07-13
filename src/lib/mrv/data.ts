import type {
  CattleRecord,
  FarmPartner,
  MonthlyEntry,
  PipelineStage,
  VerificationStep,
} from './types';

const PARTNERS: FarmPartner[] = [
  {
    id: 'PT Jaya Makmur',
    name: 'PT Jaya Makmur',
    region: 'Blitar, East Java',
    province: 'East Java',
    cattle: 240,
    monthlyFeedTon: {
      '2025-01': 18.2, '2025-02': 19.8, '2025-03': 22.4, '2025-04': 24.5, '2025-05': 26.7, '2025-06': 28.5,
      '2025-07': 30.4, '2025-08': 32.1, '2025-09': 33.8, '2025-10': 35.5, '2025-11': 37.0, '2025-12': 38.6,
      '2026-01': 39.9, '2026-02': 41.0, '2026-03': 42.2, '2026-04': 43.5, '2026-05': 44.7, '2026-06': 45.9, '2026-07': 47.0,
    },
    status: 'active',
    coordinates: [112.1783, -8.0983],
  },
  {
    id: 'CV Sejahtera Farm',
    name: 'CV Sejahtera Farm',
    region: 'Boyolali, Central Java',
    province: 'Central Java',
    cattle: 180,
    monthlyFeedTon: {
      '2025-01': 13.4, '2025-02': 14.6, '2025-03': 16.5, '2025-04': 18.0, '2025-05': 19.7, '2025-06': 21.0,
      '2025-07': 22.4, '2025-08': 23.7, '2025-09': 24.9, '2025-10': 26.1, '2025-11': 27.2, '2025-12': 28.4,
      '2026-01': 29.3, '2026-02': 30.1, '2026-03': 31.0, '2026-04': 31.9, '2026-05': 32.7, '2026-06': 33.5, '2026-07': 34.3,
    },
    status: 'active',
    coordinates: [110.5975, -7.5317],
  },
  {
    id: 'Peternakan Maju Bersama',
    name: 'Peternakan Maju Bersama',
    region: 'Lampung Tengah, Lampung',
    province: 'Lampung',
    cattle: 320,
    monthlyFeedTon: {
      '2025-01': 24.5, '2025-02': 26.7, '2025-03': 30.1, '2025-04': 33.0, '2025-05': 35.9, '2025-06': 38.4,
      '2025-07': 40.9, '2025-08': 43.2, '2025-09': 45.5, '2025-10': 47.8, '2025-11': 49.8, '2025-12': 52.0,
      '2026-01': 53.8, '2026-02': 55.3, '2026-03': 56.9, '2026-04': 58.5, '2026-05': 60.1, '2026-06': 61.7, '2026-07': 63.2,
    },
    status: 'active',
    coordinates: [105.15, -4.95],
  },
  {
    id: 'Bali Cattle Co.',
    name: 'Bali Cattle Co.',
    region: 'Tabanan, Bali',
    province: 'Bali',
    cattle: 95,
    monthlyFeedTon: {
      '2025-01': 7.0, '2025-02': 7.7, '2025-03': 8.7, '2025-04': 9.5, '2025-05': 10.4, '2025-06': 11.2,
      '2025-07': 11.9, '2025-08': 12.6, '2025-09': 13.3, '2025-10': 14.0, '2025-11': 14.6, '2025-12': 15.3,
      '2026-01': 15.8, '2026-02': 16.2, '2026-03': 16.7, '2026-04': 17.2, '2026-05': 17.6, '2026-06': 18.1, '2026-07': 18.6,
    },
    status: 'active',
    coordinates: [115.1167, -8.45],
  },
  {
    id: 'NTB Livestock Group',
    name: 'NTB Livestock Group',
    region: 'Dompu, NTB',
    province: 'West Nusa Tenggara',
    cattle: 210,
    monthlyFeedTon: {
      '2025-01': 15.8, '2025-02': 17.2, '2025-03': 19.4, '2025-04': 21.2, '2025-05': 23.1, '2025-06': 24.8,
      '2025-07': 26.4, '2025-08': 27.9, '2025-09': 29.4, '2025-10': 30.8, '2025-11': 32.1, '2025-12': 33.5,
      '2026-01': 34.7, '2026-02': 35.6, '2026-03': 36.6, '2026-04': 37.7, '2026-05': 38.7, '2026-06': 39.7, '2026-07': 40.7,
    },
    status: 'active',
    coordinates: [118.4667, -8.5333],
  },
  {
    id: 'Sulawesi Hijau Farm',
    name: 'Sulawesi Hijau Farm',
    region: 'Bone, South Sulawesi',
    province: 'South Sulawesi',
    cattle: 150,
    monthlyFeedTon: {
      '2025-07': 7.6, '2025-08': 9.8, '2025-09': 11.6, '2025-10': 13.5, '2025-11': 15.6, '2025-12': 17.6,
      '2026-01': 19.5, '2026-02': 21.4, '2026-03': 23.3, '2026-04': 25.2, '2026-05': 27.0, '2026-06': 28.8, '2026-07': 30.6,
    },
    status: 'onboarding',
    coordinates: [120.15, -4.8],
  },
  {
    id: 'Kalimantan Feed Corp',
    name: 'Kalimantan Feed Corp',
    region: 'Kotawaringin, Central Kalimantan',
    province: 'Central Kalimantan',
    cattle: 75,
    monthlyFeedTon: {
      '2025-10': 4.2, '2025-11': 5.7, '2025-12': 7.0, '2026-01': 8.4, '2026-02': 9.7, '2026-03': 11.0, '2026-04': 12.3,
      '2026-05': 13.5, '2026-06': 14.7, '2026-07': 15.9,
    },
    status: 'onboarding',
    coordinates: [111.7333, -2.2],
  },
  {
    id: 'Sumatra Ternak Utama',
    name: 'Sumatra Ternak Utama',
    region: 'Deli Serdang, North Sumatra',
    province: 'North Sumatra',
    cattle: 130,
    monthlyFeedTon: {
      '2025-04': 8.4, '2025-05': 10.2, '2025-06': 11.9, '2025-07': 13.7, '2025-08': 15.4, '2025-09': 17.0,
      '2025-10': 18.6, '2025-11': 20.2, '2025-12': 21.8,
      '2026-01': 23.1, '2026-02': 24.3, '2026-03': 25.5, '2026-04': 26.7, '2026-05': 27.9, '2026-06': 29.0, '2026-07': 30.1,
    },
    status: 'active',
    coordinates: [98.7, 3.4333],
  },
  {
    id: 'NTT Ranchers Co-op',
    name: 'NTT Ranchers Co-op',
    region: 'Kupang, NTT',
    province: 'East Nusa Tenggara',
    cattle: 180,
    monthlyFeedTon: {
      '2025-09': 11.4, '2025-10': 13.8, '2025-11': 16.2, '2025-12': 18.4,
      '2026-01': 20.5, '2026-02': 22.5, '2026-03': 24.4, '2026-04': 26.3, '2026-05': 28.2, '2026-06': 30.0, '2026-07': 31.8,
    },
    status: 'active',
    coordinates: [123.5833, -10.1667],
  },
  {
    id: 'Pasundan Farm Group',
    name: 'Pasundan Farm Group',
    region: 'Bandung, West Java',
    province: 'West Java',
    cattle: 160,
    monthlyFeedTon: {
      '2025-02': 8.8, '2025-03': 11.4, '2025-04': 13.6, '2025-05': 16.2, '2025-06': 18.8,
      '2025-07': 21.0, '2025-08': 23.0, '2025-09': 25.0, '2025-10': 26.9, '2025-11': 28.6, '2025-12': 30.3,
      '2026-01': 31.7, '2026-02': 32.7, '2026-03': 33.8, '2026-04': 34.9, '2026-05': 36.0, '2026-06': 37.0, '2026-07': 38.0,
    },
    status: 'active',
    coordinates: [107.6191, -6.9175],
  },
];

const CATTLE: CattleRecord[] = [
  {
    id: 'HF-001', name: 'Brahman #1', breed: 'Brahman', partnerId: 'PT Jaya Makmur',
    weightKg: 450, intakeKgPerDay: 12, maxMethaneG: 250, maxSequestrationG: 70,
    history: [
      { month: '2025-01', methaneReductionG: 120, sequestrationG: 30, status: 'optimal' },
      { month: '2025-02', methaneReductionG: 140, sequestrationG: 35, status: 'optimal' },
      { month: '2025-03', methaneReductionG: 160, sequestrationG: 40, status: 'optimal' },
      { month: '2025-04', methaneReductionG: 175, sequestrationG: 44, status: 'optimal' },
      { month: '2025-05', methaneReductionG: 180, sequestrationG: 45, status: 'optimal' },
      { month: '2025-06', methaneReductionG: 180, sequestrationG: 45, status: 'optimal' },
    ],
  },
  {
    id: 'HF-002', name: 'Ongole #4', breed: 'Ongole', partnerId: 'CV Sejahtera Farm',
    weightKg: 480, intakeKgPerDay: 13, maxMethaneG: 250, maxSequestrationG: 70,
    history: [
      { month: '2025-01', methaneReductionG: 130, sequestrationG: 32, status: 'optimal' },
      { month: '2025-02', methaneReductionG: 150, sequestrationG: 37, status: 'optimal' },
      { month: '2025-03', methaneReductionG: 170, sequestrationG: 43, status: 'optimal' },
      { month: '2025-04', methaneReductionG: 185, sequestrationG: 46, status: 'optimal' },
      { month: '2025-05', methaneReductionG: 192, sequestrationG: 48, status: 'optimal' },
      { month: '2025-06', methaneReductionG: 195, sequestrationG: 48, status: 'optimal' },
    ],
  },
  {
    id: 'HF-003', name: 'Limousin #2', breed: 'Limousin', partnerId: 'Peternakan Maju Bersama',
    weightKg: 420, intakeKgPerDay: 11, maxMethaneG: 250, maxSequestrationG: 70,
    history: [
      { month: '2025-01', methaneReductionG: 110, sequestrationG: 27, status: 'optimal' },
      { month: '2025-02', methaneReductionG: 130, sequestrationG: 33, status: 'optimal' },
      { month: '2025-03', methaneReductionG: 145, sequestrationG: 36, status: 'optimal' },
      { month: '2025-04', methaneReductionG: 158, sequestrationG: 39, status: 'optimal' },
      { month: '2025-05', methaneReductionG: 163, sequestrationG: 41, status: 'optimal' },
      { month: '2025-06', methaneReductionG: 165, sequestrationG: 41, status: 'optimal' },
    ],
  },
  {
    id: 'HF-004', name: 'Simental #7', breed: 'Simental', partnerId: 'Bali Cattle Co.',
    weightKg: 460, intakeKgPerDay: 12, maxMethaneG: 250, maxSequestrationG: 70,
    history: [
      { month: '2025-01', methaneReductionG: 0, sequestrationG: 0, status: 'transition' },
      { month: '2025-02', methaneReductionG: 40, sequestrationG: 10, status: 'transition' },
      { month: '2025-03', methaneReductionG: 90, sequestrationG: 22, status: 'transition' },
      { month: '2025-04', methaneReductionG: 130, sequestrationG: 32, status: 'transition' },
      { month: '2025-05', methaneReductionG: 155, sequestrationG: 38, status: 'transition' },
      { month: '2025-06', methaneReductionG: 165, sequestrationG: 41, status: 'optimal' },
    ],
  },
  {
    id: 'HF-005', name: 'Brahman #3', breed: 'Brahman', partnerId: 'NTB Livestock Group',
    weightKg: 495, intakeKgPerDay: 14, maxMethaneG: 250, maxSequestrationG: 70,
    history: [
      { month: '2025-01', methaneReductionG: 140, sequestrationG: 35, status: 'optimal' },
      { month: '2025-02', methaneReductionG: 160, sequestrationG: 40, status: 'optimal' },
      { month: '2025-03', methaneReductionG: 180, sequestrationG: 45, status: 'optimal' },
      { month: '2025-04', methaneReductionG: 195, sequestrationG: 49, status: 'optimal' },
      { month: '2025-05', methaneReductionG: 205, sequestrationG: 51, status: 'optimal' },
      { month: '2025-06', methaneReductionG: 210, sequestrationG: 52, status: 'optimal' },
    ],
  },
  {
    id: 'HF-006', name: 'Ongole #9', breed: 'Ongole', partnerId: 'Pasundan Farm Group',
    weightKg: 430, intakeKgPerDay: 11, maxMethaneG: 250, maxSequestrationG: 70,
    history: [
      { month: '2025-01', methaneReductionG: 115, sequestrationG: 28, status: 'optimal' },
      { month: '2025-02', methaneReductionG: 135, sequestrationG: 33, status: 'optimal' },
      { month: '2025-03', methaneReductionG: 150, sequestrationG: 37, status: 'optimal' },
      { month: '2025-04', methaneReductionG: 162, sequestrationG: 40, status: 'optimal' },
      { month: '2025-05', methaneReductionG: 168, sequestrationG: 42, status: 'optimal' },
      { month: '2025-06', methaneReductionG: 170, sequestrationG: 42, status: 'optimal' },
    ],
  },
];

const FEED_BASELINE_GRAMS_PER_TON = 4000;

function aggregateMonthly(): MonthlyEntry[] {
  const monthsSet = new Set<string>();
  PARTNERS.forEach((p) => Object.keys(p.monthlyFeedTon).forEach((m) => monthsSet.add(m)));
  const months = Array.from(monthsSet).sort();

  return months.map((month) => {
    const feedTon = PARTNERS.reduce(
      (sum, p) => sum + (p.monthlyFeedTon[month] ?? 0),
      0,
    );
    const baselineG = feedTon * FEED_BASELINE_GRAMS_PER_TON;

    const ratio = feedTon <= 0 ? 0 : 0.78 - (months.indexOf(month) / 600);
    const reductionFactor = Math.max(0.4, Math.min(0.95, ratio));
    const actualG = +(baselineG * reductionFactor).toFixed(2);
    const savedG = +(baselineG - actualG).toFixed(2);

    const co2eTon = (savedG / 1_000_000);
    const creditsIssued = Math.floor(co2eTon * 0.7);
    const creditsPending = Math.max(0, Math.ceil(co2eTon * 0.2));

    const labelDate = new Date(`${month}-01T00:00:00Z`);
    const monthShort = labelDate.toLocaleString('en', { month: 'short' });
    const yearShort = labelDate.getUTCFullYear().toString().slice(-2);

    return {
      month,
      label: `${monthShort} '${yearShort}`,
      feedTon: +feedTon.toFixed(1),
      baselineG: +baselineG.toFixed(0),
      actualG,
      savedG,
      creditsIssued,
      creditsPending,
    };
  });
}

export const MONTHLY = aggregateMonthly();

export function getMonthRange(fromMonth: string, toMonth: string): MonthlyEntry[] {
  return MONTHLY.filter((m) => m.month >= fromMonth && m.month <= toMonth);
}

export const PARTNERS_DATA = PARTNERS;
export const CATTLE_DATA = CATTLE;

export const PIPELINE: PipelineStage[] = [
  {
    label: 'Measured',
    desc: 'CO₂e reduction calculated from feed distribution data (Verra VCS, EF = 0.36 Ton CO₂e / Ton feed).',
    value: '45.2 Ton',
    color: 'emerald',
  },
  {
    label: 'Verified',
    desc: 'Audited and certified by third-party verifier.',
    value: '32 Credits',
    color: 'blue',
  },
  {
    label: 'Pending',
    desc: 'Awaiting audit for current reporting cycle.',
    value: '9 Credits',
    color: 'amber',
  },
  {
    label: 'Sold / Retired',
    desc: 'Credits transacted on voluntary carbon market.',
    value: '18 Credits',
    color: 'violet',
  },
];

export const VERIFICATION: VerificationStep[] = [
  { name: 'Data Collection', date: 'Jan – Jun 2025', status: 'complete' },
  { name: 'Report Compilation', date: '1 Jul 2025', status: 'complete' },
  { name: 'Third-Party Audit', date: 'Est. 15 Jul 2025', status: 'current' },
  { name: 'Credit Issuance', date: 'Est. 1 Aug 2025', status: 'upcoming' },
];

export const STATIC_OVERVIEW = {
  totalImpact: '45.2 Ton CO₂e',
  methodology: 'Verra VCS',
};

const DRY_TO_FRESH = 0.25;
const PROCESSING_YIELD = 0.62;

const CULTIVATION_PLOTS: import('./types').CultivationPlot[] = [
  { id: 'PLOT-JM-I01', partnerId: 'PT Jaya Makmur', species: 'Indigofera', hectares: 12.0, plantedAt: '2024-10', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-JM-P01', partnerId: 'PT Jaya Makmur', species: 'Pakcoy', hectares: 2.5, plantedAt: '2024-10', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },
  { id: 'PLOT-JM-I02', partnerId: 'PT Jaya Makmur', species: 'Indigofera', hectares: 8.5, plantedAt: '2024-11', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-JM-P02', partnerId: 'PT Jaya Makmur', species: 'Pakcoy', hectares: 1.5, plantedAt: '2024-11', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },

  { id: 'PLOT-SF-I01', partnerId: 'CV Sejahtera Farm', species: 'Indigofera', hectares: 9.0, plantedAt: '2024-10', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-SF-P01', partnerId: 'CV Sejahtera Farm', species: 'Pakcoy', hectares: 1.8, plantedAt: '2024-10', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },
  { id: 'PLOT-SF-I02', partnerId: 'CV Sejahtera Farm', species: 'Indigofera', hectares: 7.0, plantedAt: '2024-11', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },

  { id: 'PLOT-MB-I01', partnerId: 'Peternakan Maju Bersama', species: 'Indigofera', hectares: 18.0, plantedAt: '2024-10', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-MB-P01', partnerId: 'Peternakan Maju Bersama', species: 'Pakcoy', hectares: 3.0, plantedAt: '2024-10', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },
  { id: 'PLOT-MB-I02', partnerId: 'Peternakan Maju Bersama', species: 'Indigofera', hectares: 12.0, plantedAt: '2024-11', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-MB-P02', partnerId: 'Peternakan Maju Bersama', species: 'Pakcoy', hectares: 2.0, plantedAt: '2024-11', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },

  { id: 'PLOT-BC-I01', partnerId: 'Bali Cattle Co.', species: 'Indigofera', hectares: 6.5, plantedAt: '2024-10', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-BC-P01', partnerId: 'Bali Cattle Co.', species: 'Pakcoy', hectares: 1.2, plantedAt: '2024-10', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },

  { id: 'PLOT-NTB-I01', partnerId: 'NTB Livestock Group', species: 'Indigofera', hectares: 11.0, plantedAt: '2024-10', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-NTB-P01', partnerId: 'NTB Livestock Group', species: 'Pakcoy', hectares: 2.2, plantedAt: '2024-10', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },
  { id: 'PLOT-NTB-I02', partnerId: 'NTB Livestock Group', species: 'Indigofera', hectares: 8.0, plantedAt: '2024-12', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },

  { id: 'PLOT-SH-I01', partnerId: 'Sulawesi Hijau Farm', species: 'Indigofera', hectares: 10.0, plantedAt: '2025-06', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-SH-P01', partnerId: 'Sulawesi Hijau Farm', species: 'Pakcoy', hectares: 2.0, plantedAt: '2025-06', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },

  { id: 'PLOT-ST-I01', partnerId: 'Sumatra Ternak Utama', species: 'Indigofera', hectares: 9.0, plantedAt: '2025-03', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-ST-P01', partnerId: 'Sumatra Ternak Utama', species: 'Pakcoy', hectares: 1.8, plantedAt: '2025-03', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },

  { id: 'PLOT-NTT-I01', partnerId: 'NTT Ranchers Co-op', species: 'Indigofera', hectares: 10.0, plantedAt: '2025-07', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-NTT-P01', partnerId: 'NTT Ranchers Co-op', species: 'Pakcoy', hectares: 2.0, plantedAt: '2025-07', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },

  { id: 'PLOT-PG-I01', partnerId: 'Pasundan Farm Group', species: 'Indigofera', hectares: 8.0, plantedAt: '2025-01', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
  { id: 'PLOT-PG-P01', partnerId: 'Pasundan Farm Group', species: 'Pakcoy', hectares: 1.5, plantedAt: '2025-01', cycleDays: 50, yieldTonPerHaPerCycle: 9.0, co2eTonPerHaPerYear: 2.4 },
  { id: 'PLOT-PG-I02', partnerId: 'Pasundan Farm Group', species: 'Indigofera', hectares: 6.0, plantedAt: '2025-02', cycleDays: 75, yieldTonPerHaPerCycle: 4.5, co2eTonPerHaPerYear: 6.4 },
];

const ALL_MONTHS = [
  '2025-01','2025-02','2025-03','2025-04','2025-05','2025-06',
  '2025-07','2025-08','2025-09','2025-10','2025-11','2025-12',
  '2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07',
];

function buildHarvests(): import('./types').HarvestRecord[] {
  const records: import('./types').HarvestRecord[] = [];
  for (const plot of CULTIVATION_PLOTS) {
    const partner = PARTNERS.find((p) => p.id === plot.partnerId);
    if (!partner) continue;
    for (const month of ALL_MONTHS) {
      if (month < plot.plantedAt) continue;
      const daysSincePlant = Math.floor(
        (new Date(`${month}-01`).getTime() - new Date(`${plot.plantedAt}-01`).getTime()) / (1000 * 60 * 60 * 24),
      );
      const cyclesElapsed = Math.floor(daysSincePlant / plot.cycleDays);
      if (cyclesElapsed <= 0) continue;
      const freshTon = +(plot.hectares * plot.yieldTonPerHaPerCycle).toFixed(2);
      const dryTon = +(freshTon * DRY_TO_FRESH).toFixed(2);
      records.push({
        plotId: plot.id,
        partnerId: plot.partnerId,
        month,
        species: plot.species,
        freshBiomassTon: freshTon,
        dryBiomassTon: dryTon,
      });
    }
  }
  return records;
}

function buildProcessing(): import('./types').ProcessingBatch[] {
  const records: import('./types').ProcessingBatch[] = [];
  for (const partner of PARTNERS) {
    for (const month of ALL_MONTHS) {
      const feedTon = partner.monthlyFeedTon[month];
      if (!feedTon) continue;
      const pelletKg = +(feedTon * 1000);
      const dryTonNeeded = +(pelletKg / PROCESSING_YIELD / 1000).toFixed(3);
      const freshTonNeeded = +(dryTonNeeded / DRY_TO_FRESH).toFixed(3);
      const wasteKg = +(freshTonNeeded * 1000 - dryTonNeeded * 1000 - pelletKg);
      records.push({
        month,
        partnerId: partner.id,
        dryBiomassInTon: dryTonNeeded,
        pelletOutKg: pelletKg,
        wasteKg: Math.max(0, wasteKg),
      });
    }
  }
  return records;
}

export const CULTIVATION_DATA = CULTIVATION_PLOTS;
export const HARVESTS = buildHarvests();
export const PROCESSING = buildProcessing();
