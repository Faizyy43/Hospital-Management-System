import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Building,
  Activity,
  Layers,
  FileText,
  PieChart
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const isMasterAdmin = location.pathname.startsWith("/admin");

  const handleClick = () => {
    if (window.innerWidth < 768 && setIsOpen) {
      setIsOpen(false);
    }
  };

  // Hospital Admin standard styling
  const navItemClass =
    "relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent";
  const activeClass = "bg-blue-50 text-blue-700 border-blue-100/50 hover:bg-blue-50 hover:text-blue-700 font-semibold";
  const indicatorClass = "hidden"; 

  // Master Admin simple standard styling
  const masterLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
      isActive 
        ? "bg-sky-50 text-sky-700 font-semibold border border-sky-100/50" 
        : "text-slate-600 hover:bg-sky-50/50 hover:text-slate-900 border border-transparent font-medium"
    }`;

  // -------------------------
  // MASTER ADMIN SIDEBAR
  // -------------------------
  if (isMasterAdmin) {
    return (
      <>
        {/* Overlay (Mobile) */}
        {isOpen && (
          <div
            onClick={() => setIsOpen && setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}

        <div className={`fixed md:relative top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-xl md:shadow-none transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
           <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 tracking-tight">
             <div className="w-8 h-8 rounded-md bg-sky-500 flex items-center justify-center shrink-0 shadow-sm">
               <Activity className="w-4 h-4 text-white" />
             </div>
             Master Admin
           </h2>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          
          <div className="px-3 mb-3 text-[10px] uppercase tracking-widest font-semibold text-sky-600/70">
            Network Operations
          </div>

          <nav className="space-y-1.5 mb-8">
            <NavLink to="/admin/dashboard" onClick={handleClick} className={masterLinkClass}>
              <LayoutDashboard className="w-[18px] h-[18px]"/> Dashboard
            </NavLink>
            <NavLink to="/admin/hospitals" onClick={handleClick} className={masterLinkClass}>
              <Building className="w-[18px] h-[18px]"/> Hospitals
            </NavLink>
            <NavLink to="/admin/requests" onClick={handleClick} className={masterLinkClass}>
              <FileText className="w-[18px] h-[18px]"/> Requests
            </NavLink>
            {/* <NavLink to="/admin/analytics" className={masterLinkClass}>
              <PieChart className="w-[18px] h-[18px]"/> Analytics
            </NavLink> */}
          </nav>
        </div>
        </div>
      </>
    );
  }

  // -------------------------
  // HOSPITAL ADMIN SIDEBAR
  // -------------------------
  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen && setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 z-50 h-screen w-[260px] 
        bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-xl md:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo / Branding */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <Link
            to="/hadmin"
            className="text-lg font-bold text-slate-900 flex items-center gap-2.5 tracking-tight"
          >
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
              <Activity className="w-4 h-4 text-white" />
            </div>
            HMS Admin
          </Link>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">

          {/* MAIN */}
          <div className="px-3 mb-3 text-[10px] uppercase tracking-widest font-semibold text-slate-400">
            Overview
          </div>

          <nav className="space-y-1 mb-8">
            <SidebarItem
              to="/hadmin"
              icon={LayoutDashboard}
              label="Dashboard"
              navItem={navItemClass}
              active={activeClass}
              indicator={indicatorClass}
              onClick={handleClick}
            />
          </nav>

          {/* MANAGEMENT */}
          <div className="px-3 mb-3 text-[10px] uppercase tracking-widest font-semibold text-slate-400">
            Clinical Operations
          </div>

          <nav className="space-y-1 mb-8">

            {/* <SidebarItem
              to="/hadmin/appointments"
              icon={Calendar}
              label="Appointments"
              navItem={navItemClass}
              active={activeClass}
              indicator={indicatorClass}
              onClick={handleClick}
            /> */}

            <SidebarItem
              to="/hadmin/patients"
              icon={Users}
              label="Patients Directory"
              navItem={navItemClass}
              active={activeClass}
              indicator={indicatorClass}
              onClick={handleClick}
            />

            <SidebarItem
              to="/hadmin/doctors"
              icon={Stethoscope}
              label="Medical Staff"
              navItem={navItemClass}
              active={activeClass}
              indicator={indicatorClass}
              onClick={handleClick}
            />
          </nav>

          {/* HOSPITAL SETUP */}
          <div className="px-3 mb-3 text-[10px] uppercase tracking-widest font-semibold text-slate-400">
            Facility Setup
          </div>

          <nav className="space-y-1">
            <SidebarItem
              to="/hadmin/staff"
              icon={Building}
              label="Staff Management"
              navItem={navItemClass}
              active={activeClass}
              indicator={indicatorClass}
              onClick={handleClick}
            />

            <SidebarItem
              to="/hadmin/opd"
              icon={Layers}
              label="OPD Categories"
              navItem={navItemClass}
              active={activeClass}
              indicator={indicatorClass}
              onClick={handleClick}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
