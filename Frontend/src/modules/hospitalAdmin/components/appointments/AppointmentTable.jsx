import { motion } from "framer-motion";

const AppointmentTable = ({ data, onView, onReschedule }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-sm"
    >
      <table className="w-full text-sm">

        <thead className="text-gray-400 text-xs uppercase">
          <tr>
            <th className="text-left py-3">Patient</th>
            <th className="text-left">Doctor</th>
            <th>Day</th>
            <th>Slot</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr
              key={a.id}
              className="border-t border-gray-100 hover:bg-blue-50/40 transition"
            >
              <td className="py-4 font-medium text-gray-700">
                {a.patient}
              </td>

              <td>{a.doctorName}</td>

              <td className="text-gray-500">{a.day}</td>

              <td className="text-blue-600 text-sm">{a.slot}</td>

              <td>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  {a.status}
                </span>
              </td>

              <td className="space-x-3 text-sm">
                <button
                  onClick={() => onView(a)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>

                <button
                  onClick={() => onReschedule(a)}
                  className="text-yellow-600 hover:underline"
                >
                  Reschedule
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </motion.div>
  );
};

export default AppointmentTable;