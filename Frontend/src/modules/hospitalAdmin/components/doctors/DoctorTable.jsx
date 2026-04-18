import { motion } from "framer-motion";

const DoctorTable = ({ data, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-sm"
    >
      <table className="w-full text-sm">

        <thead className="text-gray-400 text-xs uppercase">
          <tr>
            <th className="py-3 text-left">Doctor</th>
            <th className="text-left">Speciality</th>
            <th>Exp</th>
            <th>Status</th>
            <th>Days</th>
            <th>Time</th>
            <th>Slot</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d.id} className="border-t border-gray-100 hover:bg-blue-50/40">

              <td className="py-4 font-medium text-gray-700">
                {d.name}
              </td>

              <td>{d.speciality}</td>

              <td>{d.experience} yrs</td>
              

              {/* STATUS */}
              <td>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {d.status}
                </span>
              </td>

              {/* DAYS */}
              <td className="text-xs text-gray-500">
                {d.schedule?.days?.join(", ") || "-"}
              </td>

              {/* TIME */}
              <td className="text-xs text-gray-500">
                {d.schedule?.startTime && d.schedule?.endTime
                  ? `${d.schedule.startTime} - ${d.schedule.endTime}`
                  : "-"}
              </td>

              {/* SLOT */}
              <td className="text-xs text-gray-500">
                {d.schedule?.slotDuration
                  ? `${d.schedule.slotDuration} min`
                  : "-"}
              </td>
              <td className="text-xs text-blue-600">
  {d.slots?.slice(0, 3).join(", ")}
  {d.slots?.length > 3 && " ..."}
</td>

              <td>
                <button
                  onClick={() => onEdit(d)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </motion.div>
  );
};

export default DoctorTable;