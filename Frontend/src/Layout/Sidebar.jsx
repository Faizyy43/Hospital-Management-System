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
  );
};

export default Sidebar;