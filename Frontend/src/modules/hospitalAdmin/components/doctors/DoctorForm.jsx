import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Stethoscope, Clock, Calendar } from "lucide-react";

const DoctorForm = ({ doctors, setDoctors }) => {
  const [form, setForm] = useState({
    name: "",
    speciality: "",
    experience: "",
    schedule: {
      days: [],
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
  });

  const generateSlots = (start, end, duration) => {
    const slots = [];
    if (!start || !end || !duration) return slots;

    let [hour, minute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    while (hour < endHour || (hour === endHour && minute < endMinute)) {
      const formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      slots.push(formatted);
      minute += Number(duration);
      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }
    }
    return slots;
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDay = (day) => {
    const activeDays = form.schedule.days;
    if (activeDays.includes(day)) {
      setForm({ ...form, schedule: { ...form.schedule, days: activeDays.filter((d) => d !== day) } });
    } else {
      setForm({ ...form, schedule: { ...form.schedule, days: [...activeDays, day] } });
    }
  };

  const handleAdd = () => {
    if (!form.name) return;
    const slots = generateSlots(form.schedule.startTime, form.schedule.endTime, form.schedule.slotDuration);
    setDoctors([
      ...doctors,
      {
        id: Date.now(),
        ...form,
        slots,
        status: "Active",
      },
    ]);

    setForm({
      name: "",
      speciality: "",
      experience: "",
      schedule: { days: [], startTime: "", endTime: "", slotDuration: "" },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 max-w-full"
    >
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
          <Stethoscope className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Onboard Physician</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Full Name</label>
           <input
             placeholder="e.g. Dr. Jane Fox"
             value={form.name}
             onChange={(e) => setForm({ ...form, name: e.target.value })}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
           />
        </div>
        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Speciality</label>
           <input
             placeholder="e.g. Cardiology"
             value={form.speciality}
             onChange={(e) => setForm({ ...form, speciality: e.target.value })}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
           />
        </div>
        <div>
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Experience (Years)</label>
           <input
             placeholder="e.g. 12"
             type="number"
             value={form.experience}
             onChange={(e) => setForm({ ...form, experience: e.target.value })}
             className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
           />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" /> Availability Setup
        </h3>

        <div className="mb-5">
           <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Consultation Days</label>
           <div className="flex gap-2 flex-wrap">
             {days.map((day) => (
               <button
                 key={day}
                 type="button"
                 onClick={() => toggleDay(day)}
                 className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border
                   ${form.schedule.days.includes(day)
                     ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                     : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}
                 `}
               >
                 {day}
               </button>
             ))}
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3"/> Start Time</label>
             <input
               type="time"
               value={form.schedule.startTime}
               onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, startTime: e.target.value } })}
               className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
             />
          </div>
          <div>
             <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3"/> End Time</label>
             <input
               type="time"
               value={form.schedule.endTime}
               onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, endTime: e.target.value } })}
               className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
             />
          </div>
          <div>
             <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Slot Duration (Min)</label>
             <input
               type="number"
               placeholder="e.g. 15"
               value={form.schedule.slotDuration}
               onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, slotDuration: e.target.value } })}
               className="w-full bg-white border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
             />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-[0.98] flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Register Physician
        </button>
      </div>
    </motion.div>
  );
};

export default DoctorForm;