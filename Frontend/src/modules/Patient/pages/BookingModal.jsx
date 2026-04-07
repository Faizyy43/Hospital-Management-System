import { useState } from "react";
import toast from "react-hot-toast";

const slots = ["09:00", "10:00", "11:00", "02:00", "04:00"];

export default function BookingModal({ hospital, onClose }) {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const handleBooking = () => {
    if (!doctor || !date || !slot) {
      toast.error("Fill all fields");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("appointments")) || [];

    // 🚫 Prevent double booking
    const alreadyBooked = existing.find(
      (a) =>
        a.doctor === doctor &&
        a.date === date &&
        a.slot === slot
    );

    if (alreadyBooked) {
      toast.error("Slot already booked");
      return;
    }

    const newBooking = {
      hospital: hospital.name,
      doctor,
      date,
      slot,
    };

    localStorage.setItem(
      "appointments",
      JSON.stringify([...existing, newBooking])
    );

    toast.success("Appointment booked!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[400px]">

        <h2 className="text-lg font-semibold mb-3">
          {hospital.name}
        </h2>

        {/* Doctor */}
        <select
          onChange={(e) => setDoctor(e.target.value)}
          className="w-full p-2 border mb-3"
        >
          <option>Select Doctor</option>
          {hospital.doctors.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          className="w-full p-2 border mb-3"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Slots */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {slots.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={`p-2 border rounded ${
                slot === s ? "bg-blue-600 text-white" : ""
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}