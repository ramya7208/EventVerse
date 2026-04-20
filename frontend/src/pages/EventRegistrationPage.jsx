// ============================================================
// FILE: src/pages/EventRegistrationPage.jsx
// ACTION: CREATE NEW FILE inside src/pages/
// CASE 3: Completely separate registration page
// ============================================================

import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EVENTS, CLUBS, COLLEGES } from "../data/collegeData";

const CAT_STYLES = {
  hackathon: { btn: "bg-red-500 hover:bg-red-600",       ring: "focus:ring-red-400",    accent: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",    tag: "text-red-700 dark:text-red-300"    },
  webinar:   { btn: "bg-teal-600 hover:bg-teal-700",     ring: "focus:ring-teal-400",   accent: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800", tag: "text-teal-700 dark:text-teal-300"  },
  workshop:  { btn: "bg-violet-600 hover:bg-violet-700", ring: "focus:ring-violet-400", accent: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800", tag: "text-violet-700 dark:text-violet-300" },
};

export default function EventRegistrationPage() {
  const { id }    = useParams();
  const { state } = useLocation();
  const navigate  = useNavigate();

  const event   = state?.event   || EVENTS.find(e => e.id === parseInt(id));
  const club    = state?.club    || (event ? CLUBS.find(c => c.id === event.clubId)         : null);
  const college = state?.college || (event ? COLLEGES.find(c => c.id === event?.collegeId) : null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", rollNo: "", email: "", phone: "",
    collegeName: college?.name || "", year: "", branch: "", dietary: "",
  });
  const [errors, setErrors] = useState({});

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Event not found.</p>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline text-sm">← Go back</button>
        </div>
      </div>
    );
  }

  const style = CAT_STYLES[event.category] || CAT_STYLES.workshop;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name        = "Required";
    if (!form.rollNo.trim())      e.rollNo      = "Required";
    if (!form.email.trim())       e.email       = "Required";
    if (!form.phone.trim())       e.phone       = "Required";
    if (!form.collegeName.trim()) e.collegeName = "Required";
    if (!form.year)               e.year        = "Required";
    if (!form.branch.trim())      e.branch      = "Required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // TODO: connect to POST /api/registrations/register/:eventId
    setSubmitted(true);
  };

  const inputClass = (field) => `w-full p-3.5 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 text-sm transition ${
    errors[field]
      ? "border-red-400 focus:ring-red-400"
      : `border-gray-200 dark:border-gray-700 ${style.ring}`
  }`;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center max-w-md w-full border border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">You're Registered!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Successfully registered for <span className="font-bold text-gray-800 dark:text-white">{event.title}</span>
          </p>
          {college && <p className="text-sm text-blue-600 dark:text-blue-400 mb-6">{college.name}</p>}
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-8">A confirmation will be sent to {form.email}</p>
          <div className="flex gap-3">
            <button onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:border-gray-400 transition">
              Dashboard
            </button>
            <button onClick={() => navigate(`/event/${event.id}`, { state: { event, club, college } })}
              className={`flex-1 py-3 ${style.btn} text-white rounded-xl font-bold text-sm transition`}>
              View Event
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* BACK */}
        <button onClick={() => navigate(-1)}
          className="mb-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 transition shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* EVENT SUMMARY CARD */}
        <div className={`rounded-2xl border p-5 mb-8 flex items-start gap-4 ${style.accent}`}>
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-black uppercase tracking-wider mb-1 ${style.tag}`}>{event.category}</p>
            <h2 className="font-black text-gray-900 dark:text-white text-lg leading-tight">{event.title}</h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-gray-500 dark:text-gray-400">
              {club && <span>{club.icon} {club.name}</span>}
              {college && <span>🏫 {college.name}</span>}
              <span>📅 {event.date}</span>
              <span>🪑 {event.seats} seats</span>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-8 pt-8 pb-2 border-b border-gray-50 dark:border-gray-800">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Registration Form</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Fill in your details to secure your spot</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

              {/* FULL NAME */}
              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Full Name *</label>
                <input name="name" placeholder="Ramya Sri Bojja" onChange={handleChange} className={inputClass("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* ROLL NUMBER */}
              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Roll Number *</label>
                <input name="rollNo" placeholder="21CS1A0501" onChange={handleChange} className={inputClass("rollNo")} />
                {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">College Email *</label>
                <input name="email" type="email" placeholder="you@iith.ac.in" onChange={handleChange} className={inputClass("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* PHONE */}
              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Phone Number *</label>
                <input name="phone" placeholder="+91 98765 43210" onChange={handleChange} className={inputClass("phone")} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* COLLEGE */}
              <div className="md:col-span-2">
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">College Name *</label>
                <input name="collegeName" placeholder="IIT Hyderabad" value={form.collegeName}
                  onChange={handleChange} className={inputClass("collegeName")} />
                {errors.collegeName && <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>}
              </div>

              {/* YEAR */}
              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Year of Study *</label>
                <select name="year" onChange={handleChange} className={inputClass("year")}>
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
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Branch *</label>
                <input name="branch" placeholder="Computer Science & Engineering" onChange={handleChange} className={inputClass("branch")} />
                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
              </div>

              {/* DIETARY */}
              <div className="md:col-span-2">
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">
                  Dietary Preference <span className="normal-case font-normal text-gray-400">(optional)</span>
                </label>
                <select name="dietary" onChange={handleChange} className={inputClass("dietary")}>
                  <option value="">No preference</option>
                  <option value="veg">Vegetarian</option>
                  <option value="nonveg">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-50 dark:border-gray-800">
              <button type="submit"
                className={`flex-1 ${style.btn} text-white py-4 rounded-xl font-black text-sm transition hover:scale-[1.02] active:scale-[0.98] shadow-lg`}>
                Confirm Registration ✓
              </button>
              <button type="button" onClick={() => navigate(-1)}
                className="px-6 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-bold text-sm hover:border-gray-400 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}