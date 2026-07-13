
import React from 'react';
import { Sprout, Wheat, Factory, Truck, Beef, TrendingDown, ArrowRight } from 'lucide-react';
import { buildSupplyChain } from '../src/lib/mrv/calc';

const sc = buildSupplyChain('2025-01', '2025-06');

function formatHa(n: number) { return `${n.toFixed(1)} Ha`; }
function formatTon(n: number) { return `${n.toFixed(1)} Ton`; }
function formatKg(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M kg`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K kg`;
  return `${n.toLocaleString()} kg`;
}

const STEPS = [
  { icon: Sprout, label: 'Cultivation', value: formatHa(sc.totalHectares), sub: 'Indigofera + Pakcoy plantation', color: 'emerald' },
  { icon: Wheat, label: 'Harvest', value: formatTon(sc.totalFreshBiomassTon), sub: 'Fresh biomass per period', color: 'teal' },
  { icon: Factory, label: 'Processing', value: formatKg(sc.totalPelletKg), sub: 'Pellet produced (62% yield)', color: 'blue' },
  { icon: Truck, label: 'Distribution', value: formatTon(sc.totalDistributionTon), sub: 'Pellet shipped to partners', color: 'violet' },
  { icon: Beef, label: 'Consumption', value: formatKg(sc.totalConsumptionKg), sub: 'Fed to cattle', color: 'amber' },
  { icon: TrendingDown, label: 'CO₂e Avoided', value: `${sc.totalCO2eTon} Ton`, sub: 'Enteric + Sequestration CO₂e', color: 'rose' },
];

const STEPS_RIGHT = [
  { label: 'CO₂e Avoided', value: `${sc.totalCO2eTon} Ton`, color: 'rose' },
  { label: 'Cultivation', value: formatHa(sc.totalHectares), color: 'emerald' },
  { label: 'Harvest', value: formatTon(sc.totalFreshBiomassTon), color: 'teal' },
  { label: 'Processing', value: formatKg(sc.totalPelletKg), color: 'blue' },
  { label: 'Distribution', value: formatTon(sc.totalDistributionTon), color: 'violet' },
  { label: 'Consumption', value: formatKg(sc.totalConsumptionKg), color: 'amber' },
];

const COLOR_MAP: Record<string, string> = {
  emerald: '#10b981',
  teal: '#14b8a6',
  blue: '#3b82f6',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  rose: '#f43f5e',
};

const BORDER_MAP: Record<string, string> = {
  emerald: 'border-emerald-300',
  teal: 'border-teal-300',
  blue: 'border-blue-300',
  violet: 'border-violet-300',
  amber: 'border-amber-300',
  rose: 'border-rose-300',
};

const BG_MAP: Record<string, string> = {
  emerald: 'bg-emerald-50',
  teal: 'bg-teal-50',
  blue: 'bg-blue-50',
  violet: 'bg-violet-50',
  amber: 'bg-amber-50',
  rose: 'bg-rose-50',
};

const Solution: React.FC = () => {
    return (
        <section id="solution" className="py-20 bg-hifeed-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-hifeed-green/10 inline-block px-4 py-2 rounded-full text-hifeed-green font-semibold mb-6 pulse-scale">
                        🚀 Revolutionary Solution
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">The <span className="text-hifeed-green">HiFeed</span> Revolution</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: 3 pillars */}
                    <div className="space-y-6 slide-in-left">
                        <div className="bg-white rounded-2xl p-6 shadow-lg scale-hover">
                            <div className="flex items-center mb-4">
                                <div className="bg-hifeed-green rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 bounce-gentle">1</div>
                                <h3 className="text-2xl font-bold text-hifeed-green">Carbon-Negative Innovation</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">Revolutionary complete feed pellets engineered to reduce enteric fermentation by 50% while actively capturing carbon through our cultivation process.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg scale-hover">
                            <div className="flex items-center mb-4">
                                <div className="bg-hifeed-accent rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 bounce-gentle" style={{ animationDelay: '0.5s' }}>2</div>
                                <h3 className="text-2xl font-bold text-hifeed-green">Smart Nutrition Technology</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">AI-optimized nutrient profiles delivering superior palatability and health outcomes while enabling traceable net-zero cattle production.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg scale-hover">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 bounce-gentle" style={{ animationDelay: '1s' }}>3</div>
                                <h3 className="text-2xl font-bold text-hifeed-green">Seamless Integration</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">Plug-and-play solution that transforms your existing operation into a sustainable, profitable, and future-ready farming enterprise.</p>
                        </div>
                    </div>

                    {/* Right: 6-step supply chain */}
                    <div className="slide-in-right">
                        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-6 shadow-xl text-white">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                    <span className="text-lg">🔄</span>
                                </div>
                                <div>
                                    <p className="text-emerald-300 text-[10px] uppercase tracking-widest font-semibold">Upstream Supply Chain</p>
                                    <h3 className="text-lg font-bold">From Plantation to Carbon Reduction</h3>
                                </div>
                            </div>
                            <p className="text-emerald-200/70 text-xs mb-6">End-to-end traceability — how HiFeed converts hectares into verified carbon credits.</p>

                            <div className="space-y-2">
                                {STEPS_RIGHT.map((step, i) => (
                                    <div key={step.label}>
                                        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${BG_MAP[step.color]} border ${BORDER_MAP[step.color]}`}>
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-xs"
                                                style={{ backgroundColor: COLOR_MAP[step.color], color: '#fff' }}
                                            >
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold" style={{ color: step.color === 'rose' ? '#fda4af' : step.color === 'emerald' ? '#a7f3d0' : '#bbf7d0' }}>
                                                    {step.label}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black" style={{ color: COLOR_MAP[step.color] }}>{step.value}</p>
                                            </div>
                                        </div>
                                        {i < STEPS_RIGHT.length - 1 && (
                                            <div className="flex justify-center py-1">
                                                <div className="w-px h-3 bg-white/20" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 bg-white/10 rounded-xl p-3 border border-white/10">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-wider font-semibold">Emission Factor</p>
                                        <p className="text-base font-black text-white">0.36</p>
                                        <p className="text-[9px] text-emerald-400/70">Ton CO₂e / Ton feed</p>
                                    </div>
                                    <div className="border-x border-white/10">
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-wider font-semibold">GWP₁₀₀ of CH₄</p>
                                        <p className="text-base font-black text-white">28</p>
                                        <p className="text-[9px] text-emerald-400/70">IPCC AR5</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-wider font-semibold">Standard</p>
                                        <p className="text-base font-black text-white">Verra VCS</p>
                                        <p className="text-[9px] text-emerald-400/70">Carbon Standard</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 bg-emerald-500/30 rounded-xl p-3 border border-emerald-400/30">
                                <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold text-center mb-2">Cultivation Sequestration</p>
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    <div className="bg-white/10 rounded-lg p-2">
                                        <p className="text-[9px] text-emerald-400/80">Indigofera</p>
                                        <p className="text-sm font-black text-emerald-300">6.4 Ton CO₂e/Ha/yr</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-2">
                                        <p className="text-[9px] text-emerald-400/80">Pakcoy</p>
                                        <p className="text-sm font-black text-emerald-300">2.4 Ton CO₂e/Ha/yr</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
