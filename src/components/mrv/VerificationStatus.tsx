'use client';

import React from 'react';
import { CheckCircle2, CircleDot, Circle, CalendarDays } from 'lucide-react';

const steps = [
  { name: 'Data Collection', date: 'Jan – Jun 2025', status: 'complete' as const },
  { name: 'Report Compilation', date: '1 Jul 2025', status: 'complete' as const },
  { name: 'Third-Party Audit', date: 'Est. 15 Jul 2025', status: 'current' as const },
  { name: 'Credit Issuance', date: 'Est. 1 Aug 2025', status: 'upcoming' as const },
];

export default function VerificationStatus() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Verification Status</h3>
        <p className="mt-1 text-sm text-gray-500">Carbon credit issuance pipeline for the current cycle.</p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;

            return (
              <div key={step.name} className="flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${step.status === 'complete' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : ''}
                    ${step.status === 'current' ? 'bg-amber-100 text-amber-600 shadow-lg shadow-amber-200/40 ring-4 ring-amber-100' : ''}
                    ${step.status === 'upcoming' ? 'bg-gray-100 text-gray-400' : ''}
                  `}>
                    {step.status === 'complete' && <CheckCircle2 className="w-5 h-5" />}
                    {step.status === 'current' && <CircleDot className="w-5 h-5 animate-pulse" />}
                    {step.status === 'upcoming' && <Circle className="w-5 h-5" />}
                  </div>

                  {!isLast && (
                    <div className={`w-0.5 flex-1 my-1 min-h-[24px] ${
                      step.status === 'complete' ? 'bg-emerald-300' : 'bg-gray-200'
                    }`} />
                  )}
                </div>

                <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                  <p className={`text-sm font-semibold ${
                    step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {step.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <CalendarDays className="w-3 h-3 text-gray-400" />
                    <p className={`text-xs ${step.status === 'current' ? 'text-amber-600 font-medium' : 'text-gray-400'}`}>
                      {step.date}
                    </p>
                  </div>

                  {step.status === 'current' && (
                    <span className="inline-flex items-center gap-1 mt-2 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-emerald-50/80 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-800">2 of 4 stages completed</p>
            <p className="text-[11px] text-emerald-600/70">Estimated completion: August 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
