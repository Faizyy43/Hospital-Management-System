export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Patient Dashboard
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
          <p className="text-gray-500 mt-2">2 appointments scheduled</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Medical Reports</h2>
          <p className="text-gray-500 mt-2">5 reports uploaded</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-gray-500 mt-2">3 new alerts</p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Appointment History</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th>Date</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td>12 Mar</td>
              <td>Dr. Sharma</td>
              <td className="text-green-600">Completed</td>
            </tr>

            <tr className="border-t">
              <td>20 Mar</td>
              <td>Dr. Patel</td>
              <td className="text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
