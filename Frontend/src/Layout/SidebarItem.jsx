import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label, navItem, active, indicator, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick} // 👈 important
      className={({ isActive }) =>
        `${navItem} ${isActive ? active : ""}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className={indicator}></span>}
          <Icon />
          {label}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;