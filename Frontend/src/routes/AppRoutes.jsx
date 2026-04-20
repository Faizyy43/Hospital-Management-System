import { Routes, Route, Outlet, Navigate } from "react-router-dom";


// Pages
import MLogin from "../modules/masterAdmin/auth/pages/Login";
import Dashboard from "../modules/masterAdmin/dashboard/pages/Dashboard";
import HospitalList from "../modules/masterAdmin/hospitals/pages/HospitalList";

// Layout
import AdminLayout from "../Layout/AdminLayout";
import HospitalDetail from "../modules/masterAdmin/hospitals/components/HospitalDetail";
import PatientDetail from "../modules/masterAdmin/hospitals/components/PatientDetail";
import RequestList from "../modules/masterAdmin/approvals/pages/RequestList";
import RequestDetails from "../modules/masterAdmin/approvals/components/RequestDetails";

// Layouts
import Layout from "../Layout/AdminLayout";
import Navbar from "../modules/Patient/components/Navbar";

// Pages
import Patients from "../modules/hospitalAdmin/pages/Patients";
import Appointments from "../modules/Patient/pages/Appointments";
import Home from "../modules/Patient/pages/Home";
import Hospitals from "../modules/Patient/pages/Hospitals";
import Favourites from "../modules/Patient/pages/Favourites";
import Happointments from "../modules/hospitalAdmin/pages/Happointments";
import Login from "../modules/Patient/pages/Login";
import Register from "../modules/Patient/pages/Register";
import Hdashboard from "../modules/hospitalAdmin/pages/Hdashboard";
import PatientDashboard from "../modules/Patient/pages/PatientDashboard";
import PrivateRoute from "./PrivateRoute";
import RegisterForm from "../modules/Patient/pages/RegisterForm";
import Doctors from "../modules/hospitalAdmin/pages/Doctors";
import Staff from "../modules/hospitalAdmin/pages/Staff";
import OPD from "../modules/hospitalAdmin/pages/OPD";
import Footer from "../modules/Patient/components/Footer";

// 🔥 INLINE NAVBAR LAYOUT
const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ PAGES WITH NAVBAR */}
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>

      {/* Public Master Admin Login */}
      <Route path="/admin/login" element={<MLogin />} />

      {/* Proper nested layout */}
      <Route path="/admin" element={
        <PrivateRoute role="admin">
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hospitals" element={<HospitalList />} />
        <Route path="hospitals/:id" element={<HospitalDetail />} />
        <Route path="patients/:id" element={<PatientDetail />} />
        <Route path="requests" element={<RequestList />} />
        <Route path="requests/:id" element={<RequestDetails />} />
      </Route>

      {/* ❌ NO NAVBAR - STANDALONE LAYOUTS */}
      <Route
        path="/patient-dashboard"
        element={
          <PrivateRoute role="patient">
            <PatientDashboard />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/:role" element={<RegisterForm />} />

      {/* 🏥 ADMIN */}
      <Route
        path="/hadmin"
        element={
          <PrivateRoute role="hospital">
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Hdashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="happointments" element={<Happointments />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="staff" element={<Staff />} />
        <Route path="opd" element={<OPD />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AppRoutes;
