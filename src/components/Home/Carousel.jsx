import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const roomData = [
    {
      id: 1,
      type: "Deluxe Room",
      price: "249",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
    },
    {
      id: 2,
      type: "Signature Room",
      price: "299",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    },
    {
      id: 3,
      type: "Luxury Suite Room",
      price: "399",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    }
  ];

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % roomData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      {roomData.map((room, index) => (
        <div
          key={room.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0">
            <img 
              src={room.image} 
              className="h-full w-full object-cover brightness-[0.7]" 
              alt={room.type} 
            />
            {/* Dark Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex h-full items-center px-12 md:px-24">
            {/* Left Side: Static Label */}
            <div className="w-1/2">
              <h1 className="font-serif text-5xl md:text-7xl text-white tracking-wide">
                Our Rooms
              </h1>
            </div>

            {/* Right Side: Dynamic Room Details */}
            <div className="w-1/2 flex flex-col items-center text-center space-y-12">
              {roomData.map((item, i) => (
                <div 
                  key={item.id}
                  className={`transition-all duration-700 transform ${
                    i === activeSlide 
                    ? "scale-110 opacity-100 translate-y-0" 
                    : "scale-90 opacity-40 translate-y-4"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-stone-300 mb-2">
                    FROM ${item.price}/NIGHT
                  </p>
                  <h2 className="font-serif text-2xl md:text-4xl text-white cursor-pointer hover:text-[#b1a494] transition-colors">
                    {item.type}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators (Bottom Center) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {roomData.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`h-[2px] transition-all duration-500 ${
              i === activeSlide ? "w-12 bg-white" : "w-8 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;