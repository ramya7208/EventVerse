// ============================================================
// FILE: src/App.js
// ACTION: REPLACE existing App.js
// AUTH FIX: All private pages wrapped with ProtectedRoute
// ============================================================
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar            from "./components/Navbar";
import ProtectedRoute    from "./components/ProtectedRoute";

import Home                  from "./pages/Home";
import Login                 from "./pages/Login";
import Register              from "./pages/Register";
import UserDashboard         from "./pages/UserDashboard";
import EventPage             from "./pages/EventPage";
import EventRegistrationPage from "./pages/EventRegistrationPage";
import CollegeDetails        from "./pages/CollegeDetails";
import UserProfile           from "./pages/UserProfile";
import CollegeAdminDashboard from "./pages/CollegeAdminDashboard";
import SuperAdminDashboard   from "./pages/SuperAdminDashboard";
import SuperAdminEventApproval from "./pages/SuperAdminEventApproval";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
        <Routes>

          {/* ── PUBLIC ROUTES — no login needed ── */}
          <Route path="/"       element={<Home />}     />
          <Route path="/login"  element={<Login />}    />
          <Route path="/register" element={<Register />} />

          {/* ── SEMI-PUBLIC — viewable but register needs login ── */}
          <Route path="/event/:id"    element={<EventPage />} />
          <Route path="/college/:id"  element={<CollegeDetails />} />

          {/* ── PROTECTED — must be logged in ── */}
          <Route path="/register-event/:id" element={
            <ProtectedRoute>
              <EventRegistrationPage />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />

          {/* ── ADMIN ONLY ── */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="collegeadmin">
              <CollegeAdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/super-admin" element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/super-admin/approvals" element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperAdminEventApproval />
            </ProtectedRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;