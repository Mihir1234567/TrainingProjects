import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // Or a loading spinner

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
