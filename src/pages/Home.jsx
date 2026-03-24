
import Carousel from "../components/Home/Carousel"
import HotelList from "../components/Hotel/HotelList";


const Home = () => {
  return (
    <>
      <HotelList></HotelList>
      <Carousel></Carousel>
      
      {/* Global Scroll-to-Top Indicator */}
      <div className="flex justify-center py-12 bg-white">
        <div className="w-[1px] h-20 bg-stone-200"></div>
      </div>
      
     
      {/* Sticky Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#b1a494] text-white rounded-full flex items-center justify-center shadow-xl z-[100] transition-transform hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default Home;