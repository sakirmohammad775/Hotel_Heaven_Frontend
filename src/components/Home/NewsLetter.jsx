const NewsLetter = () => {
  return (
    <>
      {/* Container: Visible on all screens, removes 'hidden lg:block' */}
      <div className="w-full py-12 md:py-20 bg-stone-900 relative min-h-[500px] flex items-center">
        
        {/* Background image layer */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/75 md:bg-black/70"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 text-white">
          {/* Close Button - adjusted for mobile padding */}
          <button className="absolute -top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white text-2xl">
            ✕
          </button>

          <div className="max-w-4xl">
            {/* Headline: Scaled text sizes for sm/md/lg */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 leading-tight">
              What do you get as a member?
            </h2>
            
            <p className="text-stone-400 text-sm mb-10 md:mb-12 max-w-lg leading-relaxed">
              Registering allows you to manage your stays and access member-only
              rates across our luxury properties.
            </p>

            {/* List: Grid layout on md+ to save vertical space if needed */}
            <ul className="space-y-5 md:space-y-6 text-[10px] md:text-xs font-bold tracking-widest uppercase">
              <li className="flex items-start md:items-center gap-4">
                <span className="shrink-0 w-5 h-5 rounded-full border border-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>Cancel the room right in my account</span>
              </li>
              <li className="flex items-start md:items-center gap-4">
                <span className="shrink-0 w-5 h-5 rounded-full border border-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>Exclusive offer for members</span>
              </li>
              <li className="flex items-start md:items-center gap-4">
                <span className="shrink-0 w-5 h-5 rounded-full border border-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>In-depth examination of time information</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;