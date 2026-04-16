import { motion, AnimatePresence } from "framer-motion";
import { X, UserSquare2 } from "lucide-react";

const DoctorModal = ({ doctor, onClose, doctors, setDoctors }) => {
  if (!doctor) return null;

  const handleChange = (field, value) => {
    doctor[field] = value;
  };

  const handleSave = () => {
    setDoctors(doctors.map(d => d.id === doctor.id ? doctor : d));
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <UserSquare2 className="w-5 h-5 text-blue-600" /> Modify Master Data
            </h2>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
               <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Physician Name</label>
               <input
                 defaultValue={doctor.name}
                 onChange={(e) => handleChange("name", e.target.value)}
                 className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
               />
            </div>
            <div>
               <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Speciality Area</label>
               <input
                 defaultValue={doctor.speciality}
                 onChange={(e) => handleChange("speciality", e.target.value)}
                 className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
               />
            </div>
            <div>
               <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Years Active</label>
               <input
                 defaultValue={doctor.experience}
                 type="number"
                 onChange={(e) => handleChange("experience", e.target.value)}
                 className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
               />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-[0.98]"
            >
              Save Profile
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DoctorModal;