import { motion, AnimatePresence } from "framer-motion";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import { X } from "lucide-react";

const EditPatientModal = ({ patient, onClose, onSave }) => {
  if (!patient) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-slate-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Edit Patient Details
            </h2>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Patient Name</label>
              <InputField
                value={patient.name}
                onChange={(e) =>
                  onSave({ ...patient, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Age</label>
              <InputField
                type="number"
                value={patient.age}
                onChange={(e) =>
                  onSave({ ...patient, age: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Primary Illness</label>
              <InputField
                value={patient.disease}
                onChange={(e) =>
                  onSave({ ...patient, disease: e.target.value })
                }
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

            <PrimaryButton
              onClick={() => onSave(patient)}
            >
              Save Changes
            </PrimaryButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditPatientModal;