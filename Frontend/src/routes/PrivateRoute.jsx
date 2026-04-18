import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based protection
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}