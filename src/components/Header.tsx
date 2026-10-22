"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { rememberLocale, useLocale, useMedia, useTranslations } from "../i18n/LocaleProvider";
import { locales } from "../i18n/config";
import type { Locale } from "../i18n/dictionaries";

// Link biasa (bukan onClick) supaya crawler bisa mengikuti versi bahasa lain.
const LanguageSwitch: React.FC<{ locale: Locale; className: string }> = ({ locale, className }) => (
    <div className={`flex items-center ${className} px-2 py-1 rounded-full bg-hifeed-light`}>
        {locales.map(l => (
            <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                onClick={() => rememberLocale(l)}
                aria-current={locale === l ? 'true' : undefined}
                className={`px-2 py-1 rounded-full text-sm ${locale === l ? 'bg-hifeed-green text-white' : 'text-gray-600 hover:text-hifeed-green'}`}
            >
                {l.toUpperCase()}
            </Link>
        ))}
    </div>
);

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { locale } = useLocale();
    const t = useTranslations('nav');
    const media = useMedia();

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    const navLinks = [
        { href: 'challenges', label: t('challenges') as string },
        { href: 'solution', label: t('solution') as string },
        { href: 'benefits', label: t('benefits') as string },
        { href: 'palatability', label: t('palatability') as string },
        { href: 'stories', label: t('stories') as string },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-hifeed-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bounce-gentle overflow-hidden">
                            <img src={media.logo} alt="HiFeed Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-2xl font-bold text-hifeed-green">HiFeed</div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-gray-600 hover:text-hifeed-green font-medium transition-colors scale-hover">
                                {link.label}
                            </button>
                        ))}
                        <a href="https://lifeathifeed.notion.site/Life-at-HiFeed-43e47d221e8d4ff4b22126783533bd87" target="_blank" rel="noopener" className="text-gray-600 hover:text-hifeed-green font-medium transition-colors scale-hover">{t('careers') as string}</a>
                        <LanguageSwitch locale={locale} className="gap-2" />
                        <button onClick={() => scrollToSection('consultation')} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-6 py-2 rounded-full font-semibold transition-all scale-hover">
                            {t('consultationCta') as string}
                        </button>
                    </div>
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageSwitch locale={locale} className="gap-1" />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-hifeed-green focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-hifeed-light px-4 py-4">
                    {navLinks.map(link => (
                        <button key={link.href} onClick={() => scrollToSection(link.href)} className="block w-full text-left text-gray-600 hover:text-hifeed-green font-medium py-2 transition-colors">
                            {link.label}
                        </button>
                    ))}
                    <a href="https://lifeathifeed.notion.site/Life-at-HiFeed-43e47d221e8d4ff4b22126783533bd87" target="_blank" rel="noopener" className="block w-full text-left text-gray-600 hover:text-hifeed-green font-medium py-2 transition-colors">{t('careers') as string}</a>
                    <button onClick={() => scrollToSection('consultation')} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-6 py-2 rounded-full font-semibold w-full mt-4 transition-all">
                        {t('consultationCta') as string}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Header;
