export type Locale = 'en' | 'id';

export interface FarmPartner {
  id: string;
  name: string;
  region: string;
  province: string;
  cattle: number;
  monthlyFeedTon: Record<string, number>;
  status: 'active' | 'onboarding';
  coordinates: [number, number];
}

export interface CattleRecord {
  id: string;
  name: string;
  breed: string;
  partnerId: string;
  weightKg: number;
  intakeKgPerDay: number;
  maxMethaneG: number;
  maxSequestrationG: number;
  history: Array<{
    month: string;
    methaneReductionG: number;
    sequestrationG: number;
    status: 'optimal' | 'transition';
  }>;
}

export interface MonthlyEntry {
  month: string;
  label: string;
  feedTon: number;
  baselineG: number;
  actualG: number;
  savedG: number;
  creditsIssued: number;
  creditsPending: number;
}

export interface PipelineStage {
  label: string;
  desc: string;
  value: string;
  color: 'emerald' | 'blue' | 'amber' | 'violet';
}

export interface VerificationStep {
  name: string;
  date: string;
  status: 'complete' | 'current' | 'upcoming';
}

export interface ReportMeta {
  period: string;
  periodLabel: string;
  generatedAt: string;
  version: string;
  generatedBy: string;
  methodology: string;
}

export type PlantSpecies = 'Indigofera' | 'Pakcoy';

export interface CultivationPlot {
  id: string;
  partnerId: string;
  species: PlantSpecies;
  hectares: number;
  plantedAt: string;
  cycleDays: number;
  yieldTonPerHaPerCycle: number;
  co2eTonPerHaPerYear: number;
}

export interface HarvestRecord {
  plotId: string;
  partnerId: string;
  month: string;
  species: PlantSpecies;
  freshBiomassTon: number;
  dryBiomassTon: number;
}

export interface ProcessingBatch {
  month: string;
  partnerId: string;
  dryBiomassInTon: number;
  pelletOutKg: number;
  wasteKg: number;
}

export interface SupplyChainData {
  totalHectares: number;
  indigoHectares: number;
  pakcoyHectares: number;
  totalFreshBiomassTon: number;
  totalDryBiomassTon: number;
  totalPelletKg: number;
  totalDistributionTon: number;
  totalConsumptionKg: number;
  cultivationCO2eTon: number;
  entericCO2eTon: number;
  sequestrationCO2eTon: number;
  totalCO2eTon: number;
  plotBreakdown: Array<{
    partnerId: string;
    partnerName: string;
    indigoHa: number;
    pakcoyHa: number;
    totalHa: number;
    harvestsTon: number;
    pelletKg: number;
    co2eTon: number;
  }>;
}
