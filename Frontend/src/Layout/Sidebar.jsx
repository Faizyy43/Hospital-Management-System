<<<<<<< HEAD
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block p-2 rounded ${
      isActive ? "bg-gray-700" : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Master Admin</h2>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/hospitals" className={linkClass}>
          Hospitals
        </NavLink>

        <NavLink to="/admin/requests" className={linkClass}>
          Requests
        </NavLink>

        <NavLink to="/admin/analytics" className={linkClass}>
          Analytics
        </NavLink>
      </nav>
    </div>
=======
import { Link, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserInjured,
  FaCalendarCheck,
  FaUserMd,
  FaUsersCog,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import SidebarItem from "../Layout/SidebarItem";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

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

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 z-20 w-64 h-screen p-5 
        bg-white/60 backdrop-blur-xl border-r border-white/40
        transform transition duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="block text-xl font-semibold mb-8 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          HMS
        </Link>

        {/* MAIN */}
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
          Main
        </p>

        <nav className="space-y-2 mb-6">
          <SidebarItem
            to="/hadmin"
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
            to="/hadmin/patients"
            icon={FaUserInjured}
            label="Patients"
            navItem={navItem}
            active={active}
            indicator={indicator}
            onClick={handleClick}
          />

          <SidebarItem
            to="/hadmin/happointments"
            icon={FaCalendarCheck}
            label="Appointments"
            navItem={navItem}
            active={active}
            indicator={indicator}
            onClick={handleClick}
          />

          <SidebarItem
            to="/hadmin/doctors"
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
            to="/hadmin/staff"
            icon={FaUsersCog}
            label="Staff Management"
            navItem={navItem}
            active={active}
            indicator={indicator}
            onClick={handleClick}
          />

          <SidebarItem
            to="/hadmin/opd"
            icon={MdCategory}
            label="OPD Categories"
            navItem={navItem}
            active={active}
            indicator={indicator}
            onClick={handleClick}
          />
        </nav>
      </div>
    </>
>>>>>>> df718462ab2fcb28ae5f3d166f47ceab63a22726
  );
};

export default Sidebar;
