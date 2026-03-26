import { useEffect, useState } from 'react';
import authApiClient from '../../services/Auth-Api-Client';

const statusColors = {
  'Not Paid':   'bg-amber-100 text-amber-600',
  'Confirmed':  'bg-green-100 text-green-600',
  'Checked In': 'bg-blue-100 text-blue-600',
  'Completed':  'bg-stone-100 text-stone-600',
  'Canceled':   'bg-red-100 text-red-500',
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    authApiClient
      .get("/bookings/")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => {
    const hotelNames = b.items?.map((i) => i.hotel?.name?.toLowerCase()).join(" ");
    return (
      hotelNames?.includes(search.toLowerCase()) ||
      String(b.id).includes(search.toLowerCase()) ||
      b.status?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-serif text-[#1e2d35]">My Bookings</h2>
        <p className="text-stone-400 text-xs uppercase tracking-widest mt-1">
          {new Date().toDateString()}
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-white border border-stone-200 px-4 py-3 max-w-sm">
        <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by hotel, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs outline-none w-full bg-transparent text-stone-600"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8f6f3] border-b border-stone-100">
                <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-stone-400 font-bold">Booking ID</th>
                <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-stone-400 font-bold">Hotel</th>
                <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-stone-400 font-bold">Check In</th>
                <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-stone-400 font-bold">Check Out</th>
                <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-stone-400 font-bold">Total</th>
                <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-stone-400 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="w-6 h-6 border-2 border-[#1e2d35] border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#f8f6f3] transition-colors">
                    {/* Booking ID */}
                    <td className="px-6 py-5 text-xs font-bold text-stone-400">
                      #{String(booking.id).slice(0, 8).toUpperCase()}
                    </td>

                    {/* Hotels */}
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        {booking.items?.map((item) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#1e2d35]">
                              {item.hotel?.name}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Check In */}
                    <td className="px-6 py-5 text-xs text-stone-500">
                      {booking.check_in}
                    </td>

                    {/* Check Out */}
                    <td className="px-6 py-5 text-xs text-stone-500">
                      {booking.check_out}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-5 text-xs font-bold text-[#1e2d35]">
                      ${booking.total_price}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm ${statusColors[booking.status] || 'bg-stone-100 text-stone-500'}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-stone-400 text-xs uppercase tracking-widest">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {!loading && (
          <div className="px-6 py-4 border-t border-stone-100 bg-[#f8f6f3]">
            <p className="text-[10px] text-stone-400 uppercase tracking-widest">
              {filtered.length} booking{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;