const PrimaryButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition active:scale-95"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;