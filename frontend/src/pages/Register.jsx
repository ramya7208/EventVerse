// ============================================================
// FILE: src/pages/Register.jsx
// ACTION: REPLACE existing Register.jsx
// FIX: Works without backend — saves user to localStorage
//      When backend is ready, just swap the handleSubmit section
// ============================================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate    = useNavigate();
  const [step, setStep]     = useState(1);
  const [done, setDone]     = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm]     = useState({
    name: "", email: "", password: "", confirmPassword: "",
    college: "", branch: "", year: "", phone: "", role: "student",
  });

  // Clear any old user data on mount
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password)     e.password = "Password is required";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
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
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // ── OPTION A: localStorage only (no backend needed) ──────
    // Saves user to localStorage and navigates to dashboard
    const userData = {
      name:    form.name,
      email:   form.email,
      college: form.college,
      branch:  form.branch,
      year:    form.year,
      phone:   form.phone,
      role:    form.role,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    // Also save to a "registered users" list so login can verify
    const existingUsers = JSON.parse(localStorage.getItem("ev_users") || "[]");
    const alreadyExists = existingUsers.find(u => u.email === form.email);
    if (!alreadyExists) {
      existingUsers.push({ ...userData, password: form.password });
      localStorage.setItem("ev_users", JSON.stringify(existingUsers));
    }

    setDone(true);
    setTimeout(() => {
      if (form.role === "collegeadmin") navigate("/admin");
      else navigate("/dashboard");
    }, 1800);

    // ── OPTION B: With backend (uncomment when backend is ready) ──
    // try {
    //   const res = await fetch("http://localhost:5000/api/auth/register", {
    //     method:  "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body:    JSON.stringify({
    //       name:     form.name,
    //       email:    form.email,
    //       password: form.password,
    //     }),
    //   });
    //   const data = await res.json();
    //   if (!res.ok) { setErrors({ email: data.message }); return; }
    //   localStorage.setItem("user", JSON.stringify({ name: form.name, email: form.email, role: form.role }));
    //   setDone(true);
    //   setTimeout(() => navigate("/dashboard"), 1800);
    // } catch (err) {
    //   setErrors({ email: "Cannot connect to server. Is backend running?" });
    // }
  };

  const inp = "w-full p-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition";

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Welcome to EventVerse!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Account created! Taking you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950 transition-colors duration-200">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 50%, #4f46e5 100%)" }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background:"radial-gradient(circle,#93c5fd,transparent)", transform:"translate(30%,-30%)" }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="16" fill="white" fillOpacity="0.15"/>
              <path d="M14 20h10M14 28h8M14 36h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 20l6 16 6-16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="38" cy="32" r="1.5" fill="#93C5FD"/>
            </svg>
            <span className="text-white text-xl font-black">EventVerse</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Join thousands of<br />students on<br />EventVerse
          </h2>
          <p className="text-blue-200 text-base leading-relaxed mb-8">
            Discover hackathons, workshops and events from top colleges near you.
          </p>
          {["Free to join, always","Events from 8+ colleges","One-click registration","Earn points & badges"].map(f => (
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
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Create your account</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have one?{" "}
              <span onClick={() => navigate("/login")}
                className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                Sign in
              </span>
            </p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="flex gap-2 mb-6">
            {[["student","🎓","Student"],["collegeadmin","🏫","College Admin"]].map(([val,icon,label]) => (
              <button key={val} type="button" onClick={() => setForm({...form, role: val})}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  form.role === val
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300"
                }`}>
                <span>{icon}</span>{label}
              </button>
            ))}
          </div>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 mb-8">
            {[1,2].map(s => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 ${s <= step ? "opacity-100" : "opacity-40"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s < step  ? "bg-green-500 text-white" :
                    s === step ? "bg-blue-600 text-white"  :
                    "bg-gray-200 dark:bg-gray-700 text-gray-500"
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
                <input name="name" autoComplete="off" placeholder="Ramya Sri Bojja"
                  value={form.name} onChange={handleChange} className={inp} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">College Email</label>
                <input name="email" type="email" autoComplete="off" placeholder="you@iith.ac.in"
                  value={form.email} onChange={handleChange} className={inp} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Password</label>
                <input name="password" type="password" autoComplete="new-password" placeholder="Min. 8 characters"
                  value={form.password} onChange={handleChange} className={inp} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Confirm Password</label>
                <input name="confirmPassword" type="password" autoComplete="new-password" placeholder="Repeat your password"
                  value={form.confirmPassword} onChange={handleChange} className={inp} />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
              <button onClick={nextStep}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition hover:scale-[1.02] mt-2">
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">College Name</label>
                <input name="college" autoComplete="off" placeholder="IIT Hyderabad"
                  value={form.college} onChange={handleChange} className={inp} />
                {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Branch</label>
                  <input name="branch" autoComplete="off" placeholder="CSE"
                    value={form.branch} onChange={handleChange} className={inp} />
                  {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Year</label>
                  <select name="year" value={form.year} onChange={handleChange} className={inp}>
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
                <input name="phone" autoComplete="off" placeholder="+91 98765 43210"
                  value={form.phone} onChange={handleChange} className={inp} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-sm hover:border-gray-300 transition">
                  ← Back
                </button>
                <button type="submit"
                  className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition hover:scale-[1.02]">
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