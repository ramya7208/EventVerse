// ============================================================
// FILE: src/pages/sections/Trending.jsx — CREATE NEW FILE
// ============================================================
import React from "react";
import { useNavigate } from "react-router-dom";
import { getTrending } from "../../data/userStore";
import { COLLEGES, CLUBS } from "../../data/collegeData";

function CollegeLogo({ college }) {
  const [err, setErr] = React.useState(false);
  if (!college) return null;
  return (
    <div className="w-5 h-5 rounded bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
      {!err
        ? <img src={college.logo} alt="" className="w-4 h-4 object-contain" onError={() => setErr(true)} />
        : <span style={{ color: college.color, fontSize: "7px" }} className="font-black">{college.initials}</span>
      }
    </div>
  );
}

const CAT_PILL = {
  hackathon: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
  webinar:   "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
  workshop:  "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300",
};

export default function Trending() {
  const navigate = useNavigate();
  const events   = getTrending();

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-orange-500 rounded-full" />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Trending Now</h1>
        <span className="text-xl">🔥</span>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 ml-6">
        Most popular events right now — sorted by ratings and registrations
      </p>

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {events.slice(0, 3).map((event, i) => {
          const college = COLLEGES.find(c => c.id === event.collegeId);
          const club    = CLUBS.find(c => c.id === event.clubId);
          const medals  = ["🥇", "🥈", "🥉"];
          const borders = ["border-yellow-300 dark:border-yellow-600", "border-gray-300 dark:border-gray-600", "border-orange-300 dark:border-orange-700"];

          return (
            <div key={event.id} onClick={() => navigate(`/event/${event.id}`, { state: { event } })}
              className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border-2 ${borders[i]} hover:shadow-xl transition-all duration-300 cursor-pointer group`}>
              <div className="relative h-40 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.style.display="none"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 text-2xl">{medals[i]}</div>
                {event.rating && (
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-white text-xs font-bold">{event.rating}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${CAT_PILL[event.category] || CAT_PILL.workshop}`}>{event.category}</span>
                <h3 className="font-black text-gray-900 dark:text-white text-base mt-2 mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CollegeLogo college={college} />
                  <span>{college?.shortName}</span>
                  <span>·</span>
                  <span>{event.reviews || 0} reviews</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* REST OF LIST */}
      <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">More trending events</h2>
      <div className="space-y-3">
        {events.slice(3).map((event, i) => {
          const college = COLLEGES.find(c => c.id === event.collegeId);
          const club    = CLUBS.find(c => c.id === event.clubId);
          return (
            <div key={event.id} onClick={() => navigate(`/event/${event.id}`, { state: { event } })}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer group">
              <div className="text-lg font-black text-gray-300 dark:text-gray-600 w-6 text-center flex-shrink-0">#{i + 4}</div>
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                <img src={event.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.target.style.display="none"; }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{event.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <CollegeLogo college={college} />
                  <span className="text-xs text-gray-400">{college?.shortName} · {event.date}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {event.rating && <div className="text-yellow-500 text-xs font-black">★ {event.rating}</div>}
                <div className="text-xs text-gray-400">{event.reviews || 0} reviews</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}