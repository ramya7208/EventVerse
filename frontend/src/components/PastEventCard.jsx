import React from "react";

export default function PastEventCard({ img, title, date, domain, rating, review }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-72 flex-shrink-0 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
      
      {/* Event Image */}
      <img src={img} alt={title} className="h-40 w-full object-cover rounded-lg mb-4" />
      
      {/* Event Info */}
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-gray-300 mb-1">{date} | {domain}</p>

      {/* Rating */}
      <div className="flex items-center mb-2">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {Array.from({ length: 5 - rating }, (_, i) => (
          <span key={i} className="text-gray-500">★</span>
        ))}
      </div>

      {/* Review snippet */}
      <p className="text-gray-300 text-sm line-clamp-3">{review}</p>
    </div>
  );
}