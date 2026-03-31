import { useState } from "react";
import DoctorTable from "../components/doctors/DoctorTable";
import DoctorForm from "../components/doctors/DoctorForm";
import DoctorModal from "../components/doctors/DoctorModal";
import PageHeader from "../../../Layout/PageHeader";

const Doctors = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Smith",
      speciality: "Cardiology",
      experience: 10,
      status: "Active",
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="space-y-6">

      <PageHeader
  title="Doctor Management"
  subtitle="Manage doctors and their availability"
/>

      <DoctorForm setDoctors={setDoctors} doctors={doctors} />

      <DoctorTable
        data={doctors}
        onEdit={setSelectedDoctor}
      />

      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        setDoctors={setDoctors}
        doctors={doctors}
      />

    </div>
  );
};

export default Doctors;