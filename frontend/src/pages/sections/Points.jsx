// ============================================================
// FILE: src/pages/sections/Points.jsx
// ACTION: CREATE NEW FILE inside src/pages/sections/
// ============================================================
import React from "react";
import { getTotalPoints, getLevel, getPointsLog } from "../../data/userStore";

export default function Points() {
  const log   = getPointsLog();
  const pts   = getTotalPoints();
  const level = getLevel(pts);

  const REWARDS = [
    { pts: 50,  icon: "🎁", name: "Profile Badge",   desc: "Unlock Rising Star badge on your profile",  unlocked: pts >= 50  },
    { pts: 100, icon: "⚡", name: "Priority Access", desc: "Early registration for select events",       unlocked: pts >= 100 },
    { pts: 200, icon: "🎟️", name: "Free Workshop",  desc: "One free workshop registration",             unlocked: pts >= 200 },
    { pts: 350, icon: "🏆", name: "Expert Profile",  desc: "Expert badge visible on your profile",       unlocked: pts >= 350 },
    { pts: 500, icon: "🌟", name: "Legend Status",   desc: "Lifetime Legend badge — top 1% of users",   unlocked: pts >= 500 },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-yellow-400 rounded-full" />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Points & Rewards</h1>
        <span className="text-xl">💰</span>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 ml-6">
        Earn points by participating — unlock exclusive rewards
      </p>

      {/* HERO + HOW TO EARN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* POINTS CARD */}
        <div className="md:col-span-2 rounded-3xl p-7 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#1e3a8a,#4f46e5)" }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
            style={{ background:"radial-gradient(circle,#93c5fd,transparent)", transform:"translate(20%,-20%)" }} />
          <div className="relative">
            <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-2">Total Points</p>
            <h2 className="text-6xl font-black leading-none mb-2">{pts}</h2>
            <p className="text-blue-200 text-base">
              Level {level.level} · <span className="text-white font-black">{level.name}</span>
            </p>
            <div className="mt-5 h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width:`${Math.min(level.progress,100)}%` }} />
            </div>
            {level.next
              ? <p className="text-blue-300 text-xs mt-2">{level.next - pts} pts to Level {level.level + 1}</p>
              : <p className="text-yellow-300 text-xs mt-2 font-black">🎉 Maximum level reached!</p>
            }
          </div>
        </div>

        {/* HOW TO EARN */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 border border-gray-100 dark:border-gray-800">
          <h3 className="font-black text-gray-900 dark:text-white text-sm mb-4">How to earn</h3>
          {[
            { a:"Register for an event", p:"+25", i:"🎟️" },
            { a:"Attend an event",       p:"+30", i:"✅" },
            { a:"Rate an event",         p:"+15", i:"⭐" },
            { a:"Follow a college",      p:"+10", i:"❤️" },
            { a:"Save an event",         p:"+5",  i:"🔖" },
          ].map(r => (
            <div key={r.a} className="flex items-center gap-2.5 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <span className="text-sm flex-shrink-0">{r.i}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex-1">{r.a}</span>
              <span className="text-xs font-black text-green-600 dark:text-green-400">{r.p} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* REWARDS */}
      <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">Rewards</h2>
      <div className="space-y-3 mb-8">
        {REWARDS.map(r => (
          <div key={r.pts}
            className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all ${
              r.unlocked
                ? "bg-white dark:bg-gray-900 border-yellow-300 dark:border-yellow-600 shadow-sm"
                : "bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 opacity-55"
            }`}>
            <div className={`text-3xl flex-shrink-0 ${!r.unlocked && "grayscale"}`}>{r.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-gray-900 dark:text-white text-sm">{r.name}</h4>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{r.desc}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              {r.unlocked
                ? <span className="text-xs font-black text-green-600 dark:text-green-400">✓ Unlocked</span>
                : <span className="text-xs font-black text-gray-400">{r.pts} pts</span>
              }
            </div>
          </div>
        ))}
      </div>

      {/* POINTS HISTORY */}
      <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">Points History</h2>
      {log.length === 0 ? (
        <div className="text-center py-14 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-4xl mb-3">📊</p>
          <p className="font-black text-gray-900 dark:text-white mb-1">No points yet</p>
          <p className="text-gray-400 text-sm">Register for an event or follow a college to start earning!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {log.map((entry, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{entry.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{entry.date}</p>
              </div>
              <span className="text-sm font-black text-green-600 dark:text-green-400">+{entry.pts} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}