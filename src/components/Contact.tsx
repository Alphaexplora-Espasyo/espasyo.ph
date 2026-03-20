// src/components/Contact.tsx
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';
import { MapPin, Phone, Mail, Facebook, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const container = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    // --- FORM STATE LOGIC ---
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage({ type: '', text: '' });

        try {
            // Send to the Next.js/Vercel serverless function
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    company: "N/A (Espasyo Inquiry)",
                    service: "Espasyo Inquiry",
                    details: formData.message
                }),
            });

            if (response.ok) {
                setStatusMessage({ type: 'success', text: 'Thank you! Your inquiry has been sent.' });
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to send');
            }
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    // --- NUCLEAR SCROLL RESET ---
    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        gsap.fromTo(container.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );
        gsap.fromTo(".contact-card",
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
        );
        // FIX: Use fromTo and a specific class name for safety
        gsap.fromTo(".form-animate",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.6, ease: "power2.out" }
        );
    }, { scope: container });

    const handleBack = () => {
        navigate('/', {
            state: {
                skipIntro: true,
                scrollToSection: 'services'
            }
        });
    };

    return (
        <div ref={container} className="min-h-screen bg-[#FDF4DC] text-[#3A2618] flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-24 relative">

                <div className="md:w-1/4 lg:w-1/5 flex flex-col z-20 pb-8 h-full">
                    <button onClick={handleBack} className="absolute top-28 left-8 md:left-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#DDA79A] transition-colors z-10 opacity-80">
                        <span>←</span> Back
                    </button>
                </div>

                <div className="contact-card w-full max-w-6xl bg-[#FDF4DC] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
                    {/* LEFT SIDE: INFO */}
                    <div className="w-full md:w-1/2 bg-[#3E4A35] text-[#FDF4DC] p-8 md:p-12 flex flex-col relative overflow-hidden">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#DDA79A]/10 rounded-full blur-3xl" />
                        <div className="relative z-10 flex flex-col h-full">
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-2 text-[#DDA79A]">Espasyo</h2>
                            <p className="font-body text-xs tracking-[0.2em] uppercase opacity-70 mb-12">Study & Office Hub</p>

                            <div className="flex flex-col gap-8 mb-12">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#FDF4DC]/10 rounded-full group-hover:bg-[#DDA79A] group-hover:text-[#3A2618] transition-colors"><MapPin size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#DDA79A]">Visit Us</h3><p className="text-sm opacity-80 leading-relaxed max-w-xs">6A T. Bugallon Street, Marikina Heights,<br />Marikina City, Philippines</p></div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#FDF4DC]/10 rounded-full group-hover:bg-[#DDA79A] group-hover:text-[#3A2618] transition-colors"><Phone size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#DDA79A]">Call Us</h3><p className="text-sm opacity-80">0916 611 2928</p><p className="text-sm opacity-80">700 600 42</p></div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#FDF4DC]/10 rounded-full group-hover:bg-[#DDA79A] group-hover:text-[#3A2618] transition-colors"><Mail size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#DDA79A]">Email Us</h3><p className="text-sm opacity-80">inquiry@espasyo.com</p></div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <a href="https://www.facebook.com/espasyostudynofficehub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest hover:text-[#DDA79A] transition-colors">
                                    <Facebook size={18} /><span>Follow on Facebook</span>
                                </a>
                                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-[#FDF4DC]/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.2796443493134!2d121.1147575114704!3d14.640050876115993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b9a528a49c95%3A0xc02e3b1c678ec09a!2sEspasyo%20Study%20%26%20Office%20Hub!5e0!3m2!1sen!2sph!4v1709123456789!5m2!1sen!2sph"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: FORM */}
                    <div className="w-full md:w-1/2 bg-[#FDF4DC] text-[#3A2618] p-8 md:p-12 flex flex-col relative pb-16">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#3A2618]/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="max-w-md mx-auto w-full relative z-10 py-4">
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-2">Get in Touch</h2>
                            <p className="font-body text-sm opacity-70 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                            {/* Status Message Display */}
                            {/* Status Message Display */}
                            {statusMessage.text && (
                                <div className={`mb-6 p-4 rounded-xl border-2 flex items-center justify-center text-center font-display text-xs font-bold uppercase tracking-widest transition-all ${statusMessage.type === 'success'
                                        ? 'bg-[#3E4A35]/10 border-[#3E4A35]/30 text-[#3A2618]'
                                        : 'bg-[#B56A54]/10 border-[#B56A54]/30 text-[#B56A54]'
                                    }`}>
                                    {statusMessage.type === 'success' ? '✓ ' : '⚠ '} {statusMessage.text}
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 pb-6">
                                {/* First Name & Last Name */}
                                <div className="flex gap-4 form-animate">
                                    <div className="group w-1/2">
                                        <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#B56A54] transition-all">First Name</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#3A2618]/20 py-3 text-lg focus:outline-none focus:border-[#B56A54] transition-colors placeholder:text-[#3A2618]/30" placeholder="John" />
                                    </div>
                                    <div className="group w-1/2">
                                        <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#B56A54] transition-all">Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#3A2618]/20 py-3 text-lg focus:outline-none focus:border-[#B56A54] transition-colors placeholder:text-[#3A2618]/30" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="group form-animate">
                                    <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#B56A54] transition-all">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#3A2618]/20 py-3 text-lg focus:outline-none focus:border-[#B56A54] transition-colors placeholder:text-[#3A2618]/30" placeholder="hello@example.com" />
                                </div>

                                <div className="group form-animate">
                                    <label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#B56A54] transition-all">Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleInputChange} required className="w-full bg-transparent border-b-2 border-[#3A2618]/20 py-3 text-lg focus:outline-none focus:border-[#B56A54] transition-colors placeholder:text-[#3A2618]/30 min-h-[100px] resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="submit" disabled={isLoading} className="form-animate group mt-2 w-full py-4 bg-[#3A2618] text-[#DDA79A] border-2 border-[#3A2618] rounded-xl font-bold uppercase tracking-widest hover:bg-[#DDA79A] hover:text-[#3A2618] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                                    <span>{isLoading ? 'Sending...' : 'Send Inquiry'}</span>
                                    {!isLoading && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;