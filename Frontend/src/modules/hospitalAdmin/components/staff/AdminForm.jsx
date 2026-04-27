import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const AdminForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    shift: "",
    accessLevel: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (onAdd) onAdd(form);
    setForm({
      name: "",
      department: "",
      shift: "",
      accessLevel: "",
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
        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
          <UserPlus className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Register Administrator</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Full Name</label>
           <input
             name="name"
             placeholder="e.g. Richard Hendricks"
             value={form.name}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
           />
        </div>

        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Department</label>
           <input
             name="department"
             placeholder="e.g. Human Resources"
             value={form.department}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
           />
        </div>

        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Shift Schedule</label>
           <select
             name="shift"
             value={form.shift}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
           >
             <option value="">Select Shift</option>
             <option value="Morning">Morning</option>
             <option value="Evening">Evening</option>
             <option value="Night">Night</option>
           </select>
        </div>

        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Access Level Clearance</label>
           <select
             name="accessLevel"
             value={form.accessLevel}
             onChange={handleChange}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
           >
             <option value="">Select Level</option>
             <option value="Level 1">Level 1 - General</option>
             <option value="Level 2">Level 2 - Super</option>
             <option value="Level 3">Level 3 - Root</option>
           </select>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleSubmit} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 active:scale-[0.98]">
          Onboard Staff
        </button>
      </div>
    </motion.div>
  );
};

export default AdminForm;
