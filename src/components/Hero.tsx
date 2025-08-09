"use client";
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
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">Transform your cattle operation with HiFeed&apos;s revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.</p>
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
                            {/* SVG and illustration code here, omitted for brevity */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
