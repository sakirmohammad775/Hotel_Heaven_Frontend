import React from "react";

const StatCard = () => {
  const stats = [
    { label: "RMS to sell", value: "61", color: "text-blue-500" },
    { label: "total CCC", value: "2", color: "text-purple-500" },
    { label: "Dirty Vacant", value: "1", color: "text-red-400" },
    { label: "Clean Vacant", value: "60", color: "text-green-500" },
  ];
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center"
          >
            <span
              className={`text-6xl font-serif font-bold mb-3 ${stat.color}`}
            >
              {stat.value}
            </span>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatCard;