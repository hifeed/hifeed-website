'use client';

import React from 'react';
import { PERIODS, type PeriodKey } from '@/lib/mrv/periods';

interface PeriodSelectorProps {
  value: PeriodKey;
  onChange: (key: PeriodKey) => void;
}

export default function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-1.5">
      {PERIODS.map((p) => {
        const isActive = p.key === value;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onChange(p.key)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
