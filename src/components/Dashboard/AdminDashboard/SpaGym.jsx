const SpaGym = () => {
  const Card = ({ title, desc }) => (
    <div className="border border-stone-900 p-10 hover:border-[#b1a494]/30 transition-all duration-700 group">
      <h3 className="text-[#b1a494] text-[10px] uppercase tracking-[0.5em] mb-4 group-hover:tracking-[0.7em] transition-all">{title}</h3>
      <p className="text-[11px] text-stone-500 leading-loose uppercase tracking-wider">{desc}</p>
      <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-[#b1a494] transition-all duration-700"></div>
    </div>
  );

  return (
    <div className="bg-black p-10 min-h-screen text-white">
      <header className="mb-16">
        <h2 className="text-4xl font-serif lowercase italic tracking-tighter">
          Vitality <span className="text-[#b1a494]">Hub</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card 
          title="The Serenity Spa" 
          desc="Ancient healing rituals combined with modern K-Beauty technology. Open 09:00 - 21:00."
        />
        <Card 
          title="Technogym Suite" 
          desc="State-of-the-art cardiovascular and strength equipment with private trainers. 24/7 Access."
        />
        <Card 
          title="Infinity Pool" 
          desc="Heated rooftop aquatic experience overlooking the skyline. Daily 06:00 - 22:00."
        />
      </div>
    </div>
  );
};

export default SpaGym;