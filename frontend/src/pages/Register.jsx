import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.password) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-700 to-blue-600 text-white flex-col justify-center px-16">
        <h1 className="text-5xl font-bold mb-6">Join EventVerse</h1>
        <p className="text-lg opacity-90">
          Create your account and start exploring amazing events across colleges.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-[380px]"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            Register
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
            Register
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>

      </div>
    </div>
  );
}