import React from "react";
import { useNavigate } from "react-router-dom";

export default function UpcomingEventCard({ title, date, domain, description }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate("/event", {
          state: { title, date, domain, description },
        })
      }
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer w-full md:w-96"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 mb-1">{date} | {domain}</p>
      <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
}