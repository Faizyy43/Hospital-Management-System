import { useState, useRef, useEffect } from "react";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Master Admin Panel</h1>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:block">Admin</span>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded-md">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Profile
            </button>

            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Settings
            </button>

            <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;