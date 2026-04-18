import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, LogIn, LayoutDashboard, User, Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (err) {
      setUser(null);
    }
  }, []);

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

  // Close mobile menu when navigating
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Appointments", path: "/appointments" },
    { name: "Favourites", path: "/favourites" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-90 transition"
        >
          HMS+
        </Link>

        {/* DESKTOP MENU (Main Links) */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link key={link.name} to={link.path} className="relative group py-1 flex flex-col items-center">
                <span
                  className={`text-sm font-medium transition-colors ${active ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                >
                  {link.name}
                </span>

                <span
                  className={`absolute bottom-0 h-[2px] bg-blue-600 rounded-full transition-all duration-300 ${active ? "w-full left-0" : "w-0 left-1/2 -translate-x-1/2 group-hover:w-full group-hover:left-0 group-hover:translate-x-0"}`}
                />
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE TOOLS (Profile & Global Actions) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* PROFILE AVATAR (Visible on all devices) */}
          <div className="relative z-[60]" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(!profileOpen); setMenuOpen(false); }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 cursor-pointer shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {user ? (
                <span className="text-blue-700 font-semibold text-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              ) : (
                <User className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {/* PROFILE DROPDOWN */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
                >
                  {!user ? (
                    <div className="p-3">
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <LogIn className="w-4 h-4" />
                        Log In Now
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-4 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.name || "User Name"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                          {user?.role === "patient" ? "Patient Account" : "Admin Account"}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          to={user.role === "patient" ? "/dashboard" : "/hadmin" ? "Admin Account" : "/admin/dashboard/"}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </div>

                      <div className="p-2 border-t border-gray-50 bg-gray-50/50">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false); }}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 bg-white border border-gray-100 hover:bg-gray-50 rounded-full shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE HAMBURGER MENU (Main Links ONLY) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1 bg-gray-50/30">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link key={link.name} to={link.path} className="block">
                    <p className={`px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${active ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-gray-600 hover:bg-white border border-transparent hover:border-gray-200"
                      }`}>
                      {link.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
