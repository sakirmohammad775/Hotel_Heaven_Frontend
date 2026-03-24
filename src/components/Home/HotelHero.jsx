import React from 'react';

const HotelHero = () => {
  return (
    <section className="bg-[#fdfcf9] py-20 px-6 md:px-12 lg:px-24 text-center font-serif">
      {/* Decorative Top Line */}
      <div className="flex justify-center mb-12">
        <div className="w-[1px] h-20 bg-stone-300"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header Text */}
        <h2 className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-600 mb-8">
          Welcome to Carmelina Hotel
        </h2>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-stone-800 leading-tight mb-10 font-light uppercase tracking-wide">
          Nestled in Pogonia Paleros along the <br className="hidden md:block" />
          shores of the Ionian Sea, a luxury villas <br className="hidden md:block" />
          that harmonises sustainable design with <br className="hidden md:block" />
          unparalleled elegance.
        </h1>

        {/* Body Paragraph */}
        <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-12 font-sans font-light">
          Carmelina Hotels & Resorts is a modern, upscale hospitality company that is passionate 
          about ‘making moments’, recognising that small gestures make a big difference to our 
          guests, our owners and our people. We do ordinary things in an extraordinary way – a 
          philosophy that has defined our brand’s success from the very start.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-[#1e2d35] text-white px-10 py-4 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-stone-700">
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
        <button className="absolute right-0 bottom-0 bg-[#b1a494] text-white p-4 rounded-full shadow-lg hover:bg-[#a19484] transition-all">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HotelHero;