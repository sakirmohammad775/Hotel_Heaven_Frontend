const StatCard = ({ bookings }) => {
  const stats = [
    { 
      label: "Confirmed", 
      value: bookings.filter(b => b.status === 'Confirmed').length, 
      color: "text-emerald-500" 
    },
    { 
      label: "Pending Payment", 
      value: bookings.filter(b => b.status === 'Not Paid').length, 
      color: "text-amber-500" 
    },
    { 
      label: "Cancellations", 
      value: bookings.filter(b => b.status === 'Canceled').length, 
      color: "text-red-500" 
    },
    { 
      label: "Total stays", 
      value: bookings.length, 
      color: "text-[#b1a494]" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-stone-950 border border-white/5 p-8 flex flex-col items-center shadow-2xl group hover:border-[#b1a494]/30 transition-all">
          <span className={`text-6xl font-serif font-bold mb-3 ${stat.color} tracking-tighter group-hover:scale-110 transition-transform`}>
            {stat.value}
          </span>
          <span className="text-stone-500 text-[10px] font-black uppercase tracking-[0.3em]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatCard;