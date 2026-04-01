import { useState } from "react";
import { motion } from "framer-motion";

const NurseForm = () => {
  const [form, setForm] = useState({
    name: "",
    ward: "",
    shift: "",
    registration: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white/70 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-sm p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        Add Nurse
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          name="name"
          placeholder="Nurse Name"
          value={form.name}
          onChange={handleChange}
          className="bg-gray-50/70 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          name="ward"
          placeholder="Ward Assigned"
          value={form.ward}
          onChange={handleChange}
          className="bg-gray-50/70 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          name="shift"
          placeholder="Shift (Morning/Evening/Night)"
          value={form.shift}
          onChange={handleChange}
          className="bg-gray-50/70 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          name="registration"
          placeholder="Registration No"
          value={form.registration}
          onChange={handleChange}
          className="bg-gray-50/70 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />

      </div>

      <div className="mt-5 flex justify-end">
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm shadow-sm hover:shadow-md transition"
        >
          Add Nurse
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NurseForm;