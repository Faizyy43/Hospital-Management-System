import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../modules/masterAdmin/auth/pages/Login";
import Dashboard from "../modules/masterAdmin/dashboard/pages/Dashboard";
import HospitalList from "../modules/masterAdmin/hospitals/pages/HospitalList";
import ApprovalList from "../modules/masterAdmin/approvals/pages/ApprovalList";
import Analytics from "../modules/masterAdmin/analytics/pages/Analytics";

// Layout
import AdminLayout from "../Layout/AdminLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/admin/login" element={<Login />} />

      {/* Proper nested layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hospitals" element={<HospitalList />} />
        <Route path="approvals" element={<ApprovalList />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AppRoutes;