import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import HotelDetails from "../components/Hotel/SpecificHotelPage";



const AppRoutes = () => {
    return (
    <Routes>
         <Route path="/" element={<Home></Home>}></Route>
         <Route path="/hotels/:id" element={<HotelDetails />} />
    </Routes>
    );
};

export default AppRoutes;