import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";

const hospitalsData = [
  {
    id: 1,
    name: "Apollo Hospital",
    city: "Ahmedabad",
    state: "Gujarat",
    doctors: ["Dr. Sharma", "Dr. Patel"],
    logo: "https://via.placeholder.com/60?text=A",
  },
  {
    id: 2,
    name: "Zydus Hospital",
    city: "Ahmedabad",
    state: "Gujarat",
    doctors: ["Dr. Mehta", "Dr. Shah"],
    logo: "https://via.placeholder.com/60?text=Z",
  },
  {
    id: 3,
    name: "AIIMS Delhi",
    city: "Delhi",
    state: "Delhi",
    doctors: ["Dr. Kumar", "Dr. Singh"],
    logo: "https://via.placeholder.com/60?text=A",
  },
];

export default function Hospitals() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Unique filters
  const states = [...new Set(hospitalsData.map((h) => h.state))];
  const cities = [...new Set(hospitalsData.map((h) => h.city))];

  // 🔥 FILTER LOGIC (COMBINED)
  const filtered = useMemo(() => {
    return hospitalsData.filter((h) => {
      return (
        h.name.toLowerCase().includes(search.toLowerCase()) &&
        (stateFilter ? h.state === stateFilter : true) &&
        (cityFilter ? h.city === cityFilter : true)
      );
    });
  }, [search, stateFilter, cityFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 md:px-10 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Hospitals</h1>
        <p className="text-gray-500 text-sm">
          Find and book appointments with top hospitals
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white/70 backdrop-blur-md border border-white/40 shadow-md rounded-xl p-4 mb-6 grid md:grid-cols-3 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search hospital..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* State */}
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All States</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* City */}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-5">
        {filtered.length > 0 ? (
          filtered.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-lg transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* LOGO */}
                <img
                  src={h.logo}
                  alt="logo"
                  className="w-14 h-14 rounded-xl object-cover border"
                />

                {/* DETAILS */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {h.name}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    📍 {h.city}, {h.state}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    👨‍⚕️ {h.doctors.join(", ")}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => setSelectedHospital(h)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm transition w-full md:w-auto"
              >
                Book Appointment
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10">No hospitals found</p>
        )}
      </div>

      {/* MODAL */}
      {selectedHospital && (
        <BookingModal
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  );
}
