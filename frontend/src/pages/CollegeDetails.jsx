// ============================================================
// FILE: src/pages/CollegeDetails.jsx
// ACTION: REPLACE existing CollegeDetails.jsx
// CASE 1: Back uses icon (chevron) not arrow text
// CASE 2: College logos shown properly
// CASE 3: Club icon not hidden
// CASE 10: Full premium college page design
// ============================================================

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLLEGES, CLUBS, EVENTS } from "../data/collegeData";

const CAT_STYLES = {
  hackathon: { bg: "bg-red-50 dark:bg-red-900/20",       text: "text-red-700 dark:text-red-300",       label: "Hackathon", accent: "border-red-300 dark:border-red-700"    },
  workshop:  { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-700 dark:text-violet-300", label: "Workshop",  accent: "border-violet-300 dark:border-violet-700"},
  webinar:   { bg: "bg-teal-50 dark:bg-teal-900/20",     text: "text-teal-700 dark:text-teal-300",     label: "Webinar",   accent: "border-teal-300 dark:border-teal-700"   },
};

function BackButton({ onClick }) {
  return (
    <button onClick={onClick}
      className="mb-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition shadow-sm">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function EventMiniCard({ event, onClick }) {
  const cat = CAT_STYLES[event.category] || CAT_STYLES.workshop;
  const isUpcoming = event.status === "upcoming";
  return (
    <div onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 group ${
        isUpcoming ? `border-2 ${cat.accent}` : "border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700"
      }`}>
      <div className="h-36 overflow-hidden relative">
        <img src={event.image} alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.style.display="none"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-2 left-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${cat.bg} ${cat.text}`}>{cat.label}</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isUpcoming ? "bg-green-100 text-green-800" : "bg-white/80 text-gray-600"}`}>
            {isUpcoming ? "Upcoming" : "Past"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{event.title}</h4>
        <p className="text-xs text-gray-400 dark:text-gray-500">{event.date} · {event.duration}</p>
        {event.rating && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-400 text-xs">{"★".repeat(Math.floor(event.rating))}</span>
            <span className="text-xs text-gray-400">{event.rating} ({event.reviews})</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CollegeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState("technical");
  const [selectedClub, setSelectedClub] = useState(null);
  const [imgError, setImgError]       = useState(false);

  const college = COLLEGES.find(c => c.id === id) || COLLEGES[0];
  const clubsForTab = CLUBS.filter(c => c.collegeId === college.id && c.type === activeTab);
  const eventsForClub = selectedClub ? EVENTS.filter(e => e.clubId === selectedClub.id) : [];

  const totalEvents = EVENTS.filter(e => e.collegeId === college.id).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-5 py-8">

        <BackButton onClick={() => navigate("/dashboard/colleges")} />

        {/* ── PREMIUM COLLEGE CARD ── */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 mb-8">

          {/* BANNER */}
          <div className="relative h-60 overflow-hidden">
            <img src={college.banner} alt={college.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.background = college.color; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* BOTTOM-LEFT: LOGO + NAME on banner */}
            <div className="absolute bottom-5 left-6 flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 flex-shrink-0">
                {!imgError ? (
                  <img src={college.logo} alt={college.shortName}
                    className="w-16 h-16 object-contain"
                    onError={() => setImgError(true)} />
                ) : (
                  <span className="font-black text-xl" style={{ color: college.color }}>{college.initials}</span>
                )}
              </div>
              <div className="pb-1">
                <h1 className="text-2xl font-black text-white leading-tight">{college.name}</h1>
                <p className="text-white/70 text-sm">{college.location} · Est. {college.established}</p>
              </div>
            </div>

            {/* STATS on banner top-right */}
            <div className="absolute top-4 right-4 flex gap-2">
              {[
                { v: college.stats.events,        l: "events"        },
                { v: college.stats.registrations, l: "registrations" },
                { v: `${college.stats.rating}★`,  l: "rating"        },
              ].map(s => (
                <div key={s.l} className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-center">
                  <div className="text-white font-black text-sm">{s.v}</div>
                  <div className="text-white/70 text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* INFO ROW */}
          <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                    {college.type}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {totalEvents} total events
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">{college.description}</p>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="px-8 pt-6 pb-2">
            <div className="flex gap-2">
              {["technical","nontechnical"].map(tab => (
                <button key={tab} onClick={() => { setActiveTab(tab); setSelectedClub(null); }}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:border-gray-400"
                  }`}>
                  {tab === "technical" ? "⚡ Technical" : "🎉 Non-Technical"}
                </button>
              ))}
            </div>
          </div>

          <div className="px-8 pb-8 pt-4">

            {/* ── CLUB LIST ── */}
            {!selectedClub && (
              <>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-4">
                  Select a club to explore events
                </p>
                {clubsForTab.length === 0 ? (
                  <p className="text-gray-400 text-sm py-8 text-center">No clubs in this category yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clubsForTab.map(club => (
                      <div key={club.id} onClick={() => setSelectedClub(club)}
                        className="group flex items-start gap-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-white dark:hover:bg-gray-750 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all">

                        {/* CLUB ICON — CASE 3 FIX: always visible */}
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 font-bold"
                          style={{ background: club.color + "25", color: club.color }}>
                          {club.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-gray-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            {club.name}
                          </h3>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 line-clamp-2">{club.description}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                            <span>Since {club.since}</span>
                            <span>·</span>
                            <span>{club.members} members</span>
                            <span>·</span>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {EVENTS.filter(e => e.clubId === club.id).length} events
                            </span>
                          </div>
                        </div>

                        <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── CLUB EVENTS VIEW ── */}
            {selectedClub && (
              <div>
                {/* BREADCRUMB */}
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setSelectedClub(null)}
                    className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    All Clubs
                  </button>
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedClub.name}</span>
                </div>

                {/* CLUB HEADER */}
                <div className="flex items-start gap-5 p-6 rounded-2xl mb-6 border border-gray-100 dark:border-gray-800"
                  style={{ background: selectedClub.color + "10" }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: selectedClub.color + "25" }}>
                    {selectedClub.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-black text-gray-900 dark:text-white text-xl mb-1">{selectedClub.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{selectedClub.description}</p>
                    <div className="flex gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <span>📅 Since {selectedClub.since}</span>
                      <span>👥 {selectedClub.members} members</span>
                      <span>🎯 {eventsForClub.length} events hosted</span>
                    </div>
                  </div>
                </div>

                {/* EVENTS GRID — CASE 4: 6-7 events minimum ensured in data */}
                <h3 className="font-black text-gray-900 dark:text-white text-base mb-4">Events by {selectedClub.name}</h3>
                {eventsForClub.length === 0 ? (
                  <p className="text-gray-400 text-sm py-8 text-center">No events listed yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {eventsForClub.map(event => (
                      <EventMiniCard key={event.id} event={event}
                        onClick={() => navigate(`/event/${event.id}`, { state: { event, club: selectedClub, college } })}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}