import { motion } from "framer-motion";
import { Eye, CalendarClock } from "lucide-react";

const AppointmentTable = ({ data, onView, onReschedule }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Patient Patient</th>
              <th className="px-6 py-4">Physician</th>
              <th className="px-6 py-4">Day</th>
              <th className="px-6 py-4">Time Slot</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {a.patient}
                </td>

                <td className="px-6 py-4 text-slate-600 font-medium">{"Dr. " + a.doctorName.replace("Dr. ", "")}</td>

                <td className="px-6 py-4 text-slate-500 font-medium">{a.day}</td>

                <td className="px-6 py-4 text-blue-600 font-semibold text-sm">{a.slot}</td>

                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide border ${a.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {a.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button
                      title="View Details"
                      onClick={() => onView(a)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      title="Reschedule"
                      onClick={() => onReschedule(a)}
                      className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-md transition-colors"
                    >
                      <CalendarClock className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AppointmentTable;