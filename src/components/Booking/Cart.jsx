import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApiClient from "../../services/Auth-Api-Client";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // Get or create cart
      const cartRes = await authApiClient.post("/carts/");
      const cartId = cartRes.data.id;

      // Get cart with items
      const res = await authApiClient.get(`/carts/${cartId}/`);
      setCart(res.data);
    } catch (error) {
      console.log("Cart error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await authApiClient.delete(`/carts/${cart.id}/items/${itemId}/`);
      fetchCart(); // refresh
    } catch (error) {
      console.log("Remove error:", error.response?.data);
    }
  };

  const handleCheckout = async () => {
    if (!cart?.items?.length) return;

    try {
      const bookingRes = await authApiClient.post("/bookings/", {
        cart_id: cart.id,
      });

      navigate("/checkout", {
        state: {
          bookingId: bookingRes.data.id,
          totalPrice: bookingRes.data.total_price,
          hotelName: cart.items[0]?.hotel?.name,
          rooms: cart.items.length,
        },
      });
    } catch (error) {
      console.log("Checkout error:", error.response?.data);
      alert("Failed to proceed: " + JSON.stringify(error.response?.data));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f3]">
        <div className="w-8 h-8 border-2 border-[#1e2d35] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasItems = cart?.items?.length > 0;

  return (
    <div className="min-h-screen bg-[#f8f6f3] py-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="w-16 h-[1px] bg-stone-400 mb-6" />
          <h1 className="text-3xl md:text-4xl font-serif text-[#1e2d35] uppercase tracking-tight">
            Your Cart
          </h1>
          <p className="text-xs text-stone-400 uppercase tracking-widest mt-2">
            {hasItems ? `${cart.items.length} item(s)` : "Empty"}
          </p>
        </div>

        {!hasItems ? (
          <div className="text-center py-20 space-y-6">
            <svg className="w-16 h-16 mx-auto text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <p className="text-stone-400 text-sm tracking-widest uppercase">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-[#1e2d35] text-white text-xs uppercase tracking-widest hover:bg-[#b1a494] transition-all"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-white flex gap-6 p-6 border border-stone-100 shadow-sm"
              >
                {/* Hotel Image */}
                <div className="w-28 h-24 flex-shrink-0 overflow-hidden bg-stone-100">
                  <img
                    src={item.hotel?.images?.[0]?.image || "/default.jpg"}
                    alt={item.hotel?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = "/default.jpg"}
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-[#1e2d35]">{item.hotel?.name}</h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">
                    {item.hotel?.location || ""}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-stone-500">Qty: {item.quantity}</span>
                    <span className="text-xs text-stone-500">
                      ${item.hotel?.price} / night
                    </span>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="flex flex-col items-end justify-between">
                  <span className="font-serif text-xl text-[#1e2d35]">
                    ${item.total_price}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-white p-6 border border-stone-100 shadow-sm mt-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-100">
                <span className="text-xs uppercase tracking-widest text-stone-500">Subtotal</span>
                <span className="font-serif text-2xl text-[#1e2d35]">${cart.total_price}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 border border-stone-300 text-xs uppercase tracking-widest text-stone-600 hover:border-[#1e2d35] transition-all"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-10 py-3 bg-[#1e2d35] text-white text-xs uppercase tracking-widest hover:bg-[#b1a494] transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;