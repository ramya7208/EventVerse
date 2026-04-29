// ============================================================
// FILE: src/components/UserSidebar.jsx — REPLACE existing
// All 5 new features added to sidebar with icons + badges
// ============================================================
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { EVLogo, AVATAR_SHAPES, AvatarShape } from "./Navbar";
import { getTotalPoints, getLevel, getSaved, getFollowed, getBadges } from "../data/userStore";

const NAV_SECTIONS = [
  {
    title: "Discover",
    items: [
      {
        label: "Home",
        path: "/dashboard",
        end: true,
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>,
      },
      {
        label: "Trending Now",
        path: "/dashboard/trending",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
        badge: "🔥",
      },
      {
        label: "Colleges",
        path: "/dashboard/colleges",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-4h8" /></svg>,
      },
    ],
  },
  {
    title: "Events",
    items: [
      {
        label: "Hackathons",
        path: "/dashboard/hackathons",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      },
      {
        label: "Workshops",
        path: "/dashboard/workshops",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      },
      {
        label: "Webinars",
        path: "/dashboard/webinars",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>,
      },
    ],
  },
  {
    title: "My Space",
    items: [
      {
        label: "Saved Events",
        path: "/dashboard/saved",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>,
        countKey: "saved",
      },
      {
        label: "Following",
        path: "/dashboard/following",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
        countKey: "followed",
      },
      {
        label: "Badges",
        path: "/dashboard/badges",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      },
      {
        label: "Points & Rewards",
        path: "/dashboard/points",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      },
    ],
  },
  {
    title: "Help",
    items: [
      {
        label: "Support",
        path: "/dashboard/support",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      },
    ],
  },
];

export default function UserSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [pts,   setPts]   = useState(0);
  const [saved, setSaved] = useState(0);
  const [followed, setFollowed] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState(0);

  const user      = JSON.parse(localStorage.getItem("user") || "{}");
  const shape     = AVATAR_SHAPES.find(a => a.id === (user.avatarId || 1)) || AVATAR_SHAPES[0];
  const firstName = user.name?.split(" ")[0] || user.email?.split("@")[0] || "User";

  useEffect(() => {
    setPts(getTotalPoints());
    setSaved(getSaved().length);
    setFollowed(getFollowed().length);
    setEarnedBadges(getBadges().filter(b => b.earned).length);

    // refresh on storage change (when user saves/follows from other pages)
    const onStorage = () => {
      setPts(getTotalPoints());
      setSaved(getSaved().length);
      setFollowed(getFollowed().length);
      setEarnedBadges(getBadges().filter(b => b.earned).length);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const level = getLevel(pts);

  const getCount = (key) => {
    if (key === "saved")   return saved;
    if (key === "followed") return followed;
    return null;
  };

  return (
    <div className={`${collapsed ? "w-[68px]" : "w-[240px]"} min-h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out hidden md:flex`}>

      {/* ── LOGO ROW ── */}
      <div className={`flex items-center px-4 py-5 border-b border-gray-100 dark:border-gray-800 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <EVLogo size={34} />
            <span className="font-black text-base">
              <span className="text-blue-600">Event</span>
              <span className="text-gray-900 dark:text-white">Verse</span>
            </span>
          </div>
        )}
        {collapsed && <EVLogo size={34} />}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} className="mx-auto mt-3 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      {/* ── POINTS MINI CARD (only when expanded) ── */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-1 px-3 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-gray-700 dark:text-gray-200" style={{ color: level.color }}>{level.name}</span>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400">{pts} pts</span>
          </div>
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width:`${Math.min(level.progress,100)}%`, background: level.color }} />
          </div>
          {level.next && (
            <p className="text-xs text-gray-400 mt-1">{level.next - pts} pts to {["","Rising","Pro","Expert","Legend"][level.level]}</p>
          )}
        </div>
      )}

      {/* ── NAV SECTIONS ── */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
        {NAV_SECTIONS.map((section, si) => (
          <div key={si} className="mb-2">
            {!collapsed && (
              <p className="text-xs font-black uppercase tracking-widest text-gray-300 dark:text-gray-600 px-3 mb-1.5 mt-2">{section.title}</p>
            )}
            {section.items.map((item) => {
              const count = item.countKey ? getCount(item.countKey) : null;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end || false}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 mb-0.5 group ${
                      collapsed ? "justify-center" : ""
                    } ${isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {/* BADGE EMOJI */}
                          {item.badge && !isActive && (
                            <span className="text-sm">{item.badge}</span>
                          )}
                          {/* COUNT PILL */}
                          {count !== null && count > 0 && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${isActive ? "bg-white/20 text-white" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"}`}>
                              {count}
                            </span>
                          )}
                          {/* BADGES COUNT */}
                          {item.label === "Badges" && earnedBadges > 0 && !isActive && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full font-black bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                              {earnedBadges}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── AVATAR AT BOTTOM ── */}
      <div className={`border-t border-gray-100 dark:border-gray-800 ${collapsed ? "px-3 py-4 flex justify-center" : "px-4 py-4"}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="rounded-xl overflow-hidden flex-shrink-0"><AvatarShape shape={shape} size={32} /></div>
            <div className="min-w-0">
              <p className="text-xs font-black text-gray-900 dark:text-white truncate">{firstName}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate capitalize">{user.role || "student"}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden"><AvatarShape shape={shape} size={32} /></div>
        )}
      </div>
    </div>
  );
}