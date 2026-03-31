import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mb-6"
    >
      <h1
        className="text-2xl md:text-3xl font-semibold tracking-tight 
        bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 
        bg-clip-text text-transparent"
      >
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader;