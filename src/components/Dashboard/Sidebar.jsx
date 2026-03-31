import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Info, MapPin, Bed, LayoutList, Utensils,
  Music, Coffee, Car, Dumbbell, Menu, X, User, ShoppingBag, 
  HelpCircle, CreditCard
} from "lucide-react";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthContext();
  const location = useLocation();

  const adminMenus = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/dashboard/basic-info", icon: <Info size={18} />, label: "Basic Information" },
    { to: "/dashboard/address", icon: <MapPin size={18} />, label: "Address" },
    { to: "/dashboard/rooms", icon: <Bed size={18} />, label: "Rooms" },
    { to: "/dashboard/room-details", icon: <LayoutList size={18} />, label: "Room Details" },
    { to: "/dashboard/food", icon: <Utensils size={18} />, label: "Dining" },
    { to: "/dashboard/bar", icon: <Music size={18} />, label: "Nightclub & Bar" },
    { to: "/dashboard/lounge", icon: <Coffee size={18} />, label: "Executive Lounge" },
    { to: "/dashboard/parking", icon: <Car size={18} />, label: "Parking" },
    { to: "/dashboard/spa", icon: <Dumbbell size={18} />, label: "SPA & Gym" },
  ];

  const customerMenus = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "My Dashboard" },
    { to: "/dashboard/bookings", icon: <ShoppingBag size={18} />, label: "My Bookings" },
    { to: "/dashboard/profile", icon: <User size={18} />, label: "Profile" },
    { to: "/dashboard/support", icon: <HelpCircle size={18} />, label: "Help Center" },
    { to: "/checkout", icon: <CreditCard size={18} />, label: "Checkout" },
  ];

  const menuItems = user?.is_staff ? adminMenus : customerMenus;

  return (
    <>
      {/* MOBILE HEADER - Editorial Style */}
      <div className="lg:hidden bg-stone-950 border-b border-white/5 p-4 flex items-center justify-between fixed top-0 w-full z-[50]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <Menu size={24} className="text-[#b1a494]" />
          </button>
          <h1 className="font-serif text-white tracking-widest text-sm uppercase italic">
            Carmelína <span className="text-[#b1a494]">Heaven</span>
          </h1>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION - Dark Luxury Design */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-72 bg-black border-r border-white/5 transition-transform duration-500 ease-in-out z-[100]
          lg:translate-x-0 lg:static lg:z-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Branding Area */}
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#b1a494] font-black block mb-1">
              {user?.is_staff ? "Management" : "Guest Portal"}
            </span>
            <h1 className="text-xl font-serif text-white uppercase tracking-tighter">
              {user?.is_staff ? "Hotel Admin" : "Your Account"}
            </h1>
          </div>
          <button className="lg:hidden p-2 text-stone-500" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="h-[calc(100vh-120px)] overflow-y-auto pt-8 px-6 scrollbar-hide">
          <ul className="space-y-2">
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.to;

              return (
                <li key={idx}>
                  <Link
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      relative group flex items-center gap-4 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300
                      ${isActive
                        ? "text-black bg-[#fce0c0]" 
                        : "text-stone-400 hover:text-[#b1a494] hover:bg-white/5"
                      }
                    `}
                  >
                    {/* Active Accent Bar */}
                    {isActive && (
                      <div className="absolute left-0 w-[3px] h-full bg-[#b1a494]" />
                    )}
                    
                    <span className={isActive ? "text-stone-900" : "text-[#b1a494]/60 group-hover:text-[#b1a494]"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer Decoration */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center gap-4 px-4 opacity-30">
               <div className="w-8 h-[1px] bg-[#b1a494]"></div>
               <span className="text-[9px] uppercase tracking-widest text-white">Editorial 2026</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;