const PrimaryButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-[0.98] w-full md:w-auto flex items-center justify-center gap-2"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;