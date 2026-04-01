const Address = () => {
  return (
    <div className="bg-black p-10 min-h-screen">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-[#fcfbf9] lowercase italic tracking-tight">
          Our <span className="text-[#b1a494]">Location</span>
        </h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-2">Global Coordinates & Reach</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#b1a494] mb-4 font-bold">Physical Address</h4>
            <p className="text-xl text-stone-200 font-light leading-relaxed font-serif tracking-wide">
              Plot 42, Marine Drive <br />
              VIP Enclave, Chattogram <br />
              Bangladesh, 4000
            </p>
          </div>

          {/* Border changed to stone-900 to blend with black bg */}
          <div className="flex gap-12 border-t border-stone-900 pt-8">
            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-stone-500 mb-2">Latitude</h4>
              <p className="text-sm text-stone-300 font-mono">22.3475° N</p>
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-widest text-stone-500 mb-2">Longitude</h4>
              <p className="text-sm text-stone-300 font-mono">91.8123° E</p>
            </div>
          </div>
        </div>

        {/* Map area now looks like a luxury dark satellite screen */}
        <div className="aspect-[4/5] bg-stone-900/30 border border-stone-800 flex flex-col items-center justify-center grayscale group hover:grayscale-0 transition-all duration-1000">
           <div className="w-1 h-1 bg-[#b1a494] rounded-full animate-ping mb-4"></div>
           <span className="text-[9px] uppercase tracking-[0.6em] text-stone-600 group-hover:text-[#b1a494] transition-colors">
             Map Satellite View
           </span>
        </div>
      </div>
    </div>
  );
};

export default Address;