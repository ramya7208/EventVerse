import React from "react";

export default function EventCard({ title, date, domain }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-72 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-300 mb-1">Date: {date}</p>
      <p className="text-gray-300 mb-4">Domain: {domain}</p>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
        Register
      </button>
    </div>
  );
}