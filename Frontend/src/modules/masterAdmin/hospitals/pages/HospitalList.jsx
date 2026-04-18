import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Building2, MapPin, Users, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

const HospitalList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Professional dummy data
  const data = [
    { id: 1, name: "City General Hospital", type: "Multi-Specialty", status: "Active", patients: 4500, location: "Downtown Area", joined: "Oct 2023" },
    { id: 2, name: "Sunrise Medical Center", type: "Orthopedics", status: "Active", patients: 3200, location: "Westside", joined: "Jan 2024" },
    { id: 3, name: "Metro Care Hospital", type: "Pediatrics", status: "Pending", patients: 0, location: "North District", joined: "Mar 2024" },
    { id: 4, name: "St. Jude Clinic", type: "Cardiology", status: "Active", patients: 1200, location: "Eastside", joined: "Nov 2023" },
  ];

  const filtered = data.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hospital Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and monitor all registered medical facilities.</p>
        </div>
      </motion.div>

      {/* Directory Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Search Bar Area */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search hospitals by name..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {filtered.length} Facilities Found
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4 font-semibold w-[40%]">Facility Profile</th>
                <th className="px-6 py-4 font-semibold">Classification</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Registered Patients</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((h, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={h.id} 
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/admin/hospitals/${h.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center border border-sky-100/50 shrink-0 text-sky-600">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{h.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3 h-3" /> {h.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                      {h.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      h.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}>
                      {h.status === "Active" && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                      {h.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm font-semibold text-slate-700">
                      <Users className="w-4 h-4 text-slate-400" />
                      {h.patients.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 bg-slate-50/50">
                    <Building2 className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                    <p className="font-medium">No facilities found.</p>
                    <p className="text-sm mt-1">Try adjusting your search criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default HospitalList;