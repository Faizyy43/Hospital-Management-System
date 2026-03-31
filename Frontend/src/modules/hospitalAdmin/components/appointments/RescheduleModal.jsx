import { motion } from "framer-motion";

const RescheduleModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl w-96 shadow-lg"
      >
        <h2 className="mb-4 font-semibold text-gray-700">
          Reschedule Appointment
        </h2>

        <input
          type="date"
          className="w-full p-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-200"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
            Save
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default RescheduleModal;