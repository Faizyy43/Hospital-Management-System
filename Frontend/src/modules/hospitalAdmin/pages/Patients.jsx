import { useState } from "react";
import PatientForm from "../components/patients/PatientForm";
import PatientTable from "../components/patients/PatientTable";
import EditPatientModal from "../components/patients/EditPatientModal";
import PageHeader from "../../../Layout/PageHeader";

const Patients = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 30, disease: "Flu" },
    { id: 2, name: "Sarah Khan", age: 25, disease: "Fever" },
  ]);

  const [editingPatient, setEditingPatient] = useState(null);

  const addPatient = (form) => {
    if (!form.name) return;

    const newPatient = {
      id: Date.now(),
      ...form,
    };

    setPatients((prev) => [...prev, newPatient]);
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePatient = (updated) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingPatient(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
  title="Patient Management"
  subtitle="Manage patient records and information"
/>

      <PatientForm onAdd={addPatient} />

      <PatientTable
        patients={patients}
        onEdit={setEditingPatient}
        onDelete={deletePatient}
      />

      <EditPatientModal
        patient={editingPatient}
        onClose={() => setEditingPatient(null)}
        onSave={updatePatient}
      />
    </div>
  );
};

export default Patients;