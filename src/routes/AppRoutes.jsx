import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SpecificHotelDetails from "../components/Hotel/SpecificHotelPage";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ActivateAccount from "../components/Registration/ActivateAccount";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/hotels/:id" element={<SpecificHotelDetails />} />
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout></DashboardLayout>
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard></Dashboard>}></Route>
          <Route path="profile" element={<Profile />} />
          
      
        </Route>
      </Route>
      
      
    </Routes>
  );
};

export default AppRoutes;
