import { motion } from "framer-motion";

const defaultCategories = [
  "General Medicine", "Cardiology", "Orthopaedics", "Neurology",
  "Gynaecology & Obstetrics", "Paediatrics", "Dermatology", "ENT",
  "Ophthalmology", "Urology", "Nephrology", "Gastroenterology",
  "Oncology", "Psychiatry", "Pulmonology", "Endocrinology",
  "Rheumatology", "Dental", "Physiotherapy", "Radiology & Imaging"
];


const CategoryList = ({ categories }) => {
  return (
    <div className="grid md:grid-cols-4 gap-3">
      {categories.map((cat, i) => (
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="bg-white p-3 rounded-xl border text-sm"
        >
          {cat}
        </motion.div>
      ))}
    </div>
  );
};