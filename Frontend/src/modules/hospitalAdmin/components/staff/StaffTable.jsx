import { motion } from "framer-motion";
import { Edit2, Trash2, Component } from "lucide-react";

const StaffTable = ({ role, data, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col"
    >
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-semibold text-slate-800 tracking-tight">Registered {role}s</h3>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Shift</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data && data.length > 0 ? (
               data.map((staff, i) => (
                 <tr key={i} className="hover:bg-slate-50 transition-colors group">
                   <td className="px-6 py-4 font-semibold text-slate-800">{staff.name}</td>
                   <td className="px-6 py-4 font-medium text-slate-600">{staff.shift}</td>
                   <td className="px-6 py-4">
                     <div className="flex items-center justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                       <button
                         className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                         title="Edit Staff Data"
                       >
                         <Edit2 className="w-4 h-4" />
                       </button>
                       <button
                         onClick={() => onDelete(staff.id)}
                         className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                         title="Delete Staff"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))
            ) : (
               <tr>
                 <td colSpan="3" className="px-6 py-12 text-center text-slate-400">
                   <div className="flex flex-col items-center">
                     <Component className="w-8 h-8 text-slate-300 mb-2" />
                     <span className="text-sm font-medium">No {role.toLowerCase()}s onboarded yet.</span>
                     <span className="text-xs text-slate-400 mt-1">Fill out the form to register new staff.</span>
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

export default StaffTable;
