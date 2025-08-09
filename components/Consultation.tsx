
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
                            <div className="text-sm opacity-90">We'll contact you within 24 hours</div>
                        </div>
                    </div>
                </div>
            )}
            <section id="consultation" className="py-20 bg-hifeed-green text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in-up">
                        <div className="bg-white/20 inline-block px-4 py-2 rounded-full text-white font-semibold mb-6 pulse-scale">
                            🚀 Transform Your Farm
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Lead the <span className="text-yellow-300">Revolution?</span></h2>
                        <p className="text-xl opacity-90 mb-8">Join the sustainable farming revolution. Transform your operation with HiFeed's breakthrough technology.</p>
                    </div>
                    <div className={`bg-white/10 rounded-2xl p-8 lg:p-12 scale-hover ${shake ? 'shake' : ''}`}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-white/90 mb-2">Full Name *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your complete name" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-white/90 mb-2">Email Address *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-white/90 mb-2">Phone Number *</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+62 xxx xxx xxxx" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-white/90 mb-2">Farm Location *</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="City, Province" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-white/90 mb-2">Number of Cattle *</label>
                                <input type="number" name="cattleCount" value={formData.cattleCount} onChange={handleInputChange} placeholder="e.g., 50" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-white/90 mb-2">Current Challenges & Goals</label>
                                <textarea name="goals" value={formData.goals} onChange={handleInputChange} placeholder="Tell us about your current feeding challenges, costs, and what you hope to achieve..." rows={4} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all"></textarea>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-500 disabled:cursor-not-allowed text-hifeed-green px-8 py-4 rounded-xl text-lg font-bold transition-all scale-hover pulse-scale">
                                {isSubmitting ? 'Submitting...' : 'Request Free Transformation Consultation →'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Consultation;
