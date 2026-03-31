import { useEffect, useState } from 'react';
import authApiClient from '../../services/Auth-Api-Client';
import { ChevronDown, ArrowUpDown } from 'lucide-react'; // Minimal icons

const statusColors = {
  'Not Paid':   'text-amber-500 border-amber-500/20 bg-amber-500/5',
  'Confirmed':  'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
  'Checked In': 'text-[#b1a494] border-[#b1a494]/20 bg-[#b1a494]/5',
  'Completed':  'text-stone-500 border-stone-800 bg-transparent',
  'Canceled':   'text-red-500 border-red-500/20 bg-red-500/5',
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "" | "low" | "high"

  useEffect(() => {
    authApiClient
      .get("/bookings/")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // --- Logic: Filter and then Sort ---
  const filteredAndSorted = bookings
    .filter((b) => {
      const hotelNames = b.items?.map((i) => i.hotel?.name?.toLowerCase()).join(" ");
      return (
        hotelNames?.includes(search.toLowerCase()) ||
        String(b.id).includes(search.toLowerCase()) ||
        b.status?.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOrder === "low") return a.total_price - b.total_price;
      if (sortOrder === "high") return b.total_price - a.total_price;
      return 0;
    });

  return (
    <div className="space-y-10 bg-black min-h-screen pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 ml-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-[#b1a494]"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#b1a494] font-black">
              Reservation Archives
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tighter">
            My <span className="italic text-[#b1a494]">Bookings.</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-10">
         

          {/* Search */}
          <div className="relative w-full max-w-xs group">
            <input
              type="text"
              placeholder="Filter archives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 py-2 text-[11px] uppercase tracking-widest text-white outline-none focus:border-[#b1a494] transition-all placeholder:text-stone-700"
            />
          </div>

           {/* --- Sorting System --- */}
          <div className="relative group">
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none bg-transparent border-b border-white/10 py-2 pl-2 pr-8 text-[10px] uppercase tracking-widest text-[#b1a494] font-bold outline-none cursor-pointer focus:border-[#b1a494] transition-all"
            >
              <option value="" className="bg-black">Sort by Price</option>
              <option value="low" className="bg-black text-white">Price: Low to High</option>
              <option value="high" className="bg-black text-white">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-0 top-2.5 w-3 h-3 text-[#b1a494] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-stone-950/50 border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-black">Ref. ID</th>
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-black">Destination</th>
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-black italic">Check-In</th>
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-black italic">Check-Out</th>
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-black">Total</th>
                <th className="px-8 py-5 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-black text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center">
                    <div className="w-8 h-8 border border-[#b1a494] border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredAndSorted.length > 0 ? (
                filteredAndSorted.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-8 py-6 text-[11px] font-bold text-stone-600 group-hover:text-[#b1a494] transition-colors">
                      #{String(booking.id).slice(0, 8).toUpperCase()}
                    </td>

                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        {booking.items?.map((item) => (
                          <div key={item.id} className="flex flex-col">
                            <span className="text-[12px] font-serif text-white tracking-wide uppercase">
                              {item.hotel?.name}
                            </span>
                            <span className="text-[9px] text-[#b1a494] font-black uppercase tracking-widest">
                              {item.quantity} Suite{item.quantity > 1 ? 's' : ''}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Separate Check-In Column */}
                    <td className="px-8 py-6">
                      <span className="text-[11px] text-stone-400 font-medium">
                        {booking.check_in}
                      </span>
                    </td>

                    {/* Separate Check-Out Column */}
                    <td className="px-8 py-6">
                      <span className="text-[11px] text-stone-400 font-medium">
                        {booking.check_out}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <span className="text-sm font-serif text-[#fce0c0]">
                        ${booking.total_price}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] border rounded-[2px] inline-block ${statusColors[booking.status] || 'text-stone-500 border-stone-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-24 text-center">
                    <p className="text-[10px] text-stone-700 uppercase tracking-[0.5em] font-black">
                      No Records Found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;