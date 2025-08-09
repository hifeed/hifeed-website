import React from 'react';
import { useTranslations } from '../i18n/LocaleProvider';

const challengesData = [
    {
        emoji: '💰',
        titleKey: 'card1Title',
        descKey: 'card1Desc',
        color: 'red',
        delay: '0s'
    },
    {
        emoji: '⚡',
        titleKey: 'card2Title',
        descKey: 'card2Desc',
        color: 'orange',
        delay: '0.2s'
    },
    {
        emoji: '📦',
        titleKey: 'card3Title',
        descKey: 'card3Desc',
        color: 'yellow',
        delay: '0.4s'
    },
    {
        emoji: '🌍',
        titleKey: 'card4Title',
        descKey: 'card4Desc',
        color: 'purple',
        delay: '0.6s'
    }
];

const ChallengeCard: React.FC<{ emoji: string; title: string; description: string; color: string; delay: string; }> = ({ emoji, title, description, color, delay }) => {
    // Map colors to ensure Tailwind classes are included in build
    const colorClasses = {
        red: {
            border: 'border-red-200',
            bg: 'bg-red-100',
            text: 'text-red-500'
        },
        orange: {
            border: 'border-orange-200',
            bg: 'bg-orange-100',
            text: 'text-orange-500'
        },
        yellow: {
            border: 'border-yellow-200',
            bg: 'bg-yellow-100',
            text: 'text-yellow-500'
        },
        purple: {
            border: 'border-purple-200',
            bg: 'bg-purple-100',
            text: 'text-purple-500'
        }
    };

    const currentColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.red;

    return (
        <div className={`bg-white border-2 ${currentColor.border} rounded-2xl p-8 scale-hover fade-in-up`} style={{ transitionDelay: delay }}>
            <div className="flex items-start space-x-4">
                <div className={`${currentColor.bg} rounded-xl p-3 bounce-gentle`}>
                    <div className={`${currentColor.text} text-3xl`}>{emoji}</div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
};

const Challenges: React.FC = () => {
    const t = useTranslations('challenges');
    return (
        <section id="challenges" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-red-100 inline-block px-4 py-2 rounded-full text-red-600 font-semibold mb-6 wiggle">
                        ⚠️ {String(t('badge') ?? 'Industry Challenges')}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{String(t('titleA') ?? 'Breaking Through')} <span className="text-hifeed-green">{String(t('titleB') ?? 'Barriers')}</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{String(t('subtitle') ?? 'Understand the biggest hurdles in modern cattle farming')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-8">
                    {challengesData.map((challenge, index) => (
                        <ChallengeCard
                            key={index}
                            emoji={challenge.emoji}
                            title={String(t(challenge.titleKey))}
                            description={String(t(challenge.descKey))}
                            color={challenge.color}
                            delay={challenge.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Challenges;
