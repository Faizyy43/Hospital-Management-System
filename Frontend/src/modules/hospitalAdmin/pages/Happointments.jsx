import { useState } from "react";
import AppointmentTable from "../components/appointments/AppointmentTable";
import AppointmentFilter from "../components/appointments/AppointmentFilters";
import RescheduleModal from "../components/appointments/RescheduleModal";
import AppointmentDetailsModal from "../components/appointments/AppointmentDetailsModal";
import AppointmentBooking from "../components/appointments/AppointmentBooking";
import PageHeader from "../../../Layout/PageHeader";

const Happointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // 🔥 important

  const [selected, setSelected] = useState(null);
  const [reschedule, setReschedule] = useState(null);

  const [notes, setNotes] = useState({
    diagnosis: "",
    prescription: "",
    followUp: "",
  });

  return (
    <div className="space-y-6">

      <PageHeader
  title="Appointment Management"
  subtitle="Manage patient bookings and schedules"
/>

      {/* 🔥 Booking FIRST */}
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

      {/* Modals */}
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
          setAppointments(appointments.map(a =>
            a.id === selected.id
              ? { ...a, status: "Completed", notes }
              : a
          ));
          setSelected(null);
        }}
      />

    </div>
  );
};

export default Happointments;