import { motion, AnimatePresence } from "framer-motion";
import PatientRow from "./PatientRow";

const PatientTable = ({ patients, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4">Patient List</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {patients.map((p) => (
              <PatientRow
                key={p.id}
                patient={p}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  );
};

export default PatientTable;