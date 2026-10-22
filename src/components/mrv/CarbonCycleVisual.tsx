'use client';

import React from 'react';
import { Sprout, ArrowRight, Wind, Beef } from 'lucide-react';
import { useCarbon } from '@/components/mrv/CarbonProvider';

export default function CarbonCycleVisual() {
  const totals = useCarbon().totals();
  const seqT = totals.rawMaterial + totals.carbonBank;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">HiFeed Carbon Cycle</h3>
        <p className="mt-1 text-sm text-gray-500">Two primary pathways through which HiFeed generates verified carbon credits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Path 1: Sequestration */}
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Feedstock Carbon Sequestration</h4>
              <p className="text-xs text-blue-500 font-medium">CO₂ absorbed during raw material cultivation</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: '01', title: 'Crop Cultivation', desc: 'Feed raw materials are sustainably farmed by local agricultural partners' },
              { step: '02', title: 'Photosynthesis', desc: 'Plants absorb atmospheric CO₂ and store carbon in biomass during growth' },
              { step: '03', title: 'Harvest & Processing', desc: 'Raw materials are harvested and processed into HiFeed complete feed pellets' },
              { step: '04', title: 'Carbon Stored', desc: 'Carbon from raw material offtake and carbon bank stations is quantified in tCO₂e', value: `${seqT.toFixed(1)} Ton CO₂e` },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                    ${item.value ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-500 group-hover:bg-blue-100'}`}>
                    {item.step}
                  </div>
                  {i < 3 && <div className="w-px h-4 bg-blue-200 mt-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  {item.value && (
                    <span className="inline-flex items-center gap-1 mt-2 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                      <ArrowRight className="w-3 h-3" />
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Path 2: Enteric Methane Reduction */}
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Beef className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Enteric Methane Reduction</h4>
              <p className="text-xs text-emerald-500 font-medium">CH₄ avoided from rumen fermentation</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { step: '01', title: 'Feed Consumption', desc: 'Cattle consume HiFeed pellets containing anti-methanogenic compounds' },
              { step: '02', title: 'Rumen Fermentation', desc: 'Active compounds inhibit methanogen microbes in the rumen, reducing CH₄ production' },
              { step: '03', title: 'Emission Reduction', desc: 'Enteric methane emissions from cattle are significantly reduced' },
              { step: '04', title: 'Avoided Emissions', desc: 'Avoided CH₄ is quantified in tCO₂e against the FAO GLEAM baseline emission factor', value: `${totals.enteric.toFixed(1)} Ton CO₂e` },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                    ${item.value ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100'}`}>
                    {item.step}
                  </div>
                  {i < 3 && <div className="w-px h-4 bg-emerald-200 mt-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  {item.value && (
                    <span className="inline-flex items-center gap-1 mt-2 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      <Wind className="w-3 h-3" />
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total bar */}
      <div className="px-6 lg:px-8 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600 font-medium">Sequestration: <strong className="text-blue-600">{seqT.toFixed(1)} Ton</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-gray-600 font-medium">Methane Reduction: <strong className="text-emerald-600">{totals.enteric.toFixed(1)} Ton</strong></span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold px-5 py-2 rounded-xl">
          Total: {totals.total.toFixed(1)} Ton CO₂e
        </div>
      </div>
    </div>
  );
}
