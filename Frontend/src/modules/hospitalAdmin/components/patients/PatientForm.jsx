import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import { UserPlus } from "lucide-react";

const PatientForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    disease: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age) return;
    onAdd(form);
    setForm({ name: "", age: "", disease: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
          <UserPlus className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Onboard New Patient</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Patient Name</label>
          <InputField name="name" value={form.name} onChange={handleChange} placeholder="e.g. John Doe" required />
        </div>
        <div className="w-full md:w-32 shrink-0">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Age</label>
          <InputField name="age" type="number" value={form.age} onChange={handleChange} placeholder="e.g. 34" required />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Primary Illness / Reason</label>
          <InputField name="disease" value={form.disease} onChange={handleChange} placeholder="e.g. Viral Fever" />
        </div>
        <div className="w-full md:w-auto shrink-0">
           <PrimaryButton type="submit">
             Register
           </PrimaryButton>
        </div>
      </form>
    </motion.div>
  );
};

export default PatientForm;