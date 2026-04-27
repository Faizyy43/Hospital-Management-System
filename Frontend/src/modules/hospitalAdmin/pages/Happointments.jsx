import { useEffect, useState } from "react";
import AppointmentTable from "../components/appointments/AppointmentTable";
import AppointmentFilter from "../components/appointments/AppointmentFilters";
import RescheduleModal from "../components/appointments/RescheduleModal";
import AppointmentDetailsModal from "../components/appointments/AppointmentDetailsModal";
import AppointmentBooking from "../components/appointments/AppointmentBooking";
import PageHeader from "../../../Layout/PageHeader";
import { hydrateHospitalStorage, readHospitalStorage, writeHospitalStorage } from "../utils/storage";
import { getCurrentHospital } from "../services/currentHospitalService";
import { syncHospitalSnapshot } from "../services/hospitalSnapshotService";

const Happointments = () => {
  const [appointments, setAppointments] = useState(() => readHospitalStorage("appointments"));
  const [doctors, setDoctors] = useState(() => readHospitalStorage("doctors"));
  const [selected, setSelected] = useState(null);
  const [reschedule, setReschedule] = useState(null);
  const [notes, setNotes] = useState({
    diagnosis: "",
    prescription: "",
    followUp: "",
  });

  useEffect(() => {
    writeHospitalStorage("appointments", appointments);
    syncHospitalSnapshot().catch(() => {});
  }, [appointments]);

  useEffect(() => {
    setDoctors(readHospitalStorage("doctors"));
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadHospitalAppointments = async () => {
      try {
        const hospital = await getCurrentHospital();
        hydrateHospitalStorage(hospital);

        if (isMounted) {
          setAppointments(hospital.appointments || []);
          setDoctors(hospital.doctors || []);
        }
      } catch {
        // Use local fallback if backend load fails.
      }
    };

    loadHospitalAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointment Management"
        subtitle="Manage patient bookings and schedules"
      />

      <AppointmentBooking
        doctors={doctors}
        appointments={appointments}
        setAppointments={setAppointments}
      />

      <AppointmentFilter />

      <AppointmentTable
        data={appointments}
        onView={setSelected}
        onReschedule={setReschedule}
      />

      <RescheduleModal
        data={reschedule}
        onClose={() => setReschedule(null)}
      />

      <AppointmentDetailsModal
        appointment={selected}
        notes={notes}
        setNotes={setNotes}
        onClose={() => setSelected(null)}
        onComplete={() => {
          setAppointments(appointments.map((appointment) =>
            appointment.id === selected.id
              ? { ...appointment, status: "Completed", notes }
              : appointment
          ));
          setSelected(null);
        }}
      />
    </div>
  );
};

export default Happointments;
