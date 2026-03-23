

const Carousel = () => {
  const [activeRoom, setActiveRoom] = useState(6);
  const rooms = [1, 2, 3, 4, 5, 6];

  return (
    <section className="bg-[#f2f0ef] py-20 px-6 md:px-12 lg:px-24 font-serif">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
        
        {/* Left Side: Main Heading and Description */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight mb-8 uppercase font-light tracking-wide">
            Enter our room <br />
            where every detail inspires <br />
            comfort and style.
          </h2>
          <p className="text-stone-500 font-sans text-sm md:text-base leading-relaxed max-w-lg font-light">
            All three of Rooms Hotels locations are restorations that translate historic locations 
            into places of contemporary comfort. Industrial architecture, salvaged building 
            materials and the unique approach.
          </p>
        </div>

        {/* Right Side: Room Capacity and Circular Navigation */}
        <div className="md:w-1/2 flex flex-col items-start md:items-end">
          <h3 className="text-stone-800 text-lg md:text-xl mb-6 font-light italic">
            Our 6 Rooms can Comfortably Accommodate Up to 14 People
          </h3>
          
          <div className="flex gap-3">
            {rooms.map((num) => (
              <button
                key={num}
                onClick={() => setActiveRoom(num)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
                  activeRoom === num 
                    ? 'bg-[#b1a494] border-[#b1a494] text-white' 
                    : 'border-stone-300 text-stone-600 hover:border-stone-500'
                }`}
              >
                {num < 10 ? `0${num}` : num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Image Placeholder Area */}
      <div className="mt-16 w-full h-[500px] bg-stone-300 relative overflow-hidden group">
         {/* In a real app, you would map through images based on activeRoom */}
         <div className="absolute inset-0 flex items-center justify-center text-stone-100 uppercase tracking-[0.5em]">
            Room {activeRoom} Preview
         </div>
         
         {/* Subtle Progress Line */}
         <div className="absolute bottom-0 left-0 h-1 bg-[#b1a494] transition-all duration-500" 
              style={{ width: `${(activeRoom / rooms.length) * 100}%` }}>
         </div>
      </div>
    </section>
  );
};

export default Carousel;