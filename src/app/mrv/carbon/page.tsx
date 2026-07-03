'use client';

import React from 'react';
import { Coins } from 'lucide-react';
import CarbonCycleVisual from '@/components/mrv/CarbonCycleVisual';
import VerificationStatus from '@/components/mrv/VerificationStatus';
import CreditPipeline from '@/components/mrv/CreditPipeline';

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
            <p className="mt-1 text-sm text-gray-500">Methodology, carbon cycle, and verification pipeline for credit issuance.</p>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8 space-y-8">
        {/* Methodology summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Standard</p>
              <p className="text-sm font-bold text-gray-900">Verra VCS (Voluntary Carbon Standard)</p>
              <p className="text-xs text-gray-500 mt-1">Internationally recognized methodology for quantifying GHG emission reductions.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Emission Factor</p>
              <p className="text-sm font-bold text-gray-900">0.36 Ton CO₂e / Ton Feed</p>
              <p className="text-xs text-gray-500 mt-1">Derived from peer-reviewed studies on enteric methane reduction via feed additives (GWP₁₀₀ of CH₄ = 28).</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Two Carbon Sources</p>
              <p className="text-sm font-bold text-gray-900">Enteric CH₄ Reduction + Feedstock Sequestration</p>
              <p className="text-xs text-gray-500 mt-1">Credits are generated from both reduced methane emissions and carbon sequestered during raw material cultivation.</p>
            </div>
          </div>
        </div>

        {/* Carbon Cycle Visual */}
        <CarbonCycleVisual />

        {/* Credit Pipeline */}
        <CreditPipeline />

        {/* Verification */}
        <div className="max-w-2xl">
          <VerificationStatus />
        </div>
      </div>
    </>
  );
}
