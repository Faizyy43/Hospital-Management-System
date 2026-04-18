import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarClock } from "lucide-react";

const RescheduleModal = ({ data, onClose }) => {
  if (!data) return null;

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
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-amber-500" />
              Reschedule Visit
            </h2>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
             <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Select New Date</label>
             <input
               type="date"
               className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
             />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none"
            >
              Cancel
            </button>

            <button className="bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 active:scale-[0.98]">
              Confirm Update
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RescheduleModal;