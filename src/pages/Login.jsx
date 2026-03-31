import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorAlert from "../components/ErrorAlert";
import useAuthContext from "../hooks/useAuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { user, errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if user is already logged in or just logged in successfully
  // This is the most reliable way to handle the "stays on page" bug
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // loginUser should update the 'user' state in your AuthContext
      await loginUser(data);
      // We don't necessarily need to navigate here because the useEffect 
      // above will catch the 'user' change and move the user automatically.
    } catch (error) {
      console.log("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen text-white flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-stone-950 p-12 shadow-2xl w-full max-w-md border border-white/5"
      >
        {errorMsg && <ErrorAlert error={errorMsg} />}
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-[1px] bg-[#b1a494] mb-4"></div>
          <h2 className="text-3xl font-serif text-center uppercase tracking-[0.2em]">
            Sign <span className="italic text-[#b1a494]">In</span>
          </h2>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-white/10 p-3 outline-none text-[10px] tracking-[0.2em] focus:border-[#b1a494] transition-colors placeholder:text-stone-700 "
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="password"
              className="w-full bg-transparent border-b border-white/10 p-3 outline-none text-[10px] tracking-[0.2em] focus:border-[#b1a494] transition-colors placeholder:text-stone-700 "
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#b1a494] text-black py-4 uppercase text-[10px] tracking-[0.4em] font-black hover:bg-[#fce0c0] transition-all disabled:opacity-50 disabled:cursor-not-out"
          >
            {loading ? "Authenticating..." : "Enter Sanctuary"}
          </button>

          <p className="mt-10 text-center text-[9px] text-stone-500 uppercase tracking-[0.3em] font-bold">
            New to the collection?{" "}
            <Link
              to="/register"
              className="text-[#b1a494] border-b border-[#b1a494]/30 pb-1 ml-2 hover:text-white hover:border-white transition-all"
            >
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;