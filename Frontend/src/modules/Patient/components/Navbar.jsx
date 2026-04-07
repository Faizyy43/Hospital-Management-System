import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 🔥 FULL NAV LINKS (UPDATED)
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
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          HMS+
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {/* NAV LINKS */}
          {navLinks.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link key={link.name} to={link.path} className="relative">
                <span
                  className={`text-sm font-medium transition ${
                    active
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </span>

                {active && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-600 rounded"
                  />
                )}
              </Link>
            );
          })}

          {/* 🔔 NOTIFICATIONS */}
          <div className="relative cursor-pointer">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
              3
            </span>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold cursor-pointer shadow-lg hover:scale-105 transition"
            >
              {user ? user.name?.charAt(0).toUpperCase() : "?"}
            </div>

            {/* DROPDOWN */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-xl border rounded-xl shadow-xl p-2"
                >
                  {!user ? (
                    <Link
                      to="/login"
                      className="block px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      🔐 Login
                    </Link>
                  ) : (
                    <>
                      <p className="px-4 py-2 text-xs text-gray-400 border-b">
                        {user.role}
                      </p>

                      <Link
                        to="/patient-dashboard"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-50"
                      >
                        📊 Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-50"
                      >
                        👤 My Profile
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-50"
                      >
                        ⚙️ Settings
                      </Link>

                      {/* <Link
                        to="/change-password"
                        className="block px-4 py-2 rounded-lg hover:bg-blue-50"
                      >
                        🔒 Change Password
                      </Link> */}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        🚪 Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl px-4 pb-4 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <p className="py-2 text-gray-700 hover:text-blue-600">
                  {link.name}
                </p>
              </Link>
            ))}

            {/* Notifications */}
            <p className="py-2">🔔 Notifications (3)</p>

            {!user ? (
              <Link to="/login">
                <p className="py-2 text-blue-600 font-medium">Login</p>
              </Link>
            ) : (
              <>
                <Link to="/patient-dashboard">
                  <p className="py-2 text-blue-600">Dashboard</p>
                </Link>

                <Link to="/profile">
                  <p className="py-2">My Profile</p>
                </Link>

                <button onClick={handleLogout} className="py-2 text-red-500">
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
