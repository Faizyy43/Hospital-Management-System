import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHospitalById } from "../hospitalService";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    getHospitalById(id).then(setData);
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const InfoItem = ({ label, value }) => (
    <div className="flex justify-between border-b py-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  const tabs = [
    "overview",
    "patients",
    "appointments",
    "staff",
    "requests",
    "revenue",
    "complaints",
    "audit",
  ];

  const groupedStaff = {
    doctors: data.staff?.filter((s) => s.role === "Doctor") || [],
    nurses: data.staff?.filter((s) => s.role === "Nurse") || [],
    others:
      data.staff?.filter((s) => !["Doctor", "Nurse"].includes(s.role)) || [],
  };

  const monthly = data.revenue?.monthly || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-500">
            {data.type} • {data.registrationNumber}
          </p>

          <div className="flex gap-2 mt-2 flex-wrap">
            {data.specialities.map((s, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right">
          <span
            className={`px-3 py-1 rounded text-sm ${
              data.status === "Approved"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {data.status}
          </span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6  overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 ${
              tab === t
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="grid grid-cols-2 gap-4">
          <Card title="Basic Info">
            <p>Name: {data.name}</p>
            <p>Reg No: {data.registrationNumber}</p>
            <p>Type: {data.type}</p>
            <p>Specialities: {data.specialities.join(", ")}</p>
          </Card>

          <Card title="Contact Info">
            <InfoItem label="Phone" value={data.contact.phone} />
            <InfoItem label="Email" value={data.contact.email} />
            <InfoItem label="Website" value={data.contact.website} />
          </Card>

          <Card title="Address">
            <p>{data.address.full}</p>
            <p>PIN: {data.address.pin}</p>
            <p>GPS: {data.address.gps}</p>
          </Card>

          <Card title="Working Hours">
            <p>{data.workingHours}</p>
          </Card>

          <Card title="Bed Capacity">
            <p>General: {data.bedCapacity.general}</p>
            <p>ICU: {data.bedCapacity.icu}</p>
            <p>Emergency: {data.bedCapacity.emergency}</p>
          </Card>

          <Card title="Insurance">{data.insurance.join(", ")}</Card>

          <Card title="Emergency Services">
            {data.emergency ? "Available (24x7)" : "Not Available"}
          </Card>

          <Card title="Accreditations">{data.accreditations.join(", ")}</Card>
        </div>
      )}

      {/* PATIENTS */}
      {tab === "patients" && (
        <Section title="Patients">
          {data.patients.map((p) => (
            <Row
              key={p.id}
              text={`${p.name} - ${p.issue}`}
              onClick={() => navigate(`/admin/patients/${p.id}`)}
            />
          ))}
        </Section>
      )}

      {/* APPOINTMENTS */}
      {tab === "appointments" && (
        <Section title="Appointments">
          {data.appointments.map((a) => (
            <Row key={a.id} text={`${a.date} - ${a.status}`} />
          ))}
        </Section>
      )}

      {/* STAFF */}
      {tab === "staff" && (
        <Section title="Staff">
          {/* Doctors */}
          <h3 className="font-semibold mt-4 mb-2">Doctors</h3>
          <div className="grid grid-cols-4 gap-4">
            {groupedStaff.doctors.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">{s.role}</p>
              </div>
            ))}
          </div>

          {/* Nurses */}
          <h3 className="font-semibold mt-6 mb-2">Nurses</h3>
          <div className="grid grid-cols-4 gap-4">
            {groupedStaff.nurses.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">{s.role}</p>
              </div>
            ))}
          </div>

          {/* Others */}
          <h3 className="font-semibold mt-6 mb-2">Other Staff</h3>
          <div className="grid grid-cols-4 gap-4">
            {groupedStaff.others.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">{s.role}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* REQUESTS */}
      {tab === "requests" && (
        <Section title="Requests">
          {data.requests?.map((r) => (
            <Row key={r.id} text={`${r.type} - ${r.status}`} />
          ))}
        </Section>
      )}

      {/* REVENUE */}
      {tab === "revenue" && (
        <Section title="Revenue">
          <p className="mb-4 font-semibold">
            Total: ₹{data.revenue?.total || 0}
          </p>

          {monthly.length > 0 ? (
            <div className="grid grid-cols-2 gap-6">
              {/* Bar */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>

              {/* Line */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>No revenue data</p>
          )}
        </Section>
      )}

      {/* COMPLAINTS */}
      {tab === "complaints" && (
        <Section title="Complaints">
          {data.complaints?.map((c) => (
            <Row key={c.id} text={c.message} />
          ))}
        </Section>
      )}

      {/* AUDIT */}
      {tab === "audit" && (
        <Section title="Audit Logs">
          {data.auditLogs?.map((a, i) => (
            <Row key={i} text={`${a.action} - ${a.date}`} />
          ))}
        </Section>
      )}
    </div>
  );
};

/* Reusable components */

const Card = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const Row = ({ text, onClick }) => (
  <div
    onClick={onClick}
    className="border-b py-2 cursor-pointer hover:bg-gray-100"
  >
    {text}
  </div>
);

export default HospitalDetail;
