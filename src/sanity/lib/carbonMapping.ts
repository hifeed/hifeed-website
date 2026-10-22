// Konversi antara CarbonDataset (src/lib/mrv/carbon.ts) dan dokumen Sanity "carbonAccounting".
// Tanpa import runtime agar bisa dipakai script Node (seed).
import type { CarbonDataset, FeedDistribution } from '../../lib/mrv/carbon';

type Doc = Record<string, unknown>;

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
const numOr = (v: unknown, fallback: number) => (isNum(v) ? v : fallback);
const arr = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);
const obj = (v: unknown): Doc => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Doc) : {});

/** Dokumen Sanity → CarbonDataset; bagian yang kosong memakai `base` (data workbook). */
export function carbonFromSanity(doc: Doc | null | undefined, base: CarbonDataset): CarbonDataset {
  if (!doc) return base;
  const ep = obj(doc.entericParams);
  const rp = obj(doc.rawMaterialParams);
  const cs = obj(doc.creditStatus);

  const feed = arr(doc.feedDistribution)
    .filter((row) => str(row.month))
    .map((row) => {
      const entry: FeedDistribution = { month: str(row.month)! };
      if (isNum(row.indigofera)) entry.indigofera = row.indigofera;
      if (isNum(row.greenConcentrate)) entry.greenConcentrate = row.greenConcentrate;
      if (isNum(row.completeFeedPellets)) entry.completeFeedPellets = row.completeFeedPellets;
      return entry;
    });

  const procurement = arr(doc.offtakeProcurement)
    .filter((row) => isNum(row.kg))
    .map((row) => ({ periodLabel: str(row.periodLabel) ?? '', kg: row.kg as number }));

  const stations = arr(doc.carbonBankStations)
    .filter((st) => str(st.code))
    .map((st) => ({
      id: str(st.code)!,
      name: str(st.name) ?? str(st.code)!,
      areaHa: numOr(st.areaHa, 0),
      description: str(st.description) ?? '',
      measurements: arr(st.measurements)
        .filter((m) => str(m.month) && isNum(m.stockT))
        .map((m) => ({ month: str(m.month)!, stockT: m.stockT as number, note: str(m.note) ?? '' })),
    }));

  const credit = (v: unknown) => (isNum(v) ? v : null);

  return {
    source: { label: str(doc.sourceLabel) ?? base.source.label, updated: str(doc.updatedLabel) ?? base.source.updated },
    vcmPriceUsdPerT: numOr(doc.vcmPriceUsdPerT, base.vcmPriceUsdPerT),
    enteric: {
      bodyWeightKg: numOr(ep.bodyWeightKg, base.enteric.bodyWeightKg),
      dmiFractionOfBw: {
        indigofera: numOr(ep.dmiIndigofera, base.enteric.dmiFractionOfBw.indigofera),
        greenConcentrate: numOr(ep.dmiGreenConcentrate, base.enteric.dmiFractionOfBw.greenConcentrate),
        completeFeedPellets: numOr(ep.dmiCompleteFeedPellets, base.enteric.dmiFractionOfBw.completeFeedPellets),
      },
      baselineEfTPerCattleYear: numOr(ep.baselineEfTPerCattleYear, base.enteric.baselineEfTPerCattleYear),
      projectEfTPerCattleYear: numOr(ep.projectEfTPerCattleYear, base.enteric.projectEfTPerCattleYear),
    },
    feedDistribution: feed.length ? feed.sort((a, b) => a.month.localeCompare(b.month)) : base.feedDistribution,
    rawMaterial: {
      freshYieldTPerHarvest: numOr(rp.freshYieldTPerHarvest, base.rawMaterial.freshYieldTPerHarvest),
      harvestsPerYear: numOr(rp.harvestsPerYear, base.rawMaterial.harvestsPerYear),
      dryMatterFraction: numOr(rp.dryMatterFraction, base.rawMaterial.dryMatterFraction),
      dryingSpoilageFraction: numOr(rp.dryingSpoilageFraction, base.rawMaterial.dryingSpoilageFraction),
      plantationSeqTPerHaYear: numOr(rp.plantationSeqTPerHaYear, base.rawMaterial.plantationSeqTPerHaYear),
      procurement: procurement.length ? procurement : base.rawMaterial.procurement,
      recognitionMonth: str(doc.offtakeRecognitionMonth) ?? base.rawMaterial.recognitionMonth,
    },
    carbonBankStations: stations.length ? stations : base.carbonBankStations,
    creditStatus: { verifiedT: credit(cs.verifiedT), pendingT: credit(cs.pendingT), retiredT: credit(cs.retiredT) },
  };
}

/** CarbonDataset → field dokumen Sanity (untuk seed). */
export function carbonToSanity(data: CarbonDataset): Doc {
  const key = (prefix: string, i: number) => `${prefix}${i}`;
  return {
    sourceLabel: data.source.label,
    updatedLabel: data.source.updated,
    vcmPriceUsdPerT: data.vcmPriceUsdPerT,
    entericParams: {
      bodyWeightKg: data.enteric.bodyWeightKg,
      dmiIndigofera: data.enteric.dmiFractionOfBw.indigofera,
      dmiGreenConcentrate: data.enteric.dmiFractionOfBw.greenConcentrate,
      dmiCompleteFeedPellets: data.enteric.dmiFractionOfBw.completeFeedPellets,
      baselineEfTPerCattleYear: data.enteric.baselineEfTPerCattleYear,
      projectEfTPerCattleYear: data.enteric.projectEfTPerCattleYear,
    },
    feedDistribution: data.feedDistribution.map((row, i) => ({ _key: key('m', i), _type: 'feedMonth', ...row })),
    rawMaterialParams: {
      freshYieldTPerHarvest: data.rawMaterial.freshYieldTPerHarvest,
      harvestsPerYear: data.rawMaterial.harvestsPerYear,
      dryMatterFraction: data.rawMaterial.dryMatterFraction,
      dryingSpoilageFraction: data.rawMaterial.dryingSpoilageFraction,
      plantationSeqTPerHaYear: data.rawMaterial.plantationSeqTPerHaYear,
    },
    offtakeProcurement: data.rawMaterial.procurement.map((p, i) => ({ _key: key('o', i), _type: 'offtakeEntry', ...p })),
    offtakeRecognitionMonth: data.rawMaterial.recognitionMonth,
    carbonBankStations: data.carbonBankStations.map((st, i) => ({
      _key: key('s', i),
      _type: 'carbonBankStation',
      code: st.id,
      name: st.name,
      areaHa: st.areaHa,
      description: st.description,
      measurements: st.measurements.map((m, j) => ({ _key: key(`s${i}m`, j), _type: 'stockMeasurement', ...m })),
    })),
    // Status kredit belum ada di workbook → field tidak diisi.
  };
}
