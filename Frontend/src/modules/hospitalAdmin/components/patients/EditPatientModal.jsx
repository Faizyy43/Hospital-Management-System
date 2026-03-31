import { motion, AnimatePresence } from "framer-motion";

const EditPatientModal = ({ patient, onClose, onSave }) => {
  if (!patient) return null;

  return (
    <AnimatePresence>
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, ease: "easeInOut" }}
  className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg w-96"
  >
          <h2 className="text-lg font-semibold mb-4">
            Edit Patient
          </h2>

          <div className="space-y-3">
            <input
              value={patient.name}
              onChange={(e) =>
                onSave({ ...patient, name: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-gray-100 outline-none"
            />
            <input
              value={patient.age}
              onChange={(e) =>
                onSave({ ...patient, age: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-gray-100 outline-none"
            />
            <input
              value={patient.disease}
              onChange={(e) =>
                onSave({ ...patient, disease: e.target.value })
              }
              className="w-full p-2 rounded-lg bg-gray-100 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(patient)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            >
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditPatientModal;