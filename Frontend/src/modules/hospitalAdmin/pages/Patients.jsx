import { useState } from "react";
import PatientTable from "../components/patients/PatientTable";
import EditPatientModal from "../components/patients/EditPatientModal";
import PageHeader from "../../../Layout/PageHeader";
import { Search } from "lucide-react";

const Patients = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 30, disease: "Flu" },
    { id: 2, name: "Sarah Khan", age: 25, disease: "Fever" },
  ]);

  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePatient = (updated) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingPatient(null);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Directory"
        subtitle="View and search registered patients"
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-blue-500 focus:border-blue-500 
                       text-slate-900 transition-colors focus:bg-white placeholder-slate-400"
            placeholder="Search patient by name or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <PatientTable
        patients={filteredPatients}
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