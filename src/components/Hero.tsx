"use client";
import React from 'react';
import { useMedia, useTranslations } from "../i18n/LocaleProvider";

const Hero: React.FC = () => {
    const t = useTranslations('hero');
    const media = useMedia();
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    const rawTitle = (t('title') as string) || '';
    const [pre, post] = rawTitle.split('{highlight}');
    return (
        <section className="min-h-screen flex items-center pt-16 bg-hifeed-green/10 relative overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="slide-in-left text-gray-900">
                        <div className="bg-hifeed-green/90 inline-block px-4 py-2 rounded-full text-white font-semibold mb-6 bounce-gentle">
                            🌱 {t('badge') as string}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                            {pre}
                            <span className="text-hifeed-green">{t('highlight') as string}</span>
                            {post}
                        </h1>
                        <h2 className="text-2xl lg:text-3xl mb-6 font-light text-gray-700">{t('subtitle') as string}</h2>
                        <p className="text-lg mb-8 leading-relaxed max-w-xl text-gray-700">{t('description') as string}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => scrollToSection('consultation')} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all scale-hover">
                                {t('primaryCta') as string}
                            </button>
                            <button onClick={() => scrollToSection('solution')} className="border-2 border-hifeed-green text-hifeed-green hover:bg-hifeed-green hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all scale-hover">
                                {t('secondaryCta') as string}
                            </button>
                        </div>
                    </div>
                    <div className="relative slide-in-right hidden lg:block">
                        <div className="bg-white/70 backdrop-blur rounded-3xl p-4 sm:p-8 shadow-xl flex items-center justify-center">
                            {/* Embed dari Google Drive dengan rasio 16:9 responsif */}
                            <div style={{ width: '100%', maxWidth: '700px', aspectRatio: '16/9', borderRadius: '1rem', overflow: 'hidden' }}>
                                <iframe
                                    src={media.heroVideoUrl}
                                    title="HiFeed video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    style={{ width: '100%', height: '100%', border: 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
