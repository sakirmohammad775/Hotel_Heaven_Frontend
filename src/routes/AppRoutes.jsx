import Bookings from "../components/booking/Booking";
import BookingCheckout from "../components/booking/BookingCheckout";
import Login from "../components/Home/Login";
import Register from "../components/Home/Register";
import SpecificHotelPage from "../components/Hotel/SpecificHotelPage";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/ActivateAccount";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Profile from "../pages/Profile";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/hotel/:id" element={<SpecificHotelPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />

        {/* 2. Add the Checkout Route here */}
        <Route path="/checkout" element={<BookingCheckout />} />
               
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
          <Route path="bookings" element={<Bookings />} />
      
        </Route>
        {/* Dynamic route for Django Djoser activation */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;