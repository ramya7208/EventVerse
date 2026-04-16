import React from "react";
import { useNavigate } from "react-router-dom";

export default function Colleges() {
  const navigate = useNavigate();

  const colleges = [
    {
      id: 1,
      name: "IIT Hyderabad",
      logo: "https://via.placeholder.com/400x200?text=IIT+Hyderabad"
    },
    {
      id: 2,
      name: "NIT Warangal",
      logo: "https://via.placeholder.com/400x200?text=NIT+Warangal"
    },
    {
      id: 3,
      name: "JNTU Hyderabad",
      logo: "https://via.placeholder.com/400x200?text=JNTU+Hyderabad"
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Colleges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div
            key={college.id}
            onClick={() => navigate(`/colleges/${college.id}`)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer overflow-hidden"
          >
            <img
              src={college.logo}
              alt=""
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-center">
                {college.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}