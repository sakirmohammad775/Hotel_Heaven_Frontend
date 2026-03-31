import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import ProfileButtons from "../components/Dashboard/Profile/ProfileButtons";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, changePassword, errorMsg } = useAuthContext();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };

      const profileResult = await updateUserProfile(profilePayload);
      if (!profileResult.success) return;

      if (data.current_password && data.new_password) {
        const passwordResult = await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
        if (!passwordResult.success) return;
      }

      setIsEditing(false);
    } catch (error) {
      console.log("Submit error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Editorial Header --- */}
        <div className="flex flex-col mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-[#b1a494]"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#b1a494] font-black">
              Account Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tighter">
            Guest <span className="italic text-[#b1a494]">Profile.</span>
          </h1>
        </div>

        {/* --- Form Container --- */}
        <div className="relative group">
          {/* Subtle Glow Effect seen in your Registration screen */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#b1a494]/5 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 bg-stone-950 border border-white/5 p-8 md:p-12 shadow-2xl">
            {errorMsg && (
              <div className="mb-8">
                <ErrorAlert error={errorMsg} />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              
              {/* Profile Fields Section */}
              <section>
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-8 flex items-center gap-4">
                  Personal Details <div className="h-[1px] flex-grow bg-white/5"></div>
                </h2>
                <ProfileForm
                  register={register}
                  errors={errors}
                  isEditing={isEditing}
                />
              </section>

              {/* Password Section - Only shown/styled when editing */}
              {isEditing && (
                <section className="pt-8 border-t border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#b1a494] font-bold mb-8 flex items-center gap-4">
                    Security Update <div className="h-[1px] flex-grow bg-[#b1a494]/10"></div>
                  </h2>
                  <PasswordChangeForm
                    errors={errors}
                    register={register}
                    isEditing={isEditing}
                    watch={watch}
                  />
                </section>
              )}

              {/* Action Buttons */}
              <div className="pt-6">
                <ProfileButtons
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  isSubmitting={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Branding Footer */}
        <p className="mt-12 text-center text-[9px] uppercase tracking-[1em] text-stone-700 font-black">
          Carmelína Heaven © 2026
        </p>
      </div>
    </div>
  );
};

export default Profile;