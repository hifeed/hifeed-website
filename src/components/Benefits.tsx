import React from 'react';
import { useTranslations } from "../i18n/LocaleProvider";
import type { BenefitItem } from "../i18n/dictionaries";

const BenefitCard: React.FC<{ emoji: string; title: string; description: string; delay?: string }>
= ({ emoji, title, description, delay }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-hifeed-light hover:shadow-lg transition-shadow flex flex-col" style={{ transitionDelay: delay }}>
        <div className="w-14 h-14 rounded-xl bg-hifeed-green/10 text-hifeed-green flex items-center justify-center text-2xl mb-4">
            <span>{emoji}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const Benefits: React.FC = () => {
    const t = useTranslations('benefits');
    const items = (t('items') as BenefitItem[]) || [];

    return (
        <section id="benefits" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-hifeed-accent/10 inline-block px-4 py-2 rounded-full text-hifeed-accent font-semibold mb-6 wiggle">
                        ✨ {t('badge') as string}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                      {t('titleA') as string} <span className="text-hifeed-green">{t('titleB') as string}</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('subtitle') as string}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((b: BenefitItem, idx: number) => (
                        <BenefitCard key={idx} emoji={b.emoji} title={b.title} description={b.description} delay={`${idx * 0.1}s`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
