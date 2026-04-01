import { useEffect, useState } from "react";
import {
  getApprovalById,
  approveHospital,
  rejectHospital
} from "../approvalService";

const ApprovalDetail = ({ hospitalId }) => {
  const [data, setData] = useState(null);

  // LOAD DATA
  useEffect(() => {
    const load = async () => {
      const res = await getApprovalById(hospitalId);
      setData(res);
    };
    load();
  }, [hospitalId]);

  // APPROVE
  const handleApprove = async () => {
    await approveHospital(hospitalId);
    const updated = await getApprovalById(hospitalId);
    setData(updated);
  };

  // REJECT
  const handleReject = async () => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;

    await rejectHospital(hospitalId, reason);
    const updated = await getApprovalById(hospitalId);
    setData(updated);
  };

  // LOADING
  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p className={
            data.status === "Approved" ? "text-green-600" :
            data.status === "Rejected" ? "text-red-600" :
            "text-yellow-600"
          }>
            {data.status}
          </p>
        </div>

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

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-6">

        {/* BASIC */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Basic Info</h3>
          <p>Type: {data.type || "N/A"}</p>
          <p>Registration: {data.registrationNumber || "N/A"}</p>
        </div>

        {/* CONTACT */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>{data.contact?.phone || "N/A"}</p>
          <p>{data.contact?.email || "N/A"}</p>
        </div>

        {/* ADDRESS */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>{data.address?.full || "N/A"}</p>
          <p>{data.address?.pin || "N/A"}</p>
        </div>

        {/* SPECIALITIES */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Specialities</h3>
          {data.specialities?.length ? (
            data.specialities.map((s, i) => (
              <p key={i}>{s}</p>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>

      </div>

      {/* AUDIT LOG */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Audit Logs</h3>

        {data.auditLogs?.length ? (
          data.auditLogs.map((log, i) => (
            <p key={i} className="text-sm text-gray-600">
              {log.action} - {new Date(log.date).toLocaleString()}
            </p>
          ))
        ) : (
          <p>No logs yet</p>
        )}
      </div>

    </div>
  );
};

export default ApprovalDetail;