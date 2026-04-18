<<<<<<< HEAD
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
=======
import { Routes, Route } from "react-router-dom";

// Layouts
import Layout from "../Layout/Layout";

// Pages
import Patients from "../modules/hospitalAdmin/pages/Patients";
import Appointments from "../modules/Patient/pages/Appointments";
import Home from "../modules/Patient/pages/Home";
import Hospitals from "../modules/Patient/pages/Hospitals";
import Happointments from "../modules/hospitalAdmin/pages/Happointments";
import Login from "../modules/Patient/pages/Login";
import Register from "../modules/Patient/pages/Register";
import Hdashboard from "../modules/hospitalAdmin/pages/Hdashboard";
import Dashboard from "../modules/Patient/pages/Dashboard";
import PatientDashboard from "../modules/Patient/pages/PatientDashboard";
import PrivateRoute from "./PrivateRoute";
import RegisterForm from "../modules/Patient/pages/RegisterForm";
import Doctors from "../modules/hospitalAdmin/pages/Doctors";
import Staff from "../modules/hospitalAdmin/pages/Staff";
import OPD from "../modules/hospitalAdmin/pages/OPD";
>>>>>>> df718462ab2fcb28ae5f3d166f47ceab63a22726

const AppRoutes = () => {
  return (
    <Routes>
<<<<<<< HEAD
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
=======
      {/* 🔹 Public Routes (NO sidebar) */}
      <Route path="/" element={<Home />} />
      <Route path="/hospitals" element={<Hospitals />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Auth */}
      <Route path="/register" element={<Register />} />
      <Route path="/register/:role" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />

      {/* Patient */}
      <Route
        path="/patient-dashboard"
        element={
          <PrivateRoute role="patient">
            <PatientDashboard />
          </PrivateRoute>
        }
      />

      {/* 🔥 Hospital Admin (FIXED STRUCTURE) */}
      <Route
        path="/hadmin"
        element={
          <PrivateRoute role="hospital">
            <Layout />
          </PrivateRoute>
        }
      >
        {/* ✅ Default dashboard */}
        <Route index element={<Hdashboard />} />

        {/* ✅ Nested routes (NOW Sidebar + Topbar WILL SHOW) */}
        <Route path="patients" element={<Patients />} />
        <Route path="happointments" element={<Happointments />} />
        <Route path="doctors" element={<Doctors />} />

        {/* Hospital Setup */}
        <Route path="staff" element={<Staff />} />
        <Route path="opd" element={<OPD />} />
>>>>>>> df718462ab2fcb28ae5f3d166f47ceab63a22726
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AppRoutes;
