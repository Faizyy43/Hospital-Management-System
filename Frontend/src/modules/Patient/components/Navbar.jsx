import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "Appointments", path: "/appointments" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="backdrop-blur-lg bg-white/80 border-b border-blue-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
          HMS+
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          {/* Navigation */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative font-medium transition ${
                location.pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded"></span>
              )}
            </Link>
          ))}

          {/* Avatar */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-full font-semibold cursor-pointer shadow-md hover:scale-105 transition"
            >
              {user ? user.name.charAt(0).toUpperCase() : "?"}
            </div>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl border p-2 animate-fadeIn">

                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-700"
                    >
                      🔐 Login / Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="px-4 py-2 text-sm text-gray-500 border-b">
                      {user.role}
                    </p>

                    <Link
                      to={
                        user.role === "patient"
                          ? "/patient-dashboard"
                          : "/hadmin"
                      }
                      className="block px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      📊 Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      🚪 Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-lg">

          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>
              <p className="text-gray-700">{link.name}</p>
            </Link>
          ))}

          {!user ? (
            <Link to="/login">
              <p className="text-blue-600 font-medium">Login / Sign In</p>
            </Link>
          ) : (
            <>
              <Link
                to={
                  user.role === "patient"
                    ? "/patient-dashboard"
                    : "/hadmin"
                }
              >
                <p className="text-blue-600">Dashboard</p>
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}