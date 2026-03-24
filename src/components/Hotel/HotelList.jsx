import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import apiClient from '../../services/Api-Client';
import HotelCard from './HotelCard';


const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get("/hotels/")
      .then((res) => setHotels(res.data.results)) // ✅ FIXED
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-[#f8f6f3] py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="w-16 h-[1px] bg-stone-400 mb-6"></div>
          <h1 className="text-3xl md:text-5xl font-serif text-[#1e2d35] uppercase tracking-tight mb-4">
            Our World of Destinations
          </h1>
        </div>

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
        >
          {hotels.map((hotel) => (
            <SwiperSlide key={hotel.id}>
              {/* ✅ CLICK → go to details */}
              <div onClick={() => navigate(`/hotels/${hotel.id}`)}>
                <HotelCard hotel={hotel} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HotelList;