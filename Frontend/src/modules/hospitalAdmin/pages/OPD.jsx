import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../../../Layout/PageHeader";
import { Plus, MoreHorizontal } from "lucide-react";

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
      className="space-y-6"
    >
      <PageHeader
        title="OPD Categories"
        subtitle="Organize hospital departments and services"
      />

      {/* Add Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
        className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex gap-3 items-center max-w-2xl"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new clinical category (e.g. Immunology)..."
          className="flex-1 bg-transparent px-2 py-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />

        <motion.button
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          onClick={addCategory}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </motion.button>
      </motion.div>

      {/* Categories */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {categories.map((cat) => (
            <motion.div
              key={cat}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer flex justify-between items-center"
            >
              <span className="text-sm font-semibold text-slate-700 tracking-tight">
                {cat}
              </span>

              <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50 shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
};

export default OPD;