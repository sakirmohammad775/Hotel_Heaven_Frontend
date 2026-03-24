import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../services/Api-Client";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    apiClient.get(`/hotels/${id}/`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!hotel) return <p className="text-center py-20">Loading...</p>;

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      
      {/* Image */}
      <img
        src={hotel.images[0]?.image || "/default.jpg"}
        alt={hotel.name}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />

      {/* Info */}
      <h1 className="text-4xl font-serif mb-4">{hotel.name}</h1>
      <p className="text-gray-500 mb-4">{hotel.location}</p>
      <p className="mb-6">{hotel.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          ${hotel.price_with_tax}
        </span>

        <button className="px-6 py-3 bg-[#1e2d35] text-white">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default HotelDetails;