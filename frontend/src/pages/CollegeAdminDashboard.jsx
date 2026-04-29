// ============================================================
// FILE: src/pages/CollegeAdminDashboard.jsx
// ACTION: CREATE NEW FILE inside src/pages/
// CASE 4: Full premium college admin dashboard
// ============================================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLLEGES, CLUBS } from "../data/collegeData";
import { EVLogo } from "../components/Navbar";

const MOCK_EVENTS = [
  { id: 1, title: "Spring Hackathon 2026", category: "hackathon", date: "Jul 10, 2026", seats: 150, status: "pending",  views: 234,  registrations: 0   },
  { id: 2, title: "React Workshop",        category: "workshop",  date: "Jun 20, 2026", seats: 80,  status: "approved", views: 512,  registrations: 63  },
  { id: 3, title: "AI Webinar Series",     category: "webinar",   date: "Jun 8,  2026", seats: 300, status: "approved", views: 891,  registrations: 188 },
  { id: 4, title: "CodeBlitz 2025",        category: "hackathon", date: "Feb 2,  2025", seats: 200, status: "approved", views: 1204, registrations: 198 },
];

const STATUS = {
  pending:  { bg: "bg-amber-50 dark:bg-amber-900/20",  text: "text-amber-700 dark:text-amber-300",  dot: "bg-amber-400",  label: "Pending Approval" },
  approved: { bg: "bg-green-50 dark:bg-green-900/20",  text: "text-green-700 dark:text-green-300",  dot: "bg-green-400",  label: "Approved"         },
  rejected: { bg: "bg-red-50 dark:bg-red-900/20",      text: "text-red-700 dark:text-red-300",      dot: "bg-red-400",    label: "Rejected"         },
};

const CAT = {
  hackathon: { bg: "bg-red-50 dark:bg-red-900/20",       text: "text-red-700 dark:text-red-300"       },
  workshop:  { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-700 dark:text-violet-300" },
  webinar:   { bg: "bg-teal-50 dark:bg-teal-900/20",     text: "text-teal-700 dark:text-teal-300"     },
};

export default function CollegeAdminDashboard() {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("user") || "{}");
  const [tab,       setTab]       = useState("events");
  const [showForm,  setShowForm]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [events,    setEvents]    = useState(MOCK_EVENTS);
  const [errors,    setErrors]    = useState({});
  const [form, setForm] = useState({
    title:"", category:"hackathon", type:"technical",
    club:"", date:"", duration:"", seats:"", description:"",
  });

  const firstName = user.name?.split(" ")[0] || "Admin";
  // default to first college — in production use user.collegeId
  const college   = COLLEGES.find(c => c.id === user.collegeId) || COLLEGES[0];
  const [logoErr, setLogoErr] = useState(false);
  const clubList  = CLUBS.filter(c => c.collegeId === college.id);

  const handleChange = e => { setForm({...form,[e.target.name]:e.target.value}); setErrors({...errors,[e.target.name]:""}); };

  const validate = () => {
    const e={};
    if (!form.title.trim())       e.title="Required";
    if (!form.date)               e.date="Required";
    if (!form.duration.trim())    e.duration="Required";
    if (!form.seats)              e.seats="Required";
    if (!form.description.trim()) e.description="Required";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setEvents([{ id: events.length+1, ...form, status:"pending", views:0, registrations:0 }, ...events]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false); setShowForm(false);
      setForm({ title:"", category:"hackathon", type:"technical", club:"", date:"", duration:"", seats:"", description:"" });
    }, 2200);
  };

  const inp = (field) =>
    `w-full p-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition ${errors[field] ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* ── TOP HEADER ── */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <EVLogo size={28} />
              <span className="text-xs font-black uppercase tracking-[3px] text-blue-600 dark:text-blue-400">College Admin</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Welcome, {firstName}!</h1>
            <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {college.name} · Events dashboard
            </p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition hover:scale-105 shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Post New Event
          </button>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Total Events",   value: events.length,                                      icon:"🎯", color:"text-blue-600 dark:text-blue-400",    bg:"bg-blue-50 dark:bg-blue-900/20"    },
            { label:"Approved",       value: events.filter(e=>e.status==="approved").length,     icon:"✅", color:"text-green-700 dark:text-green-400",   bg:"bg-green-50 dark:bg-green-900/20"  },
            { label:"Pending Review", value: events.filter(e=>e.status==="pending").length,      icon:"⏳", color:"text-amber-700 dark:text-amber-400",   bg:"bg-amber-50 dark:bg-amber-900/20"  },
            { label:"Registrations",  value: events.reduce((s,e)=>s+e.registrations,0),          icon:"🎟️", color:"text-violet-700 dark:text-violet-400", bg:"bg-violet-50 dark:bg-violet-900/20"},
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
          {[["events","📋 My Events"],["college","🏫 College Info"],["clubs","🎯 Clubs"]].map(([v,l]) => (
            <button key={v} onClick={() => setTab(v)}
              className={`px-6 py-3 text-sm font-black border-b-2 transition mr-2 ${tab===v ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              {l}
            </button>
          ))}
        </div>

        {/* ── MY EVENTS TAB ── */}
        {tab === "events" && (
          <div className="space-y-4">
            {events.map(event => {
              const st  = STATUS[event.status]  || STATUS.pending;
              const cat = CAT[event.category]   || CAT.workshop;
              const fill = event.seats > 0 ? Math.round((event.registrations/event.seats)*100) : 0;
              return (
                <div key={event.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start gap-5 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold capitalize ${cat.bg} ${cat.text}`}>{event.category}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${st.bg} ${st.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </span>
                      </div>
                      <h3 className="font-black text-gray-900 dark:text-white text-base mb-1">{event.title}</h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500">📅 {event.date} &nbsp;·&nbsp; 🪑 {event.seats} seats</p>
                      {/* REGISTRATION FILL BAR */}
                      {event.status === "approved" && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{event.registrations} registered</span>
                            <span>{fill}% full</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width:`${fill}%` }} />
                          </div>
                        </div>
                      )}
                      {event.status === "pending" && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-2">⏳ Awaiting Super Admin approval before going live</p>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-center flex-shrink-0">
                      <div>
                        <div className="text-lg font-black text-gray-900 dark:text-white">{event.views}</div>
                        <div className="text-xs text-gray-400">views</div>
                      </div>
                      <div>
                        <div className="text-lg font-black text-blue-600 dark:text-blue-400">{event.registrations}</div>
                        <div className="text-xs text-gray-400">registered</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── COLLEGE INFO TAB ── */}
        {tab === "college" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="h-40 overflow-hidden relative">
                <img src={college.banner} alt={college.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-end gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 border-2 border-white shadow flex items-center justify-center overflow-hidden">
                    {!logoErr
                      ? <img src={college.logo} alt={college.shortName} className="w-10 h-10 object-contain" onError={() => setLogoErr(true)} />
                      : <span className="font-black text-sm" style={{ color: college.color }}>{college.initials}</span>
                    }
                  </div>
                  <div className="pb-1">
                    <h2 className="font-black text-white text-lg">{college.name}</h2>
                    <p className="text-white/70 text-xs">{college.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{college.description}</p>
                <div className="grid grid-cols-3 gap-3">
                  {[{v:college.stats.events,l:"events"},{v:college.stats.registrations,l:"registrations"},{v:`${college.stats.rating}★`,l:"rating"}].map(s => (
                    <div key={s.l} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                      <div className="font-black text-gray-900 dark:text-white text-base">{s.v}</div>
                      <div className="text-xs text-gray-400">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-black text-gray-900 dark:text-white mb-4 text-base">Quick Actions</h3>
              {[
                { icon:"✏️", label:"Edit college profile",       sub:"Update name, description, banner"   },
                { icon:"📊", label:"View analytics",             sub:"See event views, registration trends" },
                { icon:"📢", label:"Send announcement",          sub:"Notify registered students"           },
                { icon:"🗂️", label:"Export registrations",       sub:"Download CSV of all registrations"    },
              ].map(a => (
                <div key={a.label} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer group mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-xl flex-shrink-0">{a.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{a.label}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{a.sub}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 ml-auto group-hover:text-blue-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CLUBS TAB ── */}
        {tab === "clubs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clubList.map(club => (
              <div key={club.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-start gap-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: club.color+"20" }}>{club.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm">{club.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${club.type === "technical" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"}`}>{club.type}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{club.description}</p>
                  <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span>Since {club.since}</span><span>·</span><span>{club.members} members</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── POST EVENT MODAL ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Post New Event</h2>
                <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition font-bold">✕</button>
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Submitted events go to Super Admin for approval before going live.</p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-3xl mx-auto mb-4">🎉</div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Event Submitted!</h3>
                  <p className="text-gray-400 text-sm">Super Admin will review and approve your event. You'll be notified once it's live.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                    <div className="md:col-span-2">
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Event Title *</label>
                      <input name="title" placeholder="Spring Hackathon 2026" onChange={handleChange} className={inp("title")} />
                      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Category *</label>
                      <select name="category" onChange={handleChange} className={inp("category")}>
                        <option value="hackathon">Hackathon</option>
                        <option value="workshop">Workshop</option>
                        <option value="webinar">Webinar</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Type *</label>
                      <select name="type" onChange={handleChange} className={inp("type")}>
                        <option value="technical">Technical</option>
                        <option value="nontechnical">Non-Technical</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Club</label>
                      <select name="club" onChange={handleChange} className={inp("club")}>
                        <option value="">Select club</option>
                        {clubList.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Total Seats *</label>
                      <input name="seats" type="number" placeholder="150" onChange={handleChange} className={inp("seats")} />
                      {errors.seats && <p className="text-red-500 text-xs mt-1">{errors.seats}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Date *</label>
                      <input name="date" type="date" onChange={handleChange} className={inp("date")} />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Duration *</label>
                      <input name="duration" placeholder="2 days / 3 hrs" onChange={handleChange} className={inp("duration")} />
                      {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-black text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Description *</label>
                      <textarea name="description" rows={4} placeholder="Describe your event — what it's about, who should attend, what they'll gain..." onChange={handleChange} className={`${inp("description")} resize-none`} />
                      {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-5 flex gap-3">
                    <span className="text-xl flex-shrink-0">ℹ️</span>
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">After submission, your event will be reviewed by the Super Admin before going live on EventVerse.</p>
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-black text-sm transition hover:scale-[1.02] shadow-lg shadow-blue-500/20">Submit for Approval →</button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-500 rounded-xl font-bold text-sm hover:border-gray-400 transition">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}