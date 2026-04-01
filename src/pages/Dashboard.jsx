import { useEffect, useState } from "react";
import TableCard from "../components/Dashboard/TableCard";
import StatCard from "../components/Dashboard/StatCard";
import authApiClient from "../services/Auth-Api-Client";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dashboard.jsx
  useEffect(() => {
    authApiClient
      .get("/bookings/")
      .then((res) => setBookings(res.data))
      .catch((err) => {
        console.error("Backend is crashing:", err);
        setBookings([]); // Set to empty array so the map doesn't fail
      });
  }, []);
  // Filter logic for Tables
  const today = new Date().toISOString().split("T")[0];
  const expectedArrivals = bookings.filter(
    (b) => b.check_in === today && b.status !== "Canceled",
  );
  const expectedDepartures = bookings.filter(
    (b) => b.check_out === today && b.status !== "Canceled",
  );

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      <main className="flex-1 p-4 lg:p-10">
        {/* Editorial Header */}
        <header className="hidden lg:flex justify-between items-end mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-[#b1a494]"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#b1a494] font-black">
                Management Overview
              </span>
            </div>
            <h2 className="text-4xl font-serif text-white uppercase tracking-tighter">
              Console.<span className="italic text-[#b1a494]">Heaven</span>
            </h2>
          </div>
          <div className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </header>

        {/* 1. Dynamic Stats */}
        <StatCard bookings={bookings} />

        {/* 2. Dynamic Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <TableCard
            title="Expected Arrivals"
            data={expectedArrivals}
            loading={loading}
            emptyMsg="No arrivals scheduled for today"
          />
          <TableCard
            title="Expected Departures"
            data={expectedDepartures}
            loading={loading}
            emptyMsg="No departures scheduled for today"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
