
import React from 'react';

const challengesData = [
    {
        emoji: '💰',
        title: 'Escalating Feed Costs',
        description: 'Feed expenses consuming 60-70% of operational costs, with prices rising 15-20% annually, crushing profit margins.',
        color: 'red',
        delay: '0s'
    },
    {
        emoji: '⚡',
        title: 'Labor-Intensive Operations',
        description: 'Manual feed preparation consuming 4-6 hours daily, increasing labor costs and reducing operational efficiency.',
        color: 'orange',
        delay: '0.2s'
    },
    {
        emoji: '📦',
        title: 'Supply Chain Disruptions',
        description: 'Seasonal feed shortages and supply chain volatility causing 20-30% production losses during critical periods.',
        color: 'yellow',
        delay: '0.4s'
    },
    {
        emoji: '🌍',
        title: 'Environmental Pressure',
        description: 'Increasing regulations on methane emissions and carbon footprint threatening long-term viability.',
        color: 'purple',
        delay: '0.6s'
    }
];

const ChallengeCard: React.FC<{ emoji: string; title: string; description: string; color: string; delay: string; }> = ({ emoji, title, description, color, delay }) => {
    return (
        <div className={`bg-white border-2 border-${color}-200 rounded-2xl p-8 scale-hover fade-in-up`} style={{ transitionDelay: delay }}>
            <div className="flex items-start space-x-4">
                <div className={`bg-${color}-100 rounded-xl p-3 bounce-gentle`}>
                    <div className={`text-${color}-500 text-3xl`}>{emoji}</div>
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
    return (
        <section id="challenges" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-red-100 inline-block px-4 py-2 rounded-full text-red-600 font-semibold mb-6 wiggle">
                        ⚠️ Industry Challenges
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Breaking Through <span className="text-hifeed-green">Barriers</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Traditional cattle farming faces critical challenges that threaten profitability and sustainability</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {challengesData.map((challenge, index) => (
                        <ChallengeCard key={index} {...challenge} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Challenges;
