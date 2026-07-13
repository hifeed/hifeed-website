import type { ReportMeta } from './types';

export function buildReportMeta(period: string, periodLabel: string): ReportMeta {
  return {
    period,
    periodLabel,
    generatedAt: new Date().toISOString(),
    version: 'prototype-v0.1',
    generatedBy: 'HiFeed AI MRV Pipeline (pre-generated, prototype)',
    methodology: 'Verra VCS · GWP₁₀₀ = 28 · Emission Factor 0.36 Ton CO₂e / Ton feed',
  };
}
