import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import RecentHospitals from "../components/RecentHospitals";
import {
  getDashboardStats,
  getRecentHospitals,
} from "../../../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsData = await getDashboardStats();
      const hospitalData = await getRecentHospitals();

      setStats(statsData);
      setHospitals(hospitalData);
    };

    fetchData();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Hospitals" value={stats.totalHospitals} />
        <StatCard title="Total Patients" value={stats.totalPatients} />
        <StatCard title="Appointments" value={stats.appointments} />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} />
      </div>

      {/* Recent Hospitals */}
      <RecentHospitals data={hospitals} />
    </div>
  );
};

export default Dashboard;