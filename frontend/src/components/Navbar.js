import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center z-50">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        <span className="text-blue-600">Event</span>
        <span className="text-gray-800">Verse</span>
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </>
        ) : (
          <div className="relative">

            {/* PROFILE CIRCLE */}
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
            >
              {user.email?.charAt(0).toUpperCase()}
            </div>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4">

                <p className="font-semibold text-gray-800">
                  {user.name || "User"}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {user.email}
                </p>

                <hr className="mb-3" />

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  className="text-red-500 w-full text-left"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}