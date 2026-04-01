import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientById } from "../hospitalService";

const PatientDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getPatientById(id).then(setData);
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      {/* Basic Info */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">{data.fullName}</h2>
        <p>{data.gender} | {data.dob}</p>
        <p>{data.mobile} | {data.email}</p>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Medical</h3>
          <p>Blood Group: {data.bloodGroup}</p>
          <p>Insurance: {data.insurance.provider}</p>
          <p>Policy: {data.insurance.policy}</p>
          <p>{data.emergencyContact.name}</p>
          <p>{data.emergencyContact.phone}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Address</h3>
          <p>{data.address.city}</p>
          <p>{data.address.state}</p>
          <p>{data.address.pin}</p>
        </div>
      </div>

      {/* Appointments */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Appointments</h3>

        {data.appointments.map(a => (
          <div key={a.id} className="border-b py-2">
            {a.date} | {a.status} | {a.doctor} | {a.complaint}
          </div>
        ))}
      </div>

    </div>
  );
};

export default PatientDetail;