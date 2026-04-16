import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Calendar, Clock, History, Bell, FileText, 
  Heart, User, Activity, MapPin, Search,
  Stethoscope, ShieldCheck, Download, Settings,
  LogOut, Menu, X, LayoutDashboard, Building2, ChevronRight, CalendarPlus
} from "lucide-react";
import BookingModal from "./BookingModal";

// Mock Data
const hospitalsData = [
  { id: 1, name: "Apollo Hospital", city: "Ahmedabad", state: "Gujarat", doctors: ["Dr. Sharma", "Dr. Patel"], logo: "https://via.placeholder.com/60?text=A" },
  { id: 2, name: "Zydus Hospital", city: "Ahmedabad", state: "Gujarat", doctors: ["Dr. Mehta", "Dr. Shah"], logo: "https://via.placeholder.com/60?text=Z" },
  { id: 3, name: "AIIMS Delhi", city: "Delhi", state: "Delhi", doctors: ["Dr. Kumar", "Dr. Singh"], logo: "https://via.placeholder.com/60?text=A" },
];

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isBookingMode, setIsBookingMode] = useState(false);

  const refreshData = () => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    const updated = data.map((a) => ({
      ...a,
      status: a.status || "Confirmed",
    }));
    setAppointments(updated);
  };

  useEffect(() => {
    refreshData();
    // Load Favorites
    const savedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavorites(savedFavs);
  }, []);

  const toggleFavorite = (h) => {
    let updated;
    if (favorites.some((f) => f.id === h.id)) {
       updated = favorites.filter((f) => f.id !== h.id);
    } else {
       updated = [...favorites, h];
    }
    setFavorites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const cancelAppointment = (targetApp) => {
    const updated = appointments.filter((app) => app !== targetApp);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const filteredAppointments = appointments.filter((app) => {
    if (!currentUser) return false;
    if (currentUser.role === "patient") {
      return (currentUser.email && app.patientEmail === currentUser.email) ||
             (currentUser.name && app.patientName === currentUser.name);
    }
    return false;
  });

  const today = new Date().toISOString().split("T")[0];
  const past = appointments.filter((a) => a.date < today);

  const TABS = [
    { id: "overview", label: "Dashboard Home", icon: LayoutDashboard },
    { id: "upcoming", label: "Appointments", icon: Calendar },
    { id: "past", label: "Medical History", icon: History },
    { id: "favourites", label: "Saved Facilities", icon: Heart },
    { id: "documents", label: "Clinical Records", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Account Settings", icon: User },
  ];

  const getStatusBadge = (status) => {
    if (status === "Confirmed") return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">Confirmed</span>;
    if (status === "Pending") return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Pending</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">{status}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900">
      
      {/* 📱 MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-40 flex items-center justify-between p-4 shadow-sm">
        <h1 className="font-semibold flex items-center gap-2 text-slate-800 text-lg">
          <Activity className="w-5 h-5 text-blue-600" /> Patient Portal
        </h1>
        <button onClick={() => setSidebarOpen(true)} className="text-slate-600 p-1 hover:bg-slate-100 rounded-md">
           <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 🖥️ LEFT SIDEBAR (Ultra Professional) */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-screen w-[260px] bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-200 shadow-xl md:shadow-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* BRANDING */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
           <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2.5 tracking-tight">
             <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
               <Activity className="w-4 h-4 text-white" /> 
             </div>
             HMS+ Portal
           </h1>
           <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 p-1 hover:bg-slate-100 rounded">
             <X className="w-5 h-5" />
           </button>
        </div>
        
        {/* NAVIGATION */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto w-full">
          <div className="px-3 mb-3 text-[10px] uppercase tracking-widest font-semibold text-slate-400">Main Menu</div>
          <ul className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium border border-transparent ${
                      isActive 
                        ? "bg-blue-50 text-blue-700 border-blue-100/50" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-100 shrink-0">
           <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full">
              <LogOut className="w-4 h-4 shrink-0" /> Back to Website
           </Link>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
         <div 
           onClick={() => setSidebarOpen(false)}
           className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
         />
      )}

      {/* 📄 MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen bg-slate-50">
         
         {/* 🔝 TOPBAR */}
         <header className="h-16 bg-white border-b border-slate-200 z-30 px-6 sm:px-8 flex items-center justify-between hidden md:flex shrink-0">
            <h2 className="text-lg font-semibold text-slate-800">
              {TABS.find(t => t.id === activeTab)?.label}
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="Search records..." className="w-64 pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-800 placeholder:text-slate-400" />
              </div>


            </div>
         </header>

         {/* 📋 DASHBOARD CONTENT */}
         <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pt-20 md:pt-8 w-full">
             <div className="max-w-full mx-auto space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                  >
                    
                    {/* DASHBOARD OVERVIEW */}
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 animate-fade-in shadow-sm">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                               <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                 Welcome back, {currentUser?.name || "Patient"}
                               </h1>
                               <p className="text-slate-500 mt-1">Here is a quick overview of your healthcare activities.</p>
                            </div>
                            <div className="shrink-0 flex gap-3">
                               <button onClick={() => { setActiveTab("upcoming"); setIsBookingMode(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
                                  <CalendarPlus className="w-4 h-4" /> Book Appointment
                               </button>
                            </div>
                          </div>
                          
                          <div className="grid sm:grid-cols-3 gap-5 mt-8 border-t border-slate-100 pt-8">
                             <div 
                                onClick={() => setActiveTab("upcoming")}
                                className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition cursor-pointer group"
                             >
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                      <Calendar className="w-5 h-5" />
                                   </div>
                                   <div>
                                     <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Upcoming</p>
                                     <p className="text-2xl font-bold text-slate-900">{filteredAppointments.length}</p>
                                   </div>
                                </div>
                                <div className="mt-3 text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                   View Appointments <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                             </div>

                             <div 
                                onClick={() => setActiveTab("favourites")}
                                className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition cursor-pointer group"
                             >
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                      <Heart className="w-5 h-5" />
                                   </div>
                                   <div>
                                     <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Saved</p>
                                     <p className="text-2xl font-bold text-slate-900">{favorites.length}</p>
                                   </div>
                                </div>
                                <div className="mt-3 text-sm text-red-600 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                   View Facilities <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                             </div>

                             <div 
                                onClick={() => setActiveTab("documents")}
                                className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition cursor-pointer group"
                             >
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                                      <FileText className="w-5 h-5" />
                                   </div>
                                   <div>
                                     <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Records</p>
                                     <p className="text-2xl font-bold text-slate-900">0</p>
                                   </div>
                                </div>
                                <div className="mt-3 text-sm text-green-700 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                   View Records <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                             </div>
                          </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-1 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 transform translate-x-1/3 -translate-y-1/3 opacity-10">
                              <Activity className="w-48 h-48 text-white" />
                           </div>
                           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 relative z-10 text-white">
                              <h3 className="font-semibold text-lg flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-200" /> Complete your medical profile
                              </h3>
                              <p className="mt-1 text-blue-100 text-sm max-w-xl">
                                Adding your past medical history and emergency contacts helps our network doctors provide you with more personalized and accurate care.
                              </p>
                              <button onClick={() => setActiveTab("profile")} className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/20 transition rounded-md text-sm font-medium">
                                Update Settings
                              </button>
                           </div>
                        </div>
                      </div>
                    )}
                    
                    {/* UPCOMING APPOINTMENTS & BOOKING */}
                    {activeTab === "upcoming" && (
                      <div className="space-y-5">
                        {isBookingMode ? (
                          <>
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                              <h2 className="text-xl font-semibold text-slate-900">Available Facilities</h2>
                              <button onClick={() => setIsBookingMode(false)} className="text-sm font-medium text-slate-600 hover:text-slate-800 flex items-center gap-1.5">
                                <X className="w-4 h-4" /> Cancel Booking
                              </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                               {hospitalsData.map((h) => {
                                 const isFav = favorites.some((f) => f.id === h.id);
                                 return (
                                   <div key={h.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between h-full">
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
                                        <button
                                          onClick={() => toggleFavorite(h)}
                                          className={`p-2 rounded-md border transition-colors shrink-0 ${
                                            isFav
                                              ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                                              : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                          }`}
                                        >
                                          <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                                        </button>
                                      </div>
                                      <div className="mt-5 pt-5 border-t border-slate-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                           <div>
                                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Consultants</span>
                                              <div className="flex items-center gap-2">
                                                 <Stethoscope className="w-4 h-4 text-blue-600" />
                                                 <span className="text-sm font-semibold text-slate-700">{h.doctors.join(", ")}</span>
                                              </div>
                                           </div>
                                           <button
                                             onClick={() => setSelectedHospital(h)}
                                             className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors shadow-sm"
                                           >
                                             <CalendarPlus className="w-4 h-4" />
                                             Book Request
                                           </button>
                                        </div>
                                      </div>
                                   </div>
                                 );
                               })}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                              <h2 className="text-xl font-semibold text-slate-900">Your Appointments</h2>
                              <button onClick={() => setIsBookingMode(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5">
                                <CalendarPlus className="w-4 h-4" /> Book New
                              </button>
                            </div>

                            {filteredAppointments.length === 0 ? (
                              <EmptyState icon={Calendar} title="No scheduled appointments" desc="You do not have any visits booked." />
                            ) : (
                              <div className="grid gap-4">
                                {filteredAppointments.map((app, i) => (
                                  <div key={app.id || i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex items-start gap-5 w-full">
                                      {/* DATE BADGE */}
                                      <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{new Date(app.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                        <span className="text-xl font-bold text-slate-900 leading-none mt-0.5">{new Date(app.date).getDate()}</span>
                                      </div>

                                      {/* DETAILS */}
                                      <div className="flex-1 min-w-0">
                                         <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                                           <h2 className="text-lg font-bold text-slate-900 leading-tight">{app.hospital}</h2>
                                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200 w-max shrink-0">
                                             <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                             {app.status || "Confirmed"}
                                           </span>
                                         </div>
                                         
                                         <p className="text-sm font-semibold text-blue-600 flex items-center gap-1.5 mt-2">
                                           <Stethoscope className="w-4 h-4" /> Provider: {app.doctor}
                                         </p>

                                         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 pt-3 border-t border-slate-100 w-full text-sm font-medium text-slate-600">
                                            <span className="flex items-center gap-1.5">
                                              <Clock className="w-4 h-4 text-slate-400" /> 
                                              {app.slot}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                              <Calendar className="w-4 h-4 text-slate-400" /> 
                                              {new Date(app.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' })}
                                            </span>
                                         </div>
                                      </div>
                                    </div>

                                     {/* ACTION REMOVED FROM DASHBOARD */}
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* PAST */}
                    {activeTab === "past" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                          <h2 className="text-xl font-semibold text-slate-900">Clinical History</h2>
                        </div>

                        {past.length === 0 ? (
                          <EmptyState icon={History} title="No visit history" desc="Your historical clinical records will be displayed here." />
                        ) : (
                          <div className="grid gap-4">
                            {past.map((a, i) => (
                              <div key={i} className="bg-white rounded-lg p-5 border border-slate-200">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-base font-semibold text-slate-900">{a.hospital}</h3>
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded">Completed</span>
                                    </div>
                                    <p className="text-sm text-slate-600">{a.doctor} • {a.date}</p>

                                    <div className="mt-4 pt-4 border-t border-slate-100/60 grid sm:grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Primary Diagnosis</p>
                                        <p className="text-sm text-slate-800">Routine physical examination. All vitals normal.</p>
                                      </div>
                                      <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Action items / RX</p>
                                        <p className="text-sm text-slate-800">Paracetamol 500mg, Rest for 2 days.</p>
                                      </div>
                                    </div>
                                  </div>
                                  <button className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 px-4 py-2 rounded-md hover:bg-slate-50 transition-colors shrink-0">
                                     <FileText className="w-4 h-4 text-slate-400" /> View Summary
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* FAVOURITES */}
                    {activeTab === "favourites" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                          <h2 className="text-xl font-semibold text-slate-900">Saved Facilities</h2>
                        </div>
                        
                        {favorites.length === 0 ? (
                           <EmptyState icon={Heart} title="No saved facilities" desc="Hospitals or clinics you save for quick access will appear here." />
                        ) : (
                          <div className="grid md:grid-cols-2 gap-4">
                            {favorites.map((h, i) => (
                              <div key={i} className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-center shrink-0 overflow-hidden">
                                  {h.logo?.startsWith("http") ? (
                                     <img src={h.logo} className="w-full h-full object-cover" />
                                  ) : (
                                     <Building2 className="w-6 h-6 text-slate-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-slate-900 truncate">{h.name}</h3>
                                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {h.city}, {h.state}
                                  </p>
                                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 w-full">
                                    <span className="text-[10px] font-semibold text-slate-400 uppercase">{h.doctors ? h.doctors.length : 0} Doctors</span>
                                    <button onClick={() => setSelectedHospital(h)} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Book Request</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* NOTIFICATIONS */}
                    {activeTab === "notifications" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                          <h2 className="text-xl font-semibold text-slate-900">Security & Notifications</h2>
                        </div>

                        <div className="space-y-3">
                          {/* NEW REPORT NOTIFICATION */}
                          <div className="p-4 bg-white border border-slate-200 rounded-lg flex items-center justify-between gap-4 transition-all" id="noti-report">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5 border border-green-100">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Report sent from hospital</p>
                                <p className="text-sm text-slate-600 mt-0.5">City General Hospital has securely shared your diagnostic test results.</p>
                                <p className="text-xs font-medium text-slate-400 mt-2">Just now</p>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center gap-3 shrink-0 border-l border-slate-100 pl-4 ml-2">
                               <button className="text-[11px] uppercase tracking-wider font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5">
                                 <Download className="w-3.5 h-3.5" /> Download
                               </button>
                               <button onClick={(e) => e.currentTarget.closest('#noti-report').style.display='none'} className="text-[11px] uppercase tracking-wider font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1.5">
                                 <X className="w-3.5 h-3.5" /> Remove
                               </button>
                            </div>
                          </div>

                          <div className="p-4 bg-white border border-slate-200 rounded-lg flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Next appointment reminder sent</p>
                              <p className="text-sm text-slate-600 mt-0.5">We sent an SMS reminder for your upcoming appointment with Dr. Sharma.</p>
                              <p className="text-xs font-medium text-slate-400 mt-2">2 hours ago</p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-white border border-slate-200 rounded-lg flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">System maintenance logged</p>
                              <p className="text-sm text-slate-600 mt-0.5">Your portal data was synchronized successfully following our routine security check.</p>
                              <p className="text-xs font-medium text-slate-400 mt-2">Yesterday, 14:30 EST</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DOCUMENTS */}
                    {activeTab === "documents" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                          <h2 className="text-xl font-semibold text-slate-900">Clinical Records</h2>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Upload New</button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {["Complete_Blood_Count_2026.pdf", "Discharge_Summary.pdf", "Internal_Medicine_Report.pdf"].map((doc, i) => (
                            <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between group cursor-pointer h-full">
                              <div className="flex items-start gap-3">
                                <div className="p-2 border border-slate-100 bg-slate-50 rounded text-red-500 shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 pr-4">
                                   <p className="text-sm font-semibold text-slate-900 truncate leading-tight" title={doc}>{doc}</p>
                                   <p className="text-xs text-slate-500 mt-1">1.2 MB • PDF Document</p>
                                </div>
                              </div>
                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-400">Added: Oct 12, 2026</span>
                                <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PROFILE */}
                    {activeTab === "profile" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                          <h2 className="text-xl font-semibold text-slate-900">Account Settings</h2>
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200 p-6 max-w-3xl">
                          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                            <div className="sm:col-span-2">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Full Legal Name</label>
                              <input defaultValue="John Doe" className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-slate-400" />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
                              <input defaultValue="john.doe@example.com" type="email" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors" disabled />
                            </div>
                             <div>
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Mobile Number</label>
                              <input defaultValue="+91 98765 43210" className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                            <div className="sm:col-span-2 pt-4 mt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                              <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                                Cancel
                              </button>
                              <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                                Save Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
             </div>
         </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {selectedHospital && (
          <BookingModal
            hospital={selectedHospital}
            onClose={() => {
               setSelectedHospital(null);
               refreshData();
               setIsBookingMode(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white rounded-lg p-12 py-20 text-center border border-slate-200 border-dashed flex flex-col items-center justify-center">
      <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400 border border-slate-100">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">{desc}</p>
    </div>
  );
}
