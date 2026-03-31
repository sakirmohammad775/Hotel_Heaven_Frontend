const ProfileButtons = ({ isEditing, setIsEditing, isSubmitting }) => {
  // Editorial style: High-contrast, wide tracking, and bold uppercase
  const baseButtonClasses = "px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 active:scale-95 shadow-lg";
  
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10 border-t border-white/5">
      {isEditing ? (
        <div className="flex items-center gap-8">
          {/* 1. Logic: type="submit" triggers the handleSubmit(onSubmit) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              ${baseButtonClasses}
              bg-[#b1a494] text-black hover:bg-[#fce0c0] hover:shadow-[#b1a494]/20
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          {/* 2. Logic: type="button" with setIsEditing(false) to cancel */}
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors py-2 border-b border-transparent hover:border-white/20"
          >
            Cancel
          </button>
        </div>
      ) : (
        /* 3. Logic: type="button" with setIsEditing(true) to unlock the form */
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className={`
            ${baseButtonClasses}
            bg-transparent border border-white/20 text-white hover:bg-white hover:text-black
          `}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButtons;