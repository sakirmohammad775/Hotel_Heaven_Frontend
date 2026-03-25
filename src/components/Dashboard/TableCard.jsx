// 
const TableCard = ({ title }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h3 className="font-bold text-blue-500 tracking-wide">{title}</h3>
      <div className="w-full sm:w-64 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
        <input 
          type="text" 
          placeholder="Search records..." 
          className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-600"
        />
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50/50 text-slate-400 uppercase text-[9px] font-bold tracking-[0.15em]">
          <tr>
            <th className="px-6 py-5">Reser. No</th>
            <th className="px-6 py-5">Source</th>
            <th className="px-6 py-5">Guest Name</th>
            <th className="px-6 py-5 text-right">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-600">
          {[
            { id: "46778", source: "46778", guest: "Baldwin Austin", balance: "$0" },
            { id: "56473", source: "64783", guest: "Verity Arnold", balance: "$26" },
          ].map((item, idx) => (
            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-400">{item.id}</td>
              <td className="px-6 py-4">{item.source}</td>
              <td className="px-6 py-4 font-semibold text-slate-700">{item.guest}</td>
              <td className="px-6 py-4 text-right font-bold text-slate-900">{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default TableCard