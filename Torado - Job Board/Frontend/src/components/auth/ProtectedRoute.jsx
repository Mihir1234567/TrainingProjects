import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  redirectPath = "/login",
  checkCompletion = true,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // Or a loading spinner

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Admin Check
  const isAdmin =
    user?.role === "admin" || user?.roles?.some((r) => r.name === "admin");

  // If checkCompletion is true, ensure user has completed profile
  // Admins bypass this check
  if (checkCompletion && !user?.isProfileComplete && !isAdmin) {
    return <Navigate to="/complete-profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
