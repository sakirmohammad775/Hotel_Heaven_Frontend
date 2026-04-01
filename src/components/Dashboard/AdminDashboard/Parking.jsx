const Parking = () => {
  const rowStyle = "border-b border-stone-900 py-8 flex justify-between items-center";

  return (
    <div className="bg-black p-10 min-h-screen text-white">
      <header className="mb-12 text-center">
        <h2 className="text-3xl font-serif lowercase italic tracking-tighter">
          Valet <span className="text-[#b1a494]">& Security</span>
        </h2>
        <div className="h-[1px] w-12 bg-[#b1a494] mx-auto mt-4"></div>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className={rowStyle}>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#b1a494] mb-1">VIP Valet Service</h4>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest">Available 24/7 at main entrance</p>
          </div>
          <span className="text-xs tracking-widest font-light">Complimentary for Suites</span>
        </div>

        <div className={rowStyle}>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#b1a494] mb-1">Electric Charging</h4>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest">Universal & Tesla Superchargers</p>
          </div>
          <span className="text-xs tracking-widest font-light text-green-500/80 uppercase">Station 1-8 Open</span>
        </div>

        <div className={rowStyle}>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#b1a494] mb-1">Underground Secured</h4>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest">Climate controlled & 24hr Surveillance</p>
          </div>
          <span className="text-xs tracking-widest font-light">Self-Park Access</span>
        </div>
      </div>
    </div>
  );
};

export default Parking;