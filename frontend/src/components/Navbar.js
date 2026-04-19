// ============================================================
// FILE: src/components/Navbar.js
// ACTION: REPLACE existing Navbar.js
// CASE 1: Back uses chevron icon only, no text arrow
// CASE 9: Premium EV monogram logo
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function EVLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="38" rx="11" fill="#2563EB"/>
      <text x="5" y="27" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="white" letterSpacing="-1">EV</text>
      <rect x="5" y="29.5" width="28" height="2.5" rx="1.25" fill="#93C5FD"/>
    </svg>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const stored = user || {};
  const firstName = stored.name?.split(" ")[0] || stored.email?.split("@")[0] || null;
  const avatarId  = stored.avatarId || 1;
  const AVATAR_BG = ["#e8f4ea","#1e3a5f","#e8734a","#1e3a5f","#f0ece4","#0e7490"];
  const AVATAR_FACE = ["😊","😄","😁","🥰","😌","😎"];
  const bg   = AVATAR_BG[(avatarId - 1) % AVATAR_BG.length];
  const face = AVATAR_FACE[(avatarId - 1) % AVATAR_FACE.length];

  return (
    <div className="fixed top-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-8 py-3 flex justify-between items-center z-50 transition-colors duration-200">

      {/* LOGO */}
      <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer group">
        <div className="group-hover:scale-110 transition-transform">
          <EVLogo />
        </div>
        <span className="text-xl font-black">
          <span className="text-blue-600">Event</span>
          <span className="text-gray-900 dark:text-white">Verse</span>
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* DARK MODE */}
        <button onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-base"
          title="Toggle dark mode">
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!user ? (
          <>
            <button onClick={() => navigate("/login")}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-bold transition">
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

            {/* AVATAR with emoji */}
            <div onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-xl hover:scale-110 transition border-2 border-transparent hover:border-blue-300"
              style={{ background: bg }}>
              {face}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 z-50">
                {/* USER INFO */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: bg }}>
                    {face}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{stored.name || firstName}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{stored.email}</p>
                    <p className="text-xs text-blue-500 capitalize font-semibold">{stored.role || "student"}</p>
                  </div>
                </div>

                <button onClick={() => { setDropdownOpen(false); navigate("/dashboard/profile"); }}
                  className="w-full flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 px-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition mb-1">
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