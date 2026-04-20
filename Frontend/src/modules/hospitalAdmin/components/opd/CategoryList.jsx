import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

export const defaultCategories = [
  "General Medicine", "Cardiology", "Orthopaedics", "Neurology",
  "Gynaecology & Obstetrics", "Paediatrics", "Dermatology", "ENT",
  "Ophthalmology", "Urology", "Nephrology", "Gastroenterology",
  "Oncology", "Psychiatry", "Pulmonology", "Endocrinology",
  "Rheumatology", "Dental", "Physiotherapy", "Radiology & Imaging"
];

const CategoryList = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat, i) => (
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.2 }}
          className="group bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer flex justify-between items-center"
        >
          <span className="text-sm font-semibold text-slate-700 tracking-tight text-center md:text-left">
            {cat}
          </span>
          <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50 shrink-0 hidden md:block">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryList;