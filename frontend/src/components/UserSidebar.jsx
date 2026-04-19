// ============================================================
// FILE: src/components/UserSidebar.jsx
// ACTION: REPLACE existing UserSidebar.jsx
// CASE 8+9: Premium sidebar with new EV logo + luxury design
// ============================================================

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/dashboard",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Colleges",
    path: "/dashboard/colleges",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-4h8" />
      </svg>
    ),
  },
  {
    label: "Hackathons",
    path: "/dashboard/hackathons",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Workshops",
    path: "/dashboard/workshops",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Webinars",
    path: "/dashboard/webinars",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
  },
  {
    label: "Support",
    path: "/dashboard/support",
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

function EVLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#2563EB"/>
      <text x="4" y="26" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="white" letterSpacing="-1">EV</text>
      <rect x="4" y="28" width="28" height="2.5" rx="1.25" fill="#93C5FD"/>
    </svg>
  );
}

export default function UserSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`
      ${collapsed ? "w-[68px]" : "w-[220px]"}
      min-h-screen bg-white dark:bg-gray-900
      border-r border-gray-100 dark:border-gray-800
      flex flex-col flex-shrink-0
      transition-all duration-300 ease-in-out
      hidden md:flex
    `}>
      {/* LOGO ROW */}
      <div className={`flex items-center px-4 py-5 border-b border-gray-100 dark:border-gray-800 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <EVLogo />
            <span className="font-black text-base">
              <span className="text-blue-600">Event</span>
              <span className="text-gray-900 dark:text-white">Verse</span>
            </span>
          </div>
        )}
        {collapsed && <EVLogo />}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {collapsed && (
          <button onClick={() => setCollapsed(false)}
            className="absolute mt-14 ml-2 w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          </button>
        )}
      </div>

      {/* EXPAND BUTTON when collapsed */}
      {collapsed && (
        <button onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group ${
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
                <span className="flex-shrink-0">{item.icon(isActive)}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-gray-50 dark:border-gray-800">
          <p className="text-xs text-gray-300 dark:text-gray-700 text-center font-medium">EventVerse © 2026</p>
        </div>
      )}
    </div>
  );
}