// ============================================================
// FILE: src/App.js
// ACTION: REPLACE existing App.js
// ============================================================
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home                  from "./pages/Home";
import Login                 from "./pages/Login";
import Register              from "./pages/Register";
import UserDashboard         from "./pages/UserDashboard";
import EventPage             from "./pages/EventPage";
import EventRegistrationPage from "./pages/EventRegistrationPage";
import CollegeDetails        from "./pages/CollegeDetails";
import UserProfile           from "./pages/UserProfile";
import CollegeAdminDashboard from "./pages/CollegeAdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
        <Routes>
          <Route path="/"                    element={<Home />}                   />
          <Route path="/login"               element={<Login />}                  />
          <Route path="/register"            element={<Register />}               />
          <Route path="/event/:id"           element={<EventPage />}              />
          <Route path="/register-event/:id"  element={<EventRegistrationPage />}  />
          <Route path="/college/:id"         element={<CollegeDetails />}         />
          <Route path="/admin"               element={<CollegeAdminDashboard />}  />
          <Route path="/dashboard/profile"   element={<UserProfile />}            />
          <Route path="/dashboard/*"         element={<UserDashboard />}          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;