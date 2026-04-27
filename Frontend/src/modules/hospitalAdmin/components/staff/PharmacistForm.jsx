import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const PharmacistForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    counter: "",
    shift: "",
    license: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (onAdd) onAdd(form);
    setForm({
      name: "",
      counter: "",
      shift: "",
      license: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 max-w-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
          <UserPlus className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Register Pharmacist</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Full Name</label>
           <input
             name="name"
             placeholder="e.g. Sarah Connor"
             value={form.name}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
           />
        </div>

        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Counter Allocation</label>
           <input
             name="counter"
             placeholder="e.g. Dispensing C1"
             value={form.counter}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
           />
        </div>

        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Shift Schedule</label>
           <select
             name="shift"
             value={form.shift}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
           >
             <option value="">Select Shift</option>
             <option value="Morning">Morning</option>
             <option value="Evening">Evening</option>
             <option value="Night">Night</option>
           </select>
        </div>

        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Pharmacy License #</label>
           <input
             name="license"
             placeholder="e.g. PH-29103"
             value={form.license}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
           />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleSubmit} className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 active:scale-[0.98]">
          Onboard Staff
        </button>
      </div>
    </motion.div>
  );
};

export default PharmacistForm;
