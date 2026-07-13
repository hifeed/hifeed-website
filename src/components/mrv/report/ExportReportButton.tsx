'use client';

import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import type { PeriodKey } from '@/lib/mrv/periods';

interface ExportReportButtonProps {
  periodKey: PeriodKey;
}

export default function ExportReportButton({ periodKey }: ExportReportButtonProps) {
  const [loading, setLoading] = React.useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const [{ pdf }, { createReportDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./ReportPdfDocument'),
      ]);
      const doc = createReportDocument(periodKey);
      const instance = pdf(doc);
      const blob = await instance.toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HiFeed-MRV-Report-${periodKey}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate report PDF', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-70 disabled:cursor-wait text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generating PDF…
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download MRV Report (PDF)
        </>
      )}
    </button>
  );
}
