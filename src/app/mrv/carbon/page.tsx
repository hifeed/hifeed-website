'use client';

import React from 'react';
import { Coins } from 'lucide-react';
import CarbonCycleVisual from '@/components/mrv/CarbonCycleVisual';
import CreditPipeline from '@/components/mrv/CreditPipeline';
import CarbonMethodology from '@/components/mrv/CarbonMethodology';

export default function CarbonPage() {
  return (
    <>
      <div className="bg-white border-b border-gray-100 px-6 lg:px-10 py-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Carbon & Credits</h1>
            <p className="mt-1 text-sm text-gray-500">Methodology, carbon bank measurements, feed distribution, and credit pipeline.</p>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 space-y-8">
        <CarbonMethodology />

        {/* Carbon Cycle Visual */}
        <CarbonCycleVisual />

        {/* Credit Pipeline */}
        <CreditPipeline />
      </div>
    </>
  );
}
