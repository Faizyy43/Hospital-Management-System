import { motion } from "framer-motion";

const PatientRow = ({ patient, onEdit, onDelete }) => {
  return (
    <motion.tr
  layout
  initial={{ opacity: 0, y: 4 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -4 }}
  transition={{ duration: 0.18, ease: "easeOut" }}
>
      <td>{patient.name}</td>
      <td>{patient.age}</td>
      <td>{patient.disease}</td>
      <td>
        <button
          onClick={() => onEdit(patient)}
          className="hover:bg-blue-50/50 transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(patient.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </td>
    </motion.tr>
  );
};

export default PatientRow;