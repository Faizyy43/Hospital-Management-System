import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { Users, Calendar, Stethoscope, AlertCircle, Activity, UserPlus, Clock, ArrowUpRight } from "lucide-react";
import PageHeader from "../../../Layout/PageHeader";

const Hdashboard = () => {
  // 🔥 Backend-ready data (replace later with API)
  const stats = [
    { title: "Total Patients", value: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", trend: "+12%" },
    { title: "Today's Appointments", value: "32", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", trend: "+5%" },
    { title: "Doctors Available", value: "18", icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", trend: "Steady" },
    { title: "Emergency Cases", value: "5", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-100", trend: "-2%" },
  ];

  const chartData = [
    { day: "Mon", appointments: 20 },
    { day: "Tue", appointments: 35 },
    { day: "Wed", appointments: 28 },
    { day: "Thu", appointments: 40 },
    { day: "Fri", appointments: 30 },
  ];

  const patients = [
    { name: "John Doe", age: 32, status: "Admitted", date: "Today, 09:30 AM" },
    { name: "Sarah Smith", age: 27, status: "Discharged", date: "Today, 11:15 AM" },
    { name: "Ali Khan", age: 45, status: "Treatment", date: "Yesterday, 04:00 PM" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Admitted":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">Admitted</span>;
      case "Discharged":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">Discharged</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <PageHeader
        title="Admin Analytics"
        subtitle="Hospital operations overview and daily throughput"
      />

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-medium">{item.title}</p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
                    {item.value}
                  </h2>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bg} ${item.color} ${item.border} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-sm">
                <span className={`flex items-center gap-0.5 font-semibold ${item.trend.startsWith('-') ? 'text-red-500' : item.trend === 'Steady' ? 'text-slate-500' : 'text-emerald-500'}`}>
                  {item.trend !== 'Steady' && <ArrowUpRight className={`w-3.5 h-3.5 ${item.trend.startsWith('-') ? 'rotate-90' : ''}`} />}
                  {item.trend}
                </span>
                <span className="text-slate-400">vs last week</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 🔹 Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-slate-900 tracking-tight">
               Appointments Trend
             </h2>
             <select className="text-sm bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-slate-700 font-medium focus:outline-none focus:border-blue-500">
               <option>This Week</option>
               <option>Last Week</option>
             </select>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAppts)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6">
            Recent Activity
          </h2>

          <div className="space-y-6 flex-1">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 mt-0.5 border border-blue-100">
                <UserPlus className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">New patient registered</p>
                <p className="text-xs text-slate-500 mt-1">Michael Scott completed onboarding.</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2">10 mins ago</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 mt-0.5 border border-emerald-100">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Schedule Updated</p>
                <p className="text-xs text-slate-500 mt-1">Dr. Sharma opened 4 new slots.</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2">1 hour ago</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 mt-0.5 border border-indigo-100">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Appointment booked</p>
                <p className="text-xs text-slate-500 mt-1">Sarah Smith with Cardiology.</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2">2 hours ago</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100">
            View All Activity
          </button>
        </div>
      </div>

      {/* 🔹 Patients Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
           <h2 className="text-lg font-bold text-slate-900 tracking-tight">
             Recent Patients
           </h2>
           <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">View Directory</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Timeline</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {patients.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
                         {p.name.charAt(0)}
                       </div>
                       <span className="font-semibold text-slate-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {p.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{p.age} yrs</td>
                  <td className="px-6 py-4">{getStatusBadge(p.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Hdashboard;