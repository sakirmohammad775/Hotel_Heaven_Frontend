import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";

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
    setSuccessMsg(""); // Clear previous success
    try {
      const response = await registerUser(data);

      if (response.success) {
        setSuccessMsg(response.message);
      } else {
        // The error alert will now show the specific server message
        // like "email: Enter a valid email address."
        console.error("Backend validation failed:", response.message);
      }
    } catch (error) {
      console.log("System Error:", error);
    }
  };

  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side: Form */}
      <div className="lg:w-1/2 flex flex-col justify-center px-12 lg:px-24 bg-white py-12">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-serif mb-2 uppercase tracking-widest">
            Register
          </h2>
          <p className="text-stone-400 text-sm">
            Register for a hotel account to enjoy exclusive privileges
          </p>
        </div>
        {errorMsg && <ErroAlert error={errorMsg} />}
        {successMsg && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="FIRST NAME *"
              className="w-1/2 border-b border-stone-200 py-3 outline-none focus:border-stone-800 transition-colors  text-[10px] tracking-widest"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            <input
              type="text"
              placeholder="LAST NAME *"
              className="w-1/2 border-b border-stone-200 py-3 outline-none focus:border-stone-800 transition-colors  text-[10px] tracking-widest"
              {...register("last_name", { required: "Last name is required" })}
            />
          </div>

          <input
            type="text"
            placeholder="PHONE NUMBER"
            className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-800 transition-colors  text-[10px] tracking-widest"
            {...register("phone_number")}
          />

          <input
            type="text"
            placeholder="ADDRESS"
            className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-800 transition-colors  text-[10px] tracking-widest"
            {...register("address")}
          />

          {/* Email Field */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="EMAIL *"
              className={`w-full border-b py-3 outline-none transition-colors text-[10px] tracking-widest ${
                errors.email
                  ? "border-red-500"
                  : "border-stone-200 focus:border-stone-800"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-[10px] mt-1 uppercase">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="PASSWORD *"
              className={`w-full border-b py-3 outline-none transition-colors text-[10px] tracking-widest ${
                errors.password
                  ? "border-red-500"
                  : "border-stone-200 focus:border-stone-800"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-[10px] mt-1 uppercase">
                {errors.password.message}
              </span>
            )}
          </div>
          <input
            type="password"
            placeholder="REPEAT PASSWORD *"
            className="w-full border-b border-stone-200 py-3 outline-none focus:border-stone-800 transition-colors  text-[10px] tracking-widest"
            {...register("re_password", {
              required: "Re Password is required",
              validate: (value) =>
                value === watch("password") || "password don not match",
            })}
          />
          {errors.re_password && (
            <span className="label-text-alt text-error">
              {errors.re_password.message}
            </span>
          )}
          <button className="w-full bg-[#004225] text-white py-4 uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-black transition-all">
            Register Account
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-stone-400 uppercase tracking-widest">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-bold border-b border-black pb-1"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Right Side: Image/Info Section */}
      <div className="hidden lg:block lg:w-1/2 bg-stone-900 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="luxury"
        />
        <div className="relative z-10 h-full flex flex-col justify-center px-20 text-white">
          <h2 className="text-5xl font-serif mb-8 leading-tight">
            What do you get as a member?
          </h2>
          <ul className="space-y-6 text-sm uppercase tracking-[0.2em]">
            <li className="flex items-center gap-4">
              ✓ Cancel the room right in my account
            </li>
            <li className="flex items-center gap-4">
              ✓ Exclusive offer for members
            </li>
            <li className="flex items-center gap-4">
              ✓ In-depth examination of time information
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;