// ============================================================
// FILE: src/pages/sections/Saved.jsx — CREATE NEW FILE
// ============================================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSaved, toggleSave } from "../../data/userStore";
import { EVENTS, COLLEGES, CLUBS } from "../../data/collegeData";

const CAT_PILL = {
  hackathon: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
  webinar:   "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
  workshop:  "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300",
};

function CollegeLogo({ college }) {
  const [err, setErr] = React.useState(false);
  if (!college) return null;
  return (
    <div className="w-5 h-5 rounded bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
      {!err
        ? <img src={college.logo} alt="" className="w-4 h-4 object-contain" onError={() => setErr(true)} />
        : <span style={{ color: college.color, fontSize: "7px" }} className="font-black">{college.initials}</span>
      }
    </div>
  );
}

export default function Saved() {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState(getSaved());

  const savedEvents = EVENTS.filter(e => savedIds.includes(e.id));

  const handleUnsave = (eventId, ev) => {
    ev.stopPropagation();
    const updated = toggleSave(eventId);
    setSavedIds([...updated]);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-blue-500 rounded-full" />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Saved Events</h1>
        <span className="text-xl">🔖</span>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 ml-6">
        Events you bookmarked — register when you're ready
      </p>

      {savedEvents.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <p className="text-5xl mb-4">🔖</p>
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">No saved events yet</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-6 max-w-xs mx-auto">Browse events and click the bookmark icon to save them here for later.</p>
          <button onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-black text-sm transition hover:scale-105">
            Browse Events →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedEvents.map(event => {
            const college = COLLEGES.find(c => c.id === event.collegeId);
            const club    = CLUBS.find(c => c.id === event.clubId);
            const isUpcoming = event.status === "upcoming";

            return (
              <div key={event.id} onClick={() => navigate(`/event/${event.id}`, { state: { event } })}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="relative h-44 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.style.display="none"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${CAT_PILL[event.category] || CAT_PILL.workshop}`}>{event.category}</span>
                  </div>
                  {/* UNSAVE BUTTON */}
                  <button
                    onClick={(e) => handleUnsave(event.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                    title="Remove from saved">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  {college && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                      <CollegeLogo college={college} />
                      <span className="text-white text-xs font-bold">{college.shortName}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  {club && <div className="flex items-center gap-1 mb-1.5"><span>{club.icon}</span><span className="text-xs text-gray-400 font-medium">{club.name}</span></div>}
                  <h3 className="font-black text-gray-900 dark:text-white text-base mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{event.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{event.date} · {event.duration}</p>
                  {isUpcoming && (
                    <button onClick={e => { e.stopPropagation(); navigate(`/register-event/${event.id}`, { state: { event } }); }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs transition">
                      Register Now →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}