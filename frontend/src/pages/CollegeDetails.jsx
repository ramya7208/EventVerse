import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CollegeDetails() {
  const { id } = useParams();
  const [filter, setFilter] = useState("ALL");
  const scrollRef = useRef();

  // AUTO SCROLL
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let interval = setInterval(() => {
      container.scrollBy({ left: 320, behavior: "smooth" });
    }, 3000);

    // pause on hover
    container.onmouseenter = () => clearInterval(interval);
    container.onmouseleave = () => {
      interval = setInterval(() => {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }, 3000);
    };

    return () => clearInterval(interval);
  }, []);

  const colleges = [
    {
      id: 1,
      name: "IIT Hyderabad",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/IIT_Hyderabad_Logo.svg",

      highlights: [
        {
          image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
          eventName: "Elan Hackathon"
        },
        {
          image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
          eventName: "Cultural Night"
        }
      ],

      events: [
        { id: 1, name: "Elan Hackathon", category: "TECHNICAL", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", description: "Hackathon" },
        { id: 2, name: "AI Challenge", category: "TECHNICAL", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c", description: "AI event" },
        { id: 3, name: "Cyber CTF", category: "TECHNICAL", image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87", description: "Security event" },
        { id: 4, name: "Robotics War", category: "TECHNICAL", image: "https://images.unsplash.com/photo-1581090700227-1e8b7a5c9b2d", description: "Robots" },

        { id: 5, name: "Dance Night", category: "NON_TECHNICAL", image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e", description: "Dance" },
        { id: 6, name: "Fashion Show", category: "NON_TECHNICAL", image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53", description: "Fashion" },
        { id: 7, name: "Concert", category: "NON_TECHNICAL", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae", description: "Music" }
      ]
    }
  ];

  const college = colleges.find((c) => c.id === Number(id));
  if (!college) return <p className="p-6">College not found</p>;

  const filteredEvents =
    filter === "ALL"
      ? college.events
      : college.events.filter((e) => e.category === filter);

  // BUTTON SCROLL
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-6 pt-24">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5">
        <img src={college.logo} alt={college.name} className="h-20 w-20 object-contain" />
        <h1 className="text-3xl font-bold">{college.name}</h1>
      </div>

      {/* HIGHLIGHTS */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Past Highlights</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {college.highlights.map((item, i) => (
            <div key={i} className="relative group overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.eventName}
                className="h-40 w-full object-cover group-hover:scale-110 transition"
              />
              <div className="absolute bottom-0 bg-black/60 text-white w-full text-sm p-2 opacity-0 group-hover:opacity-100">
                {item.eventName}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER */}
      <div className="mt-8 flex gap-3">
        {["ALL", "TECHNICAL", "NON_TECHNICAL"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full ${
              filter === f ? "bg-black text-white" : "bg-white border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* EVENTS SLIDER */}
      <div className="mt-8 relative">
        <h2 className="text-xl font-semibold mb-4">Events</h2>

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-2 rounded-full z-10"
        >
          ◀
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-2 rounded-full z-10"
        >
          ▶
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-10"
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="min-w-[300px] max-w-[300px] snap-start bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={event.image}
                alt={event.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}