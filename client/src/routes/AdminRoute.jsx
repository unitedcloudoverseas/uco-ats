import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const employee = JSON.parse(
    localStorage.getItem("employee")
  );

  if (employee?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;