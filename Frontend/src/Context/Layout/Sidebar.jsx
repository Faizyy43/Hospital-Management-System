import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarCheck,
<<<<<<< HEAD:Frontend/src/Context/Layout/Sidebar.jsx
} from "react-icons/fa";
=======
  FaUserMd,
  FaUsersCog,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import SidebarItem from "../Layout/SidebarItem";
>>>>>>> 576f291197d4451bfbc1225c009753362b0134b2:Frontend/src/Layout/Sidebar.jsx

const handleClick = () => {
  if (window.innerWidth < 768) {
    setIsOpen(false);
  }
};
const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItem =
    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50/70 hover:text-blue-600 transition-all duration-200 ease-out hover:translate-x-1";

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

<<<<<<< HEAD:Frontend/src/Context/Layout/Sidebar.jsx
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
=======
      <div
        className={`fixed md:sticky top-0 z-20 w-64 h-screen p-5 
bg-white/60 backdrop-blur-xl border-r border-white/40
transform transition ${
  isOpen ? "translate-x-0" : "-translate-x-full"
} md:translate-x-0 overflow-y-auto`}
      >
        {/* Logo */}
        <h2 className="text-xl font-semibold mb-8 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          HMS
        </h2>

        {/* MAIN */}
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          Main
        </p>

        <nav className="space-y-2 mb-6">
          <SidebarItem
            to="/"
            icon={FaTachometerAlt}
            label="Dashboard"
            navItem={navItem}
            active={active}
            indicator={indicator}
              onClick={handleClick}

          />
        </nav>

        {/* MANAGEMENT */}
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          Management
        </p>

        <nav className="space-y-2">
          <SidebarItem
  to="/patients"
  icon={FaUserInjured}
  label="Patients"
  navItem={navItem}
  active={active}
  indicator={indicator}
  onClick={handleClick}
/>

          <SidebarItem
            to="/appointments"
            icon={FaCalendarCheck}
            label="Appointments"
            navItem={navItem}
            active={active}
            indicator={indicator}
              onClick={handleClick}

          />

          <SidebarItem
            to="/doctors"
            icon={FaUserMd}
            label="Doctors"
            navItem={navItem}
            active={active}
            indicator={indicator}
              onClick={handleClick}

          />
        </nav>

        {/* HOSPITAL SETUP */}
        <p className="text-xs text-gray-400 mt-6 mb-2 uppercase tracking-wider">
          Hospital Setup
        </p>

        <nav className="space-y-2">
          <SidebarItem
            to="/staff"
            icon={FaUsersCog}
            label="Staff Management"
            navItem={navItem}
            active={active}
            indicator={indicator}
              onClick={handleClick}

          />

          <SidebarItem
            to="/opd"
            icon={MdCategory}
            label="OPD Categories"
            navItem={navItem}
            active={active}
            indicator={indicator}
              onClick={handleClick}

          />
>>>>>>> 576f291197d4451bfbc1225c009753362b0134b2:Frontend/src/Layout/Sidebar.jsx
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
