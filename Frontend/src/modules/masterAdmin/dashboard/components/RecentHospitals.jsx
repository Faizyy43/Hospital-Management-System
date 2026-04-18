const RecentHospitals = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Hospitals</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((h) => (
            <tr key={h.id} className="border-t">
              <td className="py-2">{h.name}</td>
              <td>{h.type}</td>
              <td>{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentHospitals;