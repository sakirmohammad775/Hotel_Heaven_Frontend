import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authApiClient from "../services/Auth-Api-Client";
import useAuthContext from "../hooks/useAuthContext";

const PaymentSuccess = () => {
  const { user, isLoading: authLoading } = useAuthContext(); // Get auth status
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const bookingId = searchParams.get("booking_id");

  useEffect(() => {
    // Wait until AuthContext finishes checking the user
    if (authLoading) return;

    // If auth check finished and no user, the PrivateRoute will handle it,
    // but we stop the API call here.
    if (!user) return;

    if (!bookingId) {
      navigate("/");
      return;
    }

    authApiClient
      .get(`/bookings/${bookingId}/`)
      .then((res) => setBooking(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [bookingId, navigate, authLoading, user]); // Add dependencies

  // Show loader if Auth is working OR if we have a bookingId but haven't fetched the booking yet
  if (authLoading || (bookingId && !booking && loading)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f6f3]">
        <div className="w-10 h-[1px] bg-[#1e2d35] animate-pulse mb-4"></div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#1e2d35]">
          Securing Sanctuary
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center px-6 py-20">
      <div className="bg-white max-w-lg w-full p-8 md:p-12 shadow-xl border-t-4 border-[#1e2d35] text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 transition-transform hover:scale-110 duration-500">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-serif text-[#1e2d35] mb-3 italic">
          Reservation <span className="text-[#b1a494]">Confirmed.</span>
        </h1>
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] mb-10">
          Welcome to HotelHeaven Sanctuary
        </p>

        {/* Booking Summary Card */}
        {booking && (
          <div className="bg-[#fcfbf9] border border-stone-100 p-8 text-left space-y-4 mb-10">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
              <span className="text-stone-400 font-medium">Reference</span>
              <span className="text-[#1e2d35] font-bold">
                #{String(booking.id).slice(0, 8).toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
              <span className="text-stone-400 font-medium">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-[9px] font-black rounded-sm">
                {booking.status}
              </span>
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-stone-400">Total Paid</span>
                <span className="text-[#1e2d35] font-black">
                  ${booking.total_price}
                </span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-stone-400">Check In</span>
                <span className="text-[#1e2d35]">{booking.check_in}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span className="text-stone-400">Check Out</span>
                <span className="text-[#1e2d35]">{booking.check_out}</span>
              </div>
            </div>

            {/* Hotel Item Details */}
            {booking.items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-[10px] uppercase tracking-widest border-t border-stone-200 pt-4 mt-4"
              >
                <span className="text-[#b1a494] font-bold">
                  {item.hotel?.name}
                </span>
                <span className="text-[#1e2d35]">QTY: {item.quantity}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard/bookings")}
            className="w-full py-5 bg-[#1e2d35] text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#b1a494] transition-all duration-500 shadow-lg active:scale-[0.98]"
          >
            View My Reservations
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 py-4 border border-stone-200 text-[9px] uppercase tracking-widest text-stone-500 hover:bg-stone-50 transition-all italic"
            >
              Print Receipt
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-4 border border-stone-200 text-[9px] uppercase tracking-widest text-stone-500 hover:bg-stone-50 transition-all italic"
            >
              Return Home
            </button>
          </div>
        </div>

        <p className="mt-12 text-[9px] text-stone-300 uppercase tracking-[0.2em]">
          A confirmation email has been sent to your registered address.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
