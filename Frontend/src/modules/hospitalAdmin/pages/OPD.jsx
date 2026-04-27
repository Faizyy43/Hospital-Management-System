import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import PageHeader from "../../../Layout/PageHeader";
import { Plus, Trash2 } from "lucide-react";
import { readHospitalStorage, writeHospitalStorage } from "../utils/storage";
import { syncHospitalSnapshot } from "../services/hospitalSnapshotService";

const OPD = () => {
  const [categories, setCategories] = useState(() => readHospitalStorage("opdCategories"));
  const [input, setInput] = useState("");

  useEffect(() => {
    writeHospitalStorage("opdCategories", categories);
    syncHospitalSnapshot().catch(() => {});
  }, [categories]);

  const addCategory = () => {
    if (!input.trim() || categories.includes(input.trim())) return;
    setCategories((prev) => [...prev, input.trim()]);
    setInput("");
  };

  const deleteCategory = (categoryToRemove) => {
    setCategories((prev) => prev.filter((cat) => cat !== categoryToRemove));
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
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
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
              className="group bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-sm hover:border-red-100 hover:shadow-md transition-all duration-200 cursor-pointer flex justify-between items-center"
            >
              <span className="text-sm font-semibold text-slate-700 tracking-tight">
                {cat}
              </span>

              <button 
                onClick={() => deleteCategory(cat)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50 shrink-0"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
};

export default OPD;
