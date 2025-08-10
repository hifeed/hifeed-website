import React from 'react';
import { useTranslations } from "../i18n/LocaleProvider";
import Image from 'next/image';

const Palatability: React.FC = () => {
  const t = useTranslations('palatability');
  return (
    <section id="palatability" className="py-20 bg-hifeed-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <div className="bg-hifeed-accent/10 inline-block px-4 py-2 rounded-full text-hifeed-accent font-semibold mb-6 wiggle">
            🐮 {t('badge') as string}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{t('title') as string}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('subtitle') as string}</p>
          <p className="text-gray-500 max-w-3xl mx-auto mt-2">{t('description') as string}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/cettle-feed-pellets.jpg" alt="HiFeed Pellets" width={1200} height={800} className="w-full h-auto object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
            {/* Embed Google Drive dengan rasio 16:9 agar tidak gepeng */}
            <div style={{ width: '100%', maxWidth: '700px', aspectRatio: '16/9', background: '#000', borderRadius: '1rem', overflow: 'hidden' }}>
              <iframe
                src="https://drive.google.com/file/d/1xTamyiCaRIt4kcBqMCc24GgtJQfx4MFO/preview"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Palatability;
