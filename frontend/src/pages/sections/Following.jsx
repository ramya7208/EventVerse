// ============================================================
// FILE: src/pages/sections/Following.jsx
// ACTION: REPLACE existing Following.jsx
// FIX: No useState inside .map() — extracted as proper component
// ============================================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFollowed, toggleFollow } from "../../data/userStore";
import { COLLEGES, EVENTS } from "../../data/collegeData";

// ✅ Proper component — hooks allowed here
function CollegeLogo({ college }) {
  const [err, setErr] = useState(false);
  return (
    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
      {!err
        ? <img src={college.logo} alt={college.shortName} className="w-12 h-12 object-contain" onError={() => setErr(true)} />
        : <span className="font-black text-lg" style={{ color: college.color }}>{college.initials}</span>
      }
    </div>
  );
}

// ✅ Proper component for upcoming event row — no hooks inside map
function UpcomingEventRow({ event, onRegister }) {
  const college = COLLEGES.find(c => c.id === event.collegeId);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      onClick={() => onRegister(event)}
      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
        {!imgErr
          ? <img src={event.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={() => setImgErr(true)} />
          : <div className="w-full h-full bg-blue-100 dark:bg-blue-900/20 rounded-xl" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-black text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          {event.title}
        </h4>
        <p className="text-xs text-gray-400 mt-0.5">
          {college?.name} · {event.date}
        </p>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onRegister(event); }}
        className="flex-shrink-0 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition hover:scale-105"
      >
        Register
      </button>
    </div>
  );
}

// ✅ Followed college card — proper component
function FollowedCollegeCard({ college, onUnfollow, onView }) {
  const collegeEvents = EVENTS.filter(e => e.collegeId === college.id && e.status === "upcoming").length;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4 hover:shadow-md transition-all">
      <CollegeLogo college={college} />
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView(college.id)}>
        <h3 className="font-black text-gray-900 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-400 transition">
          {college.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{college.location}</p>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
          <span className="text-yellow-500 font-bold">★ {college.stats.rating}</span>
          <span>{collegeEvents} upcoming event{collegeEvents !== 1 ? "s" : ""}</span>
        </div>
      </div>
      <button
        onClick={() => onUnfollow(college.id)}
        className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-black border-2 border-pink-400 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition"
      >
        Unfollow
      </button>
    </div>
  );
}

// ✅ Discover card — proper component
function DiscoverCollegeCard({ college, onFollow, onView }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4 hover:shadow-md transition-all">
      <CollegeLogo college={college} />
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView(college.id)}>
        <h3 className="font-black text-gray-900 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-400 transition">
          {college.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{college.location}</p>
        <p className="text-xs text-yellow-500 font-bold mt-0.5">
          ★ {college.stats.rating} · {college.stats.events} events
        </p>
      </div>
      <button
        onClick={() => onFollow(college.id)}
        className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white transition hover:scale-105"
      >
        + Follow
      </button>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────
export default function Following() {
  const navigate = useNavigate();
  const [followedIds, setFollowedIds] = useState(getFollowed());

  const followedColleges   = COLLEGES.filter(c => followedIds.includes(c.id));
  const unfollowedColleges = COLLEGES.filter(c => !followedIds.includes(c.id));
  const upcomingFromFollowed = EVENTS.filter(
    e => e.status === "upcoming" && followedIds.includes(e.collegeId)
  );

  const handleToggle = (collegeId) => {
    const updated = toggleFollow(collegeId);
    setFollowedIds([...updated]);
    window.dispatchEvent(new Event("storage"));
  };

  const handleRegister = (event) => {
    navigate(`/register-event/${event.id}`, { state: { event } });
  };

  const handleViewCollege = (id) => {
    navigate(`/college/${id}`);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-pink-500 rounded-full" />
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Following</h1>
        <span className="text-xl">❤️</span>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 ml-6">
        Colleges you follow — stay updated on their latest events
      </p>

      {/* FOLLOWED COLLEGES */}
      {followedColleges.length === 0 ? (
        <div className="text-center py-14 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 mb-8">
          <p className="text-5xl mb-4">🏫</p>
          <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">Not following any college yet</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Follow colleges below to stay updated on their events.</p>
        </div>
      ) : (
        <>
          <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">
            Following <span className="text-sm font-normal text-gray-400">({followedColleges.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {followedColleges.map(college => (
              <FollowedCollegeCard
                key={college.id}
                college={college}
                onUnfollow={handleToggle}
                onView={handleViewCollege}
              />
            ))}
          </div>

          {/* UPCOMING EVENTS FROM FOLLOWED COLLEGES */}
          {upcomingFromFollowed.length > 0 && (
            <div className="mb-8">
              <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">
                Upcoming from colleges you follow
                <span className="ml-2 text-sm font-normal text-gray-400">({upcomingFromFollowed.length})</span>
              </h2>
              <div className="space-y-3">
                {upcomingFromFollowed.map(event => (
                  <UpcomingEventRow
                    key={event.id}
                    event={event}
                    onRegister={handleRegister}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* DISCOVER MORE COLLEGES */}
      {unfollowedColleges.length > 0 && (
        <>
          <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">
            Discover more colleges
            <span className="ml-2 text-sm font-normal text-gray-400">({unfollowedColleges.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unfollowedColleges.map(college => (
              <DiscoverCollegeCard
                key={college.id}
                college={college}
                onFollow={handleToggle}
                onView={handleViewCollege}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}