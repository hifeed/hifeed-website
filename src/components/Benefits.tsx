import React from 'react';

const benefitsData = [
    { emoji: '⚡', title: 'Effortless Operations', description: 'Eliminate 4-6 hours of daily manual feed preparation. Ready-to-use pellets streamline your entire feeding process.', color: 'hifeed-green', delay: '0s' },
    { emoji: '😋', title: 'Superior Palatability', description: 'Soft, aromatic pellets increase feed intake by 25%, improving cattle satisfaction and overall health outcomes.', color: 'hifeed-accent', delay: '0.2s' },
    { emoji: '💰', title: 'Dramatic Cost Reduction', description: 'Cut feed costs by 30% through optimized nutrition density and elimination of expensive supplements.', color: 'green-500', delay: '0.4s' },
    { emoji: '🚚', title: 'Logistics Optimization', description: 'Reduce transport and storage costs by 40% with compact, lightweight pellet format.', color: 'blue-500', delay: '0.6s' },
    { emoji: '📊', title: 'Data-Driven Insights', description: 'Real-time monitoring and analytics for optimized feeding schedules and health tracking.', color: 'purple-500', delay: '0.8s' },
    { emoji: '🌱', title: 'Net-Zero Achievement', description: 'Produce fully traceable, carbon-neutral cattle that meet future sustainability standards and premium market demands.', color: 'hifeed-green', delay: '1s' }
];

const BenefitCard: React.FC<typeof benefitsData[0]> = ({ emoji, title, description, color, delay }) => (
    <div className={`bg-${color} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 bounce-gentle`} style={{ transitionDelay: delay }}>
        <div className="text-white text-2xl">{emoji}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const Benefits: React.FC = () => {
    return (
        <section id="benefits" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-hifeed-accent/10 inline-block px-4 py-2 rounded-full text-hifeed-accent font-semibold mb-6 wiggle">
                        ✨ Transformative Benefits
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Unlock Your Farm&apos;s <span className="text-hifeed-green">Potential</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience revolutionary improvements across every aspect of your cattle operation</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefitsData.map((benefit, index) => (
                        <BenefitCard key={index} {...benefit} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
