// ============================================================
// FILE: src/pages/sections/Badges.jsx
// ACTION: CREATE NEW FILE inside src/pages/sections/
// ============================================================
import React from "react";
import { getBadges, getTotalPoints, getLevel } from "../../data/userStore";

export default function Badges() {
  const badges = getBadges();
  const earned = badges.filter(b => b.earned);
  const locked = badges.filter(b => !b.earned);
  const pts    = getTotalPoints();
  const level  = getLevel(pts);

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-amber-400 rounded-full" />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Badges</h1>
        <span className="text-xl">🏅</span>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 ml-6">
        Earn badges by participating in events and engaging with EventVerse
      </p>

      {/* LEVEL BANNER */}
      <div className="rounded-3xl p-7 mb-8 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${level.color}ee, ${level.color}99)` }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle,white,transparent)", transform: "translate(20%,-20%)" }} />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Current Level</p>
            <h2 className="text-4xl font-black mb-1">{level.name}</h2>
            <p className="text-white/80 text-sm">{pts} points · {earned.length}/{badges.length} badges</p>
            <div className="mt-4 w-48 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width:`${Math.min(level.progress,100)}%` }} />
            </div>
            {level.next && <p className="text-white/60 text-xs mt-1.5">{level.next - pts} pts to next level</p>}
          </div>
          <div className="text-6xl">{["🌱","⭐","💎","🏆","🌟"][level.level - 1]}</div>
        </div>
      </div>

      {/* EARNED BADGES */}
      {earned.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">
            Earned <span className="text-sm font-normal text-gray-400">({earned.length})</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earned.map(badge => (
              <div key={badge.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 border-2 text-center hover:shadow-lg transition-all hover:scale-105 duration-200"
                style={{ borderColor: badge.color + "50" }}>
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-black text-gray-900 dark:text-white text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">{badge.desc}</p>
                <div className="mt-3 text-xs font-black" style={{ color: badge.color }}>✓ Earned</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOCKED BADGES */}
      {locked.length > 0 && (
        <div>
          <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">
            Locked <span className="text-sm font-normal text-gray-400">({locked.length})</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locked.map(badge => (
              <div key={badge.id}
                className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center opacity-50 hover:opacity-75 transition-all">
                <div className="text-4xl mb-3 grayscale">{badge.icon}</div>
                <h3 className="font-black text-gray-700 dark:text-gray-300 text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-400 leading-tight">{badge.desc}</p>
                <div className="mt-3 text-xs text-gray-400">🔒 Locked</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {earned.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 mb-6">
          <p className="text-5xl mb-4">🏅</p>
          <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">No badges yet</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mx-auto">
            Register for events, follow colleges and rate events to earn your first badge!
          </p>
        </div>
      )}
    </div>
  );
}