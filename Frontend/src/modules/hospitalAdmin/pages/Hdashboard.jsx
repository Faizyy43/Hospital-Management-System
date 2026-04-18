import { Users, Calendar, Stethoscope, AlertCircle, Activity, UserPlus, Clock, ArrowUpRight } from "lucide-react";
import PageHeader from "../../../Layout/PageHeader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hdashboard = () => {
  const navigate = useNavigate();

  // Dynamic simulating data to match actual records
  const stats = [
    { title: "Total Patients", value: "2", icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", trend: "Steady" },
    { title: "Today's Appointments", value: "0", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", trend: "Steady" },
    { title: "Doctors Available", value: "1", icon: Stethoscope, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", trend: "Steady" },
    { title: "Emergency Cases", value: "0", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-100", trend: "Steady" },
  ];

  const patients = [
    { id: 1, name: "John Doe", age: 30, status: "Admitted", date: "Today, 09:30 AM" }, // Updated age to match 30
    { id: 2, name: "Sarah Khan", age: 25, status: "Discharged", date: "Today, 11:15 AM" }, // Updated name and age
  ];

  const recentDoctors = [
    { id: 1, name: "Dr. Smith", speciality: "Cardiology", status: "Available" },
  ];

  const upcomingAppointments = [];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Admitted":
      case "In Surgery":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">{status}</span>;
      case "Discharged":
      case "Available":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">{status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">{status}</span>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Header */}
      <motion.div variants={itemVariants}>
        <PageHeader
          title="Admin Analytics"
          subtitle="Hospital operations overview and daily throughput"
        />
      </motion.div>

      {/* 🔹 Quick Actions */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={() => navigate('/hadmin/doctors')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm"
        >
          <Stethoscope className="w-4 h-4" /> Add Doctor
        </button>
        <button 
          onClick={() => navigate('/hadmin/staff')}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm"
        >
          <Users className="w-4 h-4" /> Add Staff
        </button>
      </motion.div>

      {/* 🔹 Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      </motion.div>

      {/* 🔹 Appointments & Doctors Row (Replaced Graph) */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Appointments */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Upcoming Appointments
            </h2>
            <button onClick={() => navigate('/hadmin/happointments')} className="text-xs font-semibold text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 py-6">
                <Calendar className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">No appointments for today</p>
              </div>
            ) : (
              upcomingAppointments.map(appt => (
                <div key={appt.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{appt.patient}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{appt.doctor} • {appt.type}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      <Clock className="w-3 h-3" /> {appt.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Doctors */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-slate-400" /> Medical Staff on Duty
            </h2>
            <button onClick={() => navigate('/hadmin/doctors')} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Directory</button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            {recentDoctors.map(doc => (
              <div key={doc.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    {doc.name.charAt(4)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{doc.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.speciality}</p>
                  </div>
                </div>
                <div>{getStatusBadge(doc.status)}</div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* 🔹 Patients Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
           <h2 className="text-lg font-bold text-slate-900 tracking-tight">
             Recent Patients
           </h2>
           <button onClick={() => navigate('/hadmin/patients')} className="text-sm font-semibold text-blue-600 hover:text-blue-800">View Directory</button>
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
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
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
      </motion.div>

    </motion.div>
  );
};

export default Hdashboard;