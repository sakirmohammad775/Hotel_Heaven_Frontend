import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/hotel/${hotel.id}`)}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden group cursor-pointer rounded-sm"
    >
      {/* Background Image */}
      <img 
        src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"} 
        alt={hotel.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
        <span className="text-[10px] tracking-[0.4em] uppercase mb-4 opacity-80 font-sans">
          {hotel.location}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter text-center max-w-md">
          {hotel.name}
        </h2>
        
        {/* Animated Button that shows on hover */}
        <div className="mt-8 overflow-hidden">
          <button className="border border-white px-8 py-3 text-[10px] uppercase tracking-widest translate-y-20 group-hover:translate-y-0 transition-transform duration-500 bg-white text-black">
            Explore Hotel
          </button>
        </div>
      </div>

      {/* Small Badge for Availability */}
      <div className="absolute top-6 right-6 bg-[#b1a494] px-3 py-1 text-[9px] uppercase tracking-widest text-white">
        {hotel.available_rooms} Rooms Available
      </div>
    </div>
  );
};

export default HotelCard;