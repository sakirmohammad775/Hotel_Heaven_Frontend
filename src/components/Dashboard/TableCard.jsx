const TableCard = ({ title, data, loading, emptyMsg }) => (
  <div className="bg-stone-950 border border-white/5 overflow-hidden shadow-2xl">
    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
      <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#b1a494] font-black">{title}</h3>
      <span className="text-[10px] text-stone-600 font-bold uppercase tracking-widest">{data.length} Records</span>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-black text-stone-500 uppercase text-[9px] font-black tracking-[0.2em]">
          <tr>
            <th className="px-6 py-4">Ref. No</th>
            <th className="px-6 py-4">Guest Info</th>
            <th className="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-stone-400">
          {loading ? (
            <tr><td colSpan="3" className="py-16 text-center animate-pulse text-[10px] uppercase tracking-widest text-[#b1a494]">Synchronizing...</td></tr>
          ) : data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-6 text-[11px] font-mono font-bold text-stone-600">
                  #{String(item.id).padStart(5, '0').toUpperCase()}
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col gap-1">
                    {/* 🔹 FIX: Checks for username, then user_email, then falls back to Guest */}
                    <span className="text-sm text-stone-200 font-serif italic tracking-wide">
                      {item.user?.username || item.user_email || "Guest Sanctuary"}
                    </span>
                    <span className="text-[9px] text-stone-600 uppercase tracking-[0.2em] font-medium">
                      Check-in: {item.check_in}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6 text-right">
                   <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm
                     ${item.status === 'Confirmed' ? 'text-emerald-500 bg-emerald-500/5' : 'text-[#b1a494] bg-[#b1a494]/5'}
                   `}>
                     {item.status}
                   </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-16 text-center text-[10px] uppercase tracking-[0.5em] text-stone-800 font-serif italic">
                {emptyMsg}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default TableCard;