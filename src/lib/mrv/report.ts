// Data laporan per periode — dipakai halaman /mrv/report dan PDF agar angkanya identik.
import {
  FEED_PRODUCTS,
  formatMonthRange,
  monthLabel,
  type CarbonModel,
  type ReportPeriod,
} from './carbon';

export function buildReportData(model: CarbonModel, period: ReportPeriod) {
  const { fromMonth, toMonth } = period;
  const inPeriod = (month: string) => month >= fromMonth && month <= toMonth;

  const totals = model.totalsBetween(fromMonth, toMonth);
  const cumulativeToDate = model.totals(toMonth);
  const monthly = model.monthly.filter((m) => inPeriod(m.month));

  const feedRows = model.data.feedDistribution
    .filter((row) => inPeriod(row.month) && FEED_PRODUCTS.some((p) => (row[p] ?? 0) > 0))
    .map((row) => ({
      ...row,
      label: monthLabel(row.month),
      cattleDays: model.cattleDays(row),
      reductionT: model.entericReductionT(row),
    }));
  const feedTotalsKg = Object.fromEntries(
    FEED_PRODUCTS.map((p) => [p, feedRows.reduce((s, r) => s + (r[p] ?? 0), 0)]),
  ) as Record<(typeof FEED_PRODUCTS)[number], number>;

  const stationsById = new Map(model.data.carbonBankStations.map((st) => [st.id, st]));
  const carbonBankRows = model.data.carbonBankStations.flatMap((station) => {
    const sorted = [...station.measurements].sort((a, b) => a.month.localeCompare(b.month));
    return sorted.slice(1).flatMap((m, i) => {
      if (!inPeriod(m.month)) return [];
      const prev = sorted[i];
      return [{
        stationId: station.id,
        stationName: stationsById.get(station.id)?.name ?? station.id,
        areaHa: station.areaHa,
        fromMonth: prev.month,
        toMonth: m.month,
        fromStockT: prev.stockT,
        toStockT: m.stockT,
        seqT: m.stockT - prev.stockT,
        note: m.note,
      }];
    });
  });

  const offtakeRecognised = inPeriod(model.data.rawMaterial.recognitionMonth) && model.offtakeKg > 0;

  return {
    period,
    rangeLabel: formatMonthRange(fromMonth, toMonth),
    totals,
    cumulativeToDate,
    monthly,
    feedRows,
    feedTotalsKg,
    carbonBankRows,
    offtake: offtakeRecognised
      ? {
          recognitionMonth: model.data.rawMaterial.recognitionMonth,
          procurement: model.data.rawMaterial.procurement,
          kg: model.offtakeKg,
          seqT: model.offtakeSequestrationT(model.offtakeKg),
        }
      : null,
  };
}

export type ReportData = ReturnType<typeof buildReportData>;

export const fmtT = (v: number, digits = 2) =>
  v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const fmtInt = (v: number) => Math.round(v).toLocaleString('en-US');
export const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);
