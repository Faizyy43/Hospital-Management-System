const Leaderboard = ({ title, data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="mb-4 font-semibold">{title}</h2>

      {data.map((item, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <span>{i + 1}. {item.name}</span>
          <span>{item.patients}</span>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;