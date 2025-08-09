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
                            <div className="text-hifeed-accent text-6xl mb-6 leading-none opacity-50">&ldquo;</div>
                            <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">&ldquo;HiFeed has completely transformed my operation. My cattle are healthier, feed costs dropped by 35%, and the convenience is incredible. The animals clearly prefer these pellets, and I&apos;m saving 5 hours daily on feed preparation. This is the future of farming.&rdquo;</p>
                            <div className="flex items-center space-x-4">
                                <div className="bg-hifeed-green rounded-2xl w-16 h-16 flex items-center justify-center text-white font-bold text-xl bounce-gentle">AI</div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-1">Arif Irawan</h4>
                                    <p className="text-gray-600 mb-2">Progressive Cattle Farmer, West Java</p>
                                    <div className="flex text-yellow-400 text-lg">
                                        <span>⭐️⭐️⭐️⭐️⭐️</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-hifeed-light p-8 lg:p-12 flex items-center justify-center slide-in-right">
                            <div className="relative">
                                {/* SVG and illustration code here, omitted for brevity */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stories;
