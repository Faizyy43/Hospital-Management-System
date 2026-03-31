import { motion } from "framer-motion";

const AppointmentFilter = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-sm flex gap-3"
    >
      <input
        placeholder="Search patient..."
        className="flex-1 p-3 rounded-xl bg-white/70 outline-none focus:ring-2 focus:ring-blue-200"
      />

      <select className="p-3 rounded-xl bg-white/70 outline-none">
        <option>Status</option>
        <option>Confirmed</option>
        <option>Completed</option>
      </select>
    </motion.div>
  );
};

export default AppointmentFilter;