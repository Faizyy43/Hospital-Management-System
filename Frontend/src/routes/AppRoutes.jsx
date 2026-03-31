import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Dashboard from "../modules/hospitalAdmin/pages/Dashboard";
import Patients from "../modules/hospitalAdmin/pages/Patients";
import Appointments from "../modules/hospitalAdmin/pages/Appointments";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;