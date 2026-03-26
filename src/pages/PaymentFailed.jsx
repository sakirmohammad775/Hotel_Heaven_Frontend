import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center px-6">
      <div className="bg-white max-w-lg w-full p-12 shadow-sm border-t-4 border-red-400 text-center">

        {/* Failed Icon */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-serif text-[#1e2d35] mb-2">Payment Failed</h1>
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-8">
          Something went wrong with your payment
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 bg-[#1e2d35] text-white text-xs uppercase tracking-widest hover:bg-[#b1a494] transition-all"
          >
            Try Again
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

export default PaymentFailed;