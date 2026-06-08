// ============================================================
// FILE: src/pages/Login.jsx
// ACTION: REPLACE existing Login.jsx
// FIX: Checks ev_users list (saved during Register) for login
//      No backend needed — works fully with localStorage
// ============================================================
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ROLES = [
  { key: "student",      label: "Student",      icon: "🎓" },
  { key: "collegeadmin", label: "College Admin", icon: "🏫" },
  { key: "superadmin",   label: "Super Admin",   icon: "⚙️"  },
];

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from     = location.state?.from || null;

  const [role, setRole]         = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError]       = useState("");

  // Clear old user on mount
  useEffect(() => {
    localStorage.removeItem("user");
    setFormData({ email: "", password: "" });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // ── CHECK REGISTERED USERS (saved during Register) ────────
    const registeredUsers = JSON.parse(localStorage.getItem("ev_users") || "[]");
    const matchedUser = registeredUsers.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (matchedUser) {
      // ✅ Registered user found — log them in
      localStorage.setItem("user", JSON.stringify({
        name:    matchedUser.name,
        email:   matchedUser.email,
        college: matchedUser.college,
        branch:  matchedUser.branch,
        year:    matchedUser.year,
        role:    matchedUser.role || role,
      }));
    } else {
      // ── DEMO LOGIN: allow login even without registration ────
      // This lets you test without needing to register first
      // Remove this block when backend is connected
      if (formData.email && formData.password.length >= 4) {
        localStorage.setItem("user", JSON.stringify({
          name:  formData.email.split("@")[0],
          email: formData.email,
          role:  role,
        }));
      } else {
        setError("Invalid email or password. Please register first.");
        return;
      }
    }

    // Redirect based on role
    if (from) {
      navigate(from, { replace: true });
    } else if (role === "collegeadmin") {
      navigate("/admin");
    } else if (role === "superadmin") {
      navigate("/superadmin");
    } else {
      navigate("/dashboard");
    }
  };

  const COLORS = {
    student:      { active: "bg-blue-600 text-white",   ring: "focus:ring-blue-500",   btn: "bg-blue-600 hover:bg-blue-700",     left: "from-blue-600 to-indigo-700"   },
    collegeadmin: { active: "bg-green-600 text-white",  ring: "focus:ring-green-500",  btn: "bg-green-600 hover:bg-green-700",   left: "from-green-600 to-teal-700"    },
    superadmin:   { active: "bg-purple-600 text-white", ring: "focus:ring-purple-500", btn: "bg-purple-600 hover:bg-purple-700", left: "from-purple-700 to-indigo-800" },
  };
  const c = COLORS[role];

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950 transition-colors duration-200">

      {/* LEFT PANEL */}
      <div className={`hidden md:flex w-1/2 bg-gradient-to-br ${c.left} text-white flex-col justify-center px-16 transition-all duration-500`}>
        <div>
          <div className="flex items-center gap-3 mb-12">
            <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="16" fill="white" fillOpacity="0.15"/>
              <path d="M14 20h10M14 28h8M14 36h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 20l6 16 6-16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="38" cy="32" r="1.5" fill="#93C5FD"/>
            </svg>
            <span className="text-2xl font-black">EventVerse</span>
          </div>
          <h1 className="text-5xl font-black mb-4 leading-tight">
            {role === "student"      && "Discover events\nnear you"}
            {role === "collegeadmin" && "Manage your\ncollege events"}
            {role === "superadmin"   && "Oversee the\nentire platform"}
          </h1>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            {role === "student"      && "Discover and register for events across top colleges — all in one place."}
            {role === "collegeadmin" && "Post and manage your college's events. Reach students across Hyderabad."}
            {role === "superadmin"   && "Review submissions, manage colleges and oversee EventVerse."}
          </p>
          <ul className="text-sm opacity-80 space-y-2.5">
            {["Hackathons & Coding Contests","Workshops & Webinars","Events from 8+ Colleges"].map(f => (
              <li key={f} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-[400px] border border-gray-100 dark:border-gray-700">

          {/* LOGO */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <svg width="32" height="32" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="16" fill="#2563EB"/>
              <path d="M14 20h10M14 28h8M14 36h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 20l6 16 6-16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="38" cy="32" r="1.5" fill="#93C5FD"/>
            </svg>
            <span className="text-xl font-black">
              <span className="text-blue-600">Event</span>
              <span className="text-gray-800 dark:text-white">Verse</span>
            </span>
          </div>

          {from && (
            <div className="mb-4 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                🔒 Please sign in to access that page.
              </p>
            </div>
          )}

          {/* ROLE TABS */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6 gap-1">
            {ROLES.map(r => (
              <button key={r.key} onClick={() => { setRole(r.key); setError(""); }}
                className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all ${
                  role === r.key ? c.active : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-5">
            Sign in as <span className="font-bold text-gray-700 dark:text-gray-200">{ROLES.find(r => r.key === role)?.label}</span>
          </p>

          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="email" name="email"
              autoComplete="new-email"
              placeholder={role === "student" ? "College email (e.g. you@iith.ac.in)" : "Admin email"}
              value={formData.email}
              onChange={handleChange}
              className={`w-full mb-4 p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${c.ring} text-sm`}
            />
            <input
              type="password" name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full mb-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${c.ring} text-sm`}
            />
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-3">
                <p className="text-red-600 dark:text-red-400 text-xs font-semibold">{error}</p>
              </div>
            )}
            <button className={`w-full ${c.btn} text-white py-3 rounded-xl font-black transition mt-3 text-sm hover:scale-[1.02]`}>
              Login as {ROLES.find(r => r.key === role)?.label}
            </button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-5 text-center">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="text-blue-600 cursor-pointer hover:underline font-semibold">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}