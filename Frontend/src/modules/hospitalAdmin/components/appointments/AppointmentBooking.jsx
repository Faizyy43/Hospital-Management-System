import { motion } from "framer-motion";
import { useState } from "react";

const AppointmentBooking = ({ doctors, appointments, setAppointments }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const doctor = doctors.find(d => d.id === Number(selectedDoctor));

  const bookedSlots = appointments
    .filter(a => a.doctorId === doctor?.id && a.day === selectedDay)
    .map(a => a.slot);

  const availableSlots =
    doctor?.slots?.filter(slot => !bookedSlots.includes(slot)) || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-sm space-y-4"
    >
      <h2 className="font-semibold text-gray-700">
        Book Appointment
      </h2>

      {/* Doctor */}
      <select
        onChange={(e) => setSelectedDoctor(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/70"
      >
        <option>Select Doctor</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      {/* Day */}
      {doctor && (
        <select
          onChange={(e) => setSelectedDay(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/70"
        >
          <option>Select Day</option>
          {doctor.schedule.days.map(day => (
            <option key={day}>{day}</option>
          ))}
        </select>
      )}

      {/* Slots */}
      {selectedDay && (
        <div className="flex flex-wrap gap-2">
          {availableSlots.map(slot => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-3 py-1 rounded-full text-sm transition
                ${selectedSlot === slot
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"}
              `}
            >
              {slot}
            </button>
          ))}
        </div>
      )}

      <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        Book Appointment
      </button>
    </motion.div>
  );
};

export default AppointmentBooking;