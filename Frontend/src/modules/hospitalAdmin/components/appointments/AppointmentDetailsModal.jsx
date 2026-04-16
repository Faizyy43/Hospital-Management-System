import { motion, AnimatePresence } from "framer-motion";
import { X, ClipboardCheck, Activity, Pill, CalendarClock } from "lucide-react";

const AppointmentDetailsModal = ({
  appointment,
  onClose,
  onComplete,
  notes,
  setNotes,
}) => {
  if (!appointment) return null;

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
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
              Appointment Record
            </h2>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Patient</p>
                <p className="font-semibold text-slate-800">{appointment.patient}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Physician</p>
                <p className="font-semibold text-slate-800">{appointment.doctorName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Schedule</p>
                <p className="font-semibold text-slate-800">{appointment.day}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Time Slot</p>
                <p className="font-semibold text-blue-600">{appointment.slot}</p>
              </div>
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="space-y-4">
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                placeholder="Clinical Diagnosis..."
                value={notes.diagnosis}
                onChange={(e) =>
                  setNotes({ ...notes, diagnosis: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
              />
            </div>

            <div className="relative">
              <Pill className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                placeholder="Prescription / Medication..."
                value={notes.prescription}
                onChange={(e) =>
                  setNotes({ ...notes, prescription: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
              />
            </div>

            <div className="relative">
              <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={notes.followUp}
                onChange={(e) =>
                  setNotes({ ...notes, followUp: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
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
              onClick={onComplete}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-[0.98]"
            >
              Complete Visit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppointmentDetailsModal;