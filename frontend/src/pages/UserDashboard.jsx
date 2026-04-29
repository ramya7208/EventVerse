// ============================================================
// FILE: src/pages/UserDashboard.jsx
// ACTION: REPLACE existing UserDashboard.jsx
// ============================================================
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

import DashboardHome from "./DashboardHome";
import Colleges      from "./sections/Colleges";
import Hackathons    from "./sections/Hackathons";
import Workshops     from "./sections/Workshops";
import Webinars      from "./sections/Webinars";
import Support       from "./sections/Support";
import Trending      from "./sections/Trending";
import Saved         from "./sections/Saved";
import Following     from "./sections/Following";
import Badges        from "./sections/Badges";
import Points        from "./sections/Points";

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <UserSidebar />
      <div className="flex-1 px-8 py-8 overflow-auto">
        <Routes>
          <Route index             element={<DashboardHome />} />
          <Route path="colleges"   element={<Colleges />}     />
          <Route path="hackathons" element={<Hackathons />}   />
          <Route path="workshops"  element={<Workshops />}    />
          <Route path="webinars"   element={<Webinars />}     />
          <Route path="support"    element={<Support />}      />
          <Route path="trending"   element={<Trending />}     />
          <Route path="saved"      element={<Saved />}        />
          <Route path="following"  element={<Following />}    />
          <Route path="badges"     element={<Badges />}       />
          <Route path="points"     element={<Points />}       />
        </Routes>
      </div>
    </div>
  );
}