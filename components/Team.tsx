
import React from 'react';

const teamMembers = [
    {
        acronym: 'CEO',
        title: 'Chief Executive Officer',
        description: 'Visionary leader with 15+ years in sustainable agriculture and climate tech innovation',
        color: 'hifeed-green',
        delay: '0s'
    },
    {
        acronym: 'AGR',
        title: 'Lead Agronomist',
        description: 'PhD in Sustainable Agriculture with expertise in carbon-insetting cultivation methods',
        color: 'blue-500',
        delay: '0.2s'
    },
    {
        acronym: 'NUT',
        title: 'Animal Nutritionist',
        description: 'Leading expert in cattle nutrition optimization and enteric fermentation reduction',
        color: 'hifeed-accent',
        delay: '0.4s'
    },
    {
        acronym: 'CAR',
        title: 'Carbon Researcher',
        description: 'Pioneer in carbon measurement and net-zero livestock production systems',
        color: 'green-500',
        delay: '0.6s'
    }
];

const TeamMemberCard: React.FC<typeof teamMembers[0]> = ({ acronym, title, description, color, delay }) => (
    <div className="text-center scale-hover fade-in-up" style={{ transitionDelay: delay }}>
        <div className={`bg-${color} rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 bounce-gentle`}>
            <span className="text-white text-2xl font-bold">{acronym}</span>
        </div>
        <div className="bg-hifeed-light rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const Team: React.FC = () => {
    return (
        <section id="team" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-hifeed-green/10 inline-block px-4 py-2 rounded-full text-hifeed-green font-semibold mb-6 pulse-scale">
                        👥 Innovation Team
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Meet the <span className="text-hifeed-green">Visionaries</span></h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">HiFeed is powered by Wavemaker Impact, a leading climate tech venture builder. Our world-class team combines decades of expertise in agriculture, nutrition, and carbon science to revolutionize cattle farming.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
