import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Brand-consistent styles
  const inputBaseClasses = `
    w-full bg-transparent border-b py-3 text-sm transition-all duration-300 outline-none
    ${isEditing 
      ? "border-white/20 text-white focus:border-[#b1a494] placeholder:text-stone-800" 
      : "border-transparent text-stone-500 cursor-not-allowed"
    }
  `;

  const labelClasses = "text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-1 block";

  return (
    <div className="mt-8">
      {/* Toggle Button - Editorial Style */}
      <button
        type="button"
        className="flex items-center gap-3 group transition-colors"
        onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
      >
        <div className={`w-8 h-[1px] transition-all duration-500 ${isPasswordSectionOpen ? "w-12 bg-[#b1a494]" : "bg-stone-600"}`}></div>
        <span className={`text-[10px] uppercase tracking-[0.2em] font-black ${isPasswordSectionOpen ? "text-[#b1a494]" : "text-stone-500 group-hover:text-white"}`}>
          {isPasswordSectionOpen ? "Close Security Settings" : "Change Security Password"}
        </span>
      </button>

      {isPasswordSectionOpen && (
        <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
          
          {/* Current Password */}
          <div className="relative group">
            <label className={labelClasses}>Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={inputBaseClasses}
              disabled={!isEditing}
              {...register("current_password", {
                required: "Current Password is Required",
              })}
            />
            {errors.current_password && (
              <p className="text-[10px] text-red-400 mt-2 uppercase tracking-widest italic font-medium">
                {errors.current_password.message}
              </p>
            )}
          </div>

          {/* New Password & Confirm Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="relative">
              <label className={labelClasses}>New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New security key"
                className={inputBaseClasses}
                disabled={!isEditing}
                {...register("new_password", {
                  required: "New Password is Required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                })}
              />
              {errors.new_password && (
                <p className="text-[10px] text-red-400 mt-2 uppercase tracking-widest italic font-medium">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label className={labelClasses}>Confirm New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Repeat new key"
                className={inputBaseClasses}
                disabled={!isEditing}
                {...register("confirm_new_password", {
                  validate: (value) =>
                    value === watch("new_password") || "Keys do not match",
                })}
              />
              {errors.confirm_new_password && (
                <p className="text-[10px] text-red-400 mt-2 uppercase tracking-widest italic font-medium">
                  {errors.confirm_new_password.message}
                </p>
              )}
            </div>
          </div>

          {/* Show/Hide Password Toggle - Clean Minimalist Style */}
          {isEditing && (
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-stone-500 hover:text-[#b1a494] transition-colors"
              >
                {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                {showPassword ? "Hide Characters" : "Show Characters"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;