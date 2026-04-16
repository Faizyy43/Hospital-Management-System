import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

const PatientRow = ({ patient, onEdit, onDelete }) => {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="border-b border-slate-100 hover:bg-slate-50 transition-colors group"
    >
      <td className="px-6 py-4">
         <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0 select-none">
               {patient.name.charAt(0)}
             </div>
             <span className="font-semibold text-slate-800">{patient.name}</span>
         </div>
      </td>
      <td className="px-6 py-4 text-slate-600 font-medium">{patient.age} yrs</td>
      <td className="px-6 py-4 text-slate-600">{patient.disease || 'N/A'}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            title="Edit Patient"
            onClick={() => onEdit(patient)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            title="Delete Patient"
            onClick={() => onDelete(patient.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default PatientRow;