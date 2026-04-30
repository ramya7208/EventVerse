// ============================================================
// FILE: src/pages/Register.jsx
// ACTION: REPLACE existing Register.jsx
// CASE 11: Register now works as a proper new page
// CASE 8: Premium UI design
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    college: "", branch: "", year: "", phone: "", role: "student",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim())     e.name     = "Full name is required";
    if (!form.email.trim())    e.email    = "Email is required";
    if (!form.password)        e.password = "Password is required";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.college.trim()) e.college = "College name is required";
    if (!form.branch.trim())  e.branch  = "Branch is required";
    if (!form.year)           e.year    = "Year is required";
    if (!form.phone.trim())   e.phone   = "Phone is required";
    return e;
  };

  const nextStep = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStep(2);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
      }
    );

    console.log("REGISTER SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);

    alert("Registered successfully ✅");
    navigate("/login");

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Registration failed");
  }
};

  const inputClass = "w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition";

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Welcome to EventVerse!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Taking you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950 transition-colors duration-200">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 50%, #4f46e5 100%)" }}>

        {/* Decorative */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #93c5fd, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #a5b4fc, transparent)", transform: "translate(-20%, 20%)" }} />

        <div className="relative">
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-16">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="white" fillOpacity="0.15"/>
              <text x="6" y="29" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" fill="white" letterSpacing="-1">EV</text>
              <rect x="6" y="31" width="28" height="2.5" rx="1.25" fill="white" fillOpacity="0.5"/>
            </svg>
            <span className="text-white text-xl font-black">EventVerse</span>
          </div>

          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Join thousands of<br />students already<br />on EventVerse
          </h2>
          <p className="text-blue-200 text-base leading-relaxed mb-10">
            Discover hackathons, workshops and events from top colleges near you. Never miss an opportunity again.
          </p>

          {/* FEATURE LIST */}
          {["Free to join, always", "Events from 8+ colleges", "One-click registration", "Rate and review events"].map((f) => (
            <div key={f} className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-blue-100 text-sm">{f}</span>
            </div>
          ))}
        </div>

        <p className="relative text-blue-300 text-xs">© 2026 EventVerse · Made for students</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-8 py-12">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Create your account</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have one?{" "}
              <span onClick={() => navigate("/login")} className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                Sign in
              </span>
            </p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="flex gap-2 mb-6">
            {[["student","🎓","Student"],["collegeadmin","🏫","College Admin"]].map(([val, icon, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setForm({...form, role: val})}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  form.role === val
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 ${s === step ? "opacity-100" : s < step ? "opacity-100" : "opacity-40"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step ? "bg-green-500 text-white" : s === step ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  }`}>
                    {s < step ? "✓" : s}
                  </div>
                  <span className={`text-xs font-semibold ${s === step ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                    {s === 1 ? "Account" : "Details"}
                  </span>
                </div>
                {s < 2 && <div className={`flex-1 h-px ${step > 1 ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Full Name</label>
                <input name="name" placeholder="Ramya Sri Bojja" value={form.name} onChange={handleChange} className={inputClass} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">College Email</label>
                <input name="email" type="email" placeholder="you@iith.ac.in" value={form.email} onChange={handleChange} className={inputClass} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Password</label>
                <input name="password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={handleChange} className={inputClass} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Confirm Password</label>
                <input name="confirmPassword" type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={handleChange} className={inputClass} />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
              <button onClick={nextStep} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] mt-2">
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">College Name</label>
                <input name="college" placeholder="IIT Hyderabad" value={form.college} onChange={handleChange} className={inputClass} />
                {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Branch</label>
                  <input name="branch" placeholder="CSE" value={form.branch} onChange={handleChange} className={inputClass} />
                  {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Year</label>
                  <select name="year" value={form.year} onChange={handleChange} className={inputClass}>
                    <option value="">Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                  {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Phone Number</label>
                <input name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className={inputClass} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:border-gray-300 transition">
                  ← Back
                </button>
                <button type="submit"
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Create account 🎉
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}