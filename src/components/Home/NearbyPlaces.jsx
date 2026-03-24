import React from 'react';

const locations = [
  { id: 1, name: 'Aburi Botanical Gardens', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Kwame Nkrumah Memorial Park', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Makola Market', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Coastal Lighthouse', img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80' }
];

const NearbyPlaces = () => {
  return (
    <section className="bg-[#f2f0ef] py-24 px-6 md:px-12 lg:px-24 font-serif">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Left Column Images */}
        <div className="space-y-8 order-2 md:order-1">
          <div className="relative overflow-hidden group aspect-[4/3]">
            <img src={locations[0].img} alt={locations[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">{locations[0].name}</div>
          </div>
          <div className="relative overflow-hidden group aspect-[4/5]">
            <img src={locations[2].img} alt={locations[2].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">{locations[2].name}</div>
          </div>
        </div>

        {/* Center Text Column */}
        <div className="text-center px-4 order-1 md:order-2">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-stone-400"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-stone-500 font-sans">Nearby Places</span>
            <div className="w-8 h-[1px] bg-stone-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl text-stone-800 uppercase font-light tracking-wide mb-8 leading-tight">
            Explore & <br /> Experience
          </h2>
          <p className="text-sm text-stone-500 font-sans leading-relaxed mb-10 max-w-xs mx-auto">
            When you travel and relax you can't miss the new discoveries tour, our hotel has a guided tour for tourists to explore the city, enjoy your stay one by one.
          </p>
          <button className="bg-[#1e2d35] text-white px-10 py-4 text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-stone-700">
            Discovery Tour
          </button>
        </div>

        {/* Right Column Images */}
        <div className="space-y-8 order-3">
          <div className="relative overflow-hidden group aspect-[4/5]">
            <img src={locations[1].img} alt={locations[1].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">{locations[1].name}</div>
          </div>
          <div className="relative overflow-hidden group aspect-[4/3]">
            <img src={locations[3].img} alt={locations[3].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">{locations[3].name}</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NearbyPlaces;