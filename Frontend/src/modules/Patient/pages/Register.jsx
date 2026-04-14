import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Building2 } from "lucide-react";

export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    // ✅ store role
    localStorage.setItem("role", role);

    // ✅ ALSO pass role via route (BEST PRACTICE)
    navigate(`/register/${role}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 flex flex-col">
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full mb-10 pt-[100px]">
        {/* HERO */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
             <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Join the network</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
            Welcome to <span className="text-blue-600">Healthcare Portal</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Experience a smart platform designed for modern patients and world-class hospitals.
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8 w-full max-w-[800px]"
        >
          {/* 🔥 PATIENT CARD */}
          <PremiumCard
            color="orange"
            icon={<User />}
            title="Patient"
            desc="Book appointments, track medical reports, and manage your complete health journey effortlessly."
            btn="Create Patient Account"
            badge="Instant Access"
            onClick={() => handleSelectRole("patient")}
          />

          {/* 🔥 HOSPITAL CARD */}
          <PremiumCard
            color="blue"
            icon={<Building2 />}
            title="Hospital Facility"
            desc="Manage patients, doctor schedules, appointments, and hospital operations efficiently."
            btn="Apply as Hospital"
            badge="Verified Access"
            onClick={() => handleSelectRole("hospital")}
          />
        </motion.div>

        {/* LOGIN LINK */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-sm text-gray-500 font-medium bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-100 shadow-sm"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors px-1"
          >
            Login here
          </Link>
        </motion.p>
      </div>
    </div>
  );
}

/* 🔥 PREMIUM CARD COMPONENT */
function PremiumCard({ color, icon, title, desc, btn, badge, onClick }) {
  const isBlue = color === "blue";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer group h-full flex"
    >
      {/* Subtile outer glow on hover */}
      <div className={`absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${isBlue ? 'bg-blue-400/20' : 'bg-orange-400/20'}`}></div>

      {/* Main Card */}
      <div className="relative w-full h-full bg-white rounded-[28px] p-8 lg:p-10 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 flex flex-col transition-all duration-300 overflow-hidden">
        
        {/* Top Section */}
        <div className="flex items-start justify-between mb-8">
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-2xl transition-colors duration-300 [&>svg]:w-8 [&>svg]:h-8 ${
              isBlue
                ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                : "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
            }`}
          >
            {icon}
          </div>

          {/* BADGE */}
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
            isBlue ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
          }`}>
            {badge}
          </span>
        </div>

        {/* TEXT */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed mb-10 flex-1">{desc}</p>

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ prevent double trigger
            onClick();
          }}
          className={`w-full flex items-center justify-between py-4 px-6 mt-auto rounded-xl text-sm font-semibold transition-all duration-300 ${
            isBlue
              ? "bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white"
              : "bg-orange-50 text-orange-700 group-hover:bg-orange-500 group-hover:text-white"
          }`}
        >
          {btn}
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
