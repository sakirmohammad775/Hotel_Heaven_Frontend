import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import authApiClient from "../../services/Auth-Api-Client";
import useAuthContext from "../../hooks/useAuthContext";

const InputField = ({
  label,
  name,
  type = "text",
  required = false,
  register,
  errors,
}) => (
  <div className="flex flex-col space-y-2">
    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500">
      {label}
    </label>
    <input
      type={type}
      className={`w-full bg-transparent border-b py-4 text-[11px] tracking-widest outline-none transition-all uppercase ${
        errors?.[name]
          ? "border-red-500"
          : "border-stone-200 focus:border-[#b1a494]"
      }`}
      {...register(name, {
        required: required ? `${label} is required` : false,
      })}
    />
    {errors?.[name] && (
      <span className="text-red-500 text-[9px] uppercase">
        {errors[name].message}
      </span>
    )}
  </div>
);

// ===== COUPON DATABASE =====
// Keep this in sync with your Offers.jsx coupon codes
const AVAILABLE_COUPONS = {
  "BREAKFAST2025": { discount: 0, discountType: "breakfast", description: "Free Breakfast Included" },
  "SAVE10": { discount: 10, discountType: "percentage", description: "10% Discount" },
  "ADVANCE15": { discount: 15, discountType: "percentage", description: "15% Early Booking Discount" },
};

const BookingCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  // ===== COUPON STATE =====
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const {
    hotelId,
    totalPrice,
    hotelName,
    hotelImage,
    checkIn,
    checkOut,
    days,
  } = location.state || {};

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!hotelId) {
      navigate("/hotels");
      return;
    }

    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key, user[key], { shouldValidate: true });
      });
    }
  }, [user, hotelId, navigate, setValue]);

  // ===== COUPON VALIDATION & APPLICATION =====
  const handleApplyCoupon = () => {
    // Clear previous messages
    setCouponError("");
    setCouponSuccess("");

    const trimmedCode = couponInput.trim().toUpperCase();

    if (!trimmedCode) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (AVAILABLE_COUPONS[trimmedCode]) {
      setAppliedCoupon(trimmedCode);
      setCouponSuccess(`✓ Coupon "${trimmedCode}" applied successfully!`);
      setCouponInput(""); // Clear input after successful application
    } else {
      setCouponError("Invalid coupon code. Please check and try again.");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
    setCouponSuccess("");
  };

  // ===== PRICE CALCULATIONS =====
  const basePrice = parseFloat(totalPrice);
  
  // Apply coupon discount if valid
  let discountedPrice = basePrice;
  let discountAmount = 0;

  if (appliedCoupon) {
    const coupon = AVAILABLE_COUPONS[appliedCoupon];
    if (coupon.discountType === "percentage") {
      discountAmount = basePrice * (coupon.discount / 100);
      discountedPrice = basePrice - discountAmount;
    }
    // breakfast type doesn't reduce price, just shows as applied
  }

  // Tax calculations on discounted price
  const accommodationTax = discountedPrice * 0.2;
  const feesAmount = discountedPrice * 0.45;
  const feesTax = feesAmount * 0.12;
  
  const finalTotal = (
    discountedPrice +
    accommodationTax +
    feesAmount +
    feesTax
  ).toFixed(2);

  const onSubmit = async (formData) => {
    try {
      // STEP 1: CREATE A VIRTUAL CART FOR THIS TRANSACTION
      const cartRes = await authApiClient.post("/carts/");
      const cartId = cartRes.data.id;

      // STEP 2: ADD THE HOTEL TO THE CART
      await authApiClient.post(`/carts/${cartId}/items/`, {
        hotel_id: hotelId,
        quantity: 1,
      });

      // STEP 3: CONVERT CART TO BOOKING (with coupon code if applied)
      const bookingPayload = {
        cart_id: cartId,
        check_in: checkIn,
        check_out: checkOut,
        total_price: finalTotal,
      };

      // Add coupon code to booking if applied
      if (appliedCoupon) {
        bookingPayload.coupon_code = appliedCoupon;
      }

      const bookingResponse = await authApiClient.post("/bookings/", bookingPayload);
      const newBookingId = bookingResponse.data.id;

      // STEP 4: INITIATE PAYMENT
      const paymentPayload = {
        amount: finalTotal,
        bookingId: newBookingId,
        cus_name: `${formData.first_name} ${formData.last_name}`,
        cus_email: formData.email,
        cus_phone: formData.phone,
        cus_add1: formData.address,
      };

      const paymentResponse = await authApiClient.post(
        "/payment/initiate/",
        paymentPayload,
      );

      if (paymentResponse.data.payment_url) {
        window.location.href = paymentResponse.data.payment_url;
      }
    } catch (error) {
      console.error("Detailed Error:", error.response?.data || error.message);
      alert(
        "Checkout Failed: " +
          (error.response?.data?.detail || "Check console for details"),
      );
    }
  };

  if (!hotelId) return null;

  return (
    <div className="min-h-screen bg-white text-stone-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-serif mb-12 uppercase tracking-tighter italic">
              Billing <span className="text-[#b1a494]">Details.</span>
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
            >
              <InputField
                label="First Name"
                name="first_name"
                required
                register={register}
                errors={errors}
              />
              <InputField
                label="Last Name"
                name="last_name"
                required
                register={register}
                errors={errors}
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                required
                register={register}
                errors={errors}
              />

              <InputField
                label="Phone"
                name="phone"
                required
                register={register}
                errors={errors}
              />
              
              <div className="md:col-span-2">
                <InputField
                  label="Street Address"
                  name="address"
                  required
                  register={register}
                  errors={errors}
                />
              </div>

              {/* ===== COUPON CODE INPUT BOX ===== */}
              <div className="md:col-span-2 pt-6 border-t border-stone-200">
                <div className="bg-stone-50 border-2 border-stone-200 p-8 rounded-sm">
                  <div className="mb-4">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 block mb-4">
                      ✨ Have a Coupon Code?
                    </label>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError("");
                          setCouponSuccess("");
                        }}
                        placeholder="Enter coupon code (e.g., SAVE10)"
                        className="flex-1 bg-white border border-stone-300 px-4 py-3 text-[11px] tracking-widest uppercase outline-none transition-all focus:border-[#b1a494] focus:ring-1 focus:ring-[#b1a494]"
                        disabled={appliedCoupon !== null}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={appliedCoupon !== null}
                        className="bg-[#b1a494] hover:bg-stone-700 text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Error Message */}
                    {couponError && (
                      <div className="mt-3 text-red-600 text-[9px] uppercase tracking-wide font-medium">
                        ✗ {couponError}
                      </div>
                    )}

                    {/* Success Message */}
                    {couponSuccess && (
                      <div className="mt-3 text-green-600 text-[9px] uppercase tracking-wide font-medium">
                        {couponSuccess}
                      </div>
                    )}

                    {/* Applied Coupon Display */}
                    {appliedCoupon && (
                      <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-800">
                            Code Applied: {appliedCoupon}
                          </p>
                          <p className="text-[9px] text-green-700 mt-1">
                            {AVAILABLE_COUPONS[appliedCoupon].description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-green-600 hover:text-red-600 font-bold text-lg transition-colors"
                          title="Remove coupon"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-10">
                <button
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-6 uppercase text-[10px] tracking-[0.6em] font-black hover:bg-[#b1a494] transition-all disabled:opacity-50 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isSubmitting
                      ? "Processing Sanctuary..."
                      : `Confirm & Pay $${finalTotal}`}
                  </span>
                  <div className="absolute inset-0 bg-[#b1a494] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>
            </form>
          </div>

          {/* ===== UPDATED PRICE SUMMARY ===== */}
          <div className="lg:w-1/3">
            <div className="bg-stone-950 text-white p-10 rounded-sm sticky top-32 border border-white/5 shadow-2xl">
              <div className="w-12 h-[1px] bg-[#b1a494] mb-6"></div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#b1a494] mb-4 font-black">
                Your Destination
              </p>
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-6">
                {hotelName}
              </h3>

              <div className="space-y-4 text-[10px] tracking-widest uppercase mb-10 font-medium">
                <div className="flex justify-between">
                  <span className="text-stone-500 italic">Duration</span>
                  <span>{days} Nights</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 italic">Check-In</span>
                  <span>{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 italic">Check-Out</span>
                  <span>{checkOut}</span>
                </div>
              </div>

              <div className="space-y-3 mb-10 border-t border-white/5 pt-8">
                <div className="flex justify-between text-[9px] text-stone-500 tracking-widest uppercase">
                  <span>Base Fare</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>

                {/* Discount Row - Only show if coupon applied */}
                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-[9px] text-green-400 tracking-widest uppercase font-bold">
                    <span>Coupon Discount ({AVAILABLE_COUPONS[appliedCoupon].discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Coupon Applied Badge */}
                {appliedCoupon && AVAILABLE_COUPONS[appliedCoupon].discountType === "breakfast" && (
                  <div className="flex justify-between text-[9px] text-yellow-300 tracking-widest uppercase font-bold">
                    <span>✓ Free Breakfast Applied</span>
                  </div>
                )}

                <div className="flex justify-between text-[9px] text-stone-500 tracking-widest uppercase">
                  <span>Subtotal</span>
                  <span>${discountedPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[9px] text-stone-500 tracking-widest uppercase">
                  <span>Taxes & Fees</span>
                  <span>
                    ${(accommodationTax + feesAmount + feesTax).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline border-t border-[#b1a494]/30 pt-6">
                <span className="text-[10px] font-black text-[#b1a494] uppercase tracking-widest">
                  Total
                </span>
                <span className="text-4xl font-serif text-[#fce0c0]">
                  ${finalTotal}
                </span>
              </div>

              {/* Savings Display */}
              {discountAmount > 0 && (
                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                  <p className="text-[9px] text-green-400 uppercase tracking-widest font-bold">
                    You Save: ${discountAmount.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;