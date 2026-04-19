// ============================================================
// FILE: src/App.js
// ACTION: REPLACE existing App.js
// ADDED: /event/:id route for new EventPage
// ============================================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import EventPage from "./pages/EventPage";
import CollegeDetails from "./pages/CollegeDetails";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
        <Routes>
          <Route path="/"                      element={<Home />} />
          <Route path="/login"                 element={<Login />} />
          <Route path="/register"              element={<Register />} />
          <Route path="/event/:id"             element={<EventPage />} />
          <Route path="/college/:id"           element={<CollegeDetails />} />
          <Route path="/dashboard/profile"     element={<UserProfile />} />
          <Route path="/dashboard/*"           element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// ============================================================
// FILE: src/components/Navbar.js
// ACTION: REPLACE existing Navbar.js
// CASE 6: New bold EV monogram SVG logo
// ============================================================

// Copy the Navbar code from FIX46_src-components_Navbar.js
// (already generated previously — only the logo SVG changes below)
// Replace the EventVerseLogo function with this:

/*
function EventVerseLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="38" rx="11" fill="#2563EB"/>
      <text x="5" y="27" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="white" letterSpacing="-1">EV</text>
      <rect x="5" y="29" width="28" height="2.5" rx="1.25" fill="#93C5FD"/>
    </svg>
  );
}
*/