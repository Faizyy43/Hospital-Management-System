const InputField = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
    />
  );
};

export default InputField;