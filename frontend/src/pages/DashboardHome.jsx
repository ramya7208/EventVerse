// ============================================================
// FILE: src/pages/DashboardHome.jsx
// ACTION: REPLACE existing DashboardHome.jsx
// CASE: Premium hero — glassmorphism cards, animated accents
// ============================================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS, COLLEGES, CLUBS } from "../data/collegeData";

function timeLeft(d) {
  const mo = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  const p = d.split(" ");
  if (p.length < 2) return null;
  const diff = Math.ceil((new Date(parseInt(p[2]||"2026"), mo[p[0]], parseInt(p[1].replace(",",""))) - new Date()) / 86400000);
  if (diff < 0) return null;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `${diff}d left`;
}

const CAT = {
  hackathon: { label:"Hackathon", pill:"bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"    },
  webinar:   { label:"Webinar",   pill:"bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300" },
  workshop:  { label:"Workshop",  pill:"bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300" },
};

function CollegeLogo({ college, boxSize="w-5 h-5", imgSize="w-4 h-4" }) {
  const [err, setErr] = useState(false);
  if (!college) return null;
  return (
    <div className={`${boxSize} rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0`}>
      {!err
        ? <img src={college.logo} alt={college.shortName} className={`${imgSize} object-contain`} onError={() => setErr(true)} />
        : <span className="font-black" style={{ color: college.color, fontSize:"7px" }}>{college.initials}</span>
      }
    </div>
  );
}

function CollegeChip({ college, onClick }) {
  const [err, setErr] = useState(false);
  return (
    <div onClick={onClick}
      className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group min-w-[170px]">
      <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
        {!err
          ? <img src={college.logo} alt={college.shortName} className="w-7 h-7 object-contain" onError={() => setErr(true)} />
          : <span className="text-xs font-black" style={{ color: college.color }}>{college.initials}</span>
        }
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black text-gray-900 dark:text-white truncate">{college.shortName}</p>
        <p className="text-xs text-gray-400">{college.stats.events} events</p>
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
      <div className="relative h-48 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.style.display="none"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${cat.pill}`}>{cat.label}</span>
          {left && <span className={`text-xs px-3 py-1 rounded-full font-bold ${urgent ? "bg-orange-500 text-white" : "bg-white/90 text-gray-800"}`}>{left}</span>}
        </div>
        {college && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-2.5 py-1.5">
            <CollegeLogo college={college} />
            <span className="text-white text-xs font-bold">{college.shortName}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        {club && <div className="flex items-center gap-1.5 mb-2"><span>{club.icon}</span><span className="text-xs text-gray-400 font-medium">{club.name}</span></div>}
        <h3 className="font-black text-gray-900 dark:text-white text-base mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{event.title}</h3>
        <p className="text-xs text-gray-400 mb-3">{event.date} · {event.duration}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{event.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">{event.seats} seats</span>
          <button onClick={e => { e.stopPropagation(); onGo(event); }}
            className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition hover:scale-105">
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
  const [filter, setFilter]   = useState("all");
  const [greeting, setGreeting] = useState("Good morning");
  const [tick, setTick]       = useState(0);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
    const t = setInterval(() => setTick(n => n + 1), 3500);
    return () => clearInterval(t);
  }, []);

  const firstName = user.name?.split(" ")[0] || user.email?.split("@")[0] || "there";
  const upcoming  = EVENTS.filter(e => e.status === "upcoming");
  const filtered  = filter === "all" ? upcoming : upcoming.filter(e => e.category === filter);
  const handleGo  = (event) => navigate(`/event/${event.id}`, { state: { event } });

  // Rotating spotlight
  const spotlight   = upcoming[tick % Math.max(upcoming.length, 1)];
  const spotCollege = spotlight ? COLLEGES.find(c => c.id === spotlight.collegeId) : null;
  const [spotErr, setSpotErr] = useState(false);

  const hackCount    = upcoming.filter(e => e.category === "hackathon").length;
  const webinarCount = upcoming.filter(e => e.category === "webinar").length;
  const workshopCount= upcoming.filter(e => e.category === "workshop").length;

  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════
          PREMIUM HERO SECTION
      ══════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden mb-10"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #312e81 100%)" }}>

        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
          <div className="absolute top-10 left-1/3 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
          <div className="absolute -bottom-10 left-10 w-48 h-48 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
          {/* Animated ring */}
          <div className="absolute top-8 right-64 w-24 h-24 rounded-full border border-white/10 animate-ping" style={{ animationDuration:"3s" }} />
        </div>

        <div className="relative px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">

            {/* ── LEFT: Greeting + Stats ── */}
            <div className="lg:col-span-3">
              {/* GREETING BADGE */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">{greeting}</span>
              </div>

              {/* NAME */}
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                Hey, {firstName}! 👋
              </h1>
              <p className="text-blue-200/80 text-base max-w-md leading-relaxed mb-8">
                You have <span className="text-white font-black">{upcoming.length} upcoming events</span> waiting. Don't miss your chance!
              </p>

              {/* ── PREMIUM STAT CARDS ── */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon:"⚡", value: hackCount,     label:"Hackathons", sub:"upcoming", color:"from-red-500/20 to-red-600/10",     border:"border-red-500/30"    },
                  { icon:"🎙", value: webinarCount,  label:"Webinars",   sub:"upcoming", color:"from-teal-500/20 to-teal-600/10",   border:"border-teal-500/30"   },
                  { icon:"🛠", value: workshopCount, label:"Workshops",  sub:"upcoming", color:"from-violet-500/20 to-violet-600/10",border:"border-violet-500/30" },
                  { icon:"🏫", value: COLLEGES.length,label:"Colleges",  sub:"on platform",color:"from-blue-500/20 to-blue-600/10", border:"border-blue-400/30"   },
                ].map(s => (
                  <div key={s.label}
                    className={`relative bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl px-4 py-4 backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-default overflow-hidden`}>
                    {/* Subtle shine */}
                    <div className="absolute inset-0 bg-white/5 rounded-2xl" />
                    <div className="relative">
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="text-white font-black text-2xl leading-none">{s.value}</div>
                      <div className="text-white/80 text-xs font-bold mt-0.5">{s.label}</div>
                      <div className="text-white/40 text-xs">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Spotlight Event Card ── */}
            {spotlight && (
              <div className="lg:col-span-2">
                <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  Featured Event
                </p>
                <div
                  onClick={() => handleGo(spotlight)}
                  className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/15 transition-all group backdrop-blur-sm hover:scale-[1.02] duration-300">
                  <div className="h-40 overflow-hidden relative">
                    <img src={spotlight.image} alt={spotlight.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.style.display="none"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-bold border border-white/20 capitalize">
                        {spotlight.category}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-green-500 text-white font-bold">Upcoming</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-black text-base mb-1 line-clamp-1">{spotlight.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      {spotCollege && !spotErr && (
                        <div className="w-4 h-4 rounded bg-white flex items-center justify-center overflow-hidden">
                          <img src={spotCollege.logo} alt="" className="w-3.5 h-3.5 object-contain" onError={() => setSpotErr(true)} />
                        </div>
                      )}
                      <span className="text-white/60 text-xs">{spotCollege?.name} · {spotlight.date}</span>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); handleGo(spotlight); }}
                      className="w-full py-2.5 bg-white text-blue-900 rounded-xl font-black text-xs hover:bg-blue-50 transition">
                      Register Now →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── COLLEGES ROW ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">Colleges near you</h2>
          <button onClick={() => navigate("/dashboard/colleges")} className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline">View all →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth:"none" }}>
          {COLLEGES.map(c => <CollegeChip key={c.id} college={c} onClick={() => navigate(`/college/${c.id}`)} />)}
        </div>
      </div>

      {/* ── EVENTS SECTION ── */}
      <div>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            Upcoming events <span className="text-sm font-normal text-gray-400">({filtered.length})</span>
          </h2>
          <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[["all","All"],["hackathon","Hackathons"],["webinar","Webinars"],["workshop","Workshops"]].map(([v,l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filter===v
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0
          ? <div className="text-center py-20"><p className="text-5xl mb-4">🎯</p><p className="text-gray-500 dark:text-gray-400 font-semibold">No events in this category.</p></div>
          : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(event => <EventCard key={event.id} event={event} onGo={handleGo} />)}
            </div>
        }
      </div>
    </div>
  );
}