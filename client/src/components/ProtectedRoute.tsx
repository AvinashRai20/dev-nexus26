import { Navigate, Outlet } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
  adminOnly?: boolean;
  children?: ReactNode;
}

const ProtectedRoute = ({ adminOnly = false, children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
