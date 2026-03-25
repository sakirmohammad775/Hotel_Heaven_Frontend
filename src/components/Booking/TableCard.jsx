import React from 'react';
import { Search, MoreHorizontal, Loader2 } from 'lucide-react';

const TableCard = ({ title, data = [], loading = false }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full transition-all">
      {/* Header */}
      <div className="p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-blue-600 tracking-wider text-sm uppercase">{title}</h3>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">
            {data.length} Total Records
          </p>
        </div>
        
        <div className="w-full sm:w-64 flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
          <Search size={14} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none text-[11px] focus:outline-none w-full text-slate-600"
          />
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-4 text-slate-400 uppercase text-[9px] font-bold tracking-[0.2em] border-b">ID</th>
              <th className="px-8 py-4 text-slate-400 uppercase text-[9px] font-bold tracking-[0.2em] border-b">Guest</th>
              <th className="px-8 py-4 text-slate-400 uppercase text-[9px] font-bold tracking-[0.2em] border-b">Room</th>
              <th className="px-8 py-4 text-slate-400 uppercase text-[9px] font-bold tracking-[0.2em] border-b text-right">Status</th>
              <th className="px-8 py-4 text-slate-400 uppercase text-[9px] font-bold tracking-[0.2em] border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <Loader2 className="animate-spin mx-auto text-blue-500" size={24} />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-8 py-5 text-xs font-bold text-slate-400">#{item.id}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-700">{item.guest_name || "Guest"}</td>
                  <td className="px-8 py-5 text-xs text-slate-500">{item.room_number || "N/A"}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                      item.is_paid ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {item.is_paid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 hover:bg-white rounded-xl">
                      <MoreHorizontal size={16} className="text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400 text-xs">No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCard;