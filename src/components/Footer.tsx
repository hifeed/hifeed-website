"use client";
import React from 'react';
import { useMedia, useSiteSettings, useTranslations } from "../i18n/LocaleProvider";

const Footer: React.FC = () => {
    const t = useTranslations('footer');
    const media = useMedia();
    const settings = useSiteSettings();
    return (
        <footer className="bg-hifeed-gray text-gray-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Partners section */}
                <div className="mb-16 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('partnersTitle') as string}</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-6">{t('partnersDesc') as string}</p>
                  <div className="flex items-center justify-center">
                    <img src={media.partnersImage} alt={(t('partnersTitle') as string) || 'Partners'} className="max-h-20 object-contain" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bounce-gentle overflow-hidden">
                                <img src={media.logo} alt="HiFeed Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="text-3xl font-bold text-hifeed-green">HiFeed</div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">{t('about') as string}</p>
                        <div className="space-y-1 text-sm">
                          <div className="font-semibold">{t('addressTitle') as string}</div>
                          <div>{t('company') as string}</div>
                          <div>{t('address') as string}</div>
                          <div><a href={`mailto:${settings.contactEmail}`} className="hover:text-hifeed-green">{settings.contactEmail}</a></div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-hifeed-green">{t('solutionsMenu') as string}</h4>
                        <ul className="space-y-3">
                            <li><a href="#solution" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">{t('feedTech') as string}</a></li>
                            <li><a href="#benefits" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">{t('costReduction') as string}</a></li>
                            <li><a href="#impact" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">{t('carbonImpact') as string}</a></li>
                            <li><a href="#stories" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">{t('successStories') as string}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-hifeed-green">{t('supportMenu') as string}</h4>
                        <ul className="space-y-3">
                            <li><a href={settings.privacyPolicyUrl || '#'} className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">{t('privacyPolicy') as string}</a></li>
                            <li><a href={settings.termsUrl || '#'} className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">{t('termsOfService') as string}</a></li>
                            <li><a href="#consultation" className="text-gray-600 hover:text-hifeed-green transition-colors scale-hover block">{t('contact') as string}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-center md:text-left">&copy; {new Date().getFullYear()} HiFeed. {t('copyright') as string}</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-hifeed-light w-10 h-10 rounded-xl flex items-center justify-center hover:bg-hifeed-green/20 transition-all scale-hover" aria-label="LinkedIn">
                               <span className="text-sm font-bold text-hifeed-green">in</span>
                            </a>
                            <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-hifeed-light w-10 h-10 rounded-xl flex items-center justify-center hover:bg-hifeed-green/20 transition-all scale-hover" aria-label="Instagram">
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
