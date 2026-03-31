const ProfileForm = ({ register, errors, isEditing }) => {
  // Shared styles for our editorial inputs
  const inputBaseClasses = `
    w-full bg-transparent border-b py-3 text-sm transition-all duration-300 outline-none
    ${isEditing 
      ? "border-white/20 text-white focus:border-[#b1a494] placeholder:text-stone-700" 
      : "border-transparent text-stone-400 cursor-not-allowed"
    }
  `;

  const labelClasses = "text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-1 block";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
      
      {/* First Name */}
      <div className="flex flex-col">
        <label className={labelClasses}>First Name</label>
        <input
          type="text"
          placeholder="Enter first name"
          className={inputBaseClasses}
          disabled={!isEditing}
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-[10px] text-red-400 mt-2 uppercase tracking-widest italic">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label className={labelClasses}>Last Name</label>
        <input
          type="text"
          placeholder="Enter last name"
          className={inputBaseClasses}
          disabled={!isEditing}
          {...register("last_name")}
        />
      </div>

      {/* Email Address - Always disabled but styled to match */}
      <div className="flex flex-col md:col-span-2">
        <label className={labelClasses}>Email Address</label>
        <input
          type="email"
          className={`${inputBaseClasses} opacity-50 border-white/5`}
          disabled
          {...register("email")}
        />
        <p className="text-[9px] text-stone-600 mt-2 italic">
          Email address is linked to your identity and cannot be modified.
        </p>
      </div>

      {/* Address */}
      <div className="flex flex-col md:col-span-2">
        <label className={labelClasses}>Physical Address</label>
        <input
          type="text"
          placeholder="123 Luxury Lane, Chattogram"
          className={inputBaseClasses}
          disabled={!isEditing}
          {...register("address")}
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label className={labelClasses}>Phone Number</label>
        <input
          type="text"
          placeholder="+880"
          className={inputBaseClasses}
          disabled={!isEditing}
          {...register("phone_number")}
        />
      </div>
    </div>
  );
};

export default ProfileForm;