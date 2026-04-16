import { NavLink } from "react-router-dom";

const SidebarItem = ({
  to,
  icon: Icon,
  label,
  navItem,
  active,
  indicator, // Retained for compatibility but generally we hide it via classes
  onClick,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end={to === "/hadmin"} // Important for the root dashboard to not stay active on child routes!
      className={({ isActive }) => `${navItem} group flex items-center ${isActive ? active : ""}`}
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator Bar (Optional) */}
          {isActive && <span className={indicator}></span>}

          {/* Icon */}
          <Icon className={`w-[18px] h-[18px] shrink-0 transition-all duration-200 group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'}`} />

          {/* Label */}
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
