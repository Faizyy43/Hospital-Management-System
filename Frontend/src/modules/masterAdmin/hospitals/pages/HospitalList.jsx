import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHospitals } from "../hospitalService";

const HospitalList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await getHospitals();
      setData(res);
    };
    fetch();
  }, []);

  const filtered = data.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Hospitals</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search hospital..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Patients</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((h) => (
            <tr
              key={h.id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/admin/hospitals/${h.id}`)}
            >
              <td className="py-2">{h.name}</td>
              <td>{h.type}</td>
              <td>{h.status}</td>
              <td>{h.patients}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalList;