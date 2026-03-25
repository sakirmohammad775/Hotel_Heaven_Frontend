import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Use Link for navigation
import {
  LayoutDashboard,
  Info,
  MapPin,
  Bed,
  LayoutList,
  Utensils,
  Music,
  Coffee,
  Car,
  Dumbbell,
  Menu,
  X,
  User,
  ShoppingBag
} from "lucide-react";
import useAuthContext from "../../hooks/useAuthContext";


const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthContext();
  const location = useLocation();

  // 1. Logic: Define different menus based on role
  const adminMenus = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/dashboard/basic-info", icon: <Info size={18} />, label: "Basic Information" },
    { to: "/dashboard/address", icon: <MapPin size={18} />, label: "Address Information" },
    { to: "/dashboard/rooms", icon: <Bed size={18} />, label: "Rooms" },
    { to: "/dashboard/room-details", icon: <LayoutList size={18} />, label: "Rooms Details" },
    { to: "/dashboard/food", icon: <Utensils size={18} />, label: "Food & Beverage" },
    { to: "/dashboard/bar", icon: <Music size={18} />, label: "Nightclub / Bar" },
    { to: "/dashboard/lounge", icon: <Coffee size={18} />, label: "Executive Lounge" },
    { to: "/dashboard/parking", icon: <Car size={18} />, label: "Parking" },
    { to: "/dashboard/spa", icon: <Dumbbell size={18} />, label: "SPA, Gym & Beach" },
  ];

  const customerMenus = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "My Dashboard" },
    { to: "/dashboard/bookings", icon: <ShoppingBag size={18} />, label: "My Bookings" },
    { to: "/dashboard/profile", icon: <User size={18} />, label: "Profile Settings" },
    { to: "/dashboard/support", icon: <Info size={18} />, label: "Help Center" },
    { to: "/checkout", icon: <Info size={18} />, label: "checkout" },
  ];

  // 2. Dynamic Menu Selection
  const menuItems = user?.is_staff ? adminMenus : customerMenus;

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden bg-white border-b p-4 flex items-center justify-between fixed top-0 w-full z-[50] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-slate-600" />
          </button>
          <h1 className="font-bold text-slate-800 text-lg">Hotel Admin</h1>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r shadow-2xl transition-transform duration-300 ease-in-out z-[100]
        lg:translate-x-0 lg:static lg:shadow-none lg:z-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 flex justify-between items-center border-b lg:border-none">
          <h1 className="text-xl font-bold text-slate-800 tracking-widest uppercase">
            {user?.is_staff ? "Admin" : "Guest"}
          </h1>
          <button className="lg:hidden p-2" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <nav className="h-[calc(100vh-80px)] overflow-y-auto pb-10 px-4">
          <ul className="space-y-1">
            {menuItems.map((item, idx) => {
              // 3. Logic: Check if current path matches the menu item
              const isActive = location.pathname === item.to;

              return (
                <li key={idx}>
                  <Link
                    to={item.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                        : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                      }
                    `}
                  >
                    <span className={isActive ? "text-white" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;