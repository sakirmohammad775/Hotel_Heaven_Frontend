import React from 'react';

const Gastronomy = () => {
  const menuItems = ["RESTAURANT.", "TAPAS MENU.", "WINE & DRINKS.", "BREAD BAKER."];

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 font-serif">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Content Side */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-stone-400"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-stone-500 font-sans">Restaurant</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl text-stone-800 uppercase font-light tracking-wide mb-10">
            Gastronomy.
          </h2>
          
          <div className="space-y-6 mb-12">
            <p className="text-xl text-stone-700 italic leading-relaxed">
              Gastronomic experiences conceived to create unique moments.
            </p>
            <p className="text-sm text-stone-500 font-sans leading-relaxed max-w-md">
              Dine a tasting menu in our renowned Michelin Star restaurant, enjoy some 
              tapas with the best views of Lanzarote, taste our freshly baked artisan bread 
              or start the day with our breakfast served in the villa.
            </p>
          </div>

          {/* Layered Food Image (Small) */}
          <div className="hidden md:block self-end w-64 h-80 overflow-hidden shadow-2xl z-10 -mr-12 -mt-12">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80" 
              alt="Plated dish" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Menu Navigation */}
          <div className="space-y-4 mt-8 md:-mt-20">
            {menuItems.map((item) => (
              <button 
                key={item} 
                className="block text-xl md:text-2xl text-stone-800 hover:text-[#b1a494] transition-colors tracking-widest text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Right Image Side */}
        <div className="lg:w-1/2 relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
              alt="Outdoor dining" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Michelin Badge */}
          <div className="absolute bottom-12 left-12 bg-[#be1e2d] text-white p-6 flex flex-col items-center justify-center">
            <div className="text-2xl mb-1">✽</div>
            <div className="text-xs font-sans font-bold tracking-[0.2em] uppercase">Michelin</div>
            <div className="text-sm font-sans tracking-[0.1em]">2024</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gastronomy;