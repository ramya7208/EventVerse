// ============================================================
// FILE: src/components/ProtectedRoute.jsx
// ACTION: CREATE NEW FILE inside src/components/
// Blocks access to dashboard/profile/admin without login
// ============================================================
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const user     = JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();

  // Not logged in → redirect to login, remember where they were going
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Role check (for admin pages)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}