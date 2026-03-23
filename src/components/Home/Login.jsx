import { useForm } from "react-hook-form";
import useAuthContext from "../../hooks/useAuthContext";
import ErrorAlert from "../ErrorAlert";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log("login Failed", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-[#f8f6f3]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-12 shadow-xl w-full max-w-md border-t-4 border-[#004225]"
      >
        {errorMsg && <ErrorAlert error={errorMsg}></ErrorAlert>}
        <h2 className="text-2xl font-serif text-center mb-8 uppercase tracking-widest">
          Sign In
        </h2>
        <div className="space-y-6">
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full border-b p-3 outline-none text-xs tracking-widest"
            {...register("email", { required: "Email is required " })}
          />
          {errors.email && (
            <span className="label-text-alt text-error">
              {errors.email.message}
            </span>
          )}
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full border-b p-3 outline-none text-xs tracking-widest"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="label-text-alt text-error">
              {errors.password.message}
            </span>
          )}
          <button disabled={loading} className="w-full bg-[#1e2d35] text-white py-4 uppercase text-[10px] tracking-[0.4em] font-bold hover:bg-[#b1a494] transition-all">
            {loading ? "Signing In......." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;