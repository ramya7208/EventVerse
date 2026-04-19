// ============================================================
// FILE: src/pages/EventPage.jsx
// ACTION: CREATE NEW FILE inside src/pages/
// CASE 2+3: Separate full event page with gallery, reviews, form
// ============================================================

import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EVENTS, CLUBS, COLLEGES } from "../data/collegeData";

const CATEGORY_STYLES = {
  hackathon: { badge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300", btn: "bg-red-500 hover:bg-red-600", ring: "focus:ring-red-400", bar: "bg-red-500", accent: "border-red-400" },
  webinar:   { badge: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300", btn: "bg-teal-600 hover:bg-teal-700", ring: "focus:ring-teal-400", bar: "bg-teal-500", accent: "border-teal-400" },
  workshop:  { badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300", btn: "bg-purple-600 hover:bg-purple-700", ring: "focus:ring-purple-400", bar: "bg-purple-500", accent: "border-purple-400" },
};

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)}
          className={`text-2xl transition ${star <= value ? "text-yellow-400" : "text-gray-300 dark:text-gray-600 hover:text-yellow-300"}`}>
          ★
        </button>
      ))}
    </div>
  );
}

export default function EventPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // Get event from route state or find by ID
  const event = state?.event || EVENTS.find((e) => e.id === parseInt(id));
  const club  = state?.club  || (event ? CLUBS.find((c) => c.id === event.clubId) : null);
  const college = state?.college || (event ? COLLEGES.find((c) => c.id === event?.collegeId) : null);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [myRating, setMyRating] = useState(0);
  const [form, setForm] = useState({ name: "", rollNo: "", email: "", phone: "", collegeName: college?.name || "", year: "", branch: "", dietary: "" });
  const [errors, setErrors] = useState({});

  if (!event) {
    return (
      <div className="p-10 text-gray-600 dark:text-gray-400">
        <p>Event not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline text-sm">← Go back</button>
      </div>
    );
  }

  const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.workshop;
  const yearsRunning = new Date().getFullYear() - event.conductedSince + 1;

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
    setSubmitted(true);
    setShowForm(false);
  };

  const inputClass = `w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${style.ring} text-sm transition`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">

      {/* HERO IMAGE */}
      <div className="relative h-80 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition">
          ← Back
        </button>

        {/* HERO TEXT */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${style.badge}`}>{event.category}</span>
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-white/20 text-white border border-white/30">
                {event.status === "upcoming" ? "🟢 Upcoming" : "⚫ Past"}
              </span>
              {event.conductedSince && (
                <span className="text-xs px-3 py-1 rounded-full font-medium bg-white/20 text-white border border-white/30">
                  🏆 Running since {event.conductedSince} · {yearsRunning} yrs
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 leading-tight">{event.title}</h1>
            <div className="flex items-center gap-4 text-white/80 text-sm flex-wrap">
              <span>📅 {event.date}</span>
              <span>⏱ {event.duration}</span>
              {event.seats && <span>🪑 {event.seats} seats</span>}
              {event.rating && (
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {event.rating} ({event.reviews} reviews)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* ABOUT EVENT */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About this Event</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
            </div>

            {/* CLUB INFO */}
            {club && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Organised by</h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: club.color + "20" }}>
                    {club.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{club.name}</h3>
                    {college && <p className="text-sm text-blue-600 dark:text-blue-400">{college.name}</p>}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{club.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
                      <span>Since {club.since}</span>
                      <span>·</span>
                      <span>{club.members} members</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAST PHOTOS GALLERY */}
            {event.pastImages && event.pastImages.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📸 Highlights from Previous Years
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {event.pastImages.map((img, i) => (
                    <div key={i} onClick={() => setSelectedPhoto(img)}
                      className="aspect-video rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition">
                      <img src={img} alt={`Past event ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.style.display = "none"; }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Student Reviews</h2>
                {event.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{event.rating}</span>
                    <div>
                      <div className="text-yellow-400 text-sm">{"★".repeat(Math.floor(event.rating))}{"☆".repeat(5 - Math.floor(event.rating))}</div>
                      <div className="text-xs text-gray-400">{event.reviews} reviews</div>
                    </div>
                  </div>
                )}
              </div>

              {event.reviews_list && event.reviews_list.length > 0 ? (
                <div className="space-y-4">
                  {event.reviews_list.map((r, i) => (
                    <div key={i} className="flex gap-3 pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                      <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">{r.name}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{r.year}</span>
                        </div>
                        <div className="text-yellow-400 text-xs mb-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{r.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 dark:text-gray-500 text-sm">No reviews yet — be the first after attending!</p>
              )}

              {/* RATE THIS EVENT */}
              {event.status === "past" && (
                <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rate this event</p>
                  <StarPicker value={myRating} onChange={setMyRating} />
                  {myRating > 0 && (
                    <p className="text-xs text-gray-400 mt-2">You rated this {myRating}/5 ⭐</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — REGISTRATION SIDEBAR */}
          <div className="lg:col-span-1">
            <div className={`bg-white dark:bg-gray-900 rounded-2xl border-2 ${style.accent} p-6 sticky top-24`}>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">You're In!</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Registered for <strong>{event.title}</strong>. Check your email for confirmation.</p>
                  <button onClick={() => navigate("/dashboard")} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">← Dashboard</button>
                </div>
              ) : !showForm ? (
                <>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{event.status === "upcoming" ? "Register for this event" : "This event has ended"}</h3>
                  {event.status === "upcoming" && (
                    <>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{event.seats} seats remaining · {event.date}</p>
                      <button onClick={() => setShowForm(true)} className={`w-full ${style.btn} text-white py-3 rounded-xl font-semibold text-sm transition`}>
                        Register Now →
                      </button>
                    </>
                  )}
                  {event.status === "past" && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Stay tuned for next year's edition!</p>
                  )}

                  {/* QUICK STATS */}
                  <div className="mt-6 space-y-3">
                    {[
                      { label: "Category",   value: event.category.charAt(0).toUpperCase() + event.category.slice(1) },
                      { label: "Duration",   value: event.duration },
                      { label: "Date",       value: event.date },
                      { label: "Conducted since", value: event.conductedSince },
                    ].map((s) => (
                      <div key={s.label} className="flex justify-between text-sm">
                        <span className="text-gray-400 dark:text-gray-500">{s.label}</span>
                        <span className="font-medium text-gray-800 dark:text-white">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Registration Form</h3>
                    <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xs">✕ Cancel</button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {[
                      { name: "name",        label: "Full Name",     placeholder: "Ramya Sri",           type: "text" },
                      { name: "rollNo",      label: "Roll Number",   placeholder: "21CS1A0501",          type: "text" },
                      { name: "email",       label: "College Email", placeholder: "you@iith.ac.in",     type: "email" },
                      { name: "phone",       label: "Phone",         placeholder: "+91 98765 43210",     type: "text" },
                      { name: "collegeName", label: "College Name",  placeholder: "IIT Hyderabad",       type: "text" },
                      { name: "branch",      label: "Branch",        placeholder: "CSE",                 type: "text" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5 block">{f.label} *</label>
                        <input name={f.name} type={f.type} placeholder={f.placeholder} onChange={handleChange}
                          className={`w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${style.ring} text-xs transition`} />
                        {errors[f.name] && <p className="text-red-500 text-xs mt-0.5">{errors[f.name]}</p>}
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5 block">Year *</label>
                      <select name="year" onChange={handleChange}
                        className={`w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 ${style.ring} text-xs transition`}>
                        <option value="">Select</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                      {errors.year && <p className="text-red-500 text-xs mt-0.5">{errors.year}</p>}
                    </div>
                    <button type="submit" className={`w-full ${style.btn} text-white py-2.5 rounded-xl font-semibold text-sm transition mt-2`}>
                      Confirm Registration ✓
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PHOTO LIGHTBOX */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full">
            <img src={selectedPhoto} alt="Event highlight" className="w-full rounded-2xl object-contain max-h-[80vh]" />
            <button onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-white/30 transition text-lg">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}