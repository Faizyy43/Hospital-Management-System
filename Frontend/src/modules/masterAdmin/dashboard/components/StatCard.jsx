const StatCard = ({ title, value, highlight }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow ${
        highlight ? "bg-red-100" : "bg-white"
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value ?? 0}</h2>
    </div>
  );
};

export default StatCard;