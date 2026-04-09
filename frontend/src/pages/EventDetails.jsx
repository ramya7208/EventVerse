import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EventDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-10">
        <h1 className="text-xl">No Event Data Found</h1>
      </div>
    );
  }

  const { title, date, domain, description } = state;

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600"
      >
        ← Back
      </button>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">

        <h1 className="text-3xl font-bold mb-4">{title}</h1>

        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> {date}
        </p>

        <p className="text-gray-600 mb-4">
          <strong>Domain:</strong> {domain}
        </p>

        <p className="text-gray-700 mb-6">{description}</p>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Register Now
        </button>

      </div>
    </div>
  );
}