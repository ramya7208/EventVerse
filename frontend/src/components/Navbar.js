// ============================================================
// FILE: src/components/Navbar.js
// ACTION: REPLACE existing Navbar.js
// CASE 4 FIX: Navbar stays fixed while page scrolls
//             Added scroll shadow effect for premium feel
// ============================================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

// ── LOGO A ──────────────────────────────────────────────────
export function EVLogo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill="#2563EB"/>
      <path d="M14 20h10M14 28h8M14 36h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 20l6 16 6-16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="38" cy="32" r="1.5" fill="#93C5FD"/>
    </svg>
  );
}

// ── GEOMETRIC AVATAR SHAPES ──────────────────────────────────
export const AVATAR_SHAPES = [
  { id: 1, type: "circle",   color: "#2563EB" },
  { id: 2, type: "square",   color: "#7c3aed" },
  { id: 3, type: "triangle", color: "#0e7490" },
  { id: 4, type: "diamond",  color: "#be123c" },
  { id: 5, type: "hexagon",  color: "#15803d" },
  { id: 6, type: "star",     color: "#b45309" },
];

export function AvatarShape({ shape, size = 36 }) {
  if (!shape) return null;
  const c = shape.color;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const letter = (user.name || user.email || "U").charAt(0).toUpperCase();

  const txt = (fs) => (
    <text x="18" y="23" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="white" fontFamily="'Segoe UI',sans-serif">
      {letter}
    </text>
  );

  const map = {
    circle:   <><circle cx="18" cy="18" r="16" fill={c}/>{txt(14)}</>,
    square:   <><rect x="2" y="2" width="32" height="32" rx="9" fill={c}/>{txt(14)}</>,
    triangle: <><polygon points="18,2 34,34 2,34" fill={c}/>{txt(11)}</>,
    diamond:  <><polygon points="18,1 35,18 18,35 1,18" fill={c}/>{txt(13)}</>,
    hexagon:  <><polygon points="18,1 32,9.5 32,26.5 18,35 4,26.5 4,9.5" fill={c}/>{txt(13)}</>,
    star:     <><polygon points="18,1 21,12 34,12 24,19 28,32 18,24 8,32 12,19 2,12 15,12" fill={c}/>{txt(10)}</>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      {map[shape.type] || map.circle}
    </svg>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user      = JSON.parse(localStorage.getItem("user") || "null");
  const stored    = user || {};
  const firstName = stored.name?.split(" ")[0] || stored.email?.split("@")[0] || null;
  const shape     = AVATAR_SHAPES.find(a => a.id === (stored.avatarId || 1)) || AVATAR_SHAPES[0];

  // ✅ CASE 4 FIX: Track scroll position to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("#navbar-dropdown")) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    // ✅ CASE 4 FIX: position: fixed + z-50 ensures navbar NEVER scrolls with page
    // The scrolled shadow gives premium feel as user scrolls down
    <div
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${scrolled
          ? "bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/80 dark:border-gray-800/80"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
        }
      `}
    >
      <div className="px-8 py-3 flex justify-between items-center max-w-screen-2xl mx-auto">

        {/* LOGO */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="group-hover:scale-110 transition-transform duration-200">
            <EVLogo />
          </div>
          <span className="text-xl font-black">
            <span className="text-blue-600">Event</span>
            <span className="text-gray-900 dark:text-white">Verse</span>
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* DARK MODE */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-base"
            title="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* NOT LOGGED IN */}
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-bold transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition hover:scale-105 shadow-md shadow-blue-500/20"
              >
                Get started
              </button>
            </>
          ) : (
            /* LOGGED IN */
            <div id="navbar-dropdown" className="relative flex items-center gap-2">
              {firstName && (
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden sm:block">
                  Hey, <span className="text-blue-600 dark:text-blue-400">{firstName}</span>!
                </span>
              )}

              {/* AVATAR */}
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer hover:scale-110 transition rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600"
              >
                <AvatarShape shape={shape} size={36} />
              </div>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 top-14 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 z-50">

                  {/* USER INFO */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                    <div className="rounded-xl overflow-hidden flex-shrink-0">
                      <AvatarShape shape={shape} size={40} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{stored.name || firstName}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{stored.email}</p>
                      <p className="text-xs text-blue-500 capitalize font-semibold">{stored.role || "student"}</p>
                    </div>
                  </div>

                  {/* MY PROFILE */}
                  <button
                    onClick={() => { setOpen(false); navigate("/dashboard/profile"); }}
                    className="w-full flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 px-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition mb-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </button>

                  {/* DASHBOARD */}
                  <button
                    onClick={() => { setOpen(false); navigate("/dashboard"); }}
                    className="w-full flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 px-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition mb-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                    </svg>
                    Dashboard
                  </button>

                  <hr className="my-2 border-gray-100 dark:border-gray-700" />

                  {/* SIGN OUT */}
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setOpen(false);
                      navigate("/");
                    }}
                    className="w-full flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 py-2 px-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}