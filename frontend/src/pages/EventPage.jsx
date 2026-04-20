// ============================================================
// FILE: src/pages/EventPage.jsx
// ACTION: REPLACE existing EventPage.jsx
// CASE 3 FIX: Register button navigates to /register-event/:id
//             which is a SEPARATE dedicated registration page
// ============================================================

import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EVENTS, CLUBS, COLLEGES } from "../data/collegeData";

const CAT_STYLES = {
  hackathon: { badge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",     btn: "bg-red-500 hover:bg-red-600",       accent: "border-red-400" },
  webinar:   { badge: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300", btn: "bg-teal-600 hover:bg-teal-700",     accent: "border-teal-400" },
  workshop:  { badge: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300", btn: "bg-violet-600 hover:bg-violet-700", accent: "border-violet-400" },
};

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(star => (
        <button key={star} type="button" onClick={() => onChange(star)}
          className={`text-2xl transition ${star <= value ? "text-yellow-400" : "text-gray-300 dark:text-gray-600 hover:text-yellow-300"}`}>
          ★
        </button>
      ))}
    </div>
  );
}

export default function EventPage() {
  const { id }    = useParams();
  const { state } = useLocation();
  const navigate  = useNavigate();

  const event   = state?.event   || EVENTS.find(e => e.id === parseInt(id));
  const club    = state?.club    || (event ? CLUBS.find(c => c.id === event.clubId)     : null);
  const college = state?.college || (event ? COLLEGES.find(c => c.id === event?.collegeId) : null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [myRating, setMyRating]           = useState(0);

  if (!event) {
    return (
      <div className="p-10 text-gray-600 dark:text-gray-400">
        <p>Event not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline text-sm">← Go back</button>
      </div>
    );
  }

  const style = CAT_STYLES[event.category] || CAT_STYLES.workshop;
  const yearsRunning = new Date().getFullYear() - event.conductedSince + 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">

      {/* HERO IMAGE */}
      <div className="relative h-80 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* HERO TEXT */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${style.badge}`}>{event.category}</span>
              <span className="text-xs px-3 py-1 rounded-full font-semibold bg-white/20 text-white border border-white/30">
                {event.status === "upcoming" ? "🟢 Upcoming" : "⚫ Past"}
              </span>
              {event.conductedSince && (
                <span className="text-xs px-3 py-1 rounded-full font-semibold bg-white/20 text-white border border-white/30">
                  🏆 Since {event.conductedSince} · {yearsRunning} yrs
                </span>
              )}
            </div>
            <h1 className="text-4xl font-black text-white mb-2 leading-tight">{event.title}</h1>
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
          <div className="lg:col-span-2 space-y-6">

            {/* ABOUT */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-black text-gray-900 dark:text-white mb-3">About this Event</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
            </div>

            {/* CLUB */}
            {club && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4">Organised by</h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: club.color + "20" }}>
                    {club.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white">{club.name}</h3>
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

            {/* PAST PHOTOS */}
            {event.pastImages && event.pastImages.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4">
                  📸 Highlights from Previous Years
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {event.pastImages.map((img, i) => (
                    <div key={i} onClick={() => setSelectedPhoto(img)}
                      className="aspect-video rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition">
                      <img src={img} alt={`Past ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.style.display = "none"; }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-gray-900 dark:text-white">Student Reviews</h2>
                {event.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">{event.rating}</span>
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
                      <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black text-sm flex-shrink-0">
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900 dark:text-white text-sm">{r.name}</span>
                          <span className="text-xs text-gray-400">{r.year}</span>
                        </div>
                        <div className="text-yellow-400 text-xs mb-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{r.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No reviews yet — be the first after attending!</p>
              )}
              {event.status === "past" && (
                <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Rate this event</p>
                  <StarPicker value={myRating} onChange={setMyRating} />
                  {myRating > 0 && <p className="text-xs text-gray-400 mt-2">You rated {myRating}/5 ⭐</p>}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — REGISTER SIDEBAR */}
          <div className="lg:col-span-1">
            <div className={`bg-white dark:bg-gray-900 rounded-2xl border-2 ${style.accent} p-6 sticky top-24`}>
              <h3 className="font-black text-gray-900 dark:text-white text-base mb-1">
                {event.status === "upcoming" ? "Register for this event" : "This event has ended"}
              </h3>

              {event.status === "upcoming" ? (
                <>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
                    {event.seats} seats remaining · {event.date}
                  </p>
                  {/* ✅ CASE 3 FIX: navigates to SEPARATE registration page */}
                  <button
                    onClick={() => navigate(`/register-event/${event.id}`, { state: { event, club, college } })}
                    className={`w-full ${style.btn} text-white py-3 rounded-xl font-black text-sm transition hover:scale-105`}>
                    Register Now →
                  </button>
                </>
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Stay tuned for next year's edition!
                </p>
              )}

              {/* QUICK INFO */}
              <div className="mt-6 space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                {[
                  { label: "Category",       value: event.category.charAt(0).toUpperCase() + event.category.slice(1) },
                  { label: "Duration",       value: event.duration },
                  { label: "Date",           value: event.date },
                  { label: "Since",          value: event.conductedSince },
                  college && { label: "College", value: college.name },
                ].filter(Boolean).map(s => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span className="text-gray-400 dark:text-gray-500">{s.label}</span>
                    <span className="font-semibold text-gray-800 dark:text-white text-right max-w-[140px] truncate">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full">
            <img src={selectedPhoto} alt="Highlight" className="w-full rounded-2xl max-h-[80vh] object-contain" />
            <button onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-white/30 transition font-bold">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}