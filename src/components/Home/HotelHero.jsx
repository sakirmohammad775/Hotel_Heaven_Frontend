import React from 'react';
// Import your image from assets folder
import heroBg from '../../assets/img-1.jpg'; 

const HotelHero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Static Background Image Layer */}
      <div className="absolute opacity-20 inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxury Resort" 
          className="w-full h-full object-cover " // Low opacity to keep text readable
        />
      </div>

      <div className="relative z-10  py-20 px-6 md:px-12 lg:px-24 text-center font-serif min-h-[80vh] flex flex-col justify-center">
        {/* Decorative Top Line */}
        <div className="flex justify-center mb-12">
          <div className="w-[1px] h-20 bg-stone-300 animate-pulse"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header Text */}
          <h2 className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#b1a494] mb-8 font-semibold">
            Welcome to Carmelina Hotel
          </h2>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl text-gray-200 leading-tight mb-10 font-light uppercase tracking-tight">
            Nestled in Pogonia Paleros along the <br className="hidden md:block" />
            shores of the Ionian Sea, a luxury villas <br className="hidden md:block" />
        
          </h1>

          {/* Body Paragraph */}
          <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12 font-sans font-light">
            Carmelina Hotels & Resorts is a modern, upscale hospitality company that is passionate 
            about ‘making moments’, recognizing that small gestures make a big difference. 
            We do ordinary things in an extraordinary way.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button className="bg-[#1e2d35] text-white px-12 py-5 text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-[#b1a494] hover:scale-105 active:scale-95 shadow-xl">
              Discovery More
            </button>
          </div>
        </div>

        {/* Decorative Bottom Line & Scroll Top Button */}
        <div className="relative mt-20">
          <div className="flex justify-center">
            <div className="w-[1px] h-20 bg-stone-300"></div>
          </div>
          
          {/* Floating Scroll-to-Top Button */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute right-0 bottom-0 bg-[#b1a494] text-white p-4 rounded-full shadow-lg hover:bg-[#1e2d35] transition-all transform hover:-translate-y-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotelHero;