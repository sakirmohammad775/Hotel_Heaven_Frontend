import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/Api-Client';

; // We will create this next

const SpecificHotelPage = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the specific hotel and its rooms
    apiClient.get(`/hotels/${id}/`)
      .then((res) => {
        setHotelData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotel rooms:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-serif uppercase tracking-widest">Loading Paradise...</div>;
  if (!hotelData) return <div>Hotel not found.</div>;

  return (
    <div className="bg-[#f8f6f3] min-h-screen">
      {/* Hero Section for the Specific Hotel */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={hotelData.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80"} 
          className="w-full h-full object-cover" 
          alt={hotelData.name} 
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <span className="text-xs tracking-[0.5em] uppercase mb-4">{hotelData.location}</span>
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter">{hotelData.name}</h1>
        </div>
      </div>

      {/* Rooms Listing Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif uppercase text-[#1e2d35] mb-4">Available Suites</h2>
            <p className="text-stone-500 text-sm leading-relaxed italic">
              {hotelData.description || "Each room is designed to harmonize sustainable design with unparalleled elegance."}
            </p>
          </div>
          <div className="text-right">
             <span className="text-[10px] uppercase tracking-widest text-stone-400">Sort By:</span>
             <select className="bg-transparent border-none font-bold text-xs uppercase tracking-widest ml-2 outline-none">
                <option>Price: Low to High</option>
                <option>Luxury Level</option>
             </select>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Assuming your backend returns a 'rooms' array inside the hotel object */}
          {hotelData.rooms?.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificHotelPage;