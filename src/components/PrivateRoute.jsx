import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  // 1. STICKY LOADING STATE
  // If the app is still checking the token in localStorage, 
  // do NOT redirect. Stay here and show the luxury loader.
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="w-10 h-[1px] bg-[#b1a494] animate-pulse mb-4"></div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#b1a494]">
          Verifying Access
        </span>
      </div>
    );
  }

  // 2. UNAUTHORIZED CHECK
  // Only redirect if isLoading is false AND there is definitely no user.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. RENDER
  // Supports both <PrivateRoute><Component /></PrivateRoute> 
  // AND <Route element={<PrivateRoute />}><Route ... /></Route>
  return children ? children : <Outlet />;
};

export default PrivateRoute;