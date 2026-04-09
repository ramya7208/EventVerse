import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center pt-32 px-6">

        <h1 className="text-6xl font-bold mb-6">
          Discover Events <br /> That Matter
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          EventVerse helps students find hackathons, workshops, and tech events from multiple colleges in one place.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Create Account
          </button>
        </div>

      </div>

    </div>
  );
}