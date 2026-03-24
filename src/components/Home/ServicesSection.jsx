import React from "react";

const ServicesSection = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 text-white font-sans">
      {/* Main Navigation */}
      <div className="flex justify-between items-center px-6 py-8 md:px-12">
        <ul className="hidden lg:flex gap-10 text-[13px] uppercase tracking-[0.2em] font-light">
          {[
            "Home",
            "Rooms",
            "Pages",
            "Offer",
            "Gallery",
            "Blog",
            "Contact Us",
          ].map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-stone-300 transition-colors flex items-center gap-1"
            >
              {item}{" "}
              {item !== "Gallery" && (
                <span className="text-[8px] opacity-60">▼</span>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <div className="flex flex-col gap-1.5 cursor-pointer group">
          <div className="w-8 h-[1px] bg-white transition-all group-hover:w-10"></div>
          <div className="w-10 h-[1px] bg-white"></div>
        </div>
      </div>
    </nav>
  );
};

export default ServicesSection;