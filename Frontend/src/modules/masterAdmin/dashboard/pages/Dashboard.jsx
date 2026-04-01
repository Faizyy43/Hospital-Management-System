import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import Leaderboard from "../components/Leaderboard";
import { getDashboardAnalytics } from "../../../../services/dashboardService";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getDashboardAnalytics();
      setData(res);
    };
    fetch();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      {/* 1. Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Hospitals" value={data.stats.totalHospitals} />
        <StatCard title="Active" value={data.stats.activeHospitals} />
        <StatCard title="Patients" value={data.stats.totalPatients} />
        <StatCard title="Pending" value={data.stats.pendingApprovals} highlight />
      </div>

      {/* 2. Charts */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard
          title="Patient Growth"
          data={data.patientGrowth}
          xKey="month"
          dataKey="value"
        />

        <ChartCard
          title="Appointments"
          data={data.appointmentsTrend}
          xKey="day"
          dataKey="value"
        />
      </div>

      {/* 3. Leaderboard + Category */}
      <div className="grid grid-cols-2 gap-4">
        <Leaderboard title="Top Hospitals" data={data.topHospitals} />

        <ChartCard
          title="Specialties"
          data={data.specialties}
          type="bar"
          xKey="name"
          dataKey="value"
        />
      </div>

      {/* 4. Extra analytics */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard
          title="New Hospitals"
          data={data.newHospitals}
          xKey="month"
          dataKey="value"
        />

        <ChartCard
          title="User Acquisition"
          data={data.userAcquisition}
          xKey="month"
          dataKey="value"
        />
      </div>

    </div>
  );
};

export default Dashboard;