import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SpecificHotelDetails from "../components/Hotel/SpecificHotelPage";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/hotels/:id" element={<SpecificHotelDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
