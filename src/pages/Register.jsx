import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSuccessMsg(""); 
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
      } else {
        console.error("Backend validation failed:", response.message);
      }
    } catch (error) {
      console.log("System Error:", error);
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col lg:flex-row font-serif">
      {/* Left Side: Form Section */}
      <div className="lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12">
        <div className="mb-10 text-center lg:text-left">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#b1a494] font-bold block mb-2">
            Join the Club
          </span>
          <h2 className="text-4xl md:text-5xl text-stone-800 leading-tight uppercase font-light tracking-widest">
            Register
          </h2>
          <p className="text-stone-400 font-sans text-xs mt-4 tracking-widest leading-relaxed uppercase">
            Create an account to unlock exclusive <br /> rates and luxury privileges.
          </p>
        </div>

        {/* Alerts */}
        <div className="mb-6 font-sans">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-4 text-[10px] tracking-widest uppercase mb-4 border-l-2 border-red-600">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-4 text-[10px] tracking-widest uppercase mb-4 border-l-2 border-green-700">
              ✓ {successMsg}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-6">
            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                placeholder="FIRST NAME *"
                className={`border-b bg-transparent py-3 outline-none transition-all text-[10px] tracking-[0.2em] font-sans ${
                  errors.first_name ? "border-red-400" : "border-stone-200 focus:border-stone-800"
                }`}
                {...register("first_name", { required: "First name is required" })}
              />
              {errors.first_name && <span className="text-red-400 text-[9px] mt-1 uppercase tracking-tighter">{errors.first_name.message}</span>}
            </div>
            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                placeholder="LAST NAME *"
                className={`border-b bg-transparent py-3 outline-none transition-all text-[10px] tracking-[0.2em] font-sans ${
                  errors.last_name ? "border-red-400" : "border-stone-200 focus:border-stone-800"
                }`}
                {...register("last_name", { required: "Last name is required" })}
              />
              {errors.last_name && <span className="text-red-400 text-[9px] mt-1 uppercase tracking-tighter">{errors.last_name.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="PHONE NUMBER"
              className="border-b border-stone-200 bg-transparent py-3 outline-none focus:border-stone-800 transition-all text-[10px] tracking-[0.2em] font-sans"
              {...register("phone_number")}
            />
            <input
              type="text"
              placeholder="ADDRESS"
              className="border-b border-stone-200 bg-transparent py-3 outline-none focus:border-stone-800 transition-all text-[10px] tracking-[0.2em] font-sans"
              {...register("address")}
            />
          </div>

          <div className="flex flex-col">
            <input
              type="email"
              placeholder="EMAIL ADDRESS *"
              className={`border-b bg-transparent py-3 outline-none transition-all text-[10px] tracking-[0.2em] font-sans ${
                errors.email ? "border-red-400" : "border-stone-200 focus:border-stone-800"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-400 text-[9px] mt-1 uppercase tracking-tighter">{errors.email.message}</span>}
          </div>

          <div className="flex gap-6">
            <div className="w-1/2 flex flex-col">
              <input
                type="password"
                placeholder="PASSWORD *"
                className={`border-b bg-transparent py-3 outline-none transition-all text-[10px] tracking-[0.2em] font-sans ${
                  errors.password ? "border-red-400" : "border-stone-200 focus:border-stone-800"
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="text-red-400 text-[9px] mt-1 uppercase tracking-tighter">{errors.password.message}</span>}
            </div>
            <div className="w-1/2 flex flex-col">
              <input
                type="password"
                placeholder="REPEAT PASSWORD *"
                className={`border-b bg-transparent py-3 outline-none transition-all text-[10px] tracking-[0.2em] font-sans ${
                  errors.re_password ? "border-red-400" : "border-stone-200 focus:border-stone-800"
                }`}
                {...register("re_password", {
                  required: "Confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.re_password && <span className="text-red-400 text-[9px] mt-1 uppercase tracking-tighter">{errors.re_password.message}</span>}
            </div>
          </div>

          <button className="w-full bg-[#1e2d35] text-white py-5 uppercase text-[10px] tracking-[0.4em] font-sans font-bold hover:bg-[#b1a494] transition-all duration-500 shadow-lg">
            Register Account
          </button>
        </form>

        <p className="mt-10 text-center text-[10px] font-sans text-stone-400 uppercase tracking-[0.2em]">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-stone-800 font-bold border-b border-stone-800 pb-1 ml-2 hover:text-[#b1a494] hover:border-[#b1a494] transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Right Side: Visual Section */}
      <div className="hidden lg:block lg:w-1/2 bg-stone-900 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[30%]"
          alt="luxury hotel"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-20 text-white">
          <span className="text-[#b1a494] text-[10px] tracking-[0.5em] uppercase mb-4">Member Benefits</span>
          <h2 className="text-5xl font-serif mb-12 leading-tight uppercase font-light tracking-wider">
            A world of luxury <br /> awaits you.
          </h2>
          <ul className="space-y-8 text-[11px] uppercase tracking-[0.25em] font-sans font-light">
            <li className="flex items-center gap-6">
              <span className="w-6 h-[1px] bg-[#b1a494]"></span>
              Manage your bookings seamlessly
            </li>
            <li className="flex items-center gap-6">
              <span className="w-6 h-[1px] bg-[#b1a494]"></span>
              Exclusive seasonal member offers
            </li>
            <li className="flex items-center gap-6">
              <span className="w-6 h-[1px] bg-[#b1a494]"></span>
              Priority access to luxury suites
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;