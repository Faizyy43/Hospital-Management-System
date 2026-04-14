import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { X, Calendar, Clock, UserSquare } from "lucide-react";

const slots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

export default function BookingModal({ hospital, onClose }) {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const handleBooking = () => {
    if (!storedUser || storedUser.role !== "patient") {
      toast.error("Please login as a patient to book an appointment.");
      return;
    }

    if (!doctor || !date || !slot) {
      toast.error("Please fill all fields to proceed");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    const patientEmail = storedUser.email || "";
    const patientName = storedUser.name || "";

    // 🚫 Prevent double booking for the same patient
    const alreadyBooked = existing.find(
      (a) =>
        a.hospitalId === hospital.id &&
        (a.patientEmail === patientEmail || a.patientName === patientName) &&
        a.doctor === doctor &&
        a.date === date &&
        a.slot === slot
    );

    if (alreadyBooked) {
      toast.error("This slot is already booked. Please choose another.");
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      hospitalId: hospital.id,
      hospital: hospital.name,
      doctor,
      date,
      slot,
      status: "Confirmed",
      bookedAt: new Date().toISOString(),
      patientEmail,
      patientName,
    };

    localStorage.setItem(
      "appointments",
      JSON.stringify([...existing, newBooking])
    );

    toast.success("Appointment booked successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative bg-white rounded-[28px] p-6 md:p-8 w-full max-w-md shadow-2xl flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">Book Appointment</h2>
            <p className="text-gray-500 font-medium text-sm mt-1">{hospital.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-5">
          
          {/* Doctor Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <UserSquare className="w-4 h-4 text-blue-500" />
              Select Specialist
            </label>
            <div className="relative">
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-gray-800 appearance-none cursor-pointer"
              >
                <option value="" disabled>Choose a doctor...</option>
                {hospital.doctors.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Preferred Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-gray-800 cursor-pointer"
            />
          </div>

          {/* Slots */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-blue-500" />
              Available Timings
            </label>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`py-2.5 px-1 text-sm font-bold rounded-xl border-2 transition-all active:scale-95 ${
                    slot === s 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "bg-white border-gray-100 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 mt-2 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 px-4 bg-white border-2 border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200 font-bold rounded-xl transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="flex-1 py-3.5 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}