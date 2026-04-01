const InputField = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full bg-white/60 backdrop-blur-md p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
    />
  );
};

export default InputField;