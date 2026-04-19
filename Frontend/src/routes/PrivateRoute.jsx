import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Redirect to appropriate login page based on the route being accessed
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    if (location.pathname.startsWith("/hadmin")) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (location.pathname.startsWith("/patient-dashboard")) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based protection
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}