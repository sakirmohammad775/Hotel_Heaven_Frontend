import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CheckoutSummary from './CheckoutSummary';
import authApiClient from '../../services/Auth-Api-Client';

const InputField = ({ label, placeholder, type = "text", required = false, register, name, errors }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...(register ? register(name, required ? { required: `${label} is required` } : {}) : {})}
      className="w-full border border-slate-200 p-4 text-xs outline-none focus:border-[#b1a494] transition-colors bg-transparent"
    />
    {errors?.[name] && (
      <span className="text-red-400 text-[10px]">{errors[name].message}</span>
    )}
  </div>
);

const BookingCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};
  const { totalPrice, bookingId, hotelName, hotelImage } = bookingData;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  // If no booking data, redirect back
  if (!bookingId || !totalPrice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <p className="text-slate-500 text-sm tracking-widest uppercase">No booking data found.</p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#1e2d35] text-white text-xs uppercase tracking-widest"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (formData) => {
    try {
      const payload = {
        amount: totalPrice,
        bookingId: bookingId,
        numItems: 1,
        // billing info for SSLCommerz (backend uses user profile, but you can pass overrides)
        cus_name: `${formData.first_name} ${formData.last_name}`,
        cus_email: formData.email,
        cus_phone: formData.phone,
        cus_add1: formData.address,
      };

      const response = await authApiClient.post("/payment/initiate/", payload);

      if (response.data.payment_url) {
        // Redirect to SSLCommerz payment gateway
        window.location.href = response.data.payment_url;
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.log("Payment Error:", error.response?.data || error.message);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="h-40 bg-slate-50 flex flex-col items-center justify-center border-b border-slate-100 gap-2">
        <h1 className="text-xs uppercase tracking-[0.8em] text-slate-400 font-bold">Booking Checkout</h1>
        {hotelName && (
          <p className="text-sm text-slate-600 font-serif">{hotelName}</p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left — Billing Form */}
          <div className="lg:w-2/3 text-black">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-3xl font-serif text-slate-800 mb-10">Billing Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="First Name" name="first_name" required register={register} errors={errors} />
                <InputField label="Last Name" name="last_name" required register={register} errors={errors} />
                <InputField label="Email" name="email" type="email" required register={register} errors={errors} />
                <InputField label="Phone Number" name="phone" required register={register} errors={errors} />
                <InputField label="Address" name="address" register={register} errors={errors} />
                <InputField label="City" name="city" register={register} errors={errors} />
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-3 mt-8 pt-6 border-t border-slate-100">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", { required: "You must agree to the terms" })}
                  className="w-4 h-4 accent-[#1e2d35]"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 tracking-wider">
                  I agree with the Privacy Terms*
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-400 text-[10px] mt-1">{errors.terms.message}</p>
              )}

              {/* Pay Button */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-[#1e2d35] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#b1a494] transition-all duration-300 disabled:opacity-60"
                >
                  {isSubmitting ? "Processing..." : `Proceed to Payment ($${totalPrice})`}
                </button>
              </div>
            </form>
          </div>

          {/* Right — Summary */}
          <div className="lg:w-1/3">
            <CheckoutSummary data={bookingData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;