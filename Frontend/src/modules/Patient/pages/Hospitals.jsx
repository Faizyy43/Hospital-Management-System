import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Stethoscope, Search, Building2, CalendarPlus, Heart, SlidersHorizontal, Map, ChevronDown } from "lucide-react";
import BookingModal from "./BookingModal";

// Mock Data
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
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const canBook = storedUser?.role === "patient";

  const handleRequestSlot = (hospital) => {
    if (!storedUser) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!canBook) {
      return;
    }
    setSelectedHospital(hospital);
  };

  // Unique filters
  const states = useMemo(() => [...new Set(hospitalsData.map((h) => h.state))], []);
  const cities = useMemo(() => [...new Set(hospitalsData.map((h) => h.city))], []);

  // FILTER LOGIC
  const filtered = useMemo(() => {
    return hospitalsData.filter((h) => {
      return (
        h.name.toLowerCase().includes(search.toLowerCase()) &&
        (stateFilter ? h.state === stateFilter : true) &&
        (cityFilter ? h.city === cityFilter : true)
      );
    });
  }, [search, stateFilter, cityFilter]);

  // FAVORITES LOGIC
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFavorite = (hospital) => {
    if (!storedUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    let updated;
    if (favorites.some((f) => f.id === hospital.id)) {
      updated = favorites.filter((f) => f.id !== hospital.id);
    } else {
      updated = [...favorites, hospital];
    }
    setFavorites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-full bg-slate-50 relative flex flex-col pt-20">

      {/* DASHBOARD-STYLE HEADER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-blue-600 mb-2">
                <Building2 className="w-3.5 h-3.5" />
                Network Partners
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Healthcare Facilities</h1>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                Browse our curated directory of certified hospitals and specialty clinics. Save facilities or securely book outpatient visits directly.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 px-4 py-2 border border-slate-200 rounded-md">
               <SlidersHorizontal className="w-4 h-4 text-slate-400" />
               {filtered.length} Results Found
            </div>
          </div>
          
          {/* FILTER BAR */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            
            {/* Search */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search facility name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>

            {/* State Filter */}
            <div className="relative flex items-center">
              <Map className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-900 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm cursor-pointer"
              >
                <option value="">Filter by State</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* City Filter */}
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-900 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm cursor-pointer"
              >
                <option value="">Filter by City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 pb-20">
        <div className="grid lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((h, index) => {
                 const isFav = favorites.some((f) => f.id === h.id);
                 
                 return (
                  <motion.div
                    layout
                    key={h.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between h-full"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                          {h.logo.startsWith("http") ? (
                            <img src={h.logo} alt={h.name} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-8 h-8 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-slate-900 leading-tight">{h.name}</h2>
                          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {h.city}, {h.state}
                          </p>
                        </div>
                      </div>
                      {canBook && (
                        <button
                          onClick={() => toggleFavorite(h)}
                          className={`p-2 rounded-md border transition-colors shrink-0 ${
                            isFav
                              ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                              : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                          }`}
                          title={isFav ? "Remove from Saved" : "Save Facility"}
                        >
                          <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                        </button>
                      )}
                    </div>

                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                         
                         <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Available Consultants</span>
                            <div className="flex items-center gap-2">
                               <Stethoscope className="w-4 h-4 text-blue-600" />
                               <span className="text-sm font-semibold text-slate-700">{h.doctors.join(", ")}</span>
                            </div>
                         </div>

                         {storedUser && !canBook ? (
                           <button
                             disabled
                             className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 px-5 py-2.5 rounded-md font-semibold text-sm border border-slate-200 w-full sm:w-auto shrink-0"
                           >
                             Patient Only
                           </button>
                         ) : (
                           <button
                             onClick={() => handleRequestSlot(h)}
                             className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors border border-blue-700 w-full sm:w-auto shrink-0 shadow-sm"
                           >
                             <CalendarPlus className="w-4 h-4" />
                             Request Slot
                           </button>
                         )}

                      </div>
                    </div>
                  </motion.div>
                 );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center bg-white border border-slate-200 border-dashed rounded-xl"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No Facilities Found</h3>
                <p className="text-sm text-slate-500 mt-1">Adjust your search or filter criteria to view more locations.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedHospital && (
          <BookingModal
            hospital={selectedHospital}
            onClose={() => setSelectedHospital(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
