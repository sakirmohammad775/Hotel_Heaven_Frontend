const InputField = ({ label, placeholder, type = "text", required = false }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
      {label} {required && "*"}
    </label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full border border-slate-200 p-4 text-xs outline-none focus:border-[#b1a494] transition-colors bg-transparent"
    />
  </div>
);

const BillingForm = () => {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-serif text-slate-800">Billing Details:</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="First Name" required />
        <InputField label="Last Name" required />
        <InputField label="Email" type="email" required />
        <InputField label="Phone Number" required />
        <InputField label="Company" />
        <InputField label="Address" />
        
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Country</label>
          <select className="w-full border border-slate-200 p-4 text-xs outline-none bg-transparent appearance-none cursor-pointer">
            <option>Select your Country</option>
          </select>
        </div>

        <InputField label="City" />
      </div>

      <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
        <input type="checkbox" id="terms" className="w-4 h-4 accent-[#1e2d35]" />
        <label htmlFor="terms" className="text-xs text-slate-600 tracking-wider">
          I agree with the Privacy Terms*.
        </label>
      </div>
    </div>
  );
};

export default BillingForm;