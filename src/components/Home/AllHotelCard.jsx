import { useNavigate } from 'react-router-dom';

const AllHotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/hotels/${hotel.id}`)}
      className="group relative w-full min-h-[500px] mb-24 cursor-pointer flex flex-col md:flex-row items-center"
    >
      {/* --- Image Container (Background) --- */}
      <div className="w-full md:w-[60%] h-[400px] md:h-[550px] overflow-hidden relative rounded-sm shadow-2xl">
        <img 
          src={
            hotel.images?.[0]?.image || 
            "https://images.unsplash.com/photo-1566073771259-6a8506099945"
          } 
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
        />
        {/* Subtle Darkening Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>

      {/* --- Floating Info Block --- */}
      <div className="w-[90%] md:w-[30%] bg-[#fce0c0] h-[90%] p-8 md:p-14 md:absolute md:left-[45%] z-10 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
        
        {/* Title Section */}
        <h2 className="text-3xl md:text-3xl font-serif text-stone-900 mb-8 leading-tight">
          {hotel.name}
        </h2>

        {/* Detailed Stats (Exact copy of your image layout) */}
        <div className="space-y-2 mb-10">
          <p className="text-sm text-stone-800 font-sans">
            <span className="font-semibold">Quantity of rooms:</span> {hotel.available_rooms || 20}
          </p>
          <p className="text-sm text-stone-800 font-sans">
            <span className="font-semibold">Guests:</span> 3 adults 1 child
          </p>
          <p className="text-sm text-stone-800 font-sans">
            <span className="font-semibold">Average area:</span> 55 m²
          </p>
        </div>

        {/* Decorative Link */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-sm font-serif italic text-stone-900">
            Get More Information
          </span>
          <div className="w-12 h-[1px] bg-stone-900"></div>
        </div>

        {/* Price Section */}
        <div className="flex items-end justify-between mb-10">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-serif text-stone-900">${hotel.price_with_tax}</span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-stone-900 font-black">
            PER 1 NIGHT
          </span>
        </div>

        {/* Action Button (Transparent Border Style) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/hotels/${hotel.id}`);
          }}
          className="w-full py-4 border border-stone-900 text-stone-900 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-stone-900 hover:text-white transition-all duration-300"
        >
          Book Your Stay
        </button>
      </div>

      {/* Background location text (Decorative) */}
      <div className="hidden md:block absolute -left-10 top-1/2 -rotate-90 origin-center">
        <span className="text-[10px] uppercase tracking-[1em] text-stone-700 opacity-40 font-black">
          {hotel.location}
        </span>
      </div>
    </div>
  );
};

export default AllHotelCard;