
import React from 'react';

const Hero: React.FC = () => {

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    return (
        <section className="min-h-screen flex items-center bg-hifeed-light pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="slide-in-left">
                        <div className="bg-hifeed-green/10 inline-block px-4 py-2 rounded-full text-hifeed-green font-semibold mb-6 bounce-gentle">
                            🌱 Revolutionary Farming Technology
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
                            Future of <span className="text-hifeed-green">Cattle</span> Farming
                        </h1>
                        <h2 className="text-2xl lg:text-3xl text-gray-600 mb-6 font-light">Net-Zero. Profitable. Sustainable.</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => scrollToSection('consultation')} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all scale-hover">
                                Start Your Transformation →
                            </button>
                            <button onClick={() => scrollToSection('solution')} className="border-2 border-hifeed-green text-hifeed-green hover:bg-hifeed-green hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all scale-hover">
                                Discover How
                            </button>
                        </div>
                    </div>
                    <div className="relative slide-in-right">
                        <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-xl">
                            <svg width="500" height="400" viewBox="0 0 500 400" className="w-full h-auto">
                                <defs>
                                    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#E0F2FE', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#F0F9FF', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <rect width="500" height="200" fill="url(#skyGradient)" />
                                <path d="M0,150 Q100,120 200,140 T400,130 L500,135 L500,400 L0,400 Z" fill="#E8F5F0" />
                                <path d="M0,180 Q150,160 300,170 T500,165 L500,400 L0,400 Z" fill="#D1FAE5" />
                                <g className="float-animation">
                                    <g transform="translate(120,280)">
                                        <ellipse cx="0" cy="15" rx="35" ry="20" fill="#00AB7E" />
                                        <ellipse cx="-8" cy="0" rx="20" ry="18" fill="#00AB7E" />
                                        <circle cx="-15" cy="-3" r="2" fill="white" />
                                        <circle cx="-1" cy="-3" r="2" fill="white" />
                                        <path d="M-20,5 Q-8,12 4,5" stroke="white" strokeWidth="2" fill="none" />
                                    </g>
                                    <g transform="translate(280,290)">
                                        <ellipse cx="0" cy="15" rx="35" ry="20" fill="#00AB7E" />
                                        <ellipse cx="-8" cy="0" rx="20" ry="18" fill="#00AB7E" />
                                        <circle cx="-15" cy="-3" r="2" fill="white" />
                                        <circle cx="-1" cy="-3" r="2" fill="white" />
                                        <path d="M-20,5 Q-8,12 4,5" stroke="white" strokeWidth="2" fill="none" />
                                    </g>
                                    <g transform="translate(400,275)">
                                        <ellipse cx="0" cy="15" rx="35" ry="20" fill="#00AB7E" />
                                        <ellipse cx="-8" cy="0" rx="20" ry="18" fill="#00AB7E" />
                                        <circle cx="-15" cy="-3" r="2" fill="white" />
                                        <circle cx="-1" cy="-3" r="2" fill="white" />
                                        <path d="M-20,5 Q-8,12 4,5" stroke="white" strokeWidth="2" fill="none" />
                                    </g>
                                </g>
                                <g fill="#FF6B35" className="float-delayed">
                                    <circle cx="100" cy="330" r="4" /><circle cx="130" cy="335" r="4" /><circle cx="160" cy="332" r="4" />
                                    <circle cx="260" cy="340" r="4" /><circle cx="290" cy="345" r="4" /><circle cx="320" cy="342" r="4" />
                                    <circle cx="380" cy="325" r="4" /><circle cx="410" cy="330" r="4" /><circle cx="440" cy="327" r="4" />
                                </g>
                                <g transform="translate(420,60)" className="rotate-slow">
                                    <circle cx="0" cy="0" r="25" fill="#FFD700" />
                                    <g stroke="#FFD700" strokeWidth="3">
                                        <line x1="0" y1="-35" x2="0" y2="-30" /><line x1="25" y1="-25" x2="21" y2="-21" />
                                        <line x1="35" y1="0" x2="30" y2="0" /><line x1="25" y1="25" x2="21" y2="21" />
                                        <line x1="0" y1="35" x2="0" y2="30" /><line x1="-25" y1="25" x2="-21" y2="-21" />
                                        <line x1="-35" y1="0" x2="-30" y2="0" /><line x1="-25" y1="-25" x2="-21" y2="-21" />
                                    </g>
                                </g>
                                <g fill="white" opacity="0.8" className="float-animation">
                                    <ellipse cx="100" cy="50" rx="30" ry="15" /><ellipse cx="85" cy="45" rx="20" ry="12" /><ellipse cx="115" cy="45" rx="25" ry="12" />
                                </g>
                                <g fill="white" opacity="0.6" className="float-delayed">
                                    <ellipse cx="350" cy="80" rx="25" ry="12" /><ellipse cx="340" cy="75" rx="15" ry="10" /><ellipse cx="365" cy="75" rx="20" ry="10" />
                                </g>
                            </svg>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg pulse-scale">
                            <div className="text-2xl font-bold text-hifeed-green">50%</div>
                            <div className="text-xs text-gray-600">Less Emissions</div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg pulse-scale" style={{ animationDelay: '1s' }}>
                            <div className="text-2xl font-bold text-hifeed-green">30%</div>
                            <div className="text-xs text-gray-600">Cost Savings</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
