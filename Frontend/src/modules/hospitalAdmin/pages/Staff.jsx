import { useState } from "react";
import { motion } from "framer-motion";
import StaffTabs from "../components/staff/StaffTabs";
import NurseForm from "../components/staff/NurseForm";
import ReceptionistForm from "../components/staff/ReceptionistForm";
import TechnicianForm from "../components/staff/TechnicianForm";
import PharmacistForm from "../components/staff/PharmacistForm";
import AdminForm from "../components/staff/AdminForm";
import StaffTable from "../components/staff/StaffTable";
import PageHeader from "../../../Layout/PageHeader";
import { Users } from "lucide-react";

const Staff = () => {
  const [activeRole, setActiveRole] = useState("Nurse");

  const [staffList, setStaffList] = useState([]);

  const handleAddStaff = (newStaff) => {
    setStaffList([...staffList, { ...newStaff, role: activeRole, id: Date.now() }]);
  };

  const filteredStaff = staffList.filter(s => s.role === activeRole);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-8"
    >
      <PageHeader
        title="Staff Management"
        subtitle="Manage hospital staff roles, permissions, and assignments"
      />

      {/* Tabs */}
      <StaffTabs active={activeRole} setActive={setActiveRole} />

      <div className="flex flex-col gap-8">
        {/* Dynamic Form Area */}
        <div className="w-full">
          {activeRole === "Nurse" && <NurseForm onAdd={handleAddStaff} />}
          {activeRole === "Receptionist" && <ReceptionistForm onAdd={handleAddStaff} />}
          {activeRole === "Technician" && <TechnicianForm onAdd={handleAddStaff} />}
          {activeRole === "Pharmacist" && <PharmacistForm onAdd={handleAddStaff} />}
          {activeRole === "Admin" && <AdminForm onAdd={handleAddStaff} />}
        </div>

        {/* Staff List Area */}
        <div className="w-full">
          <StaffTable role={activeRole} data={filteredStaff} />
        </div>
      </div>
    </motion.div>
  );
};

export default Staff;