import { motion } from "framer-motion";
import { Edit2, Trash2, Component } from "lucide-react";

const DoctorTable = ({ data, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Physician</th>
              <th className="px-6 py-4">Specialty</th>
              <th className="px-6 py-4">Status & Exp</th>
              <th className="px-6 py-4">OPD Cycle</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                   <div className="flex items-center gap-3">
                     <div className="flex-col">
                       <span className="font-semibold text-slate-800 block">{"Dr. " + d.name.replace("Dr. ", "")}</span>
                     </div>
                   </div>
                </td>

                <td className="px-6 py-4 font-medium text-slate-600">{d.speciality}</td>

                <td className="px-6 py-4">
                   <div className="flex flex-col gap-1.5 items-start">
                     <span className="px-2 py-0.5 text-[10px] rounded-md font-bold uppercase tracking-widest bg-emerald-50 border border-emerald-200 text-emerald-700">
                       {d.status}
                     </span>
                     <span className="text-xs text-slate-500 font-semibold">{d.experience} Years Active</span>
                   </div>
                </td>
                
                <td className="px-6 py-4">
                   <div className="flex flex-col">
                       <span className="text-xs font-semibold text-slate-700">
                          {d.schedule?.days?.join(", ") || "Unscheduled"}
                       </span>
                       <span className="text-xs text-slate-500 mt-0.5 flex gap-2">
                          <span className="text-blue-600 font-medium">Slot: {d.schedule?.slotDuration || 0}m</span>
                          <span>|</span> 
                          <span>{d.schedule?.startTime && d.schedule?.endTime ? `${d.schedule.startTime} - ${d.schedule.endTime}` : "No time set"}</span>
                       </span>
                   </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(d)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit Doctor Data"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(d.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete Doctor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
               <tr>
                 <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                   <div className="flex flex-col items-center">
                     <Component className="w-8 h-8 text-slate-300 mb-2" />
                     <span className="text-sm font-medium">No doctors onboarded.</span>
                   </div>
                 </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DoctorTable;
