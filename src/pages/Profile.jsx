import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import ProfileButtons from "../components/Dashboard/Profile/ProfileButtons";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, changePassword, errorMsg } =
    useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
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
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {errorMsg && <ErrorAlert error={errorMsg} />}
        <h2 className="card-title text-2xl mb-4">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />

          <PasswordChangeForm
            errors={errors}
            register={register}
            isEditing={isEditing}
            watch={watch}
          />

          <ProfileButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
