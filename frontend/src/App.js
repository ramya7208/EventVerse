import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import EventDetails from "./pages/EventDetails";

// Sections
import Colleges from "./pages/sections/Colleges";
import Hackathons from "./pages/sections/Hackathons";
import Workshops from "./pages/sections/Workshops";
import Webinars from "./pages/sections/Webinars";
import Support from "./pages/sections/Support";

// Details Page
import CollegeDetails from "./pages/CollegeDetails";

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* 🔥 FIXED ORDER */}
        <Route path="/colleges/:id" element={<CollegeDetails />} />
        <Route path="/colleges" element={<Colleges />} />

        {/* Other Sections */}
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/support" element={<Support />} />

        {/* Event Details */}
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;