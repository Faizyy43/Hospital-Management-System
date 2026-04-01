import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role-based protection
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}