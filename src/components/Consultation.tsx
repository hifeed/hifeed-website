"use client";
import React, { useState } from 'react';

const Consultation: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        cattleCount: '',
        goals: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [shake, setShake] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.cattleCount) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({ name: '', email: '', phone: '', location: '', cattleCount: '', goals: '' });
            setTimeout(() => setShowSuccess(false), 4000);
        }, 1000);
    };

    return (
        <>
            {showSuccess && (
                <div className="fixed top-20 right-4 bg-hifeed-green text-white px-6 py-4 rounded-xl shadow-lg z-50 animate-slide-in-right">
                    <div className="flex items-center space-x-3">
                        <span className="text-xl bounce-gentle">🎉</span>
                        <div>
                            <div className="font-bold">Success!</div>
                            <div className="text-sm opacity-90">We&apos;ll contact you within 24 hours</div>
                        </div>
                    </div>
                </div>
            )}
            <section id="consultation" className={`py-20 bg-white ${shake ? 'shake' : ''}`}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-hifeed-light rounded-2xl p-8 shadow-xl fade-in-up">
                        <h2 className="text-3xl font-bold mb-6 text-hifeed-green">Free Consultation</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name*" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email*" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone*" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                            <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location*" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                            <input type="number" name="cattleCount" value={formData.cattleCount} onChange={handleInputChange} placeholder="Number of Cattle*" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                            <textarea name="goals" value={formData.goals} onChange={handleInputChange} placeholder="Your Goals" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-hifeed-green" />
                            <button type="submit" disabled={isSubmitting} className="bg-hifeed-green hover:bg-hifeed-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all scale-hover w-full">
                                {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Consultation;
