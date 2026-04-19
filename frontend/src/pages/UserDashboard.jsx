// ============================================================
// FILE: src/pages/UserDashboard.jsx
// ACTION: REPLACE your existing UserDashboard.jsx with this
// ============================================================

import React from "react";
import { Routes, Route } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

import DashboardHome from "./DashboardHome";
import Colleges from "./sections/Colleges";
import Webinars from "./sections/Webinars";
import Workshops from "./sections/Workshops";
import Hackathons from "./sections/Hackathons";
import Support from "./sections/Support";

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">

      {/* SIDEBAR — always visible inside dashboard */}
      <UserSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 px-8 py-8 overflow-auto">
        <Routes>
          <Route index                  element={<DashboardHome />} />
          <Route path="colleges"        element={<Colleges />} />
          <Route path="hackathons"      element={<Hackathons />} />
          <Route path="workshops"       element={<Workshops />} />
          <Route path="webinars"        element={<Webinars />} />
          <Route path="support"         element={<Support />} />
        </Routes>
      </div>

    </div>
  );
}