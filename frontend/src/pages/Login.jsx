import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      localStorage.setItem("user", JSON.stringify(formData));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex-col justify-center px-16">
        <h1 className="text-5xl font-bold mb-6">
  EventVerse
</h1>

<p className="text-lg opacity-90 mb-4">
  Your one-stop platform to discover, explore, and register for college events.
</p>

<ul className="text-sm opacity-80 space-y-2">
  <li>✔ Hackathons & Coding Contests</li>
  <li>✔ Workshops & Webinars</li>
  <li>✔ Events from Multiple Colleges</li>
</ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-[380px]"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            Login
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
            Login
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>

      </div>
    </div>
  );
}