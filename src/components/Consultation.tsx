"use client";
import React, { useState } from 'react';
import { useTranslations } from "../i18n/LocaleProvider";

const Consultation: React.FC = () => {
    const t = useTranslations('consultation');
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        farmName: '',
        location: '',
        herdSize: '',
        feedType: '',
        dailyFeed: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shake, setShake] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.whatsapp || !formData.farmName || !formData.location) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            alert(t('requiredAlert') as string);
            return;
        }
        setIsSubmitting(true);

        // Send to Slack in background (fire-and-forget)
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }).catch(() => {});

        const phone = '6285117626252'; // Indonesian format without +
        const msg = `Halo HiFeed,%0A%0ASaya ingin konsultasi.%0A%0ANama: ${encodeURIComponent(formData.name)}%0ANomor WA: ${encodeURIComponent(formData.whatsapp)}%0ANama Peternakan: ${encodeURIComponent(formData.farmName)}%0ALokasi: ${encodeURIComponent(formData.location)}%0A${formData.herdSize ? `Populasi Ternak: ${encodeURIComponent(formData.herdSize)}%0A` : ''}${formData.feedType ? `Pakan Digunakan: ${encodeURIComponent(formData.feedType)}%0A` : ''}${formData.dailyFeed ? `Konsumsi Pakan/Hari/Sapi (kg): ${encodeURIComponent(formData.dailyFeed)}` : ''}`;
        const url = `https://wa.me/${phone}?text=${msg}`;
        window.location.href = url;
        setTimeout(() => setIsSubmitting(false), 1000);
    };

    return (
        <section id="consultation" className={`py-20 bg-white ${shake ? 'shake' : ''}`}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-hifeed-light rounded-2xl p-8 shadow-xl fade-in-up">
                    <h2 className="text-3xl font-bold mb-6 text-hifeed-green">{t('title') as string}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('name') as string || 'Nama*'} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                        <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder={t('whatsapp') as string || 'Nomor WA*'} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                        <input type="text" name="farmName" value={formData.farmName} onChange={handleInputChange} placeholder={t('farmName') as string} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder={t('location') as string} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                        <input type="number" name="herdSize" value={formData.herdSize} onChange={handleInputChange} placeholder={t('herdSize') as string} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                        <input type="text" name="feedType" value={formData.feedType} onChange={handleInputChange} placeholder={t('feedType') as string} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                        <input type="number" name="dailyFeed" value={formData.dailyFeed} onChange={handleInputChange} placeholder={t('dailyFeed') as string} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                        <button type="submit" disabled={isSubmitting} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all scale-hover w-full">
                            {isSubmitting ? '...' : (t('submit') as string)}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Consultation;
