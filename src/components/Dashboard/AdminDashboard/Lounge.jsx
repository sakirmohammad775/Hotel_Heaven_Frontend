const Lounge = () => {
  return (
    <div className="bg-black p-10 min-h-screen text-white">
      <header className="mb-16">
        <h2 className="text-3xl font-serif lowercase italic tracking-tighter">
          Executive <span className="text-[#b1a494]">Lounge</span>
        </h2>
        <p className="text-[9px] uppercase tracking-[0.5em] text-stone-500 mt-2">Level 42 | Exclusive Access</p>
      </header>

      <div className="border border-stone-800 p-12 max-w-2xl bg-gradient-to-b from-stone-900/20 to-black">
        <h3 className="text-[#b1a494] text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">Privileges</h3>
        <ul className="space-y-8">
          <li className="flex items-start gap-6">
            <span className="text-[#b1a494] font-serif italic text-xl">01</span>
            <p className="text-xs uppercase tracking-widest leading-relaxed text-stone-300">Complimentary Sunset Cocktails & Hors d'oeuvres (17:00 - 19:00)</p>
          </li>
          <li className="flex items-start gap-6">
            <span className="text-[#b1a494] font-serif italic text-xl">02</span>
            <p className="text-xs uppercase tracking-widest leading-relaxed text-stone-300">Private Boardrooms & High-Speed Satellite Connectivity</p>
          </li>
          <li className="flex items-start gap-6">
            <span className="text-[#b1a494] font-serif italic text-xl">03</span>
            <p className="text-xs uppercase tracking-widest leading-relaxed text-stone-300">Dedicated 24-hour Concierge & Suit Pressing Service</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Lounge;