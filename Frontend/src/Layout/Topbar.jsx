import { useState, useRef, useEffect } from "react";
import { Menu, Search, Bell, LogOut, User, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Topbar = ({ setIsOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-0 z-10 h-16 px-6 flex items-center justify-between bg-white border-b border-slate-200"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          className="md:hidden p-1.5 -ml-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Title Container (Optional Breadcrumbs/Title) */}
        {/* <h3 className="hidden sm:block text-[15px] font-semibold text-slate-800 tracking-tight">
          Admin Control Center
        </h3> */}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center relative mr-2">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search records, doctors..."
            className="w-56 pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1 hidden sm:block"></div>

        {/* User Dropdown */}
        <div className="relative" ref={profileRef}>
          <div 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 py-1 px-2 rounded-md transition-colors"
          >
            <div className="hidden sm:flex flex-col items-end leading-tight text-right">
              <span className="text-sm text-slate-700 font-semibold">
                Admin User
              </span>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">
                Superadmin
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm group-hover:bg-blue-700 transition-colors shrink-0">
              AU
            </div>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-slate-100 mb-1 sm:hidden">
                  <p className="text-sm font-semibold text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-500">Superadmin</p>
                </div>
                
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  My Profile
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Account Settings
                </button>
                
                <div className="h-px bg-slate-100 my-1"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export default Topbar;