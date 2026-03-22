import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import { useContactAnimations } from '../hooks/useContactAnimations';
interface ContactProps {
  hideNavbar?: boolean;
}

const Contact = ({ hideNavbar = false }: ContactProps) => {
  const { formState, isSubmitting, submitted, handleChange, handleSubmit } = useContactForm();
  const { containerRef, contentRef, formRef } = useContactAnimations();

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDF4DC] text-[#3A2618] selection:bg-[#3A2618] selection:text-[#FDF4DC]">
      {!hideNavbar && <Navbar theme="default" />}

      <main className="pt-16 pb-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Subtle Divider at Top of Form (When embedded) */}
        {hideNavbar && (
          <div className="w-full flex justify-center mb-16 opacity-0 animate-[fade-in_1s_ease-out_forwards]">
             <div className="w-16 h-[1px] bg-[#4B533E]/20" />
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT: CONTENT */}
          <div ref={contentRef} className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl font-display uppercase tracking-tighter leading-[0.9]">
                Let's Build <br />
                <span className="text-[#4B533E]">Something Great</span>
              </h1>
              <p className="text-xl text-[#3A2618]/70 font-body leading-relaxed max-w-md">
                Whether you're looking for a workspace, I.T. solutions, or professional accounting support, we're here to help you grow.
              </p>
            </div>

            <div className="space-y-8">
              <div className="contact-info-item flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#4B533E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4B533E] group-hover:text-[#FDF4DC] transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#4B533E] mb-1">Email Us</p>
                  <p className="text-xl font-display uppercase tracking-wide">hello@espasyo.ph</p>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#4B533E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4B533E] group-hover:text-[#FDF4DC] transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#4B533E] mb-1">Call Us</p>
                  <p className="text-xl font-display uppercase tracking-wide">+63 917 123 4567</p>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-[#4B533E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4B533E] group-hover:text-[#FDF4DC] transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#4B533E] mb-1">Visit Us</p>
                  <p className="text-xl font-display uppercase tracking-wide">
                    2nd Floor, ABC Building,<br />
                    Cebu City, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#4B533E]/5 rounded-[2rem] -rotate-1" />
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-[#FDF4DC] p-8 sm:p-12 rounded-[2rem] border border-[#3A2618]/10 shadow-xl space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#4B533E]">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-[#3A2618]/10 py-3 focus:border-[#4B533E] outline-none transition-colors font-body text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#4B533E]">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-[#3A2618]/10 py-3 focus:border-[#4B533E] outline-none transition-colors font-body text-lg"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#4B533E]">Company (Optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-[#3A2618]/10 py-3 focus:border-[#4B533E] outline-none transition-colors font-body text-lg"
                    placeholder="Example Corp"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#4B533E]">Interest</label>
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-[#3A2618]/10 py-3 focus:border-[#4B533E] outline-none transition-colors font-body text-lg appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="coworking">Coworking Space</option>
                    <option value="it">I.T. Services</option>
                    <option value="accounting">Accounting & Tax</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#4B533E]">Message</label>
                <textarea
                  required
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-[#3A2618]/10 py-3 focus:border-[#4B533E] outline-none transition-colors font-body text-lg resize-none"
                  placeholder="Tell us more about your needs..."
                />
              </div>

              <button
                disabled={isSubmitting || submitted}
                type="submit"
                className={`w-full py-6 rounded-2xl font-display text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden relative group
                  ${submitted 
                    ? 'bg-[#4B533E] text-[#FDF4DC]' 
                    : 'bg-[#3A2618] text-[#FDF4DC] hover:bg-[#4B533E] active:scale-[0.98]'
                  }
                  ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}
                `}
              >
                <div className={`absolute inset-0 bg-[#FDF4DC]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500`} />
                
                {submitted ? (
                  <>
                    <CheckCircle2 size={24} className="animate-scale-up" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} className={`${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;