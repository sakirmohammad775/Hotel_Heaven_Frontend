import { Outlet } from "react-router";
import Footer from "./Footer";


const MainLayout = () => {
  return (
    <>
      
      <Outlet />
      <Footer/>
      
    </>
  );
};

export default MainLayout;