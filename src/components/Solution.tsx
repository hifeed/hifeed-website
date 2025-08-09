import React from 'react';
import { useTranslations } from "../i18n/LocaleProvider";

const Solution: React.FC = () => {
    const t = useTranslations('solution');
    return (
        <section id="solution" className="py-20 bg-hifeed-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-hifeed-green/10 inline-block px-4 py-2 rounded-full text-hifeed-green font-semibold mb-6 pulse-scale">
                        🚀 {t('badge') as string}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{t('titleA') as string} <span className="text-hifeed-green">{t('titleB') as string}</span></h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 slide-in-left">
                        <div className="bg-white rounded-2xl p-6 shadow-lg scale-hover">
                            <div className="flex items-center mb-4">
                                <div className="bg-hifeed-green rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 bounce-gentle">1</div>
                                <h3 className="text-2xl font-bold text-hifeed-green">{t('card1Title') as string}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{t('card1Desc') as string}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg scale-hover">
                            <div className="flex items-center mb-4">
                                <div className="bg-hifeed-accent rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 bounce-gentle" style={{ animationDelay: '0.5s' }}>2</div>
                                <h3 className="text-2xl font-bold text-hifeed-green">{t('card2Title') as string}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{t('card2Desc') as string}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg scale-hover">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 bounce-gentle" style={{ animationDelay: '1s' }}>3</div>
                                <h3 className="text-2xl font-bold text-hifeed-green">{t('card3Title') as string}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{t('card3Desc') as string}</p>
                        </div>
                    </div>
                    <div className="relative slide-in-right">
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <svg width="400" height="350" viewBox="0 0 400 350" className="w-full h-auto">
                                <circle cx="200" cy="175" r="50" fill="#E8F5F0" stroke="#00AB7E" strokeWidth="3" className="pulse-scale" />
                                <circle cx="200" cy="175" r="30" fill="none" stroke="#FF6B35" strokeWidth="2" strokeDasharray="5,5" className="rotate-slow" />
                                <text x="200" y="180" textAnchor="middle" fill="#00AB7E" fontSize="14" fontWeight="bold">HiFeed</text>
                                <g stroke="#00AB7E" strokeWidth="3" fill="none">
                                    <path d="M50,100 Q125,125 150,150" markerEnd="url(#arrowGreen)" className="float-animation" />
                                    <path d="M50,175 Q125,175 150,175" markerEnd="url(#arrowGreen)" className="float-delayed" />
                                    <path d="M50,250 Q125,225 150,200" markerEnd="url(#arrowGreen)" className="float-animation" />
                                </g>
                                <g stroke="#FF6B35" strokeWidth="3" fill="none">
                                    <path d="M250,150 Q275,125 350,100" markerEnd="url(#arrowOrange)" className="float-delayed" />
                                    <path d="M250,175 Q275,175 350,175" markerEnd="url(#arrowOrange)" className="float-animation" />
                                    <path d="M250,200 Q275,225 350,250" markerEnd="url(#arrowOrange)" className="float-delayed" />
                                </g>
                                <defs>
                                    <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#00AB7E" />
                                    </marker>
                                    <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#FF6B35" />
                                    </marker>
                                </defs>
                                <g fill="#00AB7E" fontSize="11" fontWeight="bold">
                                    <text x="20" y="95">{t('svgLabel1') as string}</text>
                                    <text x="20" y="170">{t('svgLabel2') as string}</text>
                                    <text x="20" y="245">{t('svgLabel3') as string}</text>
                                </g>
                                <g fill="#FF6B35" fontSize="11" fontWeight="bold">
                                    <text x="280" y="95" textAnchor="end">{t('svgLabel4') as string}</text>
                                    <text x="350" y="170" textAnchor="end">{t('svgLabel5') as string}</text>
                                    <text x="350" y="245" textAnchor="end">{t('svgLabel6') as string}</text>
                                </g>
                                <g fill="#00AB7E" opacity="0.6" className="bounce-gentle">
                                    <circle cx="100" cy="120" r="3" /><circle cx="120" cy="140" r="3" />
                                    <circle cx="280" cy="130" r="3" /><circle cx="300" cy="150" r="3" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
