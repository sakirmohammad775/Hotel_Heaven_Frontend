import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiMessageSquare } from "react-icons/fi";

const Support = () => {
  return (
    <section className="bg-black min-h-screen text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section (Editorial Style) --- */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#b1a494]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b1a494] font-black">
              Guest Relations
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter mb-6">
            How May We <span className="text-[#b1a494]">Assist?</span>
          </h1>
          <p className="text-stone-400 max-w-2xl font-light leading-relaxed">
            Our dedicated concierge team is available 24/7 to ensure your experience with Carmelína is seamless, sophisticated, and tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- Left Side: Contact Cards (Peach Theme) --- */}
          <div className="space-y-6">
            <div className="bg-[#fce0c0] p-10 shadow-2xl group transition-all hover:-translate-y-1">
              <h2 className="text-2xl font-serif text-stone-900 mb-8 border-b border-stone-300 pb-4">
                Direct Contact
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-stone-400 flex items-center justify-center text-stone-900">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Call Us</p>
                    <p className="text-lg font-serif text-stone-900">+880 1234 567 890</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-stone-400 flex items-center justify-center text-stone-900">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Email</p>
                    <p className="text-lg font-serif text-stone-900">concierge@hotelheaven.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-white/10 p-10 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-serif mb-6 text-[#b1a494]">Visit Our Office</h3>
              <div className="flex gap-4 text-stone-400 font-light">
                <FiMapPin className="shrink-0 mt-1" />
                <p>123 Luxury Lane, GEC Circle,<br />Chattogram, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* --- Right Side: Support Form (Registration Style) --- */}
          <div className="bg-stone-950 p-10 md:p-14 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b1a494]/5 blur-[60px] rounded-full"></div>
            
            <form className="relative z-10 space-y-8">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Type your Name"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#b1a494] transition-colors placeholder:text-stone-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">Inquiry Type</label>
                <select className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#b1a494] appearance-none cursor-pointer">
                  <option className="bg-black">Booking Assistance</option>
                  <option className="bg-black">Technical Support</option>
                  <option className="bg-black">Special Requests</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">Message</label>
                <textarea 
                  rows="4"
                  placeholder="How can we help you today?"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#b1a494] transition-colors placeholder:text-stone-800 resize-none"
                ></textarea>
              </div>

              <button className="w-full py-5 bg-[#b1a494] text-black text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-white hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#b1a494]/10">
                Send Inquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Support;