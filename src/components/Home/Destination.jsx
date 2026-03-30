import React from 'react';

const Destination = () => {
  const activities = [
    {
      id: "01",
      title: "Hiking in the mountains",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    },
    {
      id: "02",
      title: "Skiing in the forest",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    },
    {
      id: "03",
      title: "Scenic Train Journeys",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    }
  ];

  return (
    <section className="bg-[#1e2d35] text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h4 className="text-[#b1a494] text-[10px] uppercase tracking-[0.4em] mb-6">
          Nearby Places
        </h4>
        <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
          Explore & experience <br /> 
          the magical places nearby our hotel
        </h2>
        
        <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] mb-10">
          Correspondingly during this time, there are a lot of parties, and happenings going on
        </p>

        <p className="text-stone-300 font-light leading-relaxed max-w-3xl mx-auto italic text-sm md:text-base">
          If you visit us in low-season, which ranges between end of April to mid-June and end of October 
          to mid-December, you will find a small sleepy village with about 5,000 locals, surrounded by 
          a quiet beautiful nature, where the bells of the blacknose sheep on the meadows around the 
          village are the only perceivable noise.
        </p>
      </div>

      {/* Activity Slider / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {activities.map((item, index) => (
          <div 
            key={item.id} 
            className={`relative group cursor-pointer transition-all duration-500 ${
              index === 1 ? 'scale-110 z-10' : 'scale-90 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="overflow-hidden aspect-[4/3]">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              <span className="text-6xl md:text-8xl font-serif text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {item.id}
              </span>
              <h3 className="relative z-10 text-xl font-serif tracking-wide group-hover:scale-110 transition-transform">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center gap-4 mt-16">
        <div className="w-8 h-[1px] bg-stone-700"></div>
        <div className="w-12 h-[2px] bg-white"></div>
        <div className="w-8 h-[1px] bg-stone-700"></div>
      </div>
    </section>
  );
};

export default Destination;