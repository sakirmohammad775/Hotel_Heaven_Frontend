import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authApiClient from "../services/Auth-Api-Client";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const bookingId = searchParams.get("booking_id");

  useEffect(() => {
    if (!bookingId) return;
    authApiClient
      .get(`/bookings/${bookingId}/`)
      .then((res) => setBooking(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f3]">
        <div className="w-8 h-8 border-2 border-[#1e2d35] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center px-6">
      <div className="bg-white max-w-lg w-full p-12 shadow-sm border-t-4 border-[#1e2d35] text-center">

        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-serif text-[#1e2d35] mb-2">Payment Successful</h1>
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-8">
          Your booking is confirmed
        </p>

        {/* Booking Summary */}
        {booking && (
          <div className="bg-[#f8f6f3] p-6 text-left space-y-3 mb-8">
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-stone-400">Booking ID</span>
              <span className="text-[#1e2d35] font-bold">
                #{String(booking.id).slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-stone-400">Status</span>
              <span className="text-green-600 font-bold">{booking.status}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-stone-400">Total Paid</span>
              <span className="text-[#1e2d35] font-bold">${booking.total_price}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-stone-400">Check In</span>
              <span className="text-[#1e2d35]">{booking.check_in}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest">
              <span className="text-stone-400">Check Out</span>
              <span className="text-[#1e2d35]">{booking.check_out}</span>
            </div>

            {/* Hotels booked */}
            {booking.items?.map((item) => (
              <div key={item.id} className="flex justify-between text-xs uppercase tracking-widest border-t border-stone-200 pt-3 mt-3">
                <span className="text-stone-400">{item.hotel?.name}</span>
                <span className="text-[#1e2d35]">${item.total_price}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard/bookings")}
            className="w-full py-4 bg-[#1e2d35] text-white text-xs uppercase tracking-widest hover:bg-[#b1a494] transition-all"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 border border-stone-200 text-xs uppercase tracking-widest text-stone-500 hover:border-[#1e2d35] transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;