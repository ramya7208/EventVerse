// ============================================================
// FILE: src/pages/EventRegistrationPage.jsx
// ACTION: REPLACE existing EventRegistrationPage.jsx
// CASE 1 FIX: Google Docs button redirects to event's docLink
// ============================================================
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EVENTS, CLUBS, COLLEGES } from "../data/collegeData";
import { addRegistration } from "../data/userStore";

const CAT_STYLES = {
  hackathon: { btn: "bg-red-500 hover:bg-red-600",       ring: "focus:ring-red-400",    accent: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",         tag: "text-red-700 dark:text-red-300",    docBtn: "bg-red-600 hover:bg-red-700"    },
  webinar:   { btn: "bg-teal-600 hover:bg-teal-700",     ring: "focus:ring-teal-400",   accent: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",       tag: "text-teal-700 dark:text-teal-300",  docBtn: "bg-teal-700 hover:bg-teal-800"  },
  workshop:  { btn: "bg-violet-600 hover:bg-violet-700", ring: "focus:ring-violet-400", accent: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800", tag: "text-violet-700 dark:text-violet-300", docBtn: "bg-violet-700 hover:bg-violet-800"},
};

export default function EventRegistrationPage() {
  const { id }    = useParams();
  const { state } = useLocation();
  const navigate  = useNavigate();

  const event   = state?.event   || EVENTS.find(e => e.id === parseInt(id));
  const club    = state?.club    || (event ? CLUBS.find(c => c.id === event.clubId) : null);
  const college = state?.college || (event ? COLLEGES.find(c => c.id === event?.collegeId) : null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name:"", rollNo:"", email:"", phone:"",
    collegeName: college?.name || "", year:"", branch:"", dietary:"",
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
    // Save registration + award points
    addRegistration(event.id);
    window.dispatchEvent(new Event("storage"));
    setSubmitted(true);
  };

  const inp = (field) =>
    `w-full p-3.5 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 text-sm transition ${
      errors[field]
        ? "border-red-400 focus:ring-red-400"
        : `border-gray-200 dark:border-gray-700 ${style.ring}`
    }`;

  // ── SUCCESS SCREEN ──
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center max-w-md w-full border border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">You're Registered!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm">
            Successfully registered for <span className="font-bold text-gray-800 dark:text-white">{event.title}</span>
          </p>
          {college && <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{college.name}</p>}
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Confirmation sent to {form.email}</p>

          {/* If there's a Google Docs form, show it on success too */}
          {event.docLink && (
            <a href={event.docLink} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 rounded-xl font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Also fill the college's official form →
            </a>
          )}

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
          className="mb-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* EVENT SUMMARY */}
        <div className={`rounded-2xl border p-5 mb-6 flex items-start gap-4 ${style.accent}`}>
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display="none"; }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-black uppercase tracking-wider mb-1 ${style.tag}`}>{event.category}</p>
            <h2 className="font-black text-gray-900 dark:text-white text-lg leading-tight">{event.title}</h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-gray-500 dark:text-gray-400">
              {club    && <span>{club.icon} {club.name}</span>}
              {college && <span>🏫 {college.name}</span>}
              <span>📅 {event.date}</span>
              {event.seats && <span>🪑 {event.seats} seats</span>}
            </div>
          </div>
        </div>

        {/* ✅ CASE 1: GOOGLE DOCS BUTTON */}
        {event.docLink && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-5 mb-6 flex items-start gap-4">
            {/* Google Docs SVG Icon */}
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="2" width="28" height="36" rx="3" fill="#4285F4"/>
                <path d="M28 2l12 12H28V2z" fill="#1A73E8"/>
                <rect x="11" y="18" width="18" height="2.5" rx="1.25" fill="white" fillOpacity="0.9"/>
                <rect x="11" y="24" width="18" height="2.5" rx="1.25" fill="white" fillOpacity="0.9"/>
                <rect x="11" y="30" width="12" height="2.5" rx="1.25" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-gray-900 dark:text-white text-sm mb-1">
                Official Registration Form
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 leading-relaxed">
                {college?.name || "This college"} manages registrations via their own Google Form.
                Fill that too after submitting this form.
              </p>
              <a
                href={event.docLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black transition hover:scale-105 shadow-md shadow-blue-500/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open College's Official Form →
              </a>
            </div>
          </div>
        )}

        {/* REGISTRATION FORM CARD */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-8 pt-8 pb-4 border-b border-gray-50 dark:border-gray-800">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Registration Form</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Fill in your details to secure your spot for{" "}
              <span className="font-semibold text-gray-600 dark:text-gray-300">{event.title}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Full Name *</label>
                <input name="name" placeholder="Ramya Sri Bojja" onChange={handleChange} className={inp("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Roll Number *</label>
                <input name="rollNo" placeholder="21CS1A0501" onChange={handleChange} className={inp("rollNo")} />
                {errors.rollNo && <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">College Email *</label>
                <input name="email" type="email" placeholder="you@iith.ac.in" onChange={handleChange} className={inp("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Phone Number *</label>
                <input name="phone" placeholder="+91 98765 43210" onChange={handleChange} className={inp("phone")} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">College Name *</label>
                <input name="collegeName" placeholder="IIT Hyderabad" value={form.collegeName} onChange={handleChange} className={inp("collegeName")} />
                {errors.collegeName && <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Year of Study *</label>
                <select name="year" onChange={handleChange} className={inp("year")}>
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
              </div>

              <div>
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Branch *</label>
                <input name="branch" placeholder="Computer Science & Engineering" onChange={handleChange} className={inp("branch")} />
                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">
                  Dietary Preference <span className="normal-case font-normal text-gray-400">(optional)</span>
                </label>
                <select name="dietary" onChange={handleChange} className={inp("dietary")}>
                  <option value="">No preference</option>
                  <option value="veg">Vegetarian</option>
                  <option value="nonveg">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>

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

        {/* HOW TO ADD A DOC LINK — only in dev, remove in production */}
        {/* To add a Google Docs link to any event, open src/data/collegeData.js
            and add docLink to that event:
            { id: 3, ..., docLink: "https://docs.google.com/forms/d/your-form-id/viewform" }
        */}
      </div>
    </div>
  );
}
