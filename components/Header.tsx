
import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    const navLinks = [
        { href: '#challenges', label: 'Challenges' },
        { href: '#solution', label: 'Solution' },
        { href: '#benefits', label: 'Benefits' },
        { href: '#palatability', label: 'Palatability' },
        { href: '#impact', label: 'Impact' },
        { href: '#stories', label: 'Stories' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-hifeed-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bounce-gentle overflow-hidden">
                            <img src="/hifeed_logo.png" alt="HiFeed Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-2xl font-bold text-hifeed-green">HiFeed</div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <button key={link.href} onClick={() => scrollToSection(link.href.slice(1))} className="text-gray-600 hover:text-hifeed-green font-medium transition-colors scale-hover">
                                {link.label}
                            </button>
                        ))}
                        <Link href="/mrv/report" className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-1.5 rounded-full font-semibold text-sm transition-all scale-hover flex items-center gap-1.5">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Investors
                        </Link>
                        <button onClick={() => scrollToSection('consultation')} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-6 py-2 rounded-full font-semibold transition-all scale-hover">
                            Free Consultation
                        </button>
                    </div>
                    <div className="md:hidden flex items-center gap-2">
                        <Link href="/mrv/report" className="bg-emerald-800 text-white px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1">
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Investors
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-hifeed-green focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-hifeed-light">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map(link => (
                            <button key={link.href} onClick={() => scrollToSection(link.href.slice(1))} className="block w-full text-left text-gray-600 hover:text-hifeed-green font-medium py-2 transition-colors">
                                {link.label}
                            </button>
                        ))}
                        <button onClick={() => scrollToSection('consultation')} className="mt-4 w-full bg-hifeed-green hover:bg-hifeed-dark text-white px-6 py-2 rounded-full font-semibold transition-all">
                            Free Consultation
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
