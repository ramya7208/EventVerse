// ============================================================
// FILE: src/pages/sections/Colleges.jsx
// ACTION: REPLACE existing Colleges.jsx
// CASE 1 FIX: Dark mode on ALL college cards
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLLEGES } from "../../data/collegeData";

function CollegeCard({ college, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
    >
      {/* BANNER */}
      <div className="relative h-28 overflow-hidden">
        <img
          src={college.banner}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.style.background = college.color; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 right-3">
          <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/30">
            {college.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* LOGO */}
          <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
            {!imgError ? (
              <img
                src={college.logo}
                alt={college.shortName}
                className="w-9 h-9 object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="font-semibold text-sm" style={{ color: college.color }}>
                {college.initials}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{college.name}</h3>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 truncate">{college.location}</p>
          </div>
        </div>

        {/* STATS */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 dark:border-gray-800">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 dark:text-white">{college.stats.events}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">events</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 dark:text-white">{college.stats.registrations}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">registrations</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-yellow-500">★ {college.stats.rating}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">{college.stats.totalRatings} ratings</div>
          </div>
          <div className="text-blue-600 dark:text-blue-400 text-xs font-medium group-hover:underline">View →</div>
        </div>
      </div>
    </div>
  );
}

export default function Colleges() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = COLLEGES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Colleges</h1>
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onClick={() => navigate(`/college/${college.id}`)}
          />
        ))}
      </div>
    </div>
  );
}