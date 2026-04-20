// ============================================================
// FILE: src/pages/sections/Webinars.jsx
// ACTION: REPLACE existing Webinars.jsx
// CASE 4+6: Navigate to /event/:id as new page
// CASE 5: College logos shown
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS, COLLEGES, CLUBS } from "../../data/collegeData";

function CollegeLogo({ college }) {
  const [err, setErr] = useState(false);
  if (!college) return null;
  return (
    <div className="w-5 h-5 rounded bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center overflow-hidden flex-shrink-0">
      {!err ? (
        <img src={college.logo} alt={college.shortName} className="w-4 h-4 object-contain" onError={() => setErr(true)} />
      ) : (
        <span style={{ color: college.color, fontSize: "8px" }} className="font-bold">{college.initials}</span>
      )}
    </div>
  );
}

function EventCard({ event, onGo }) {
  const college = COLLEGES.find(c => c.id === event.collegeId);
  const club    = CLUBS.find(c => c.id === event.clubId);
  const isUpcoming = event.status === "upcoming";

  return (
    <div onClick={() => onGo(event)}
      className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 group ${
        isUpcoming ? "border-2 border-teal-300 dark:border-teal-700" : "border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800"
      }`}>
      <div className="relative h-40 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-2 left-2">
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-teal-50 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300">Webinar</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isUpcoming ? "bg-green-100 text-green-800" : "bg-white/80 text-gray-600"}`}>
            {isUpcoming ? "Upcoming" : "Past"}
          </span>
        </div>
        {college && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
            <CollegeLogo college={college} />
            <span className="text-white text-xs font-semibold">{college.shortName}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        {club && (
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-sm">{club.icon}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{club.name}</span>
          </div>
        )}
        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition line-clamp-1">{event.title}</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{event.date} · {event.duration}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{event.description}</p>
        {event.status === "past" && event.rating && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400 text-xs">{"★".repeat(Math.floor(event.rating))}</span>
            <span className="text-xs text-gray-400">{event.rating} · {event.reviews} reviews</span>
          </div>
        )}
        {isUpcoming && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500">{event.seats} seats</span>
            <button onClick={e => { e.stopPropagation(); onGo(event); }}
              className="text-xs px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition hover:scale-105">
              Register →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Webinars() {
  const navigate = useNavigate();
  const events = EVENTS.filter(e => e.category === "webinar");

  const handleGo = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-teal-500 rounded-full" />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Webinars</h1>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-6 ml-6">Learn from experts — online sessions you can join from anywhere</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map(e => <EventCard key={e.id} event={e} onGo={handleGo} />)}
      </div>
    </div>
  );
}


// ============================================================
// FILE: src/pages/sections/Workshops.jsx
// ACTION: REPLACE existing Workshops.jsx
// CASE 4+6: Navigate to /event/:id as new page
// CASE 5: College logos shown
// ============================================================

// NOTE: This file only exports Webinars above.
// The Workshops component below must be saved as a SEPARATE file.
// See FILE: src/pages/sections/Workshops.jsx below.