import { useEffect, useState } from "react";
import authApiClient from "../../../services/Auth-Api-Client";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApiClient
      .get("/bookings") 
      .then((res) => {
        // Ensure we are setting an array even if the response is unexpected
        setData(Array.isArray(res.data) ? res.data : res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Booking Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-t-2 border-[#b1a494] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-black p-10 min-h-screen text-white font-sans">
      <header className="mb-12 border-b border-stone-900 pb-8">
        <h2 className="text-4xl font-serif lowercase italic tracking-tighter text-[#fcfbf9]">
          Master <span className="text-[#b1a494]">Ledger</span>
        </h2>
        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500 mt-2">
          Complete Guest Activity & Revenue Stream
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.3em] text-[#b1a494] font-bold">
              <th className="px-6 py-4">Guest Identity</th>
              <th className="px-6 py-4">Booking Dates</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="bg-stone-950/40 hover:bg-stone-900/40 transition-all duration-500 group border border-stone-900">
                {/* 1. Guest Identity: Using user_email from your serializer */}
                <td className="px-6 py-8 border-l border-stone-900">
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-200 font-medium tracking-wide">
                      Guest #{item.user || "N/A"}
                    </span>
                    <span className="text-[10px] text-stone-500 uppercase mt-1 tracking-widest">
                      {item.user_email || "Email Not Provided"}
                    </span>
                  </div>
                </td>

                {/* 2. Booking Dates */}
                <td className="px-6 py-8">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-stone-300 uppercase tracking-wider">
                      {item.check_in} — {item.check_out}
                    </span>
                    <span className="text-[9px] text-stone-600 mt-1 italic">
                      REF: {String(item.id).padStart(5, '0')}
                    </span>
                  </div>
                </td>

                {/* 3. Status (Matches your backend 'status' field) */}
                <td className="px-6 py-8">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'Confirmed' ? 'bg-green-500' : 'bg-amber-500'
                    }`}></div>
                    <span className={`text-[10px] uppercase tracking-widest ${
                      item.status === 'Confirmed' ? 'text-green-500/80' : 'text-amber-500/80'
                    }`}>
                      {item.status || "Pending"}
                    </span>
                  </div>
                </td>

                {/* 4. Price */}
                <td className="px-6 py-8 text-right border-r border-stone-900">
                  <span className="text-sm text-[#b1a494] font-bold font-mono">
                    ${parseFloat(item.total_price || 0).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="mt-20 text-center opacity-30 italic text-sm tracking-widest uppercase">
          The sanctuary is currently quiet.
        </div>
      )}
    </div>
  );
};

export default AllUsers;