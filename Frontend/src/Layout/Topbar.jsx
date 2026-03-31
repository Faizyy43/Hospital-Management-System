import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import { motion } from "framer-motion";

const Topbar = ({ setIsOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-0 z-10 h-16 px-5 flex items-center justify-between 
      bg-white/60 backdrop-blur-xl border-b border-white/40"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Menu */}
        <button
          className="md:hidden text-xl text-gray-600 hover:text-blue-600 transition"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu />
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight 
        bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 
        bg-clip-text text-transparent">
          Hospital Dashboard
        </h3>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 
          bg-white/70 border border-gray-200 rounded-xl px-3 py-1.5">

          <FiSearch className="text-gray-400 text-sm" />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-40"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-xl hover:bg-blue-50 transition">
          <FiBell className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer group">

          <div className="w-9 h-9 rounded-xl 
            bg-gradient-to-r from-blue-400 to-indigo-500 
            flex items-center justify-center text-white text-sm font-semibold
            group-hover:scale-105 transition">

            A
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm text-gray-700 font-medium">
              Admin
            </span>
            <span className="text-xs text-gray-400">
              Hospital Admin
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Topbar;