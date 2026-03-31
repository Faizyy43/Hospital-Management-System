import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Dashboard from "../modules/hospitalAdmin/pages/Dashboard";
import Patients from "../modules/hospitalAdmin/pages/Patients";
import Appointments from "../modules/hospitalAdmin/pages/Appointments";
import Doctors from "../modules/hospitalAdmin/pages/Doctors";
import Staff from "../modules/hospitalAdmin/pages/Staff";
import OPD from "../modules/hospitalAdmin/pages/OPD";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="doctors" element={<Doctors />} />

         {/* Hospital Setup */}
        <Route path="staff" element={<Staff />} />
        <Route path="opd" element={<OPD />} />


      </Route>
    </Routes>
  );
};

export default AppRoutes;