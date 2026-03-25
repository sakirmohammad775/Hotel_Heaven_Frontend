import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../services/Api-Client";
import authApiClient from "../../services/Auth-Api-Client";
import useAuthContext from "../../hooks/useAuthContext";

const SpecificHotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    apiClient
      .get(`/hotels/${id}/`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleBookNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create or get existing cart
      const cartRes = await authApiClient.post("/carts/");
      const cartId = cartRes.data.id;

      // Step 2: Add hotel to cart
      await authApiClient.post(`/carts/${cartId}/items/`, {
        hotel_id: parseInt(id),
        quantity: 1,
      });

      // Step 3: Create booking from cart
      const bookingPayload = { cart_id: cartId };
      if (checkIn) bookingPayload.check_in = checkIn;
      if (checkOut) bookingPayload.check_out = checkOut;

      const bookingRes = await authApiClient.post("/bookings/", bookingPayload);

      const bookingId = bookingRes.data.id;
      const totalPrice = bookingRes.data.total_price;

      // Step 4: Go to checkout
      navigate("/checkout", {
        state: {
          bookingId,
          totalPrice,
          hotelName: hotel.name,
          hotelImage: hotel.images[0]?.image || "/default.jpg",
          checkIn: bookingRes.data.check_in,
          checkOut: bookingRes.data.check_out,
          rooms: 1,
        },
      });

    } catch (error) {
      console.log("Booking error:", error.response?.data || error.message);
      alert("Failed: " + JSON.stringify(error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) return <p className="text-center py-20">Loading...</p>;

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <img
        src={hotel.images[0]?.image || "/default.jpg"}
        alt={hotel.name}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />
      <h1 className="text-4xl font-serif mb-4">{hotel.name}</h1>
      <p className="text-gray-500 mb-4">{hotel.location}</p>
      <p className="mb-6">{hotel.description}</p>

      {/* Date Pickers */}
      <div className="grid grid-cols-2 gap-4 text-black mb-8 p-6 bg-[#f8f6f3] border border-stone-200">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Check In
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border border-stone-200 p-3 text-sm outline-none focus:border-[#b1a494] bg-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Check Out
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border border-stone-200 p-3 text-sm outline-none focus:border-[#b1a494] bg-white"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">${hotel.price_with_tax}</span>
        <button
          onClick={handleBookNow}
          disabled={loading}
          className="px-6 py-3 bg-[#1e2d35] text-white hover:bg-[#b1a494] transition-all disabled:opacity-60"
        >
          {loading ? "Creating Booking..." : "Book Now"}
        </button>
      </div>
    </section>
  );
};

export default SpecificHotelPage;