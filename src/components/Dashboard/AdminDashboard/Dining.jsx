const Dining = () => {
  const menuCategory = (title, time, desc) => (
    <div className="group border-b border-stone-100 py-10 hover:bg-[#fcfbf9] transition-all duration-500 px-4">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-xl font-serif text-[#1e2d35] italic lowercase">{title}</h3>
        <span className="text-[10px] text-[#b1a494] tracking-widest uppercase">{time}</span>
      </div>
      <p className="text-xs text-stone-400 leading-relaxed max-w-md uppercase tracking-wider">
        {desc}
      </p>
    </div>
  );

  return (
    <div className="bg-black p-10 min-h-screen">
      <header className="mb-6">
        <h2 className="text-3xl font-serif text-[#1e2d35] lowercase italic tracking-tight">
          Gastronomy <span className="text-[#b1a494]">& Lounge</span>
        </h2>
      </header>

      <div className="mt-4">
        {menuCategory(
          "The Grand Buffet", 
          "06:30 — 10:30", 
          "Curated international breakfast selection featuring artisan pastries and organic local harvests."
        )}
        {menuCategory(
          "Azure Rooftop", 
          "12:00 — 23:00", 
          "Mediterranean inspired coastal cuisine served with a panoramic view of the Bay of Bengal."
        )}
        {menuCategory(
          "In-Suite Service", 
          "24 Hours", 
          "Private chef experience delivered to your doorstep. Gourmet comfort food redefined."
        )}
      </div>
    </div>
  );
};

export default Dining;