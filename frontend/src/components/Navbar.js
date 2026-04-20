// ============================================================
// FILE: src/components/Navbar.js
// ACTION: REPLACE existing Navbar.js
// CASE 2: Logo A applied as default
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

// ✅ LOGO A — the letterform EV + V shape
function EVLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="56" height="56" rx="16" fill="#2563EB"/>
      <path d="M14 20h10M14 28h8M14 36h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 20l6 16 6-16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="38" cy="32" r="1.5" fill="#93C5FD"/>
    </svg>
  );
}

// ✅ GEOMETRIC AVATAR SHAPES — exported for use in UserProfile
export const AVATAR_SHAPES = [
  { id: 1, type: "circle",   color: "#2563EB", label: "Blue"    },
  { id: 2, type: "square",   color: "#7c3aed", label: "Purple"  },
  { id: 3, type: "triangle", color: "#0e7490", label: "Teal"    },
  { id: 4, type: "diamond",  color: "#be123c", label: "Red"     },
  { id: 5, type: "hexagon",  color: "#15803d", label: "Green"   },
  { id: 6, type: "star",     color: "#b45309", label: "Amber"   },
];

export function AvatarShape({ shape, size = 36 }) {
  const s = size;
  const c = shape?.color || "#2563EB";
  const id = shape?.id || 1;

  if (!shape || shape.type === "circle") return (
    <svg width={s} height={s} viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill={c}/>
      <text x="18" y="23" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Georgia,serif">{id}</text>
    </svg>
  );
  if (shape.type === "square") return (
    <svg width={s} height={s} viewBox="0 0 36 36">
      <rect x="3" y="3" width="30" height="30" rx="8" fill={c}/>
      <text x="18" y="23" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Georgia,serif">{id}</text>
    </svg>
  );
  if (shape.type === "triangle") return (
    <svg width={s} height={s} viewBox="0 0 36 36">
      <polygon points="18,4 34,32 2,32" fill={c}/>
      <text x="18" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="Georgia,serif">{id}</text>
    </svg>
  );
  if (shape.type === "diamond") return (
    <svg width={s} height={s} viewBox="0 0 36 36">
      <polygon points="18,2 34,18 18,34 2,18" fill={c}/>
      <text x="18" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="Georgia,serif">{id}</text>
    </svg>
  );
  if (shape.type === "hexagon") return (
    <svg width={s} height={s} viewBox="0 0 36 36">
      <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill={c}/>
      <text x="18" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="Georgia,serif">{id}</text>
    </svg>
  );
  if (shape.type === "star") return (
    <svg width={s} height={s} viewBox="0 0 36 36">
      <polygon points="18,2 22,13 34,13 24,20 28,32 18,25 8,32 12,20 2,13 14,13" fill={c}/>
      <text x="18" y="23" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="Georgia,serif">{id}</text>
    </svg>
  );
  return null;
}

export default function Navbar() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user      = JSON.parse(localStorage.getItem("user") || "null");
  const stored    = user || {};
  const firstName = stored.name?.split(" ")[0] || stored.email?.split("@")[0] || null;
  const avatarId  = stored.avatarId || 1;
  const shape     = AVATAR_SHAPES.find(a => a.id === avatarId) || AVATAR_SHAPES[0];

  return (
    <div className="fixed top-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-8 py-3 flex justify-between items-center z-50 transition-colors duration-200">

      {/* LOGO A */}
      <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer group">
        <div className="group-hover:scale-110 transition-transform duration-200">
          <EVLogo />
        </div>
        <span className="text-xl font-black">
          <span className="text-blue-600">Event</span>
          <span className="text-gray-900 dark:text-white">Verse</span>
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-base">
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!user ? (
          <>
            <button onClick={() => navigate("/login")}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm font-bold transition">
              Login
            </button>
            <button onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition hover:scale-105">
              Get started
            </button>
          </>
        ) : (
          <div className="relative flex items-center gap-2">
            {firstName && (
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden sm:block">
                Hey, <span className="text-blue-600 dark:text-blue-400">{firstName}</span>!
              </span>
            )}
            <div onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer hover:scale-110 transition rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-300">
              <AvatarShape shape={shape} size={36} />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 z-50">
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
                <button onClick={() => { setDropdownOpen(false); navigate("/dashboard/profile"); }}
                  className="w-full flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2 px-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition mb-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </button>
                <button onClick={() => { localStorage.removeItem("user"); setDropdownOpen(false); navigate("/login"); }}
                  className="w-full flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 py-2 px-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition">
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
  );
}