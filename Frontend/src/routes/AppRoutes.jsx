import { Routes, Route, Outlet } from "react-router-dom";

// Layouts
import Layout from "../Layout/Layout";
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

// 🔥 INLINE NAVBAR LAYOUT
const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
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

      {/* ❌ NO NAVBAR - STANDALONE LAYOUTS */}
      <Route path="/dashboard" element={<PatientDashboard />} />
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
    </Routes>
  );
};

export default AppRoutes;
