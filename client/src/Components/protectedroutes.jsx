import { useAuth } from "./authcontext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
