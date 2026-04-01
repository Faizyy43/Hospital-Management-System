import { useState } from "react";
import { motion } from "framer-motion";

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

  while (
    hour < endHour ||
    (hour === endHour && minute < endMinute)
  ) {
    const formatted =
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

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
  const days = form.schedule.days;

  if (days.includes(day)) {
    setForm({
      ...form,
      schedule: {
        ...form.schedule,
        days: days.filter((d) => d !== day),
      },
    });
  } else {
    setForm({
      ...form,
      schedule: {
        ...form.schedule,
        days: [...days, day],
      },
    });
  }
};

  const handleAdd = () => {
  if (!form.name) return;

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
    schedule: {
      days: [],
      startTime: "",
      endTime: "",
      slotDuration: "",
    },
  });
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-sm space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        Add Doctor
      </h2>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-4">
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-3 rounded-xl bg-white/70 outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          placeholder="Speciality"
          value={form.speciality}
          onChange={(e) => setForm({ ...form, speciality: e.target.value })}
          className="p-3 rounded-xl bg-white/70 outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          placeholder="Experience (years)"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          className="p-3 rounded-xl bg-white/70 outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Schedule */}
      <div>
        <p className="text-sm text-gray-500 mb-2">OPD Days</p>

        <div className="flex gap-2 flex-wrap">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all
  ${
    form.schedule.days.includes(day)
      ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-sm"
      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
  }`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">

  <div>
    <p className="text-xs text-gray-500 mb-1">Start Time</p>
    <input
      type="time"
      value={form.schedule.startTime}
      onChange={(e) =>
        setForm({
          ...form,
          schedule: { ...form.schedule, startTime: e.target.value },
        })
      }
      className="w-full p-2 rounded-xl bg-white/70 outline-none"
    />
  </div>

  <div>
    <p className="text-xs text-gray-500 mb-1">End Time</p>
    <input
      type="time"
      value={form.schedule.endTime}
      onChange={(e) =>
        setForm({
          ...form,
          schedule: { ...form.schedule, endTime: e.target.value },
        })
      }
      className="w-full p-2 rounded-xl bg-white/70 outline-none"
    />
  </div>

  <div>
    <p className="text-xs text-gray-500 mb-1">Slot Duration (min)</p>
    <input
      type="number"
      placeholder="15"
      value={form.schedule.slotDuration}
      onChange={(e) =>
        setForm({
          ...form,
          schedule: { ...form.schedule, slotDuration: e.target.value },
        })
      }
      className="w-full p-2 rounded-xl bg-white/70 outline-none"
    />
  </div>

</div>
      </div>

      {/* Button */}
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition"
      >
        Add Doctor
      </button>
    </motion.div>
  );
};

export default DoctorForm;