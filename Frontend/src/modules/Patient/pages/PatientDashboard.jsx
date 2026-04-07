import { useEffect, useState } from "react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];

    // Add fake status if not exists (for demo)
    const updated = data.map((a) => ({
      ...a,
      status: a.status || "Confirmed",
    }));

    setAppointments(updated);
  }, []);

  // 🔥 Split upcoming vs past
  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments.filter((a) => a.date >= today);
  const past = appointments.filter((a) => a.date < today);

  // 🎨 Status Badge
  const getStatusColor = (status) => {
    if (status === "Confirmed") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Patient Dashboard
      </h1>

      {/* TABS */}
      <div className="flex gap-3 flex-wrap mb-6">
        {[
          "upcoming",
          "past",
          "notifications",
          "documents",
          "favourites",
          "profile",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm capitalize ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-2xl shadow p-4 md:p-6">
        {/* 🗓️ UPCOMING */}
        {activeTab === "upcoming" && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Upcoming Appointments
            </h2>

            {upcoming.length === 0 ? (
              <p className="text-gray-400">No upcoming appointments</p>
            ) : (
              upcoming.map((a, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 mb-3 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{a.hospital}</h3>
                    <p className="text-sm text-gray-500">{a.doctor}</p>
                    <p className="text-sm">
                      {a.date} • {a.slot}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                      a.status,
                    )}`}
                  >
                    {a.status}
                  </span>
                </div>
              ))
            )}
          </>
        )}

        {/* 📜 PAST */}
        {activeTab === "past" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>

            {past.length === 0 ? (
              <p className="text-gray-400">No past records</p>
            ) : (
              past.map((a, i) => (
                <div key={i} className="border rounded-xl p-4 mb-3">
                  <h3 className="font-semibold">{a.hospital}</h3>
                  <p className="text-sm text-gray-500">{a.doctor}</p>
                  <p className="text-sm">
                    {a.date} • {a.slot}
                  </p>

                  {/* EXTRA MEDICAL INFO */}
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Diagnosis: General Checkup</p>
                    <p>Prescription: Available</p>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* 🔔 NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                Appointment confirmed for tomorrow
              </div>
              <div className="p-3 bg-yellow-50 rounded">
                Doctor rescheduled your slot
              </div>
            </div>
          </div>
        )}

        {/* 📂 DOCUMENTS */}
        {activeTab === "documents" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Documents</h2>

            <div className="space-y-3">
              <div className="border p-3 rounded">Blood Report.pdf</div>
              <div className="border p-3 rounded">Prescription_2025.pdf</div>
            </div>
          </div>
        )}

        {/* ❤️ FAVOURITES */}
        {activeTab === "favourites" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Favourite Hospitals</h2>

            <div className="space-y-3">
              <div className="border p-3 rounded">Apollo Hospital</div>
              <div className="border p-3 rounded">Zydus Hospital</div>
            </div>
          </div>
        )}

        {/* 👤 PROFILE */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

            <div className="space-y-3">
              <input placeholder="Name" className="w-full p-2 border rounded" />
              <input
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
