import React from 'react';

const DivingSection = () => {
  return (
    <section className="flex flex-col md:flex-row min-h-[600px] w-full font-serif">
      {/* Left Image Side: Pool View */}
      <div className="md:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" 
          alt="Luxury Pool View" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content Side: Deep Charcoal Background */}
      <div className="md:w-1/2 bg-[#1e2d35] text-white flex flex-col items-center justify-center p-12 text-center relative">
        {/* Wave Icon */}
        <div className="mb-6 opacity-80">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M2 12c3-2 6 2 9 0s6-2 9 0" />
            <path d="M2 16c3-2 6 2 9 0s6-2 9 0" />
            <path d="M2 8c3-2 6 2 9 0s6-2 9 0" />
          </svg>
        </div>

        <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-sans mb-4">Diving</span>
        <h2 className="text-4xl md:text-5xl uppercase tracking-widest font-light mb-8">
          Underwater Wonders
        </h2>

        {/* Featured Turtle Image */}
        <div className="w-full max-w-md aspect-video mb-8 overflow-hidden border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80" 
            alt="Sea Turtle" 
            className="w-full h-full object-cover"
          />
        </div>

        <p className="max-w-sm text-sm text-stone-400 font-sans leading-relaxed mb-10">
          Dive into the depths of the Indian Ocean, where vibrant marine life awaits. 
          From graceful manta rays to majestic whale sharks, every encounter promises 
          unforgettable memories.
        </p>

        <button className="bg-white text-[#1e2d35] px-12 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-[#b1a494] hover:text-white transition-all">
          Explore
        </button>

        {/* Vertical Pagination Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {['1', '2', '3'].map((num) => (
            <div 
              key={num} 
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] cursor-pointer transition-all
                ${num === '1' ? 'bg-[#b1a494] border-[#b1a494]' : 'border-stone-600 hover:border-white'}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivingSection;