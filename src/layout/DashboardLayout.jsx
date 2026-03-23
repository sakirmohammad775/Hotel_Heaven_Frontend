import { Outlet, Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const DashboardLayout = () => {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <div className="w-64 bg-[#1e2d35] text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <ul className="space-y-4">
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/bookings">Bookings</Link>
          </li>
          <li>
            <Link to="/">Back to Home</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {user?.username || "User"}
        </h1>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;