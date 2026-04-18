import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Building2, ArrowRight, ShieldCheck, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 bg-white min-h-screen flex items-center border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[11px] uppercase tracking-widest font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Next-Gen Healthcare Portal
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Enterprise Hospital <br />
              <span className="text-blue-600">
                Management System
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-lg">
              Securely book appointments, connect with certified hospitals, and manage your clinical records—all from one unified platform.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link 
                to="/appointments" 
                className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link 
                to="/hospitals" 
                className="group flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
              >
                <Building2 className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                Explore Directory
              </Link>
            </div>

            {/* Social Proof / Stats */}
            <div className="mt-12 flex items-center gap-6 border-t border-slate-100 pt-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">10k+</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">Active Patients</p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">Network Hospitals</p>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
              <div className="hidden sm:block">
                <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">Clinical Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:block relative lg:ml-10"
          >
            {/* Minimalist Background Pattern */}
            <div className="absolute inset-0 bg-slate-50 border border-slate-100 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
            
            <img
              src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8446.jpg"
              alt="Advanced Hospital Management"
              className="relative rounded-2xl shadow-lg border border-slate-200 w-full object-cover z-10 bg-white"
            />

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -left-8 top-12 bg-white p-3.5 rounded-xl shadow-lg border border-slate-100 z-20 flex items-center gap-3" 
            >
              <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Secure Records</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">HIPAA Compliant</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -right-6 bottom-16 bg-white p-3.5 rounded-xl shadow-lg border border-slate-100 z-20 flex items-center gap-3" 
            >
              <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Fast Booking</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Zero Wait Time</p>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}