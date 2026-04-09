import React, { useState } from "react";
import UpcomingEventCard from "../components/UpcomingEventCard";
import UserSidebar from "../components/UserSidebar";

import Colleges from "./sections/Colleges";
import Webinars from "./sections/Webinars";
import Workshops from "./sections/Workshops";
import Hackathons from "./sections/Hackathons";
import Support from "./sections/Support";

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState("events");

  const events = [
    {
      title: "AI Hackathon 2026",
      date: "2026-03-10",
      domain: "AI/ML",
      description: "An exciting hackathon focused on AI and machine learning projects."
    },
    {
      title: "Fullstack Workshop",
      date: "2026-03-15",
      domain: "Web Development",
      description: "Hands-on workshop for building fullstack web applications."
    },
    {
      title: "Data Science Challenge",
      date: "2026-03-20",
      domain: "Data Science",
      description: "Apply data science skills to real-world datasets."
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-900">

      <UserSidebar setActiveSection={setActiveSection} />

      <div className="flex-1 px-10 py-10">

        {activeSection === "events" && (
          <>
            <h1 className="text-3xl font-semibold mb-8">Events</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <UpcomingEventCard key={index} {...event} />
              ))}
            </div>
          </>
        )}

        {activeSection === "colleges" && <Colleges />}
        {activeSection === "webinars" && <Webinars />}
        {activeSection === "workshops" && <Workshops />}
        {activeSection === "hackathons" && <Hackathons />}
        {activeSection === "support" && <Support />}

      </div>
    </div>
  );
}