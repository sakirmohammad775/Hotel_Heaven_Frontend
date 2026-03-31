import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for web
import useAuthContext from "../hooks/useAuthContext";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Logic hooks
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu items matched to your path logic
  const menuItems = [
    { name: "Home", path: "/", hasSub: false },
    { name: "Hotels", path: "/hotels", hasSub: true },
    { name: "Offers", path: "/offers", hasSub: true },
    { name: "Gallery", path: "/gallery", hasSub: false },
    { name: "Contact", path: "/contact", hasSub: false },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? "bg-[#1e2d35] shadow-xl py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex justify-between items-center text-white">
            
            {/* Logo Section */}
            <Link to="/">
              <div className="flex items-center gap-2 group cursor-pointer shrink-0">
                <div className="w-9 h-9 md:w-10 md:h-10 border border-white rounded-full flex items-center justify-center italic font-serif text-lg md:text-xl transition-all group-hover:bg-white group-hover:text-black">
                  H
                </div>
                <div className="flex flex-col leading-none text-white">
                  <h1 className="text-xl md:text-2xl font-serif tracking-tight uppercase">
                    HotelHeaven
                  </h1>
                  <span className="text-[6px] md:text-[7px] uppercase tracking-[0.2em] opacity-70">
                    Luxury Booking & Resort
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden xl:flex gap-6 text-[11px] uppercase tracking-[0.15em] font-light font-sans">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="group relative cursor-pointer hover:text-stone-300 transition-colors py-2"
                >
                  <Link to={item.path}>
                    <span className="flex items-center gap-1">
                      {item.name}
                      {item.hasSub && <span className="text-[8px] opacity-40">▼</span>}
                    </span>
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#b1a494] transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            {/* Right Side - Auth & Cart */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* 🛒 Cart Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
                      <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="badge badge-sm badge-error indicator-item text-white">
                          {cart?.items?.length || 0}
                        </span>
                      </div>
                    </div>
                    <div tabIndex={0} className="card card-compact dropdown-content bg-white border border-slate-200 z-[10] mt-3 w-52 shadow-xl text-slate-800">
                      <div className="card-body">
                        <span className="text-lg font-bold">{cart?.items?.length || 0} Items</span>
                        <span className="text-blue-600 font-medium">Subtotal: ${cart?.total_price || 0}</span>
                        <div className="card-actions">
                          <Link to="/dashboard/cart" className="w-full">
                            <button className="btn bg-[#1e2d35] hover:bg-[#b1a494] text-white btn-block border-none">View Bookings</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 👤 Profile Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-white/20">
                      <div className="w-8 rounded-full">
                        <img alt="User" src="https://i.pravatar.cc/40" />
                      </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white text-slate-800 rounded-box z-[10] mt-3 w-52 p-2 shadow-xl border border-slate-100">
                      <li><Link to="/dashboard" className="py-3">Dashboard</Link></li>
                      <li><button onClick={logoutUser} className="py-3 text-error font-bold">Logout</button></li>
                    </ul>
                  </div>

                  {/* Mobile Hamburger (Visible only on Sm/Md) */}
                  <button className="xl:hidden text-white text-2xl p-2" onClick={() => setIsDrawerOpen(true)}>☰</button>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest">
                  <Link to="/login" className="hover:text-[#b1a494] transition-colors">Sign In</Link>
                  <Link to="/register" className="bg-[#b1a494] px-5 py-2 rounded-sm transition-all hover:bg-white hover:text-black">Sign Up</Link>
                  <button className="xl:hidden text-white text-2xl" onClick={() => setIsDrawerOpen(true)}>☰</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDE DRAWER --- */}
      <div
        className={`fixed inset-0 bg-black/50 z-[110] transition-opacity duration-300 xl:hidden ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#1e2d35] z-[120] p-8 flex flex-col transition-transform duration-500 ease-in-out xl:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center italic font-serif">H</div>
            <span className="text-lg font-serif uppercase tracking-tight">HotelHeaven</span>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="text-white text-2xl font-light">✕</button>
        </div>

        <ul className="flex flex-col gap-6 flex-grow">
          {menuItems.map((item) => (
            <li key={item.name} className="text-white/90 text-sm font-sans tracking-widest uppercase hover:text-[#b1a494] transition-colors">
              <Link to={item.path} onClick={() => setIsDrawerOpen(false)}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8 border-t border-white/10 text-white/60">
          <h4 className="text-white text-lg font-serif mb-4 uppercase tracking-widest">Contact</h4>
          <p className="text-xs font-sans leading-relaxed mb-6">
            Luxury St. 123, New York, NY 10001
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;