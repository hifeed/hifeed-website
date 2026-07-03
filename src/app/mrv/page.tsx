'use client';

import React from 'react';
import DashboardStats from '@/components/mrv/DashboardStats';
import IndonesiaMap from '@/components/mrv/IndonesiaMap';
import CreditPipeline from '@/components/mrv/CreditPipeline';
import GrowthChart from '@/components/mrv/GrowthChart';

export default function MRVDashboardPage() {
  return (
    <>
      {/* Hero / Top Bar */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl" />

        <div className="relative px-6 lg:px-10 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-emerald-300/80 text-sm font-medium uppercase tracking-widest mb-2">
                Measurement · Reporting · Verification
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                MRV Dashboard
              </h1>
              <p className="mt-2 text-emerald-200/60 text-sm max-w-xl">
                Real-time monitoring of carbon emission reductions across HiFeed&apos;s farm partner network in Indonesia.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-emerald-300/80 text-[10px] uppercase tracking-widest font-medium">Total Impact</p>
                <p className="text-white text-2xl font-black mt-0.5">45.2 <span className="text-sm font-medium text-emerald-300">Ton CO₂e</span></p>
              </div>
              <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/20 rounded-2xl px-5 py-3 text-center">
                <p className="text-emerald-300/80 text-[10px] uppercase tracking-widest font-medium">Methodology</p>
                <p className="text-emerald-400 text-sm font-bold mt-1">Verra VCS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 lg:px-10 py-8 space-y-8">
        <section>
          <DashboardStats />
        </section>

        <section>
          <IndonesiaMap />
        </section>

        <section>
          <CreditPipeline />
        </section>

        <section>
          <GrowthChart />
        </section>
      </div>
    </>
  );
}
