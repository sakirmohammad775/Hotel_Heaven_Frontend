import { Navigate, useLocation, Outlet } from "react-router-dom"; // 🔹 Added Outlet
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-10 h-[1px] bg-[#b1a494] animate-pulse"></div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#b1a494] ml-4">
          Authenticating
        </span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔹 Logic: If 'children' exists, render it. 
  // Otherwise, render the 'Outlet' for nested routes.
  return children ? children : <Outlet />;
};

export default PrivateRoute;