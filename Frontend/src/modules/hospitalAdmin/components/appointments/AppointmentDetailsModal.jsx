import { motion } from "framer-motion";

const AppointmentDetailsModal = ({
  appointment,
  onClose,
  onComplete,
  notes,
  setNotes,
}) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl w-[480px] shadow-lg space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-700">
          Appointment Details
        </h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p><b>Patient:</b> {appointment.patient}</p>
          <p><b>Doctor:</b> {appointment.doctorName}</p>
          <p><b>Day:</b> {appointment.day}</p>
          <p><b>Slot:</b> {appointment.slot}</p>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <input
            placeholder="Diagnosis"
            value={notes.diagnosis}
            onChange={(e) =>
              setNotes({ ...notes, diagnosis: e.target.value })
            }
            className="w-full p-2 rounded-xl bg-gray-100"
          />

          <input
            placeholder="Prescription"
            value={notes.prescription}
            onChange={(e) =>
              setNotes({ ...notes, prescription: e.target.value })
            }
            className="w-full p-2 rounded-xl bg-gray-100"
          />

          <input
            type="date"
            value={notes.followUp}
            onChange={(e) =>
              setNotes({ ...notes, followUp: e.target.value })
            }
            className="w-full p-2 rounded-xl bg-gray-100"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Close</button>

          <button
            onClick={onComplete}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl"
          >
            Complete
          </button>
        </div>

      </motion.div>

    </div>
  );
};

export default AppointmentDetailsModal;