// ============================================================
// FILE: src/pages/EventDetails.jsx
// ACTION: REPLACE existing EventDetails.jsx
// FIX POINT 3: Dynamic registration form with all fields
// ============================================================

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DOMAIN_STYLES = {
  hackathon: { badge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",     btn: "bg-red-500 hover:bg-red-600",       ring: "focus:ring-red-400",    accent: "border-red-400" },
  webinar:   { badge: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300", btn: "bg-teal-600 hover:bg-teal-700",     ring: "focus:ring-teal-400",   accent: "border-teal-400" },
  workshop:  { badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300", btn: "bg-purple-600 hover:bg-purple-700", ring: "focus:ring-purple-400", accent: "border-purple-400" },
};

export default function EventDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", rollNo: "", email: "", phone: "", collegeName: "", year: "", branch: "", dietaryPref: "" });
  const [errors, setErrors] = useState({});

  if (!state) {
    return (
      <div className="p-10 text-gray-700 dark:text-gray-300">
        <p>No Event Data Found.</p>
        <button onClick={() => navigate("/dashboard/colleges")} className="mt-4 text-blue-600 text-sm hover:underline">← Back to Colleges</button>
      </div>
    );
  }

  const { title, date, domain, description, college, image, seats } = state;
  const style = DOMAIN_STYLES[domain] || DOMAIN_STYLES.workshop;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())       newErrors.name       = "Name is required";
    if (!form.rollNo.trim())     newErrors.rollNo     = "Roll number is required";
    if (!form.email.trim())      newErrors.email      = "Email is required";
    if (!form.phone.trim())      newErrors.phone      = "Phone number is required";
    if (!form.collegeName.trim()) newErrors.collegeName = "College name is required";
    if (!form.year)              newErrors.year       = "Year is required";
    if (!form.branch.trim())     newErrors.branch     = "Branch is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    // TODO: connect to POST /api/registrations/register/:eventId
    setSubmitted(true);
  };

  const inputClass = `w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${style.ring} text-sm transition`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* BACK */}
        <button onClick={() => navigate("/dashboard/colleges")} className="mb-6 text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 hover:underline transition">
          ← Back to Colleges
        </button>

        {/* EVENT CARD */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
          {image && (
            <div className="h-56 overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
            </div>
          )}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${style.badge}`}>{domain}</span>
              {college && <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">📍 {college}</span>}
            </div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>📅 {date}</span>
              {seats && <span>🪑 {seats} seats available</span>}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{description}</p>
            {!showForm && !submitted && (
              <button onClick={() => setShowForm(true)} className={`${style.btn} text-white px-8 py-3 rounded-xl font-semibold transition text-sm`}>
                Register Now
              </button>
            )}
          </div>
        </div>

        {/* SUCCESS */}
        {submitted && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Registration Successful!</h2>
            <p className="text-green-700 dark:text-green-400 text-sm mb-4">You're registered for <strong>{title}</strong>. Check your email for confirmation.</p>
            <button onClick={() => navigate("/dashboard")} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">← Go to Dashboard</button>
          </div>
        )}

        {/* REGISTRATION FORM */}
        {showForm && !submitted && (
          <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 ${style.accent} p-8`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Registration Form</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Fill in your details to register for <span className="font-medium text-gray-600 dark:text-gray-300">{title}</span></p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* NAME */}
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Full Name *</label>
                  <input name="name" placeholder="Ramya Sri" onChange={handleChange} className={inputClass} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* ROLL NO */}
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Roll Number *</label>
                  <input name="rollNo" placeholder="21CS1A0501" onChange={handleChange} className={inputClass} />
                  {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">College Email *</label>
                  <input name="email" type="email" placeholder="you@iith.ac.in" onChange={handleChange} className={inputClass} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Phone Number *</label>
                  <input name="phone" placeholder="+91 98765 43210" onChange={handleChange} className={inputClass} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* COLLEGE */}
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">College Name *</label>
                  <input name="collegeName" placeholder="IIT Hyderabad" onChange={handleChange} className={inputClass} />
                  {errors.collegeName && <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>}
                </div>

                {/* YEAR */}
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Year of Study *</label>
                  <select name="year" onChange={handleChange} className={inputClass}>
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                  {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                </div>

                {/* BRANCH */}
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Branch *</label>
                  <input name="branch" placeholder="Computer Science & Engineering" onChange={handleChange} className={inputClass} />
                  {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
                </div>

                {/* DIETARY (optional) */}
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Dietary Preference <span className="text-gray-400">(optional)</span></label>
                  <select name="dietaryPref" onChange={handleChange} className={inputClass}>
                    <option value="">No preference</option>
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>

              </div>

              <div className="flex items-center gap-4 mt-6">
                <button type="submit" className={`${style.btn} text-white px-8 py-3 rounded-xl font-semibold transition text-sm`}>
                  Confirm Registration
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}