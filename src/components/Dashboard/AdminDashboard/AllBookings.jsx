import { useEffect, useState } from "react";
import authApiClient from "../../../services/Auth-Api-Client";
import StatCard from "../StatCard";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApiClient
      .get("/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-[1px] bg-[#b1a494] animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-black p-10 min-h-screen text-white">
      {/* Page Header */}
      <header className="mb-12 border-b border-white/5 pb-8">
        <h2 className="text-3xl font-serif lowercase italic tracking-tighter text-[#fcfbf9]">
          Master <span className="text-[#b1a494]">Reservations</span>
        </h2>
        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500 mt-2 font-black">
          HotelHeaven Real-Time Analytics
        </p>
      </header>

      {/* 1. Integration of your StatCard */}
      <StatCard bookings={bookings} />

      {/* 2. The Detailed Ledger Table */}
      <div className="overflow-x-auto bg-stone-950 border border-white/5 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.3em] text-[#b1a494] font-black bg-black/40">
              <th className="p-6">Guest Identity</th>
              <th className="p-6">Reference ID</th>
              <th className="p-6">Arrival — Departure</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                {/* Guest Email */}
                <td className="p-6">
                  <span className="text-xs text-stone-300 tracking-wider font-medium">
                    {/* Try accessing the nested user object first */}
                    {booking.user?.email ||
                      booking.user_email ||
                      booking.email ||
                      "Guest User"}
                  </span>
                </td>

                {/* Booking ID */}
                <td className="p-6">
                  <span className="text-[10px] font-mono text-stone-600 uppercase">
                    #{String(booking.id).slice(0, 8).toUpperCase()}
                  </span>
                </td>

                {/* Dates */}
                <td className="p-6">
                  <div className="text-[10px] uppercase tracking-widest text-stone-400">
                    {booking.check_in} — {booking.check_out}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="p-6">
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-sm
                    ${
                      booking.status === "Confirmed"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : booking.status === "Not Paid"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                    }
                  `}
                  >
                    {booking.status}
                  </span>
                </td>

                {/* Price */}
                <td className="p-6 text-right">
                  <span className="text-sm font-bold text-[#b1a494] font-mono tracking-tighter">
                    ${parseFloat(booking.total_price).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="py-24 text-center text-stone-700 uppercase text-[10px] tracking-[0.8em] italic">
            Sanctuary Records Empty
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;
