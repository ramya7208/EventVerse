// ============================================================
// FILE: src/data/userStore.js
// ACTION: CREATE NEW FILE inside src/data/
// Central store for all user activity — Follow, Save, Points, Badges
// ============================================================

import { EVENTS, COLLEGES } from "./collegeData";

// ── KEYS ────────────────────────────────────────────────────
const KEYS = {
  followed:     "ev_followed_colleges",
  saved:        "ev_saved_events",
  points:       "ev_points_log",
  registrations:"ev_registrations",
};

// ── FOLLOWED COLLEGES ────────────────────────────────────────
export function getFollowed() {
  try { return JSON.parse(localStorage.getItem(KEYS.followed) || "[]"); }
  catch { return []; }
}
export function toggleFollow(collegeId) {
  const list = getFollowed();
  const idx  = list.indexOf(collegeId);
  if (idx === -1) { list.push(collegeId); addPoints("follow", 10); }
  else            { list.splice(idx, 1); }
  localStorage.setItem(KEYS.followed, JSON.stringify(list));
  return list;
}
export function isFollowing(collegeId) {
  return getFollowed().includes(collegeId);
}

// ── SAVED EVENTS ─────────────────────────────────────────────
export function getSaved() {
  try { return JSON.parse(localStorage.getItem(KEYS.saved) || "[]"); }
  catch { return []; }
}
export function toggleSave(eventId) {
  const list = getSaved();
  const idx  = list.indexOf(eventId);
  if (idx === -1) { list.push(eventId); addPoints("save", 5); }
  else            { list.splice(idx, 1); }
  localStorage.setItem(KEYS.saved, JSON.stringify(list));
  return list;
}
export function isSaved(eventId) {
  return getSaved().includes(eventId);
}

// ── REGISTRATIONS ────────────────────────────────────────────
export function getRegistrations() {
  try { return JSON.parse(localStorage.getItem(KEYS.registrations) || "[]"); }
  catch { return []; }
}
export function addRegistration(eventId) {
  const list = getRegistrations();
  if (!list.includes(eventId)) {
    list.push(eventId);
    localStorage.setItem(KEYS.registrations, JSON.stringify(list));
    addPoints("register", 25);
  }
}

// ── POINTS SYSTEM ────────────────────────────────────────────
const POINT_RULES = {
  register: { pts: 25, label: "Registered for an event"    },
  save:     { pts: 5,  label: "Saved an event"              },
  follow:   { pts: 10, label: "Followed a college"          },
  rate:     { pts: 15, label: "Rated an event"              },
  attend:   { pts: 30, label: "Attended an event"           },
};

export function getPointsLog() {
  try { return JSON.parse(localStorage.getItem(KEYS.points) || "[]"); }
  catch { return []; }
}
export function getTotalPoints() {
  return getPointsLog().reduce((sum, e) => sum + e.pts, 0);
}
export function addPoints(action, customPts) {
  const rule = POINT_RULES[action];
  if (!rule) return;
  const log  = getPointsLog();
  log.unshift({
    action,
    pts:   customPts || rule.pts,
    label: rule.label,
    date:  new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short" }),
  });
  localStorage.setItem(KEYS.points, JSON.stringify(log.slice(0, 50)));
}

// ── LEVEL SYSTEM ─────────────────────────────────────────────
export function getLevel(points) {
  if (points >= 500) return { level: 5, name: "Legend",   color: "#f59e0b", next: null,  progress: 100 };
  if (points >= 300) return { level: 4, name: "Expert",   color: "#8b5cf6", next: 500,   progress: Math.round(((points-300)/200)*100) };
  if (points >= 150) return { level: 3, name: "Pro",      color: "#2563eb", next: 300,   progress: Math.round(((points-150)/150)*100) };
  if (points >= 50)  return { level: 2, name: "Rising",   color: "#0e7490", next: 150,   progress: Math.round(((points-50)/100)*100)  };
  return               { level: 1, name: "Starter",  color: "#15803d", next: 50,    progress: Math.round((points/50)*100) };
}

// ── BADGES ───────────────────────────────────────────────────
export function getBadges() {
  const reg  = getRegistrations().length;
  const fol  = getFollowed().length;
  const sav  = getSaved().length;
  const pts  = getTotalPoints();

  return [
    {
      id: "first_reg",
      icon: "🎟️",
      name: "First Timer",
      desc: "Registered for your first event",
      earned: reg >= 1,
      color: "#2563eb",
    },
    {
      id: "event_hunter",
      icon: "🔥",
      name: "Event Hunter",
      desc: "Registered for 3+ events",
      earned: reg >= 3,
      color: "#ef4444",
    },
    {
      id: "college_fan",
      icon: "🏫",
      name: "College Fan",
      desc: "Followed 2+ colleges",
      earned: fol >= 2,
      color: "#7c3aed",
    },
    {
      id: "bookworm",
      icon: "🔖",
      name: "Bookmarker",
      desc: "Saved 3+ events",
      earned: sav >= 3,
      color: "#0e7490",
    },
    {
      id: "point_50",
      icon: "⭐",
      name: "Rising Star",
      desc: "Earned 50+ points",
      earned: pts >= 50,
      color: "#f59e0b",
    },
    {
      id: "point_150",
      icon: "💎",
      name: "Pro Member",
      desc: "Earned 150+ points",
      earned: pts >= 150,
      color: "#8b5cf6",
    },
    {
      id: "point_300",
      icon: "🏆",
      name: "Expert",
      desc: "Earned 300+ points",
      earned: pts >= 300,
      color: "#f59e0b",
    },
    {
      id: "explorer",
      icon: "🌐",
      name: "Explorer",
      desc: "Followed 5+ colleges",
      earned: fol >= 5,
      color: "#15803d",
    },
  ];
}

// ── TRENDING EVENTS ──────────────────────────────────────────
export function getTrending() {
  return [...EVENTS]
    .filter(e => e.rating || e.reviews > 0 || e.status === "upcoming")
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * 20 + (a.reviews || 0) + (a.status === "upcoming" ? 50 : 0);
      const scoreB = (b.rating || 0) * 20 + (b.reviews || 0) + (b.status === "upcoming" ? 50 : 0);
      return scoreB - scoreA;
    })
    .slice(0, 8);
}