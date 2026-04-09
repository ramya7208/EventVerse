import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>

      {/* Navbar */}
      <Navbar />

      {/* Main Content (pushed below navbar) */}
      <div className="pt-20 bg-gray-50 min-h-screen">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/event" element={<EventDetails />} />
        </Routes>

      </div>

    </Router>
  );
}

export default App;