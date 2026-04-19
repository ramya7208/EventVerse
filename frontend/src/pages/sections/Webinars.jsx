// ============================================================
// FILE: src/pages/sections/Webinars.jsx
// ACTION: REPLACE existing Webinars.jsx
// FIX: Dark mode added to all elements
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS, COLLEGES } from "../../data/collegeData";

function EventCard({ event, onRegister }) {
  const college = COLLEGES.find((c) => c.id === event.collegeId);
  const isUpcoming = event.status === "upcoming";

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border transition-all ${
      isUpcoming
        ? "border-2 border-teal-400 shadow-md"
        : "border-gray-100 dark:border-gray-800 hover:shadow-sm hover:border-gray-200 dark:hover:border-gray-700"
    }`}>
      <div className="relative h-40 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
        <div className="absolute top-2 left-2">
          <span className="text-xs px-2 py-1 rounded-full font-medium bg-teal-50 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300">Webinar</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${isUpcoming ? "bg-green-100 text-green-800" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {isUpcoming ? "Upcoming" : "Past"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white text-base mb-1">{event.title}</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{event.date} · {event.duration}</p>
        {college && <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">📍 {college.name}</p>}
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{event.description}</p>
        {event.status === "past" && event.rating && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-500 text-xs">{"★".repeat(Math.floor(event.rating))}{"☆".repeat(5 - Math.floor(event.rating))}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{event.rating} · {event.reviews} reviews</span>
          </div>
        )}
        {isUpcoming && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">{event.seats} seats</span>
            <button onClick={() => onRegister(event)} className="text-xs px-4 py-2 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 transition">
              Register Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Webinars() {
  const navigate = useNavigate();
  const events = EVENTS.filter((e) => e.category === "webinar");

  const handleRegister = (event) => {
    navigate("/event", { state: { title: event.title, date: event.date, domain: "webinar", description: event.description, image: event.image, seats: event.seats } });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-teal-500 rounded-full" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Webinars</h1>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-6 ml-6">Learn from experts — online sessions you can join from anywhere</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((e) => <EventCard key={e.id} event={e} onRegister={handleRegister} />)}
      </div>
    </div>
  );
}