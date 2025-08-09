
import React from 'react';

const Stories: React.FC = () => {
    return (
        <section id="stories" className="py-20 bg-hifeed-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-hifeed-accent/10 inline-block px-4 py-2 rounded-full text-hifeed-accent font-semibold mb-6 wiggle">
                        🗣️ Success Stories
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Real Farmers, <span className="text-hifeed-green">Real Results</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover how HiFeed is transforming cattle operations across Indonesia</p>
                </div>
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl scale-hover">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-8 lg:p-12 slide-in-left">
                            <div className="text-hifeed-accent text-6xl mb-6 leading-none opacity-50">"</div>
                            <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">"HiFeed has completely transformed my operation. My cattle are healthier, feed costs dropped by 35%, and the convenience is incredible. The animals clearly prefer these pellets, and I'm saving 5 hours daily on feed preparation. This is the future of farming."</p>
                            <div className="flex items-center space-x-4">
                                <div className="bg-hifeed-green rounded-2xl w-16 h-16 flex items-center justify-center text-white font-bold text-xl bounce-gentle">AI</div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-1">Arif Irawan</h4>
                                    <p className="text-gray-600 mb-2">Progressive Cattle Farmer, West Java</p>
                                    <div className="flex text-yellow-400 text-lg">
                                        <span>⭐⭐⭐⭐⭐</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-hifeed-light p-8 lg:p-12 flex items-center justify-center slide-in-right">
                            <div className="relative">
                                <svg width="300" height="250" viewBox="0 0 300 250" className="w-full h-auto">
                                    <rect width="300" height="180" fill="#E8F5F0" opacity="0.5" rx="15" />
                                    <g transform="translate(150,90)" className="bounce-gentle">
                                        <circle cx="0" cy="0" r="25" fill="#00AB7E" />
                                        <circle cx="-8" cy="-6" r="2" fill="white" /><circle cx="8" cy="-6" r="2" fill="white" />
                                        <path d="M-12,8 Q0,16 12,8" stroke="white" strokeWidth="2" fill="none" />
                                        <ellipse cx="0" cy="-20" rx="30" ry="6" fill="#FF6B35" /><rect x="-25" y="-25" width="50" height="8" fill="#FF6B35" rx="4" />
                                        <rect x="-15" y="25" width="30" height="40" fill="#6B7280" rx="6" />
                                        <ellipse cx="-30" cy="35" rx="6" ry="20" fill="#00AB7E" transform="rotate(-30)" />
                                        <ellipse cx="30" cy="35" rx="6" ry="20" fill="#00AB7E" transform="rotate(30)" />
                                    </g>
                                    <g fill="#00AB7E" opacity="0.9" className="float-animation">
                                        <ellipse cx="80" cy="150" rx="25" ry="15" /><ellipse cx="70" cy="138" rx="15" ry="12" />
                                        <circle cx="65" cy="135" r="2" fill="white" /><circle cx="75" cy="135" r="2" fill="white" />
                                        <ellipse cx="220" cy="155" rx="25" ry="15" /><ellipse cx="210" cy="143" rx="15" ry="12" />
                                        <circle cx="205" cy="140" r="2" fill="white" /><circle cx="215" cy="140" r="2" fill="white" />
                                    </g>
                                    <g fill="#FF6B35" className="float-delayed">
                                        <circle cx="70" cy="180" r="3" /><circle cx="85" cy="185" r="3" /><circle cx="100" cy="182" r="3" />
                                        <circle cx="200" cy="185" r="3" /><circle cx="215" cy="190" r="3" /><circle cx="230" cy="187" r="3" />
                                    </g>
                                    <g fill="#00AB7E" fontSize="12" fontWeight="bold">
                                        <text x="50" y="220">35% Cost Reduction</text>
                                        <text x="170" y="220">5 Hours Saved Daily</text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stories;
