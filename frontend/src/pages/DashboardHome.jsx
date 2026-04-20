// ============================================================
// FILE: src/pages/DashboardHome.jsx
// ACTION: REPLACE existing DashboardHome.jsx
// CASE 1 FIX: No useState inside .map() callback
// CASE 2: Logo A applied
// CASE 5: College logos fixed properly
// ============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS, COLLEGES, CLUBS } from "../data/collegeData";

function timeLeft(dateStr) {
  const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
  const parts = dateStr.split(" ");
  if (parts.length < 2) return null;
  const month = months[parts[0]];
  const day   = parseInt(parts[1].replace(",", ""));
  const year  = parseInt(parts[2] || "2026");
  if (isNaN(month) || isNaN(day)) return null;
  const diff = Math.ceil((new Date(year, month, day) - new Date()) / 86400000);
  if (diff < 0) return null;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `${diff}d left`;
}

const CAT = {
  hackathon: { label: "Hackathon", text: "text-red-600 dark:text-red-400",       bg: "bg-red-50 dark:bg-red-900/20"         },
  webinar:   { label: "Webinar",   text: "text-teal-600 dark:text-teal-400",     bg: "bg-teal-50 dark:bg-teal-900/20"       },
  workshop:  { label: "Workshop",  text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20"   },
};

// ✅ CollegeLogo as proper component — hooks allowed here
function CollegeLogo({ college, size = "sm" }) {
  const [err, setErr] = useState(false);
  if (!college) return null;
  const dim = size === "sm" ? "w-4 h-4" : "w-7 h-7";
  const box = size === "sm" ? "w-5 h-5" : "w-9 h-9";
  if (err) {
    return (
      <div className={`${box} rounded-lg bg-white flex items-center justify-center flex-shrink-0`}>
        <span className="font-black" style={{ color: college.color, fontSize: size === "sm" ? "7px" : "11px" }}>
          {college.initials}
        </span>
      </div>
    );
  }
  return (
    <div className={`${box} rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0`}>
      <img src={college.logo} alt={college.shortName} className={`${dim} object-contain`}
        onError={() => setErr(true)} />
    </div>
  );
}

// ✅ CollegeChip as proper component — hooks allowed here
function CollegeChip({ college, onClick }) {
  const [err, setErr] = useState(false);
  return (
    <div onClick={onClick}
      className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group min-w-[180px]">
      <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
        {!err ? (
          <img src={college.logo} alt={college.shortName} className="w-7 h-7 object-contain"
            onError={() => setErr(true)} />
        ) : (
          <span className="text-xs font-black" style={{ color: college.color }}>{college.initials}</span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black text-gray-900 dark:text-white truncate">{college.shortName}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{college.stats.events} events</p>
      </div>
    </div>
  );
}

function EventCard({ event, onGo }) {
  const college = COLLEGES.find(c => c.id === event.collegeId);
  const club    = CLUBS.find(c => c.id === event.clubId);
  const left    = timeLeft(event.date);
  const urgent  = left && (left === "Today" || left === "Tomorrow" || parseInt(left) <= 5);
  const cat     = CAT[event.category] || CAT.workshop;

  return (
    <div onClick={() => onGo(event)}
      className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-2xl transition-all duration-300 cursor-pointer">

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img src={event.image} alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm ${cat.bg} ${cat.text}`}>
            {cat.label}
          </span>
          {left && (
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${urgent ? "bg-orange-500 text-white" : "bg-white/90 text-gray-800"}`}>
              {left}
            </span>
          )}
        </div>

        {/* COLLEGE LOGO BOTTOM LEFT */}
        {college && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-2.5 py-1.5">
            <CollegeLogo college={college} size="sm" />
            <span className="text-white text-xs font-bold">{college.shortName}</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {club && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-base">{club.icon}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{club.name}</span>
          </div>
        )}
        <h3 className="font-black text-gray-900 dark:text-white text-base mb-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {event.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{event.date} · {event.duration}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">{event.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{event.seats} seats</span>
          <button onClick={e => { e.stopPropagation(); onGo(event); }}
            className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition hover:scale-105 active:scale-95">
            Register →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeFilter, setActiveFilter] = useState("all");
  const [greeting, setGreeting]         = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12)      setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else             setGreeting("Good evening");
  }, []);

  const firstName = user.name?.split(" ")[0] || user.email?.split("@")[0] || "there";
  const upcoming  = EVENTS.filter(e => e.status === "upcoming");
  const filtered  = activeFilter === "all" ? upcoming : upcoming.filter(e => e.category === activeFilter);

  const handleGo = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <div className="min-h-screen">

      {/* ── PREMIUM HERO ── */}
      <div className="relative rounded-3xl overflow-hidden mb-10"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 40%, #4f46e5 100%)" }}>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #93c5fd, transparent)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #a5b4fc, transparent)", transform: "translateY(40%)" }} />

        <div className="relative px-10 py-10">
          <p className="text-blue-200 text-xs font-black uppercase tracking-[4px] mb-2">{greeting}</p>
          <h1 className="text-4xl font-black text-white mb-3 leading-tight">{firstName} 👋</h1>
          <p className="text-blue-100 text-base max-w-lg leading-relaxed mb-8">
            Discover events from colleges near you. Register before seats fill up.
          </p>

          {/* PREMIUM STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "⚡", value: upcoming.filter(e => e.category === "hackathon").length, label: "Hackathons", sub: "upcoming"    },
              { icon: "🎙", value: upcoming.filter(e => e.category === "webinar").length,   label: "Webinars",   sub: "upcoming"    },
              { icon: "🛠", value: upcoming.filter(e => e.category === "workshop").length,  label: "Workshops",  sub: "upcoming"    },
              { icon: "🏫", value: COLLEGES.length,                                          label: "Colleges",   sub: "on platform" },
            ].map(s => (
              <div key={s.label}
                className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-3 hover:bg-white/15 transition">
                <span className="text-2xl flex-shrink-0">{s.icon}</span>
                <div>
                  <div className="text-white font-black text-xl leading-none">{s.value}</div>
                  <div className="text-blue-200 text-xs mt-0.5 font-semibold">{s.label}</div>
                  <div className="text-blue-300/70 text-xs">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COLLEGES ROW ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">Colleges near you</h2>
          <button onClick={() => navigate("/dashboard/colleges")}
            className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline">
            View all →
          </button>
        </div>
        {/* ✅ FIX: CollegeChip is a proper component, no hooks in .map() */}
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {COLLEGES.map(college => (
            <CollegeChip
              key={college.id}
              college={college}
              onClick={() => navigate(`/college/${college.id}`)}
            />
          ))}
        </div>
      </div>

      {/* ── EVENTS SECTION ── */}
      <div>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            Upcoming events
            <span className="ml-2 text-sm font-normal text-gray-400">({filtered.length})</span>
          </h2>
          <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[["all","All"],["hackathon","Hackathons"],["webinar","Webinars"],["workshop","Workshops"]].map(([val, label]) => (
              <button key={val} onClick={() => setActiveFilter(val)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeFilter === val
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🎯</p>
            <p className="text-gray-500 dark:text-gray-400 font-semibold">No events in this category right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(event => (
              <EventCard key={event.id} event={event} onGo={handleGo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}