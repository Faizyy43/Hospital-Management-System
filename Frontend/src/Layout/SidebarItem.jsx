import { NavLink } from "react-router-dom";

const SidebarItem = ({
  to,
  icon: Icon,
  label,
  navItem,
  active,
  indicator,
  onClick,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `${navItem} ${isActive ? active : ""}`}
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator */}
          {isActive && <span className={indicator}></span>}

          {/* Icon */}
          <span className="text-lg transition-transform duration-200 group-hover:scale-110">
            <Icon />
          </span>

          {/* Label */}
          <span className="font-medium tracking-wide">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
