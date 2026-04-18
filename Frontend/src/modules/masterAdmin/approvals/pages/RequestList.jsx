import { useEffect, useState } from "react";
import { getRequests } from "../../hospitals/hospitalService";
import { useNavigate } from "react-router-dom";

const RequestList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getRequests();
      setData(res);
    };
    load();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">
        Hospital Requests
      </h2>

      <div className="bg-white rounded-xl shadow">

        {data.map((r) => (
          <div
            key={r.id}
            onClick={() => navigate(`/admin/requests/${r.id}`)}
            className="flex justify-between items-center p-4 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-sm text-gray-500">
                {r.type} • {r.registrationNumber}
              </p>
            </div>

            <span className="text-blue-600 text-sm">
              View →
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RequestList;