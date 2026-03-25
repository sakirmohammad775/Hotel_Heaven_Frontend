import {
  ChevronDown,
} from "lucide-react";
import TableCard from "../components/Dashboard/TableCard";
import StatCard from "../components/Dashboard/StatCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      
    
      {/* 4. MAIN CONTENT AREA */}
      <main className="flex-1 p-4 lg:p-10">
        {/* Desktop Title Header */}
        <header className="hidden lg:flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
            <p className="text-slate-400 text-sm">
              Welcome back to your overview.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm text-sm font-semibold text-slate-600 cursor-pointer">
            English <ChevronDown size={16} />
          </div>
        </header>

        {/*Stat Card */}
        <StatCard></StatCard>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <TableCard title="Expected Arrival" />
          <TableCard title="Expected Departure" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;