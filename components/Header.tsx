
import React, { useState } from 'react';

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
        { href: 'challenges', label: 'Challenges' },
        { href: 'solution', label: 'Solution' },
        { href: 'benefits', label: 'Benefits' },
        { href: 'stories', label: 'Stories' },
        { href: 'team', label: 'Team' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-hifeed-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 bg-hifeed-green rounded-xl flex items-center justify-center bounce-gentle">
                            <span className="text-white font-bold text-lg">H</span>
                        </div>
                        <div className="text-2xl font-bold text-hifeed-green">HiFeed</div>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-gray-600 hover:text-hifeed-green font-medium transition-colors scale-hover">
                                {link.label}
                            </button>
                        ))}
                        <button onClick={() => scrollToSection('consultation')} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-6 py-2 rounded-full font-semibold transition-all scale-hover">
                            Free Consultation
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-hifeed-green focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-hifeed-light">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        {navLinks.map(link => (
                            <button key={link.href} onClick={() => scrollToSection(link.href)} className="w-full text-gray-600 hover:text-hifeed-green block px-3 py-2 rounded-md text-base font-medium">
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
