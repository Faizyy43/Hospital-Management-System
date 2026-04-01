import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PageHeader from "../../../Layout/PageHeader";

const Hdashboard = () => {
  // 🔥 Backend-ready data (replace later with API)
  const stats = [
    { title: "Total Patients", value: 1240 },
    { title: "Appointments Today", value: 32 },
    { title: "Doctors Available", value: 18 },
    { title: "Emergency Cases", value: 5 },
  ];

  const chartData = [
    { day: "Mon", appointments: 20 },
    { day: "Tue", appointments: 35 },
    { day: "Wed", appointments: 28 },
    { day: "Thu", appointments: 40 },
    { day: "Fri", appointments: 30 },
  ];

  const patients = [
    { name: "John Doe", age: 32, status: "Admitted" },
    { name: "Sarah Smith", age: 27, status: "Discharged" },
    { name: "Ali Khan", age: 45, status: "Under Treatment" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
     <PageHeader
  title="Analytics"
  subtitle="Analyzation of Hospital & Drafts"
/>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* 🔹 Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Chart */}
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Appointments Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="appointments" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Activity
          </h2>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li>New patient registered</li>
            <li>Doctor updated schedule</li>
            <li>Appointment booked</li>
          </ul>
        </div>
      </div>

      {/* 🔹 Patients Table */}
      <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Recent Patients
        </h2>

        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Name</th>
              <th>Age</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-2">{p.name}</td>
                <td>{p.age}</td>
                <td className="text-blue-600">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Hdashboard;