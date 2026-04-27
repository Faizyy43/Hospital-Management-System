import { useState, useRef, useEffect } from "react";
import { Menu, Search, Bell, LogOut, User, Settings, Globe, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Topbar = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMasterAdmin = location.pathname.startsWith("/admin");

  // State for Master Admin dropdown
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // State for Hospital Admin dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Hospital logo upload state
  const [logo, setLogo] = useState(() => {
    try {
      return localStorage.getItem("portalLogo") || null;
    } catch {
      return null;
    }
  });
  const fileInputRef = useRef(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result;
        localStorage.setItem("portalLogo", base64);
        setLogo(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    localStorage.removeItem("portalLogo");
    setLogo(null);
  };

  // Close master profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutsideMaster(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideMaster);
    return () => document.removeEventListener("mousedown", handleClickOutsideMaster);
  }, []);

  // Close hospital profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutsideHospital(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideHospital);
    return () => document.removeEventListener("mousedown", handleClickOutsideHospital);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setProfileOpen(false);
    setOpen(false);
    // Redirect to correct login page based on current location
    if (isMasterAdmin) {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  // -------------------------
  // MASTER ADMIN TOPBAR
  // -------------------------
  if (isMasterAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="sticky top-0 z-10 h-16 px-4 sm:px-6 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm"
      >
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle (if needed) */}
          <button
            className="md:hidden p-1.5 -ml-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
            onClick={() => setIsOpen && setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>

        {/* RIGHT METRICS */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center relative mr-2">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search hospitals or patients..."
              className="w-48 lg:w-64 pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Notification */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          <div className="w-px h-5 bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 py-1 px-2 rounded-md transition-colors"
            >
              <div className="hidden sm:flex flex-col items-end leading-tight text-right">
                <span className="text-sm text-slate-700 font-semibold">System Admin</span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">Master</span>
              </div>
              <img
                // src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-8 h-8 rounded-full border border-slate-200 shadow-sm"
              />
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-slate-100 mb-1 sm:hidden">
                    <p className="text-sm font-semibold text-slate-800">System Admin</p>
                    <p className="text-xs text-slate-500">Master Level</p>
                  </div>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                    <User className="w-4 h-4 text-slate-400" /> My Profile
                  </button>
                  <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                    <Globe className="w-4 h-4 text-slate-400" /> Portal
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4 text-red-500" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

  // -------------------------
  // HOSPITAL ADMIN TOPBAR
  // -------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-0 z-10 h-16 px-6 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          className="md:hidden p-1.5 -ml-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
          onClick={() => setIsOpen && setIsOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />

        <h3 className="hidden sm:block text-[15px] font-semibold text-slate-800 tracking-tight">
          Admin Control Center
        </h3>
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

            {logo ? (
              <img
                src={logo}
                alt="profile"
                className="w-8 h-8 rounded-full border border-slate-200 shadow-sm object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm group-hover:bg-blue-700 transition-colors shrink-0">
                AU
              </div>
            )}
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
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  Portal
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  title={logo ? "Change logo" : "Upload logo"}
                >
                  <Upload className="w-4 h-4 text-slate-400" />
                  {logo ? "Change Logo" : "Upload Logo"}
                </button>
                {logo && (
                  <button
                    onClick={removeLogo}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                    Remove Logo
                  </button>
                )}
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