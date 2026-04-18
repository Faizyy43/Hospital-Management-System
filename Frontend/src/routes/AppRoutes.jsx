import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../modules/masterAdmin/auth/pages/Login";
import Dashboard from "../modules/masterAdmin/dashboard/pages/Dashboard";
import HospitalList from "../modules/masterAdmin/hospitals/pages/HospitalList";
import Analytics from "../modules/masterAdmin/analytics/pages/Analytics";

// Layout
import AdminLayout from "../Layout/AdminLayout";
import HospitalDetail from "../modules/masterAdmin/hospitals/components/HospitalDetail";
import PatientDetail from "../modules/masterAdmin/hospitals/components/PatientDetail";
import RequestList from "../modules/masterAdmin/approvals/pages/RequestList";
import RequestDetails from "../modules/masterAdmin/approvals/components/RequestDetails";

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
        <Route path="hospitals/:id" element={<HospitalDetail />} />
        <Route path="patients/:id" element={<PatientDetail />} />
        <Route path="requests" element={<RequestList />} />
        <Route path="requests/:id" element={<RequestDetails/> }/>
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AppRoutes;