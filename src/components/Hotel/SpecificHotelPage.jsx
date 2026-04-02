import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import apiClient from "../../services/Api-Client";
import useAuthContext from "../../hooks/useAuthContext";
import { FiArrowLeft, FiMapPin, FiCheckCircle } from "react-icons/fi";

const SpecificHotelPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const isAdmin = user?.is_staff || user?.is_superuser; // Adjust based on your Auth object
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  
  // Fetch hotel details
  useEffect(() => {
    apiClient
      .get(`/hotels/${id}/`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error("Error fetching hotel:", err));
  }, [id]);

  // Logic to calculate total days and price in real-time
  const bookingDetails = useMemo(() => {
    if (!checkIn || !checkOut || !hotel) return { days: 0, total: 0 };

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // Calculate difference in days
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // We use diffDays for the stay.
    // If you want to charge for the day of checkout as well, use (diffDays + 1)
    return {
      days: diffDays > 0 ? diffDays : 0,
      total: diffDays > 0 ? diffDays * hotel.price_with_tax : 0,
    };
  }, [checkIn, checkOut, hotel]);

  const handleGoToBilling = () => {
    // 1. Check if user is logged in
    if (!user) {
      // Redirect to login and remember where they wanted to go
      navigate("/login", { state: { from: location } });
      return;
    }

    // 2. Validate dates
    if (bookingDetails.days <= 0) {
      alert(
        "Please select a valid checkout date that is after the check-in date.",
      );
      return;
    }

    // 3. Navigate to Checkout with all the data
    // NO API CALLS HERE. We just carry the data to the next page.
    navigate("/checkout", {
      state: {
        hotelId: id,
        totalPrice: bookingDetails.total,
        hotelName: hotel.name,
        hotelImage: hotel.images?.[0]?.image || "/default.jpg",
        checkIn: checkIn,
        checkOut: checkOut,
        days: bookingDetails.days,
      },
    });
  };

  if (!hotel) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-white font-serif italic">
        Loading Sanctuary...
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#1e2d35] pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/hotels"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 hover:text-[#b1a494] transition-colors mb-10"
        >
          <FiArrowLeft className="mr-2 text-lg" /> Back to Exploration
        </Link>

        <div className="bg-black rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: Information & Selection */}
          <div className="p-8 md:p-14 space-y-8 relative flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-48 h-48 bg-[#b1a494]/5 blur-[80px] rounded-full"></div>

            <div className="relative z-10">
              <span className="px-4 py-1.5 bg-[#b1a494]/10 border border-[#b1a494]/20 text-[#b1a494] text-[10px] font-black uppercase tracking-widest rounded-full">
                Luxury Destination
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mt-6 leading-tight">
                {hotel.name}
                <span className="text-[#b1a494]">.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 relative z-10">
              <div className="space-y-2">
                <p className="flex items-center text-[10px] font-black uppercase tracking-widest text-stone-500 italic">
                  <FiMapPin className="mr-2" /> Location
                </p>
                <p className="text-sm text-stone-200 font-medium">
                  {hotel.location}
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center text-[10px] font-black uppercase tracking-widest text-stone-500 italic">
                  <FiCheckCircle className="mr-2" /> Rate per Day
                </p>
                <p className="text-2xl font-serif text-[#b1a494]">
                  ${hotel.price_with_tax}
                </p>
              </div>
            </div>

            {/* Date Selection and Real-time Total */}
            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Check In
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#b1a494]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Check Out
                  </label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#b1a494]"
                  />
                </div>
              </div>

              {/* Dynamic Price Display */}
              {bookingDetails.days > 0 && (
                <div className="bg-[#b1a494]/5 border border-[#b1a494]/20 p-4 rounded-2xl flex justify-between items-center animate-in fade-in duration-500">
                  <div>
                    <p className="text-[10px] font-black uppercase text-stone-500 tracking-widest">
                      Stay for {bookingDetails.days}{" "}
                      {bookingDetails.days === 1 ? "Night" : "Nights"}
                    </p>
                    <p className="text-3xl font-serif text-white">
                      ${bookingDetails.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-stone-500 italic">
                      Subtotal
                    </p>
                  </div>
                </div>
              )}
              <div className="mt-8">
                {isAdmin ? (
                  <div className="p-4 bg-stone-100 border border-stone-200 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                      Administrator Account
                    </p>
                    <p className="text-[9px] italic text-stone-400 mt-1">
                      Booking is reserved for Guest accounts only.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleGoToBilling}
                    disabled={bookingDetails.days === 0}
                    className="w-full py-5 bg-[#b1a494] text-black text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all shadow-2xl shadow-[#b1a494]/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Goes To Billing
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Image with Parallax-style effect */}
          <div className="relative h-[400px] lg:h-auto group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 hidden lg:block"></div>
            <img
              src={hotel.images?.[0]?.image || "/default.jpg"}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificHotelPage;
