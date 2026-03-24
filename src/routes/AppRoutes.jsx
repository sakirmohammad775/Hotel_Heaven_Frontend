import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SpecificHotelDetails from "../components/Hotel/SpecificHotelPage";



const AppRoutes = () => {
    return (
    <Routes>
         <Route path="/" element={<Home></Home>}></Route>
         <Route path="/hotels/:id" element={<SpecificHotelDetails />} />
    </Routes>
    );
};

export default AppRoutes;