
const Hero = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10 transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')` }}
      ></div>

      {/* Central Content */}
      <div className="max-w-4xl px-6 animate-fadeIn">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-widest leading-tight mb-8">
          Luxury Redefined, <br /> Memories Created.
        </h2>

        {/* Circular Book Room Button */}
        <div className="relative group cursor-pointer mb-8 mx-auto w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center rounded-full bg-[#b1a494]/80 backdrop-blur-sm transition-all duration-300 hover:bg-[#a19484] hover:scale-110 shadow-2xl">
          <svg className="w-8 h-8 md:w-10 md:h-10 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M9 21V5a2 2 0 012-2h2a2 2 0 012 2v16M9 21h6" />
            <circle cx="12" cy="7" r="1" fill="currentColor" />
          </svg>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Book Room</span>
        </div>

        {/* Quote */}
        <p className="max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light italic opacity-90">
          When you get into a hotel room, you lock the door, and you know there is a secrecy, 
          there is a luxury, there is a fantasy. There is comfort. There is reassurance.
        </p>
      </div>

      {/* Award Badges */}
      <div className="absolute bottom-10 left-6 md:left-12 opacity-80 scale-75 md:scale-100 origin-left">
        <img src="https://via.placeholder.com/100x100?text=TripAdvisor" alt="TripAdvisor 2018" className="invert" />
      </div>
      <div className="absolute bottom-10 right-6 md:right-12 opacity-80 scale-75 md:scale-100 origin-right text-right">
        <div className="border border-white/50 rounded-full p-4 italic font-serif text-[10px]">
          Boutique <br /> Hotel Awards
        </div>
      </div>
    </section>
  );
};

export default Hero;