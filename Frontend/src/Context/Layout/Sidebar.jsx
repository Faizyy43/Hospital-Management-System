import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarCheck,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItem =
    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50/70 hover:text-blue-600 transition-all";

  const active = "text-blue-700 bg-blue-50/60 shadow-sm";

  const indicator =
    "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-500";

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 w-64 h-full p-5 
        bg-white/60 backdrop-blur-xl border-r border-white/40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <h2 className="text-xl font-semibold mb-10 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          HMS
        </h2>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/hadmin"
            end
            className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className={indicator}></span>}
                <FaTachometerAlt />
                Dashboard
              </>
            )}
          </NavLink>

          <NavLink
            to="/hadmin/patients"
            className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className={indicator}></span>}
                <FaUserInjured />
                Patients
              </>
            )}
          </NavLink>

          <NavLink
            to="/hadmin/appointments"
            className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className={indicator}></span>}
                <FaCalendarCheck />
                Appointments
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
