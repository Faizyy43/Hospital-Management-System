import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartOff, MapPin, Stethoscope, Building2, CalendarPlus, Heart } from "lucide-react";
import BookingModal from "./BookingModal";

export default function Favourites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const canBook = currentUser?.role === "patient";

  const handleRequestSlot = (hospital) => {
    if (!currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (!canBook) {
      return;
    }
    setSelectedHospital(hospital);
  };

  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }

    const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
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
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
                  <Heart className="w-3.5 h-3.5" />
                  Saved
                </div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Saved Facilities</h1>
                <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                  Your curated directory of preferred hospitals and clinics for quick scheduling.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 px-4 py-2 border border-slate-200 rounded-md shadow-sm">
                 <Building2 className="w-4 h-4 text-slate-400" />
                 {favorites.length} Saved
              </div>
            </div>
         </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 pb-20">
        <div className="grid lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {favorites.length > 0 ? (
              favorites.map((h, index) => (
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
                        {h.logo?.startsWith("http") ? (
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
                    <button
                      onClick={() => removeFavorite(h.id)}
                      className="p-2 rounded-md border bg-white border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors shrink-0"
                      title="Remove from Saved"
                    >
                      <HeartOff className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                       
                       <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Available Consultants</span>
                          <div className="flex items-center gap-2">
                             <Stethoscope className="w-4 h-4 text-blue-600" />
                             <span className="text-sm font-semibold text-slate-700">{h.doctors ? h.doctors.join(", ") : "No doctors listed"}</span>
                          </div>
                       </div>

                       {currentUser && !canBook ? (
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
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center bg-white border border-slate-200 border-dashed rounded-xl"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                   <Heart className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No Facilities Saved</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  {currentUser ? (
                    "Click the heart icon on any hospital in the Network Directory to easily find it here later."
                  ) : (
                    "Please login with your patient account to access saved facilities."
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedHospital && (
          <BookingModal hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
