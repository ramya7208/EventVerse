import React from "react";

export default function UserSidebar({ setActiveSection }) {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 hidden md:block">

      <h2 className="text-2xl font-bold mb-10 text-gray-900">
        Event<span className="text-green-600">Verse</span>
      </h2>

      <ul className="space-y-6 text-gray-700 font-medium text-lg">

        <li
          onClick={() => setActiveSection("events")}
          className="hover:text-green-600 cursor-pointer transition"
        >
          All Events
        </li>

        <li
          onClick={() => setActiveSection("colleges")}
          className="hover:text-green-600 cursor-pointer transition"
        >
          Colleges
        </li>

        <li
          onClick={() => setActiveSection("webinars")}
          className="hover:text-green-600 cursor-pointer transition"
        >
          Webinars
        </li>

        <li
          onClick={() => setActiveSection("workshops")}
          className="hover:text-green-600 cursor-pointer transition"
        >
          Workshops
        </li>

        <li
          onClick={() => setActiveSection("hackathons")}
          className="hover:text-green-600 cursor-pointer transition"
        >
          Hackathons
        </li>

        <li
          onClick={() => setActiveSection("support")}
          className="hover:text-green-600 cursor-pointer transition"
        >
          Help & Support
        </li>

      </ul>
    </div>
  );
}