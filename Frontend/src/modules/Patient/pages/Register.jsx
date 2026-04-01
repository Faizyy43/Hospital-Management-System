import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserInjured, FaHospital } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

      {/* HERO */}
      <div className="text-center pt-20 px-4 relative z-10">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-blue-600">Healthcare Portal</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Smart platform for patients and hospitals
        </p>
      </div>

      {/* CARDS */}
      <div className="flex flex-col items-center justify-center mt-16 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 w-full max-w-3xl"
        >
          {/* 🔥 PATIENT CARD */}
          <PremiumCard
            color="orange"
            icon={<FaUserInjured />}
            title="Patient"
            desc="Book appointments, track reports, and manage your health journey."
            btn="Create Patient Account"
            onClick={() => handleSelectRole("patient")}
          />

          {/* 🔥 HOSPITAL CARD */}
          <PremiumCard
            color="blue"
            icon={<FaHospital />}
            title="Hospital"
            desc="Manage patients, appointments, and hospital operations efficiently."
            btn="Apply as Hospital"
            onClick={() => handleSelectRole("hospital")}
          />
        </motion.div>

        {/* LOGIN */}
        <p className="mt-10 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* 🔥 PREMIUM CARD COMPONENT */
function PremiumCard({ color, icon, title, desc, btn, onClick }) {
  const isBlue = color === "blue";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* 🔥 GRADIENT BORDER */}
      <div
        className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r ${
          isBlue
            ? "from-blue-500 to-indigo-500"
            : "from-orange-400 to-orange-600"
        } opacity-60 group-hover:opacity-100 blur-[1px]`}
      ></div>

      {/* GLASS CARD */}
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/40">
        {/* ICON */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${
            isBlue
              ? "bg-blue-100 text-blue-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {icon}
        </div>

        {/* TEXT */}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>

        {/* BADGE */}
        <span className="inline-block mt-3 text-xs bg-gray-100 px-3 py-1 rounded-full">
          {isBlue ? "Verified Access" : "Instant Access"}
        </span>

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ prevent double trigger
            onClick();
          }}
          className={`mt-5 w-full py-2 rounded-lg text-white ${
            isBlue
              ? "bg-gradient-to-r from-blue-600 to-indigo-600"
              : "bg-gradient-to-r from-orange-500 to-orange-600"
          }`}
        >
          {btn}
        </button>

        {/* 🔥 RIPPLE EFFECT */}
        <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <span className="absolute w-0 h-0 bg-white/40 rounded-full group-active:w-96 group-active:h-96 transition-all duration-500"></span>
        </span>
      </div>
    </motion.div>
  );
}
