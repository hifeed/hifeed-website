import { MONTHLY, PARTNERS_DATA, CATTLE_DATA, getMonthRange, CULTIVATION_DATA, HARVESTS, PROCESSING } from './data';
import type { FarmPartner, PlantSpecies, SupplyChainData } from './types';

export const EMISSION_FACTOR_TON_PER_TON = 0.36;
export const GWP_100 = 28;
export const SEQUESTRATION_RATIO = 0.155;
export const DRY_TO_FRESH = 0.25;
export const PROCESSING_YIELD = 0.62;

export function feedToCO2e(feedTon: number): number {
  return +(feedTon * EMISSION_FACTOR_TON_PER_TON).toFixed(3);
}

export function entericMethaneCreditFromG(gramReduced: number): number {
  return +((gramReduced / 1_000_000) * GWP_100).toFixed(4);
}

export function sequestrationFromFeed(feedTon: number): number {
  return +(feedTon * SEQUESTRATION_RATIO).toFixed(3);
}

export function totalCO2eFromFeed(feedTon: number): number {
  return +(feedToCO2e(feedTon) + sequestrationFromFeed(feedTon)).toFixed(3);
}

export function aggregateFeedForPeriod(
  fromMonth: string,
  toMonth: string,
): { feedTon: number; baseline: number; saved: number } {
  const range = getMonthRange(fromMonth, toMonth);
  const feedTon = range.reduce((s, m) => s + m.feedTon, 0);
  const baseline = range.reduce((s, m) => s + m.baselineG, 0);
  const saved = range.reduce((s, m) => s + m.savedG, 0);
  return {
    feedTon: +feedTon.toFixed(1),
    baseline,
    saved,
  };
}

export function aggregatePartnersForPeriod(
  fromMonth: string,
  toMonth: string,
): Array<FarmPartner & { periodFeedTon: number; periodCO2eTon: number }> {
  return PARTNERS_DATA.map((p) => {
    const periodFeedTon = +Object.entries(p.monthlyFeedTon)
      .filter(([m]) => m >= fromMonth && m <= toMonth)
      .reduce((s, [, v]) => s + v, 0)
      .toFixed(2);
    const periodCO2eTon = feedToCO2e(periodFeedTon);
    return { ...p, periodFeedTon, periodCO2eTon };
  });
}

export function aggregateCattleForPeriod(
  fromMonth: string,
  toMonth: string,
): Array<{
  cattle: (typeof CATTLE_DATA)[number];
  methaneG: number;
  seqG: number;
  entericCO2eTon: number;
  status: 'optimal' | 'transition' | 'pending';
}> {
  return CATTLE_DATA.map((c) => {
    const slice = c.history.filter((h) => h.month >= fromMonth && h.month <= toMonth);
    if (slice.length === 0) {
      return {
        cattle: c,
        methaneG: 0,
        seqG: 0,
        entericCO2eTon: 0,
        status: 'pending' as const,
      };
    }
    const methaneG = slice.reduce((s, h) => s + h.methaneReductionG, 0);
    const seqG = slice.reduce((s, h) => s + h.sequestrationG, 0);
    const entericCO2eTon = entericMethaneCreditFromG(methaneG);
    const status = slice.some((h) => h.status === 'transition') ? 'transition' : 'optimal';
    return { cattle: c, methaneG, seqG, entericCO2eTon, status };
  });
}

export function aggregatePipelineForPeriod(fromMonth: string, toMonth: string) {
  const range = getMonthRange(fromMonth, toMonth);
  const cumulativeCO2eTon = range.reduce((s, m) => s + m.savedG / 1_000_000, 0);
  const totalFeedTon = range.reduce((s, m) => s + m.feedTon, 0);

  const measuredTon = +cumulativeCO2eTon.toFixed(2);

  const verified = range.reduce((s, m) => s + m.creditsIssued, 0);
  const pending = range.reduce((s, m) => s + m.creditsPending, 0);

  const cumulativeCredits = verified + pending;
  const soldRate = 0.56;
  const sold = Math.floor(cumulativeCredits * soldRate);

  return {
    measuredTon,
    verified,
    pending,
    sold,
    cumulativeCO2eTon,
    totalFeedTon: +totalFeedTon.toFixed(1),
  };
}

export function latestMonthly() {
  return MONTHLY[MONTHLY.length - 1];
}

export function activeHectaresForPeriod(
  fromMonth: string,
  toMonth: string,
  species?: PlantSpecies,
): number {
  return CULTIVATION_DATA
    .filter((p) => p.plantedAt <= toMonth && (species ? p.species === species : true))
    .reduce((s, p) => s + p.hectares, 0);
}

export function harvestYieldForPeriod(
  fromMonth: string,
  toMonth: string,
  species?: PlantSpecies,
): number {
  return HARVESTS
    .filter(
      (h) => h.month >= fromMonth && h.month <= toMonth && (species ? h.species === species : true),
    )
    .reduce((s, h) => s + h.freshBiomassTon, 0);
}

export function dryBiomassForPeriod(fromMonth: string, toMonth: string): number {
  return HARVESTS
    .filter((h) => h.month >= fromMonth && h.month <= toMonth)
    .reduce((s, h) => s + h.dryBiomassTon, 0);
}

export function processingYieldForPeriod(fromMonth: string, toMonth: string): number {
  return PROCESSING
    .filter((b) => b.month >= fromMonth && b.month <= toMonth)
    .reduce((s, b) => s + b.pelletOutKg, 0);
}

export function cultivationCO2eForPeriod(fromMonth: string, toMonth: string): number {
  const monthsElapsed = (() => {
    const from = new Date(`${fromMonth}-01`);
    const to = new Date(`${toMonth}-01`);
    return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
  })();
  return CULTIVATION_DATA
    .filter((p) => p.plantedAt <= toMonth)
    .reduce((s, p) => s + p.hectares * p.co2eTonPerHaPerYear * (monthsElapsed / 12), 0);
}

export function pelletConsumptionForPeriod(
  fromMonth: string,
  toMonth: string,
): number {
  const range = getMonthRange(fromMonth, toMonth);
  const daysInPeriod = range.reduce((s, m) => {
    const [year, month] = m.month.split('-').map(Number);
    return s + new Date(year, month, 0).getDate();
  }, 0);
  const totalCattle = PARTNERS_DATA
    .filter((p) => p.status === 'active')
    .reduce((s, p) => s + p.cattle, 0);
  const avgIntake = 12;
  return totalCattle * avgIntake * daysInPeriod;
}

export function buildSupplyChain(fromMonth: string, toMonth: string): SupplyChainData {
  const indigoHa = activeHectaresForPeriod(fromMonth, toMonth, 'Indigofera');
  const pakcoyHa = activeHectaresForPeriod(fromMonth, toMonth, 'Pakcoy');
  const totalFreshBiomassTon = harvestYieldForPeriod(fromMonth, toMonth);
  const totalDryBiomassTon = dryBiomassForPeriod(fromMonth, toMonth);
  const totalPelletKg = processingYieldForPeriod(fromMonth, toMonth);
  const totalDistributionTon = +(
    PARTNERS_DATA.reduce(
      (s, p) => s + Object.entries(p.monthlyFeedTon)
        .filter(([m]) => m >= fromMonth && m <= toMonth)
        .reduce((ss, [, v]) => ss + v, 0),
      0,
    )
  ).toFixed(1);
  const totalConsumptionKg = pelletConsumptionForPeriod(fromMonth, toMonth);
  const cultivationCO2eTon = cultivationCO2eForPeriod(fromMonth, toMonth);

  const cattleRows = aggregateCattleForPeriod(fromMonth, toMonth);
  const entericCO2eTon = cattleRows.reduce((s, c) => s + c.entericCO2eTon, 0);
  const feed = aggregateFeedForPeriod(fromMonth, toMonth);
  const sequestrationCO2eTon = sequestrationFromFeed(feed.feedTon);

  const partnerIds = [...new Set(PARTNERS_DATA.map((p) => p.id))];
  const plotBreakdown = partnerIds
    .map((pid) => {
      const partner = PARTNERS_DATA.find((p) => p.id === pid)!;
      const plots = CULTIVATION_DATA.filter((p) => p.partnerId === pid);
      const indigo = plots.filter((p) => p.species === 'Indigofera').reduce((s, p) => s + p.hectares, 0);
      const pakcoy = plots.filter((p) => p.species === 'Pakcoy').reduce((s, p) => s + p.hectares, 0);
      const harvestsTon = HARVESTS
        .filter((h) => h.partnerId === pid && h.month >= fromMonth && h.month <= toMonth)
        .reduce((s, h) => s + h.freshBiomassTon, 0);
      const pelletKg = PROCESSING
        .filter((b) => b.partnerId === pid && b.month >= fromMonth && b.month <= toMonth)
        .reduce((s, b) => s + b.pelletOutKg, 0);
      const co2eTon = plots
        .filter((p) => p.plantedAt <= toMonth)
        .reduce((s, p) => {
          const monthsElapsed = (() => {
            const from = new Date(`${fromMonth}-01`);
            const to2 = new Date(`${toMonth}-01`);
            return (to2.getFullYear() - from.getFullYear()) * 12 + (to2.getMonth() - from.getMonth()) + 1;
          })();
          return s + p.hectares * p.co2eTonPerHaPerYear * (monthsElapsed / 12);
        }, 0);
      return {
        partnerId: pid,
        partnerName: partner.name,
        indigoHa: +indigo.toFixed(1),
        pakcoyHa: +pakcoy.toFixed(1),
        totalHa: +(indigo + pakcoy).toFixed(1),
        harvestsTon: +harvestsTon.toFixed(1),
        pelletKg: Math.round(pelletKg),
        co2eTon: +co2eTon.toFixed(2),
      };
    })
    .filter((d) => d.totalHa > 0);

  return {
    totalHectares: +(indigoHa + pakcoyHa).toFixed(1),
    indigoHectares: +indigoHa.toFixed(1),
    pakcoyHectares: +pakcoyHa.toFixed(1),
    totalFreshBiomassTon: +totalFreshBiomassTon.toFixed(1),
    totalDryBiomassTon: +totalDryBiomassTon.toFixed(1),
    totalPelletKg: Math.round(totalPelletKg),
    totalDistributionTon,
    totalConsumptionKg: Math.round(totalConsumptionKg),
    cultivationCO2eTon: +cultivationCO2eTon.toFixed(2),
    entericCO2eTon: +entericCO2eTon.toFixed(2),
    sequestrationCO2eTon: +sequestrationCO2eTon.toFixed(2),
    totalCO2eTon: +(cultivationCO2eTon + entericCO2eTon + sequestrationCO2eTon).toFixed(2),
    plotBreakdown,
  };
}
