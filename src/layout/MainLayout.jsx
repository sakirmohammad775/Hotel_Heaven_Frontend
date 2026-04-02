import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ChatAssistant from "../components/ChatBot/ChatAssistant";

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <ChatAssistant></ChatAssistant>
    
      <Footer/>
      
    </>
  );
};

export default MainLayout;