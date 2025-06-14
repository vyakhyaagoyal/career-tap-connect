
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
