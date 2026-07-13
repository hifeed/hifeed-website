'use client';

import React, { useState } from 'react';
import PeriodSelector from '@/components/mrv/report/PeriodSelector';
import ReportSummary from '@/components/mrv/report/ReportSummary';
import ExportReportButton from '@/components/mrv/report/ExportReportButton';
import { DEFAULT_PERIOD, type PeriodKey } from '@/lib/mrv/periods';
import { Printer } from 'lucide-react';

export default function ReportPageClient() {
  const [periodKey, setPeriodKey] = useState<PeriodKey>(DEFAULT_PERIOD);

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-teal-400/10 rounded-2xl" />

        <div className="relative px-6 lg:px-10 py-10">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
            <div>
              <p className="text-emerald-300/80 text-sm font-medium uppercase tracking-widest mb-2">
                Measurement · Reporting · Verification
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Extract Report
              </h1>
              <p className="mt-2 text-emerald-200/60 text-sm max-w-2xl">
                Investor-friendly MRV report. Switch the reporting period and download a PDF that walks through the methodology, formula, data, results, and audit trail of HiFeed&apos;s carbon credits.
              </p>
            </div>
            <div className="flex flex-col gap-3 xl:items-end">
              <PeriodSelector value={periodKey} onChange={setPeriodKey} />
              <div className="flex items-center gap-2">
                <ExportReportButton periodKey={periodKey} />
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-sm font-bold px-4 py-3 rounded-xl"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8">
        <ReportSummary periodKey={periodKey} />
      </div>
    </div>
  );
}
