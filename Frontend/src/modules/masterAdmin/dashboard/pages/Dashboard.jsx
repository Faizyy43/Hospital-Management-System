import { useEffect, useState } from "react";
import { Building2, Users, FileCheck, AlertCircle, Activity, ChevronRight, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // Using high-fidelity simulated "real-mode" data instead of dummy charts
  const [stats, setStats] = useState([
    { title: "Total Hospitals", value: "24", icon: Building2, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", trend: "+2" },
    { title: "Active Patients", value: "12,450", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", trend: "+8%" },
    { title: "Pending Requests", value: "3", icon: FileCheck, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", trend: "Action Req" },
    { title: "System Alerts", value: "0", icon: AlertCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", trend: "Healthy" },
  ]);

  const recentHospitals = [
    { id: 1, name: "City General Hospital", location: "Downtown Area", status: "Active", patients: 4500, rating: 4.8 },
    { id: 2, name: "Sunrise Medical Center", location: "Westside", status: "Active", patients: 3200, rating: 4.6 },
    { id: 3, name: "Metro Care Hospital", location: "North District", status: "Onboarding", patients: 0, rating: 0 },
  ];

  const pendingApprovals = [
    { id: 101, type: "New Registration", hospital: "Hope Clinic", time: "2 hours ago", status: "Awaiting Verification" },
    { id: 102, type: "Plan Upgrade", hospital: "City General Hospital", time: "5 hours ago", status: "Pending Payment" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-white">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <Link to={"/"} className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Master Platform Overview</Link>
        <p className="text-slate-500 text-xs md:text-sm mt-1">Real-time metrics and network management</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 sm:p-5 rounded-2xl border ${stat.border} bg-white shadow-sm hover:shadow-md transition-all group`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 sm:p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                {stat.trend}
              </span>
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Network Hospitals Table */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Hospital Network</h2>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Recently updated facilities</p>
            </div>
            <button 
              onClick={() => navigate('/admin/hospitals')} 
              className="text-[10px] sm:text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
            >
              View Directory
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-white border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="p-4 font-semibold w-[45%]">Facility Name</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Patients</th>
                  <th className="p-4 font-semibold text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentHospitals.map((hosp) => (
                  <tr key={hosp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-sm font-medium text-slate-800">
                      {hosp.name}
                      <span className="block text-xs font-normal text-slate-500 mt-0.5">{hosp.location}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        hosp.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {hosp.status === "Active" && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                        {hosp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-sm text-slate-600 font-medium">{hosp.patients.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-semibold text-slate-700">
                        <Star className={`w-3.5 h-3.5 ${hosp.rating > 0 ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                        {hosp.rating > 0 ? hosp.rating : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pending Approvals */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Pending Actions</h2>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Requires admin review</p>
            </div>
            <button onClick={() => navigate('/admin/requests')} className="text-[10px] sm:text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors">View All</button>
          </div>
          <div className="flex-1 p-4 sm:p-5 space-y-3 sm:space-y-4">
            {pendingApprovals.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 py-6">
                 <FileCheck className="w-8 h-8 mb-2 opacity-50" />
                 <p className="text-sm font-medium">All caught up!</p>
               </div>
            ) : (
              pendingApprovals.map((req) => (
                <div key={req.id} className="p-3 sm:p-4 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-xs sm:text-sm text-slate-800">{req.type}</h3>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3" /> {req.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3"><span className="font-semibold">{req.hospital}</span> has submitted a request.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-100">
                      {req.status}
                    </span>
                    <button className="w-7 h-7 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;