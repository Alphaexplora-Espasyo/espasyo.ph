// src/components/Contact.tsx
import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';
import { MapPin, Phone, Mail, Facebook, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const container = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

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
        gsap.from(".contact-card", {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });
        gsap.from(formRef.current?.children || [], {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.6,
            ease: "power2.out"
        });
    }, { scope: container });

    const handleBack = () => {
        navigate('/', {
            state: {
                skipIntro: true,
                scrollToSection: 'services' // Changed to 'our-story' (ID usually doesn't need # in state logic depending on implementation, but kept standard string)
            }
        });
    };
    return (
        <div ref={container} className="min-h-screen bg-[#2C3628] text-[#F0EAD6] flex flex-col">
            <Navbar theme="brown" />

            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-24 relative">

                <div className="md:w-1/4 lg:w-1/5 flex flex-col z-20 pb-8 h-full">
                    <button onClick={handleBack} className="absolute top-28 left-8 md:left-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4A373] transition-colors z-10 opacity-80">
                        <span>←</span> Back
                    </button>
                </div>

                <div className="contact-card w-full max-w-6xl bg-[#F0EAD6] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
                    {/* LEFT SIDE: INFO */}
                    <div className="w-full md:w-1/2 bg-[#3E4A35] text-[#F0EAD6] p-8 md:p-12 flex flex-col relative overflow-hidden">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4A373]/10 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-2 text-[#D4A373]">Espasyo</h2>
                            <p className="font-body text-xs tracking-[0.2em] uppercase opacity-70 mb-12">Study & Office Hub</p>

                            <div className="flex flex-col gap-8 mb-12">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#F0EAD6]/10 rounded-full group-hover:bg-[#D4A373] group-hover:text-[#2C3628] transition-colors"><MapPin size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#D4A373]">Visit Us</h3><p className="text-sm opacity-80 leading-relaxed max-w-xs">6A T. Bugallon Street, Marikina Heights,<br />Marikina City, Philippines</p></div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#F0EAD6]/10 rounded-full group-hover:bg-[#D4A373] group-hover:text-[#2C3628] transition-colors"><Phone size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#D4A373]">Call Us</h3><p className="text-sm opacity-80">0916 611 2928</p><p className="text-sm opacity-80">700 600 42</p></div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#F0EAD6]/10 rounded-full group-hover:bg-[#D4A373] group-hover:text-[#2C3628] transition-colors"><Mail size={20} /></div>
                                    <div><h3 className="font-bold text-sm uppercase tracking-wider mb-1 text-[#D4A373]">Email Us</h3><p className="text-sm opacity-80">inquiry@espasyo.com</p></div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <a href="https://www.facebook.com/espasyostudynofficehub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest hover:text-[#D4A373] transition-colors">
                                    <Facebook size={18} /><span>Follow on Facebook</span>
                                </a>
                                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-[#F0EAD6]/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
                                    {/* Updated to a valid secure placeholder to avoid mixed content warnings */}
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.200567087814!2d121.116667!3d14.646111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM4JzQ2LjAiTiAxMjHCsDA3JzAwLjAiRQ!5e0!3m2!1sen!2sph!4v1600000000000!5m2!1sen!2sph"
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
                    <div className="w-full md:w-1/2 bg-[#F0EAD6] text-[#2C3628] p-8 md:p-12 flex flex-col justify-center relative">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2C3628]/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="max-w-md mx-auto w-full relative z-10">
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-2">Get in Touch</h2>
                            <p className="font-body text-sm opacity-70 mb-10">Fill out the form below and we'll get back to you shortly.</p>
                            <form ref={formRef} className="flex flex-col gap-6">
                                <div className="group"><label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#C87941] transition-all">Your Name</label><input type="text" className="w-full bg-transparent border-b-2 border-[#2C3628]/20 py-3 text-lg focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-[#2C3628]/30" placeholder="John Doe" /></div>
                                <div className="group"><label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#C87941] transition-all">Email Address</label><input type="email" className="w-full bg-transparent border-b-2 border-[#2C3628]/20 py-3 text-lg focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-[#2C3628]/30" placeholder="hello@example.com" /></div>
                                <div className="group"><label className="block font-display text-xs font-bold uppercase tracking-widest mb-2 opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#C87941] transition-all">Message</label><textarea className="w-full bg-transparent border-b-2 border-[#2C3628]/20 py-3 text-lg focus:outline-none focus:border-[#C87941] transition-colors placeholder:text-[#2C3628]/30 min-h-[120px] resize-none" placeholder="How can we help you?"></textarea></div>
                                <button className="group mt-6 w-full py-4 bg-[#2C3628] text-[#F0EAD6] rounded-xl font-bold uppercase tracking-widest hover:bg-[#3E4A35] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"><span>Send Message</span><Send size={18} className="group-hover:translate-x-1 transition-transform" /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;