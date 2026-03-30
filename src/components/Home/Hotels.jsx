import { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiSliders } from "react-icons/fi";
import apiClient from '../../services/Api-Client';
import AllHotelCard from './AllHotelCard';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    setLoading(true);
    apiClient.get("/hotels/")
      .then((res) => {
        setHotels(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesSearch = 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = hotel.price_with_tax <= maxPrice;
      
      return matchesSearch && matchesPrice;
    });
  }, [hotels, searchQuery, maxPrice]);

  return (
    <section className="bg-stone-950 min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#b1a494] mb-4 font-black">
            The Carmelína Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-tighter mb-8">
            Destinations<span className="text-[#b1a494]">.</span>
          </h1>
        </div>

        {/* --- Search & Filter Bar --- */}
        <div className="mb-20 flex flex-col md:flex-row gap-6 items-end justify-between border-b border-white/5 pb-10">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-3 block">
              Search Destination
            </label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input 
                type="text"
                placeholder="Find a hotel or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-sm text-white outline-none focus:border-[#b1a494] transition-all placeholder:text-stone-600"
              />
            </div>
          </div>

          {/* Price Filter */}
          <div className="w-full md:w-1/3 group">
            <div className="flex justify-between mb-3">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                Max Price: <span className="text-[#b1a494]">${maxPrice}</span>
              </label>
              <FiSliders className="text-stone-500 group-hover:text-[#b1a494] transition-colors" />
            </div>
            <input 
              type="range"
              min="0"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#b1a494]"
            />
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="text-white font-serif italic text-xl animate-pulse tracking-widest">
              Curating your experience...
            </div>
          </div>
        ) : (
          <>
            <div className=" gap-8">
              {filteredHotels.map((hotel) => (
                <AllHotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {/* No Results found */}
            {filteredHotels.length === 0 && (
              <div className="text-center py-40 border border-dashed border-white/10 rounded-[3rem]">
                <p className="text-stone-500 font-light tracking-widest uppercase text-xs">
                  No destinations match your current criteria.
                </p>
                <button 
                  onClick={() => {setSearchQuery(""); setMaxPrice(1000);}}
                  className="mt-6 text-[#b1a494] text-[10px] uppercase tracking-widest border-b border-[#b1a494]"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Hotels;