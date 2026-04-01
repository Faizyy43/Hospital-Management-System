import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../../../Layout/PageHeader";

const defaultCategories = [
  "General Medicine", "Cardiology", "Orthopaedics", "Neurology",
  "Gynaecology & Obstetrics", "Paediatrics", "Dermatology", "ENT",
  "Ophthalmology", "Urology", "Nephrology", "Gastroenterology",
  "Oncology", "Psychiatry", "Pulmonology", "Endocrinology",
  "Rheumatology", "Dental", "Physiotherapy", "Radiology & Imaging"
];

const OPD = () => {
  const [categories, setCategories] = useState(defaultCategories);
  const [input, setInput] = useState("");

  const addCategory = () => {
    if (!input.trim()) return;
    setCategories((prev) => [...prev, input]);
    setInput("");
  };

  return (

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="space-y-8"
>

  {/* Title */}
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    <PageHeader
  title="OPD Category Management"
  subtitle="Organize hospital departments and services"
/>
    <p className="text-sm text-gray-400">
      Manage and organize hospital departments
    </p>
  </motion.div>

  {/* Add Box */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
    className="bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-sm rounded-2xl p-4 flex gap-3 items-center"
  >
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Add new category..."
      className="flex-1 bg-transparent outline-none px-3 py-2 text-sm placeholder:text-gray-400"
    />

    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      onClick={addCategory}
      className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm shadow-sm hover:shadow-md transition"
    >
      Add
    </motion.button>
  </motion.div>

  {/* Categories */}
  <motion.div
    layout
    className="grid md:grid-cols-4 gap-4"
  >
    <AnimatePresence>
      {categories.map((cat) => (
        <motion.div
          key={cat}
          layout
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="group bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-4 py-3 text-sm text-gray-700 
          hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="flex justify-between items-center">

            <span className="font-medium">
              {cat}
            </span>

            <span className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 transition">
              •••
            </span>

          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>

</motion.div>
  );
};

export default OPD;