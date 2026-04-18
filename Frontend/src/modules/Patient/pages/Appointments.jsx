import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CalendarX2, CalendarDays, Stethoscope, MapPin, Building2, ChevronRight, Activity, X } from "lucide-react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(saved);
  }, []);

  const filteredAppointments = useMemo(() => {
    if (!currentUser) return [];

    if (currentUser.role === "patient") {
      return appointments.filter((app) =>
        (currentUser.email && app.patientEmail === currentUser.email) ||
        (currentUser.name && app.patientName === currentUser.name)
      );
    }

    if (currentUser.role === "hospital") {
      return appointments.filter((app) =>
        (app.hospitalId && currentUser.id && app.hospitalId === currentUser.id) ||
        app.hospital === currentUser.name
      );
    }

    return [];
  }, [appointments, currentUser]);

  const cancelAppointment = (id) => {
    // In a real app, you would ask for confirmation via a modal
    const updated = appointments.filter((app) => app.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const upcomingCount = filteredAppointments.filter(
    (a) => new Date(a.date) >= new Date(new Date().toISOString().split("T")[0])
  ).length;

  return (
    <div className="min-h-full bg-slate-50 flex flex-col pt-20">

      {/* DASHBOARD-STYLE HEADER */}
      <div className="bg-white border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-blue-600 mb-2">
                <CalendarDays className="w-3.5 h-3.5" />
                Schedule
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Appointments</h1>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                Review and manage your scheduled outpatient visits and tele-consultations across our healthcare network.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 leading-none mb-1">Upcoming</p>
                  <p className="text-sm font-semibold text-slate-900 leading-none">{upcomingCount} Scheduled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 pb-20">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app, index) => (
                <motion.div
                  key={app.id || index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
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

                      <p className="text-sm font-semibold text-blue-600 flex items-center gap-1.5">
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

                  {/* ACTION */}
                  <div className="w-full md:w-auto shrink-0 flex justify-end md:block pt-4 md:pt-0 border-t border-slate-100 md:border-0">
                    <button
                      onClick={() => cancelAppointment(app.id)}
                      className="w-full md:w-auto px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors shrink-0 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4 hidden md:block" /> Cancel Request
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-white border border-slate-200 border-dashed rounded-xl"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <CalendarX2 className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No Appointments Scheduled</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  {currentUser ? (
                    "You haven't booked any consultations yet. Go to the Network Directory to find a provider."
                  ) : (
                    "Please login with your patient account to view appointments."
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
// Placeholder X icon component since it wasn't imported from lucide-react initially, it needs to be imported or recreated here.
// I added it to the lucide-react import list at the top.