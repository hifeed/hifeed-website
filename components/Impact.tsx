
import React from 'react';
import { buildSupplyChain } from '../src/lib/mrv/calc';

const sc = buildSupplyChain('2025-01', '2025-06');

function formatKg(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

const KPI_DATA = [
  { icon: '🌱', label: 'Active Plantation', value: `${sc.totalHectares.toFixed(1)} Ha`, sub: `${sc.indigoHectares.toFixed(1)} Indigofera + ${sc.pakcoyHectares.toFixed(1)} Pakcoy`, color: 'emerald' },
  { icon: '🌾', label: 'Biomass Harvested', value: `${sc.totalFreshBiomassTon.toFixed(1)} Ton`, sub: 'Fresh biomass (dry matter 25%)', color: 'teal' },
  { icon: '⚙️', label: 'Pellet Produced', value: `${formatKg(sc.totalPelletKg)} kg`, sub: '62% processing yield rate', color: 'blue' },
  { icon: '📉', label: 'CO₂e Avoided', value: `${sc.totalCO2eTon} Ton`, sub: 'Enteric + Sequestration CO₂e', color: 'rose' },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', iconBg: 'bg-emerald-500' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   text: 'text-teal-600',   iconBg: 'bg-teal-500' },
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-600',   iconBg: 'bg-blue-500' },
  rose:   { bg: 'bg-rose-50',   border: 'border-rose-200',   text: 'text-rose-600',   iconBg: 'bg-rose-500' },
};

const Impact: React.FC = () => {
    return (
        <section id="impact" className="py-20 bg-hifeed-green text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-white/20 inline-block px-4 py-2 rounded-full text-white font-semibold mb-6 pulse-scale">
                        🌍 Verified Impact Data
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">Real Numbers, <span className="text-yellow-300">Real Results</span></h2>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">Data sourced from HiFeed's live MRV system — every number traceable from hectares to verified carbon credits.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {KPI_DATA.map((kpi) => (
                        <div key={kpi.label} className={`${COLOR_MAP[kpi.color].bg} rounded-2xl p-5 border ${COLOR_MAP[kpi.color].border} scale-hover`}>
                            <div className={`${COLOR_MAP[kpi.color].iconBg} w-11 h-11 rounded-xl flex items-center justify-center mb-3 text-xl`}>
                                <span>{kpi.icon}</span>
                            </div>
                            <p className="text-[10px] uppercase tracking-widest font-semibold opacity-60 mb-1">{kpi.label}</p>
                            <p className="text-2xl lg:text-3xl font-black text-white leading-tight">{kpi.value}</p>
                            <p className="text-[10px] opacity-60 mt-1 leading-tight">{kpi.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Mission + Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
                    <div className="bg-white/10 rounded-2xl p-8 scale-hover">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center bounce-gentle">
                                <span className="text-hifeed-green text-lg font-black">🎯</span>
                            </div>
                            <h3 className="text-2xl font-bold">Our Mission</h3>
                        </div>
                        <p className="text-lg opacity-90 leading-relaxed">Revolutionizing cattle farming through carbon-negative feed solutions that deliver superior profitability while healing our planet.</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-8 scale-hover">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center bounce-gentle" style={{ animationDelay: '0.5s' }}>
                                <span className="text-hifeed-green text-lg font-black">🚀</span>
                            </div>
                            <h3 className="text-2xl font-bold">Our Vision</h3>
                        </div>
                        <p className="text-lg opacity-90 leading-relaxed">Leading the global transition to net-zero agriculture, empowering farmers to thrive in a sustainable future.</p>
                    </div>
                </div>

                {/* Investors CTA */}
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-300 rounded-2xl p-8 text-gray-900">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">Verified by Verra VCS</div>
                                <div className="bg-gray-900/10 text-gray-700 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">AI MRV Pipeline</div>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-black mb-2">For Investors & Partners</h3>
                            <p className="text-gray-700 leading-relaxed max-w-xl">
                                Access the full Measurement, Reporting & Verification report — complete with methodology, supply chain data, formula workings, and audit trail. Every number from hectares to verified carbon credits.
                            </p>
                            <p className="text-xs text-gray-500 mt-2">Data as of July 2026 · Pre-generated by HiFeed AI MRV Pipeline · Source: src/lib/mrv/calc.ts</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a
                                href="/mrv/report"
                                className="inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-4 rounded-xl transition-all scale-hover text-center"
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                View Full MRV Report
                            </a>
                            <a
                                href="/mrv/report"
                                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-emerald-700 text-emerald-800 font-bold px-6 py-4 rounded-xl transition-all scale-hover text-center"
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Download PDF Report
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom stats strip */}
                <div className="mt-8 bg-white/5 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-6 text-center">
                    <div>
                        <p className="text-3xl font-black text-yellow-300">Verra VCS</p>
                        <p className="text-xs text-emerald-200/60 uppercase tracking-wider">Standard</p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div>
                        <p className="text-3xl font-black text-yellow-300">GWP₁₀₀ = 28</p>
                        <p className="text-xs text-emerald-200/60 uppercase tracking-wider">IPCC AR5</p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div>
                        <p className="text-3xl font-black text-yellow-300">0.36</p>
                        <p className="text-xs text-emerald-200/60 uppercase tracking-wider">Ton CO₂e / Ton Feed</p>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div>
                        <p className="text-3xl font-black text-yellow-300">Jan – Jul 2026</p>
                        <p className="text-xs text-emerald-200/60 uppercase tracking-wider">Reporting Period</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
