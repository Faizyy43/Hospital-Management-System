import { FiMenu } from "react-icons/fi";

const Topbar = ({ setIsOpen }) => {
  return (
    <div className="h-16 px-5 flex items-center justify-between 
      bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        
        {/* Hamburger */}
        <button
          className="md:hidden text-xl text-gray-600 hover:text-blue-600 transition"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu />
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold 
          bg-gradient-to-r from-blue-600 to-indigo-500 
          bg-clip-text text-transparent">
          Hospital Dashboard
        </h3>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search (optional but clean UI element) */}
        <input
          placeholder="Search..."
          className="hidden md:block bg-white/60 backdrop-blur-md 
          px-3 py-1.5 rounded-xl outline-none text-sm 
          focus:ring-2 focus:ring-blue-200"
        />

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full 
            bg-gradient-to-r from-blue-400 to-indigo-500 
            flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>

          <span className="text-gray-600 text-sm hidden sm:block">
            Admin
          </span>
        </div>
      </div>

    </div>
  );
};

export default Topbar;