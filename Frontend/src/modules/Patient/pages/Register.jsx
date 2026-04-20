import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Building2, Shield, Heart, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      {/* Enhanced Background Glow */}
      <div className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-100/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full">
        {/* Compact Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-sm">
            <Shield className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">Secure Healthcare Network</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
            Join Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Healthcare Portal</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience a cutting-edge platform designed for modern patients and world-class healthcare facilities.
          </p>
        </motion.div>

        {/* Compact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mb-8"
        >
          {/* Patient Card */}
          <PremiumCard
            color="emerald"
            icon={<User />}
            title="Patient Portal"
            desc="Book appointments, access medical records, track treatments, and manage your health journey with ease and privacy."
            btn="Create Patient Account"
            badge="Instant Access"
            features={["24/7 Appointment Booking", "Medical History Tracking", "Secure Messaging"]}
            onClick={() => handleSelectRole("patient")}
          />

          {/* Hospital Card */}
          <PremiumCard
            color="blue"
            icon={<Building2 />}
            title="Hospital Facility"
            desc="Streamline patient management, doctor scheduling, appointment coordination, and operational efficiency."
            btn="Register Hospital"
            badge="Verified Access"
            features={["Patient Management", "Staff Scheduling", "Analytics Dashboard"]}
            onClick={() => handleSelectRole("hospital")}
          />
        </motion.div>

        {/* Compact Login Link and Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-6"
        >
          <p className="text-sm text-gray-600 font-medium bg-white/70 backdrop-blur-md px-6 py-3 rounded-2xl border border-gray-200/50 shadow-lg inline-block">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-blue-500" />
              End-to-End Encrypted
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              99.9% Uptime
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Enhanced Premium Card Component */
function PremiumCard({ color, icon, title, desc, btn, badge, features, onClick }) {
  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50",
      hoverBg: "group-hover:bg-emerald-600",
      text: "text-emerald-700",
      hoverText: "group-hover:text-white",
      border: "border-emerald-200",
      glow: "bg-emerald-400/20"
    },
    blue: {
      bg: "bg-blue-50",
      hoverBg: "group-hover:bg-blue-600",
      text: "text-blue-700",
      hoverText: "group-hover:text-white",
      border: "border-blue-200",
      glow: "bg-blue-400/20"
    }
  };

  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer group h-full flex"
    >
      {/* Enhanced Glow Effect */}
      <div className={`absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${classes.glow}`}></div>

      {/* Main Card */}
      <div className="relative w-full h-full bg-white/80 backdrop-blur-sm rounded-[28px] p-6 lg:p-8 shadow-lg hover:shadow-2xl border border-gray-200/50 hover:border-gray-300/70 flex flex-col transition-all duration-300 overflow-hidden">
        
        {/* Top Section */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 [&>svg]:w-6 [&>svg]:h-6 ${classes.bg} ${classes.text} ${classes.hoverBg} ${classes.hoverText} shadow-sm`}
          >
            {icon}
          </div>

          {/* Badge */}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${classes.bg} ${classes.text} shadow-sm`}>
            {badge}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-4 flex-1 text-sm">{desc}</p>

        {/* Features List */}
        <ul className="mb-6 space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-xs text-gray-600">
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
              {feature}
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`w-full flex items-center justify-center py-3 px-4 mt-auto rounded-lg text-sm font-semibold transition-all duration-300 ${classes.bg} ${classes.text} ${classes.hoverBg} ${classes.hoverText} shadow-sm hover:shadow-md`}
        >
          {btn}
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
