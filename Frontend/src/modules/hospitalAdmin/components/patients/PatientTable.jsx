import { motion, AnimatePresence } from "framer-motion";
import PatientRow from "./PatientRow";
import { Users } from "lucide-react";

const PatientTable = ({ patients, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
         <h2 className="text-lg font-bold text-slate-900 tracking-tight">
           Patient Directory
         </h2>
         <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
           {patients.length} Registered
         </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Patient Name</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Primary Illness</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            <AnimatePresence>
              {patients.length > 0 ? (
                patients.map((p) => (
                  <PatientRow
                    key={p.id}
                    patient={p}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-sm font-medium">No patients found</p>
                    </div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PatientTable;