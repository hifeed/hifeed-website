"use client";

import React from 'react';
import { useMedia, useTranslations } from "../i18n/LocaleProvider";

const Stories: React.FC = () => {
    const t = useTranslations('stories');
    const { storyImages } = useMedia();
    return (
        <section id="stories" className="py-20 bg-hifeed-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 fade-in-up">
                    <div className="bg-hifeed-accent/10 inline-block px-4 py-2 rounded-full text-hifeed-accent font-semibold mb-6 wiggle">
                        🗣️ {t('badge') as string}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{t('titleA') as string} <span className="text-hifeed-green">{t('titleB') as string}</span></h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('subtitle') as string}</p>
                </div>
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl scale-hover">
                    <div className="flex flex-col">
                        <div className="bg-hifeed-light p-4 flex items-center justify-center w-full">
                            <div className="grid grid-cols-4 gap-4 w-full max-w-5xl">
                                {storyImages.map((image, i) => (
                                    <div key={`${i}-${image.src}`} className="rounded-2xl shadow-lg bg-white flex items-center justify-center aspect-[9/16] overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover"
                                            style={{ aspectRatio: '9/16' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 lg:p-12 slide-in-left">
                            <div className="text-hifeed-accent text-6xl mb-6 leading-none opacity-50">&ldquo;</div>
                            <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">{t('quote') as string}</p>
                            <div className="flex items-center space-x-4">
                                {/* Avatar changed to cowboy emoji */}
                                <div className="bg-hifeed-green rounded-2xl w-16 h-16 flex items-center justify-center text-white text-3xl bounce-gentle">
                                    <span role="img" aria-label="cowboy">🤠</span>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-1">{t('farmerName') as string}</h4>
                                    <p className="text-gray-600 mb-2">{t('farmerDesc') as string}</p>
                                    <div className="flex text-yellow-400 text-lg">
                                        <span>⭐️⭐️⭐️⭐️⭐️</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stories;
