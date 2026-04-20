// ============================================================
// FILE: src/pages/UserProfile.jsx
// ACTION: REPLACE existing UserProfile.jsx
// CASE 3: Geometric shape avatars instead of emojis
// CASE 5: College logos shown properly
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS, COLLEGES, CLUBS } from "../data/collegeData";
import { AVATAR_SHAPES, AvatarShape } from "../components/Navbar";

const MY_REGISTERED_IDS = [3, 4, 8, 11, 13, 17];
const MY_ATTENDED_IDS   = [1, 2, 7, 10, 12];
const MY_RATINGS        = { 1: 5, 2: 4, 7: 5, 10: 4, 12: 5 };
const TABS = ["Profile", "Achievements", "Activity History"];

const CAT_PILL = {
  hackathon: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  workshop:  "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  webinar:   "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
};

function EventRow({ event, myRating, onView }) {
  const club    = CLUBS.find(c => c.id === event.clubId);
  const college = COLLEGES.find(c => c.id === event.collegeId);
  return (
    <div onClick={() => onView(event)}
      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer group">
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { e.target.style.display = "none"; }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${CAT_PILL[event.category] || CAT_PILL.workshop}`}>
            {event.category}
          </span>
        </div>
        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{event.title}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {club?.name && `${club.icon} ${club.name} · `}{college?.shortName} · {event.date}
        </p>
      </div>
      {myRating ? (
        <div className="text-right flex-shrink-0">
          <div className="text-yellow-400 text-sm">{"★".repeat(myRating)}{"☆".repeat(5 - myRating)}</div>
          <p className="text-xs text-gray-400">{myRating}/5</p>
        </div>
      ) : (
        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
}

export default function UserProfile() {
  const navigate  = useNavigate();
  const stored    = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeTab,      setActiveTab]      = useState("Profile");
  const [editMode,       setEditMode]       = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(stored.avatarId || 1);
  const [form, setForm] = useState({
    name:     stored.name     || "",
    email:    stored.email    || "",
    location: stored.location || "",
    bio:      stored.bio      || "",
    college:  stored.college  || "",
    branch:   stored.branch   || "",
  });

  const firstName    = stored.name?.split(" ")[0] || stored.email?.split("@")[0] || "User";
  const currentShape = AVATAR_SHAPES.find(a => a.id === selectedAvatar) || AVATAR_SHAPES[0];

  const registered = EVENTS.filter(e => MY_REGISTERED_IDS.includes(e.id));
  const attended   = EVENTS.filter(e => MY_ATTENDED_IDS.includes(e.id));
  const rated      = EVENTS.filter(e => Object.keys(MY_RATINGS).map(Number).includes(e.id));
  const avgRating  = rated.length
    ? (rated.reduce((s, e) => s + (MY_RATINGS[e.id] || 0), 0) / rated.length).toFixed(1)
    : "—";

  const saveProfile = () => {
    const updated = { ...stored, ...form, avatarId: selectedAvatar };
    localStorage.setItem("user", JSON.stringify(updated));
    setEditMode(false);
    window.location.reload();
  };

  const handleView = (event) => navigate(`/event/${event.id}`, { state: { event } });

  const inputClass = "w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* BACK */}
        <button onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </button>

        {/* PAGE TITLE */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Profile & Settings</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">Manage your account and preferences</p>
          </div>
        </div>

        {/* WELCOME BAR */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-4 flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome back, <span className="font-bold text-gray-900 dark:text-white">{stored.name || firstName}!</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="rounded-xl overflow-hidden">
              <AvatarShape shape={currentShape} size={36} />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{stored.name || firstName}</span>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition mr-1 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "Profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* AVATAR CARD */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <AvatarShape shape={currentShape} size={100} />
                </div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">{stored.name || firstName}</h2>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">{stored.email}</p>
                {stored.college && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-4">{stored.college}</p>
                )}
                <button onClick={() => setEditMode(true)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition hover:scale-105">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* STATS + DETAILS */}
            <div className="lg:col-span-3 space-y-5">
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-base">Your Event Impact</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Summary of your event activity</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: registered.length * 25, label: "Total Points",      color: "text-blue-600 dark:text-blue-400"    },
                    { value: registered.length,       label: "Events Registered", color: "text-green-600 dark:text-green-400"  },
                    { value: attended.length,         label: "Events Attended",   color: "text-gray-900 dark:text-white"       },
                    { value: rated.length,            label: "Events Rated",      color: "text-purple-600 dark:text-purple-400"},
                    { value: avgRating,               label: "Avg Rating",        color: "text-yellow-500"                     },
                    { value: registered.length * 2,  label: "Colleges Explored", color: "text-teal-600 dark:text-teal-400"    },
                  ].map(s => (
                    <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
                      <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6">
                <h3 className="font-black text-gray-900 dark:text-white text-base mb-4">Account Details</h3>
                <div className="space-y-3">
                  {[
                    { label: "Email",    value: stored.email    || "—" },
                    { label: "College",  value: stored.college  || "Not set" },
                    { label: "Branch",   value: stored.branch   || "Not set" },
                    { label: "Role",     value: stored.role     || "Student" },
                    { label: "Location", value: stored.location || "Not set" },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                      <span className="text-sm text-gray-400 dark:text-gray-500">{row.label}</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ACHIEVEMENTS TAB ── */}
        {activeTab === "Achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🏆", title: "First Registration", desc: "Registered for your first event",  earned: true },
              { icon: "⚡", title: "Hackathon Warrior",  desc: "Registered for a hackathon",       earned: registered.filter(e => e.category === "hackathon").length >= 1 },
              { icon: "🎓", title: "Learner",            desc: "Attended 2+ workshops/webinars",   earned: attended.length >= 2 },
              { icon: "⭐", title: "Reviewer",           desc: "Rated 3+ events",                  earned: rated.length >= 3 },
              { icon: "🌐", title: "Explorer",           desc: "Visited 3+ college pages",         earned: false },
              { icon: "🔥", title: "Streak Master",      desc: "Registered 3 months in a row",     earned: false },
            ].map(a => (
              <div key={a.title}
                className={`rounded-3xl p-6 border transition-all ${
                  a.earned
                    ? "bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-800 shadow-md"
                    : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-50"
                }`}>
                <div className={`text-4xl mb-3 ${!a.earned && "grayscale"}`}>{a.icon}</div>
                <h4 className="font-black text-gray-900 dark:text-white text-sm mb-1">{a.title}</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">{a.desc}</p>
                {a.earned && <div className="mt-3 text-xs font-bold text-green-600 dark:text-green-400">✓ Earned</div>}
              </div>
            ))}
          </div>
        )}

        {/* ── ACTIVITY HISTORY TAB ── */}
        {activeTab === "Activity History" && (
          <div className="space-y-8">
            <div>
              <h3 className="font-black text-gray-900 dark:text-white mb-4">
                Registered Events <span className="text-sm font-normal text-gray-400">({registered.length})</span>
              </h3>
              <div className="space-y-3">
                {registered.length === 0
                  ? <p className="text-gray-400 text-sm text-center py-8">No registrations yet.</p>
                  : registered.map(e => <EventRow key={e.id} event={e} onView={handleView} />)
                }
              </div>
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white mb-4">
                Ratings Given <span className="text-sm font-normal text-gray-400">({rated.length})</span>
              </h3>
              <div className="space-y-3">
                {rated.length === 0
                  ? <p className="text-gray-400 text-sm text-center py-8">No ratings yet.</p>
                  : rated.map(e => <EventRow key={e.id} event={e} myRating={MY_RATINGS[e.id]} onView={handleView} />)
                }
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── EDIT PROFILE MODAL ── */}
      {editMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Edit Profile</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Update your personal information</p>
                </div>
                <button onClick={() => setEditMode(false)}
                  className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition font-bold">
                  ✕
                </button>
              </div>

              {/* SHAPE AVATAR PICKER */}
              <div className="mb-8">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Profile Icon</p>
                <div className="flex gap-4 flex-wrap">
                  {AVATAR_SHAPES.map(av => (
                    <button key={av.id} onClick={() => setSelectedAvatar(av.id)}
                      className={`rounded-2xl overflow-hidden transition-all hover:scale-110 ${
                        selectedAvatar === av.id
                          ? "ring-4 ring-blue-500 ring-offset-2 scale-110"
                          : "opacity-60 hover:opacity-100"
                      }`}>
                      <AvatarShape shape={av} size={56} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Ramya Sri Bojja" className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Email</label>
                  <input value={form.email} className={`${inputClass} opacity-60`} readOnly />
                </div>
              </div>
              <div className="mb-5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Location</label>
                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="Hyderabad, Telangana" className={inputClass} />
              </div>
              <div className="mb-5">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">College</label>
                <input value={form.college} onChange={e => setForm({ ...form, college: e.target.value })}
                  placeholder="IIT Hyderabad" className={inputClass} />
              </div>
              <div className="mb-8">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Bio</label>
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell others about yourself..." rows={3}
                  className={`${inputClass} resize-none`} />
              </div>
              <div className="flex justify-end">
                <button onClick={saveProfile}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm transition hover:scale-105">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}