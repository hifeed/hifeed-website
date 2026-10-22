"use client";

import React from 'react';
import { useTranslations } from '../i18n/LocaleProvider';

const Impact: React.FC = () => {
    const t = useTranslations();
    return (
        <section id="impact" className="py-20 bg-hifeed-green text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-white/20 inline-block px-4 py-2 rounded-full text-white font-semibold mb-6 pulse-scale">
                        🌍 {String(t('impact.badge') ?? 'Global Impact')}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        {String(t('impact.titleA') ?? 'Transforming Agriculture')} <span className="text-yellow-300">{String(t('impact.titleB') ?? 'Worldwide')}</span>
                    </h2>
                    <p className="text-lg opacity-90 leading-relaxed max-w-2xl mx-auto">{String(t('impact.subtitle') ?? 'Leading the global transition to net-zero agriculture, empowering farmers to thrive in a sustainable future.')}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 slide-in-left">
                        <div className="bg-white/10 rounded-2xl p-6 scale-hover">
                            <h3 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-hifeed-green text-lg mr-3 bounce-gentle">🎯</span>
                                {String(t('impact.missionTitle') ?? 'Our Mission')}
                            </h3>
                            <p className="text-lg opacity-90 leading-relaxed">{String(t('impact.missionDesc') ?? 'Revolutionizing cattle farming through carbon-negative feed solutions that deliver superior profitability while healing our planet.')}</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6 scale-hover">
                            <h3 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-hifeed-green text-lg mr-3 bounce-gentle" style={{ animationDelay: '0.5s' }}>🚀</span>
                                {String(t('impact.visionTitle') ?? 'Our Vision')}
                            </h3>
                            <p className="text-lg opacity-90 leading-relaxed">{String(t('impact.visionDesc') ?? 'Leading the global transition to net-zero agriculture, empowering farmers to thrive in a sustainable future.')}</p>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 slide-in-right">
                        <div className="grid grid-cols-2 gap-6 text-center">
                            <div className="bg-white/10 rounded-2xl p-6 scale-hover pulse-scale">
                                <div className="text-4xl font-bold text-yellow-300 mb-2">50%</div>
                                <p className="opacity-90">{String(t('impact.emissionReduction') ?? 'Emission Reduction')}</p>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-6 scale-hover pulse-scale" style={{ animationDelay: '0.5s' }}>
                                <div className="text-4xl font-bold text-yellow-300 mb-2">30%</div>
                                <p className="opacity-90">{String(t('impact.costSavings') ?? 'Cost Savings')}</p>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-6 scale-hover pulse-scale" style={{ animationDelay: '1s' }}>
                                <div className="text-4xl font-bold text-yellow-300 mb-2">100%</div>
                                <p className="opacity-90">Carbon Traceable</p>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-6 scale-hover pulse-scale" style={{ animationDelay: '1.5s' }}>
                                <div className="text-4xl font-bold text-yellow-300 mb-2">25%</div>
                                <p className="opacity-90">Time Savings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
