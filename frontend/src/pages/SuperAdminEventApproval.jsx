// ============================================================
// FILE: src/pages/SuperAdminEventApproval.jsx
// ACTION: CREATE NEW FILE inside src/pages/
// CASE: Dedicated super admin event approval page
// ============================================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EVLogo } from "../components/Navbar";

const STATUS = {
  pending:  { bg: "bg-amber-50 dark:bg-amber-900/20",  text: "text-amber-700 dark:text-amber-300",  dot: "bg-amber-400",  label: "Pending Approval" },
  approved: { bg: "bg-green-50 dark:bg-green-900/20",  text: "text-green-700 dark:text-green-300",  dot: "bg-green-400",  label: "Approved"         },
  rejected: { bg: "bg-red-50 dark:bg-red-900/20",      text: "text-red-700 dark:text-red-300",      dot: "bg-red-400",    label: "Rejected"         },
};

const CAT = {
  hackathon: { bg: "bg-red-50 dark:bg-red-900/20",       text: "text-red-700 dark:text-red-300"       },
  workshop:  { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-700 dark:text-violet-300" },
  webinar:   { bg: "bg-teal-50 dark:bg-teal-900/20",     text: "text-teal-700 dark:text-teal-300"     },
  other:     { bg: "bg-gray-50 dark:bg-gray-900/20",     text: "text-gray-700 dark:text-gray-300"     },
};

export default function SuperAdminEventApproval() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch all events on component mount
  useEffect(() => {
    if (user.role !== "superAdmin") {
      navigate("/");
      return;
    }
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
      setEvents([]);
    }
  };

  const handleEventAction = async (eventId, action) => {
    setActionLoading(eventId);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${eventId}/status`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state
      setEvents(events.map(event =>
        event._id === eventId
          ? { ...event, status: action }
          : event
      ));

      alert(`Event ${action} successfully!`);
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event status. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const pendingEvents = events.filter(event => event.status === "pending");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading event requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── TOP HEADER ── */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <EVLogo size={28} />
              <span className="text-xs font-black uppercase tracking-[3px] text-red-600 dark:text-red-400">Super Admin</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Event Approval Center</h1>
            <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Review and approve events from college administrators
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/super-admin')}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition hover:scale-105 shadow-lg shadow-gray-500/20"
            >
              📊 Dashboard
            </button>
            <button
              onClick={fetchAllEvents}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition hover:scale-105 shadow-lg shadow-red-500/20"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* ── STATS CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Pending Review", value: pendingEvents.length, icon:"⏳", color:"text-amber-700 dark:text-amber-400", bg:"bg-amber-50 dark:bg-amber-900/20" },
            { label:"Total Events",   value: events.length,        icon:"📋", color:"text-blue-600 dark:text-blue-400", bg:"bg-blue-50 dark:bg-blue-900/20" },
            { label:"Approved",       value: events.filter(e => e.status === "approved").length, icon:"✅", color:"text-green-700 dark:text-green-400", bg:"bg-green-50 dark:bg-green-900/20" },
            { label:"Rejected",       value: events.filter(e => e.status === "rejected").length, icon:"❌", color:"text-red-700 dark:text-red-400", bg:"bg-red-50 dark:bg-red-900/20" },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── EVENT REQUESTS ── */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Event Approval Requests</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{pendingEvents.length} pending</span>
          </div>

          {pendingEvents.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-12 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
              <p className="text-gray-400 dark:text-gray-500">No pending event requests at the moment.</p>
            </div>
          ) : (
            pendingEvents.map(event => {
              const cat = CAT[event.category] || CAT.other;
              return (
                <div key={event._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-all">
                  <div className="flex items-start gap-6 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold capitalize ${cat.bg} ${cat.text}`}>{event.category}</span>
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                          {event.college}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                          {event.seats} seats
                        </span>
                      </div>

                      <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{event.title}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>📅 <strong>{new Date(event.date).toLocaleDateString()}</strong></div>
                        <div>🏢 <strong>{event.location}</strong></div>
                        <div>⏱️ <strong>{event.duration}</strong></div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{event.description}</p>

                      {/* CREATOR INFO */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Requested by:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{event.createdBy?.name || 'Unknown Admin'}</span>
                        <span>•</span>
                        <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-col gap-3 flex-shrink-0">
                      <button
                        onClick={() => handleEventAction(event._id, "approved")}
                        disabled={actionLoading === event._id}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-black text-sm transition hover:scale-105 shadow-lg shadow-green-500/20"
                      >
                        {actionLoading === event._id ? "..." : "✅ Approve Event"}
                      </button>
                      <button
                        onClick={() => handleEventAction(event._id, "rejected")}
                        disabled={actionLoading === event._id}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-xl font-black text-sm transition hover:scale-105 shadow-lg shadow-red-500/20"
                      >
                        {actionLoading === event._id ? "..." : "❌ Reject Event"}
                      </button>
                      <button
                        onClick={() => setSelectedEvent(selectedEvent === event._id ? null : event._id)}
                        className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition"
                      >
                        {selectedEvent === event._id ? "Hide Details" : "View Details"}
                      </button>
                    </div>
                  </div>

                  {/* EXPANDED DETAILS */}
                  {selectedEvent === event._id && (
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                      <h4 className="font-black text-gray-900 dark:text-white mb-3">Additional Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Event ID:</span>
                          <span className="ml-2 text-gray-600 dark:text-gray-400">{event._id}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">College:</span>
                          <span className="ml-2 text-gray-600 dark:text-gray-400">{event.college}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Category:</span>
                          <span className="ml-2 text-gray-600 dark:text-gray-400 capitalize">{event.category}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Created:</span>
                          <span className="ml-2 text-gray-600 dark:text-gray-400">{new Date(event.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}