// ============================================================
// FILE: src/pages/Login.jsx
// ACTION: REPLACE existing Login.jsx
// FIX POINT 2: 3 role tabs — Student, College Admin, Super Admin
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLES = [
  { key: "student",      label: "Student",       icon: "🎓" },
  { key: "collegeadmin", label: "College Admin",  icon: "🏫" },
  { key: "superadmin",   label: "Super Admin",    icon: "⚙️"  },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    // TODO: replace with real API call
    localStorage.setItem("user", JSON.stringify({ ...formData, role, name: formData.email.split("@")[0] }));
    navigate("/dashboard");
  };*/
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ store token
      localStorage.setItem("token", data.token);

      // ✅ store user (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ navigate
      navigate("/dashboard");

    } else {
      setError(data.message);
    }

  } catch (err) {
    console.log(err);
    setError("Something went wrong");
  }
};

  const roleColors = {
    student:      { active: "bg-blue-600 text-white",   ring: "focus:ring-blue-500",   btn: "bg-blue-600 hover:bg-blue-700",   left: "from-blue-600 to-indigo-700"   },
    collegeadmin: { active: "bg-green-600 text-white",  ring: "focus:ring-green-500",  btn: "bg-green-600 hover:bg-green-700", left: "from-green-600 to-teal-700"   },
    superadmin:   { active: "bg-purple-600 text-white", ring: "focus:ring-purple-500", btn: "bg-purple-600 hover:bg-purple-700", left: "from-purple-700 to-indigo-800" },
  };
  const c = roleColors[role];

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950 transition-colors duration-200">

      {/* LEFT PANEL */}
      <div className={`hidden md:flex w-1/2 bg-gradient-to-br ${c.left} text-white flex-col justify-center px-16 transition-all duration-500`}>
        <div className="mb-8">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6">
            {ROLES.find(r => r.key === role)?.icon}
          </div>
          <h1 className="text-5xl font-bold mb-4">EventVerse</h1>
          <p className="text-lg opacity-90 mb-6">
            {role === "student"      && "Discover and register for events across top colleges."}
            {role === "collegeadmin" && "Post and manage your college's events on EventVerse."}
            {role === "superadmin"   && "Oversee the entire EventVerse platform and approvals."}
          </p>
          <ul className="text-sm opacity-80 space-y-2">
            <li>✔ Hackathons & Coding Contests</li>
            <li>✔ Workshops & Webinars</li>
            <li>✔ Events from Multiple Colleges</li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-[400px] border border-gray-100 dark:border-gray-700">

          {/* LOGO */}
          <h2 className="text-2xl font-bold text-center mb-6">
            <span className="text-blue-600">Event</span>
            <span className="text-gray-800 dark:text-white">Verse</span>
          </h2>

          {/* ROLE TABS */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6 gap-1">
            {ROLES.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`flex-1 text-xs py-2 rounded-lg font-medium transition-all ${
                  role === r.key
                    ? c.active
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-5">
            Sign in as <span className="font-medium text-gray-700 dark:text-gray-200">{ROLES.find(r => r.key === role)?.label}</span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder={role === "student" ? "College email (e.g. you@iith.ac.in)" : "Admin email"}
              onChange={handleChange}
              className={`w-full mb-4 p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${c.ring} text-sm`}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={`w-full mb-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${c.ring} text-sm`}
            />

            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

            <button className={`w-full ${c.btn} text-white py-3 rounded-xl font-semibold transition mt-3 text-sm`}>
              Login as {ROLES.find(r => r.key === role)?.label}
            </button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-5 text-center">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="text-blue-600 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}