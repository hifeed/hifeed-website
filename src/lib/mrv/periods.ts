export type PeriodKey = 'Q1-2025' | 'Q2-2025' | 'Q3-2025' | 'Q4-2025' | 'Q1-2026' | 'YEAR-2025' | 'YTD';

export interface PeriodDefinition {
  key: PeriodKey;
  label: string;
  fromMonth: string;
  toMonth: string;
  description: string;
}

export const PERIODS: PeriodDefinition[] = [
  {
    key: 'Q1-2025',
    label: 'Q1 2025',
    fromMonth: '2025-01',
    toMonth: '2025-03',
    description: 'Jan – Mar 2025 (Q1)',
  },
  {
    key: 'Q2-2025',
    label: 'Q2 2025',
    fromMonth: '2025-04',
    toMonth: '2025-06',
    description: 'Apr – Jun 2025 (Q2)',
  },
  {
    key: 'Q3-2025',
    label: 'Q3 2025',
    fromMonth: '2025-07',
    toMonth: '2025-09',
    description: 'Jul – Sep 2025 (Q3)',
  },
  {
    key: 'Q4-2025',
    label: 'Q4 2025',
    fromMonth: '2025-10',
    toMonth: '2025-12',
    description: 'Oct – Dec 2025 (Q4)',
  },
  {
    key: 'Q1-2026',
    label: 'Q1 2026',
    fromMonth: '2026-01',
    toMonth: '2026-03',
    description: 'Jan – Mar 2026 (Q1)',
  },
  {
    key: 'YEAR-2025',
    label: 'Full Year 2025',
    fromMonth: '2025-01',
    toMonth: '2025-12',
    description: 'Jan – Dec 2025',
  },
  {
    key: 'YTD',
    label: 'YTD 2026',
    fromMonth: '2026-01',
    toMonth: '2026-07',
    description: 'Jan – Jul 2026 (current YTD)',
  },
];

export const DEFAULT_PERIOD: PeriodKey = 'Q2-2025';

export function findPeriod(key: PeriodKey): PeriodDefinition {
  return PERIODS.find((p) => p.key === key) ?? PERIODS[1];
}
