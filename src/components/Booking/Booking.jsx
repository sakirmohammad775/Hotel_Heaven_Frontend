import { useEffect, useState } from 'react';
import authApiClient from '../../services/Auth-Api-Client';
import TableCard from '../Dashboard/TableCard';

const Bookings = () => {
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Replace with your actual Django endpoint
        const response = await authApiClient.get("/bookings/");
        setBookingList(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Booking Management</h2>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mt-1">
          {new Date().toDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Pass the dynamic data and loading state here */}
        <TableCard 
          title="All Reservations" 
          data={bookingList} 
          loading={isLoading} 
        />
      </div>
    </div>
  );
};

export default Bookings;