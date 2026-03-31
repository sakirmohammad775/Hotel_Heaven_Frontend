import { Route, Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SpecificHotelDetails from "../components/Hotel/SpecificHotelPage";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ActivateAccount from "../components/Registration/ActivateAccount";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import BookingCheckout from "../components/Booking/BookingCheckout";
import Profile from "../pages/Profile";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import Bookings from "../components/Booking/Bookings";
import Offers from "../components/Home/Offers";
import NearbyPlaces from "../components/Home/NearbyPlaces";
import Hotels from "../components/Home/Hotels";
import ContactUs from "../components/Home/ContactUs";
import Support from "../components/Dashboard/Support"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/hotels/:id" element={<SpecificHotelDetails />} />
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
        <Route path="/offers" element={<Offers></Offers>}></Route>
        <Route path="/gallery" element={<NearbyPlaces></NearbyPlaces>}></Route>
        <Route path="/hotels" element={<Hotels></Hotels>}></Route>

        {/* Protected Checkout & Payment (Full Width) */}
        <Route element={<PrivateRoute />}>
          <Route path="/checkout" element={<BookingCheckout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="/payment/cancelled" element={<PaymentFailed />} />
        </Route>
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
          <Route path="support" element={<Support></Support>}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
