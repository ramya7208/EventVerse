import React from "react";

export default function Colleges() {
  const colleges = [
    "IIT Hyderabad",
    "NIT Warangal",
    "JNTU Hyderabad",
    "BITS Pilani",
    "IIIT Hyderabad"
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Colleges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colleges.map((college, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
          >
            {college}
          </div>
        ))}
      </div>
    </div>
  );
}