import { useState } from "react";
import { motion } from "framer-motion";
import StaffTabs from "../components/staff/StaffTabs";
import NurseForm from "../components/staff/NurseForm";
import PageHeader from "../../../Layout/PageHeader";

const Staff = () => {
  const [activeRole, setActiveRole] = useState("Nurse");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-8"
    >

      <div>
        <PageHeader
  title="Staff Management"
  subtitle="Manage hospital staff roles and assignments"
/>
        <p className="text-sm text-gray-400">
          Manage hospital staff roles and assignments
        </p>
      </div>

      {/* Tabs */}
      <StaffTabs active={activeRole} setActive={setActiveRole} />

      {/* Dynamic Form */}
      {activeRole === "Nurse" && <NurseForm />}
      {activeRole === "Receptionist" && <div className="p-5 bg-white rounded-xl">Receptionist Form Coming Soon</div>}
      {activeRole === "Technician" && <div className="p-5 bg-white rounded-xl">Technician Form Coming Soon</div>}
      {activeRole === "Pharmacist" && <div className="p-5 bg-white rounded-xl">Pharmacist Form Coming Soon</div>}
      {activeRole === "Admin" && <div className="p-5 bg-white rounded-xl">Admin Form Coming Soon</div>}

      {/* Staff List */}
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200/60 rounded-2xl p-6">
        <h2 className="text-md font-semibold text-gray-800 mb-3">
          Staff List
        </h2>

        <div className="text-center text-sm text-gray-400 py-10">
          No staff added yet
        </div>
      </div>

    </motion.div>
  );
};

export default Staff;