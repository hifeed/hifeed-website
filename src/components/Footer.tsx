import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-hifeed-gray text-gray-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-hifeed-green rounded-xl flex items-center justify-center bounce-gentle">
                                <span className="text-white font-bold text-lg">H</span>
                            </div>
                            <div className="text-3xl font-bold text-hifeed-green">HiFeed</div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">Pioneering the future of sustainable cattle farming through revolutionary feed technology. Transforming agriculture for a net-zero world.</p>
                        <p className="text-sm text-gray-500 bg-hifeed-light inline-block px-3 py-1 rounded-full">Powered by Wavemaker Impact</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-hifeed-green">Solutions</h4>
                        <ul className="space-y-3">
                            <li><a href="#solution" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Feed Technology</a></li>
                            <li><a href="#benefits" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Cost Reduction</a></li>
                            <li><a href="#impact" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Carbon Impact</a></li>
                            <li><a href="#team" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Our Expertise</a></li>
                            <li><a href="#stories" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Success Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-hifeed-green">Support</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Contact Support</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-center md:text-left">&copy; 2024 HiFeed. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="bg-hifeed-light w-10 h-10 rounded-xl flex items-center justify-center hover:bg-hifeed-green/20 transition-all scale-hover">
                               <span className="text-sm font-bold text-hifeed-green">in</span>
                            </a>
                            <a href="#" className="bg-hifeed-light w-10 h-10 rounded-xl flex items-center justify-center hover:bg-hifeed-green/20 transition-all scale-hover">
                               <span className="text-sm font-bold text-hifeed-green">ig</span>
                            </a>
                             <a href="#" className="bg-hifeed-light w-10 h-10 rounded-xl flex items-center justify-center hover:bg-hifeed-green/20 transition-all scale-hover">
                                <span className="text-sm font-bold text-hifeed-green">tw</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
