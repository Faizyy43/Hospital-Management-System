import { motion } from "framer-motion";
import { useState } from "react";
import { CalendarPlus } from "lucide-react";

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
      className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
          <CalendarPlus className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Rapid Booking</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Doctor */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Select Physician</label>
          <select
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
          >
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{"Dr. " + d.name}</option>
            ))}
          </select>
        </div>

        {/* Day */}
        <div className="flex-1">
           <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Available Day</label>
          <select
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium disabled:opacity-50"
            disabled={!doctor}
          >
            <option value="">Select Day</option>
            {doctor?.schedule?.days?.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Slots */}
      {selectedDay && (
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-500 mb-2.5 uppercase tracking-wider">Select Time Slot</label>
          <div className="flex flex-wrap gap-2">
            {availableSlots.length > 0 ? availableSlots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all
                  ${selectedSlot === slot
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}
                `}
              >
                {slot}
              </button>
            )) : (
              <p className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200">No slots available for this day.</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button 
          disabled={!selectedDoctor || !selectedDay || !selectedSlot}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          Confirm Appointment
        </button>
      </div>
    </motion.div>
  );
};

export default AppointmentBooking;