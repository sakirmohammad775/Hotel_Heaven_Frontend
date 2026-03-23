import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { user, logoutUser } = useAuthContext();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Offers", path: "/offers" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
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

            {/* Logo */}
            <Link to="/">
              <h1 className="text-xl font-bold">HotelHeaven</h1>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden xl:flex gap-6 text-sm uppercase">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>

            {/* Right Side */}
            {user ? (
              <div className="flex items-center gap-4">

                {/* 🛒 Cart */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <span className="badge badge-sm badge-error indicator-item">
                        {cart?.items?.length || 0}
                      </span>
                      🛒
                    </div>
                  </div>

                  <div className="dropdown-content bg-white text-black p-4 shadow w-64">
                    <p className="font-bold">
                      {cart?.items?.length || 0} Items
                    </p>
                    <p>Subtotal: ${cart?.total_price || 0}</p>

                    <Link to="/dashboard/bookings">
                      <button className="btn w-full mt-2 bg-black text-white">
                        View Bookings
                      </button>
                    </Link>
                  </div>
                </div>

                {/* 👤 Profile */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="btn btn-circle avatar">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="profile"
                      className="rounded-full"
                    />
                  </div>

                  <ul className="dropdown-content menu bg-white text-black shadow w-52 mt-2">
                    <li>
                      <Link to="/dashboard/profile">Profile</Link>
                    </li>
                    <li>
                      <button onClick={logoutUser}>Logout</button>
                    </li>
                  </ul>
                </div>

                {/* Mobile Menu */}
                <button
                  className="xl:hidden"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  ☰
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-white w-64 h-full p-5">
            <button onClick={() => setIsDrawerOpen(false)}>Close</button>
            <ul className="mt-5 space-y-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;