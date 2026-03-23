import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import HotelCard from './HotelCard';
import apiClient from '../../services/Api-Client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    apiClient.get("/hotels/")
      .then((res) => setHotels(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-[#f8f6f3] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="w-16 h-[1px] bg-stone-400 mb-6"></div>
          <h1 className="text-3xl md:text-5xl font-serif text-[#1e2d35] uppercase tracking-tight mb-4">
            Our World of Destinations
          </h1>
          <p className="text-stone-500 text-sm max-w-xl font-sans leading-relaxed">
            From the shores of Cox's Bazar to the peaks of the mountains, experience luxury redefined in our handpicked locations.
          </p>
        </div>

        {/* Carousel implementation */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 2.5 }
          }}
          className="luxury-swiper"
        >
          {hotels.map((hotel) => (
            <SwiperSlide key={hotel.id}>
              <HotelCard hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles to make Swiper look like your Luxury brand */}
      <style jsx global>{`
        .luxury-swiper .swiper-button-next,
        .luxury-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(30, 45, 53, 0.5);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .luxury-swiper .swiper-button-next:after,
        .luxury-swiper .swiper-button-prev:after {
          font-size: 18px;
        }
        .luxury-swiper .swiper-pagination-bullet-active {
          background: #b1a494 !important;
        }
      `}</style>
    </section>
  );
};

export default HotelList;