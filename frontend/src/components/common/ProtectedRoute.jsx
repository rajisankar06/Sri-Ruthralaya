import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-temple-cream">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-temple-gold border-t-temple-maroon rounded-full animate-spin"></div>
          <p className="font-cinzel text-temple-maroon tracking-wider text-sm">Loading Sri Ruthralaya Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If student tries to access admin, send to student portal
    if (user.role === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    }
    // If admin tries to access student portal, send to admin portal
    if (user.role === 'admin' || user.role === 'staff') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
