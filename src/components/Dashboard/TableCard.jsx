const TableCard = ({ title, data, loading, emptyMsg }) => (
  <div className="bg-stone-950 border border-white/5 overflow-hidden">
    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
      <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#b1a494] font-black">{title}</h3>
      <span className="text-[10px] text-stone-600 font-bold uppercase">{data.length} Guests</span>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-black text-stone-500 uppercase text-[9px] font-black tracking-[0.2em]">
          <tr>
            <th className="px-6 py-4">Ref. No</th>
            <th className="px-6 py-4">Guest</th>
            <th className="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-stone-400">
          {loading ? (
            <tr><td colSpan="3" className="py-10 text-center animate-pulse">Synchronizing...</td></tr>
          ) : data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-[11px] font-bold text-stone-600">
                  #{String(item.id).slice(0, 5).toUpperCase()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-serif">{item.user?.username || "Guest"}</span>
                    <span className="text-[9px] text-stone-600 uppercase tracking-widest">{item.check_in}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <span className="text-[9px] font-black text-[#b1a494] uppercase tracking-tighter">
                     {item.status}
                   </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-12 text-center text-[10px] uppercase tracking-widest text-stone-700">
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