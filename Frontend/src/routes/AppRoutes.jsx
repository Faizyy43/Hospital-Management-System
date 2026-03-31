import { Routes, Route } from "react-router-dom";

// Layouts
import Layout from "../Context/Layout/Layout";

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔹 Public Routes (NO sidebar) */}
      <Route path="/" element={<Home />} />

      {/* Main Portal */}
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

      {/* Hospital Admin */}
      <Route
        path="/hadmin"
        element={
          <PrivateRoute role="hospital">
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Hdashboard />} />

        {/* 🔹 Admin Routes (WITH sidebar) */}
        <Route path="/hadmin/patients" element={<Patients />} />
        <Route path="/hadmin/appointments" element={<Happointments />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
