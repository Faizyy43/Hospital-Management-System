import { useEffect, useState } from "react";
import DoctorTable from "../components/doctors/DoctorTable";
import DoctorForm from "../components/doctors/DoctorForm";
import DoctorModal from "../components/doctors/DoctorModal";
import PageHeader from "../../../Layout/PageHeader";
import { readHospitalStorage, writeHospitalStorage } from "../utils/storage";
import { syncHospitalSnapshot } from "../services/hospitalSnapshotService";

const Doctors = () => {
  const [doctors, setDoctors] = useState(() => readHospitalStorage("doctors"));

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDeleteDoctor = (doctorId) => {
    setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== doctorId));

    if (selectedDoctor?.id === doctorId) {
      setSelectedDoctor(null);
    }
  };

  useEffect(() => {
    writeHospitalStorage("doctors", doctors);
    syncHospitalSnapshot().catch(() => {});
  }, [doctors]);

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
        onDelete={handleDeleteDoctor}
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
