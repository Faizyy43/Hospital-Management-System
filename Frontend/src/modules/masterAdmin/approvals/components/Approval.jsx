import { useEffect, useState } from "react";
import { getApprovals } from "../approvalService";

const Approval = ({ onSelect }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("Pending");

  useEffect(() => {
    const load = async () => {
      const res = await getApprovals();
      setData(res);
    };
    load();
  }, []);

  const filtered = data.filter(d => d.status === filter);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Hospital Approvals</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((h) => (
          <div
            key={h.id}
            onClick={() => onSelect(h.id)}
            className="p-4 bg-white shadow rounded-xl flex justify-between cursor-pointer"
          >
            <div>
              <p className="font-medium">{h.name}</p>
              <p className="text-sm text-gray-500">{h.type}</p>
            </div>

            <span className={
              h.status === "Approved" ? "text-green-600" :
              h.status === "Rejected" ? "text-red-600" :
              "text-yellow-600"
            }>
              {h.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approval;