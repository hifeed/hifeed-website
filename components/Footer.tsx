
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-hifeed-gray text-gray-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Partners section */}
                <div className="mb-16 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Partners & Collaborators</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">Trusted by forward-thinking sustainability and agri-innovation partners across Indonesia and beyond.</p>
                  <div className="flex items-center justify-center">
                    <img src="/partner.png" alt="Partners" className="max-h-20 object-contain" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bounce-gentle overflow-hidden">
                                <img src="/hifeed_logo.png" alt="HiFeed Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="text-3xl font-bold text-hifeed-green">HiFeed</div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">Pioneering the future of sustainable cattle farming through revolutionary feed technology. Transforming agriculture for a net-zero world.</p>
                        <div className="space-y-1 text-sm">
                          <div className="font-semibold">FeedX Pte Ltd</div>
                          <div>33A Pagoda St, Singapore 059192</div>
                          <div><a href="mailto:partnership@hifeed.co" className="hover:text-hifeed-green">partnership@hifeed.co</a></div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-hifeed-green">Solutions</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Feed Technology</button></li>
                            <li><button onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Cost Reduction</button></li>
                            <li><button onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Carbon Impact</button></li>
                            <li><button onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Success Stories</button></li>
                            <li><Link href="/mrv/report" className="text-emerald-700 hover:text-emerald-800 font-semibold transition-colors scale-hover block">→ MRV Report</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-hifeed-green">For Investors</h4>
                        <ul className="space-y-3">
                            <li><Link href="/mrv/report" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block flex items-center gap-2">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                View MRV Report
                            </Link></li>
                            <li><Link href="/mrv/report" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block flex items-center gap-2">
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Download PDF Report
                            </Link></li>
                            <li><a href="mailto:partnership@hifeed.co" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Contact Partnership</a></li>
                        </ul>
                        <h4 className="text-lg font-bold mb-4 mt-8 text-hifeed-green">Support</h4>
                        <ul className="space-y-3">
                            <li><button onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">Contact</button></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-center md:text-left">© {new Date().getFullYear()} HiFeed. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="https://www.linkedin.com/company/hifeedx" target="_blank" rel="noopener noreferrer" className="bg-hifeed-light w-10 h-10 rounded-xl flex items-center justify-center hover:bg-hifeed-green/20 transition-all scale-hover" aria-label="LinkedIn">
                                <span className="text-sm font-bold text-hifeed-green">in</span>
                            </a>
                            <a href="https://www.instagram.com/hifeed.co" target="_blank" rel="noopener noreferrer" className="bg-hifeed-light w-10 h-10 rounded-xl flex items-center justify-center hover:bg-hifeed-green/20 transition-all scale-hover" aria-label="Instagram">
                                <span className="text-sm font-bold text-hifeed-green">ig</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
