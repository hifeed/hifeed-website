'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { computeCarbon, DEFAULT_CARBON, type CarbonDataset, type CarbonModel } from '@/lib/mrv/carbon';

const CarbonContext = createContext<CarbonModel>(DEFAULT_CARBON);

// Data diambil di server (app/mrv/layout.tsx, dari Sanity atau workbook); perhitungan di sini.
export function CarbonProvider({ data, children }: { data: CarbonDataset; children: React.ReactNode }) {
  const model = useMemo(() => computeCarbon(data), [data]);
  return <CarbonContext.Provider value={model}>{children}</CarbonContext.Provider>;
}

export function useCarbon(): CarbonModel {
  return useContext(CarbonContext);
}
