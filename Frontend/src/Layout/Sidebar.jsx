import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItem =
    "flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50/70 hover:text-blue-600 transition-all";

  const active =
    "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-sm";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
        />
      )}

      <div
        className={`fixed md:static z-20 w-64 h-full p-5 transform transition duration-300
        bg-white/60 backdrop-blur-xl border-r border-white/40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <h2 className="text-xl font-semibold mb-10 bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          HMS
        </h2>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : ""}`
            }
          >
            Patients
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : ""}`
            }
          >
            Appointments
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;