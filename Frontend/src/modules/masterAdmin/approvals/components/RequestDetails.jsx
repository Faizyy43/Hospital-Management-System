import { useEffect, useState } from "react";
import {
  getRequestById,
  approveRequest,
  rejectRequest
} from "../../hospitals/hospitalService";
import { useNavigate, useParams } from "react-router-dom";

const RequestDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getRequestById(Number(id));
      setData(res);
    };
    load();
  }, [id]);

  const handleApprove = async () => {
    await approveRequest(Number(id));
    navigate("/admin/hospitals");
  };

  const handleReject = async () => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;

    await rejectRequest(Number(id), reason);
    navigate("/admin/requests");
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">{data.name}</h2>

        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Approve
          </button>

          <button
            onClick={handleReject}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>

      {/* ALL DETAILS */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Basic Info</h3>
          <p>Name: {data.name}</p>
          <p>Type: {data.type}</p>
          <p>Registration: {data.registrationNumber}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>{data.contact?.phone}</p>
          <p>{data.contact?.email}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>{data.address?.full}</p>
          <p>{data.address?.pin}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Specialities</h3>
          {data.specialities?.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>

      </div>

    </div>
  );
};

export default RequestDetails;