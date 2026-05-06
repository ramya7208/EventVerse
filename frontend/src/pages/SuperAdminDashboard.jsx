// ============================================================
// FILE: src/pages/SuperAdminDashboard.jsx
// ACTION: CREATE NEW FILE inside src/pages/
// CASE: Super Admin dashboard for approving events
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

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tab, setTab] = useState("overview");
  const [events, setEvents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    if (user.role !== "superAdmin") {
      navigate("/");
      return;
    }
    fetchData();
  }, [navigate, user.role]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEvents(response.data);
      // Mock colleges and users for now
      setColleges([
        { _id: 1, name: "IIT Hyderabad", events: 15, admins: 2 },
        { _id: 2, name: "IIT Delhi", events: 12, admins: 1 },
        { _id: 3, name: "IIT Bombay", events: 18, admins: 3 }
      ]);
      setUsers([
        { _id: 1, name: "John Doe", email: "john@iith.ac.in", role: "student" },
        { _id: 2, name: "Admin User", email: "admin@iith.ac.in", role: "collegeadmin" }
      ]);
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

  const stats = {
    totalEvents: events.length,
    pending: events.filter(e => e.status === "pending").length,
    approved: events.filter(e => e.status === "approved").length,
    rejected: events.filter(e => e.status === "rejected").length,
    totalColleges: colleges.length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.role === "student").length,
    adminUsers: users.filter(u => u.role !== "student").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── PENDING APPROVALS ALERT ── */}
        {stats.pending > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="font-black text-amber-800 dark:text-amber-200 text-lg">Pending Approvals</h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    {stats.pending} event{stats.pending !== 1 ? 's' : ''} waiting for your review
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/super-admin/approvals')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-black text-sm transition hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                Review Now →
              </button>
            </div>
          </div>
        )}

        {/* ── TOP HEADER ── */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <EVLogo size={28} />
              <span className="text-xs font-black uppercase tracking-[3px] text-red-600 dark:text-red-400">Super Admin</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">EventVerse Control Center</h1>
            <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Manage all events across colleges
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/super-admin/approvals')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition hover:scale-105 shadow-lg shadow-red-500/20"
            >
              ⚡ Event Approvals
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition hover:scale-105 shadow-lg shadow-green-500/20"
            >
              👁️ View as Student
            </button>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Total Events",   value: stats.totalEvents,                                      icon:"📋", color:"text-blue-600 dark:text-blue-400",    bg:"bg-blue-50 dark:bg-blue-900/20"    },
            { label:"Pending Review", value: stats.pending,                                     icon:"⏳", color:"text-amber-700 dark:text-amber-400",   bg:"bg-amber-50 dark:bg-amber-900/20"  },
            { label:"Colleges",       value: stats.totalColleges,                                  icon:"🏫", color:"text-green-700 dark:text-green-400",   bg:"bg-green-50 dark:bg-green-900/20"  },
            { label:"Total Users",    value: stats.totalUsers,                                    icon:"👥", color:"text-purple-700 dark:text-purple-400", bg:"bg-purple-50 dark:bg-purple-900/20" },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
          {[
            ["overview", "📊 Overview"],
            ["events", "📋 Events"],
            ["colleges", "🏫 Colleges"],
            ["users", "👥 Users"]
          ].map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)}
              className={`px-6 py-3 text-sm font-black border-b-2 transition mr-2 ${tab === v ? "border-red-600 text-red-600 dark:text-red-400" : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              {l}
            </button>
          ))}
        </div>

        {/* ── CONTENT BASED ON TAB ── */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-sm">✅</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Event "AI Workshop" approved</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm">👤</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">New college admin registered</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Server Status</span>
                  <span className="text-sm font-semibold text-green-600">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                  <span className="text-sm font-semibold text-green-600">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API Response</span>
                  <span className="text-sm font-semibold text-green-600">Fast</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "events" && (
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No events found</h3>
                <p className="text-gray-400 dark:text-gray-500">No events in the system.</p>
              </div>
            ) : (
              events.map(event => {
                const st = STATUS[event.status] || STATUS.pending;
                const cat = CAT[event.category] || CAT.other;
                const fill = event.seats > 0 ? Math.round((event.seatsBooked / event.seats) * 100) : 0;

                return (
                  <div key={event._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start gap-5 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold capitalize ${cat.bg} ${cat.text}`}>{event.category}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${st.bg} ${st.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                            {event.college}
                          </span>
                        </div>
                        <h3 className="font-black text-gray-900 dark:text-white text-base mb-1">{event.title}</h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                          📅 {new Date(event.date).toLocaleDateString()} &nbsp;·&nbsp; 🏢 {event.location} &nbsp;·&nbsp; ⏱️ {event.duration}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{event.description}</p>

                        {/* REGISTRATION FILL BAR */}
                        {event.status === "approved" && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>{event.seatsBooked} registered</span>
                              <span>{fill}% full</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${fill}%` }} />
                            </div>
                          </div>
                        )}

                        {/* CREATOR INFO */}
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            Created by: <span className="font-semibold text-gray-600 dark:text-gray-300">{event.createdBy?.name || 'Unknown'}</span>
                            <span className="mx-2">•</span>
                            {new Date(event.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-lg font-black text-gray-900 dark:text-white">{event.seats}</div>
                          <div className="text-xs text-gray-400">seats</div>
                        </div>

                        {/* ACTION BUTTONS */}
                        {event.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEventAction(event._id, "approved")}
                              disabled={actionLoading === event._id}
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-xl font-bold text-xs transition"
                            >
                              {actionLoading === event._id ? "..." : "✅ Approve"}
                            </button>
                            <button
                              onClick={() => handleEventAction(event._id, "rejected")}
                              disabled={actionLoading === event._id}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-xl font-bold text-xs transition"
                            >
                              {actionLoading === event._id ? "..." : "❌ Reject"}
                            </button>
                          </div>
                        )}

                        {event.status === "approved" && (
                          <button
                            onClick={() => handleEventAction(event._id, "rejected")}
                            disabled={actionLoading === event._id}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-xl font-bold text-xs transition"
                          >
                            {actionLoading === event._id ? "..." : "🚫 Revoke"}
                          </button>
                        )}

                        {event.status === "rejected" && (
                          <button
                            onClick={() => handleEventAction(event._id, "approved")}
                            disabled={actionLoading === event._id}
                            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-xl font-bold text-xs transition"
                          >
                            {actionLoading === event._id ? "..." : "✅ Approve"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === "colleges" && (
          <div className="space-y-4">
            {colleges.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-12 text-center">
                <div className="text-6xl mb-4">🏫</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No colleges found</h3>
                <p className="text-gray-400 dark:text-gray-500">No colleges registered in the system.</p>
              </div>
            ) : (
              colleges.map(college => (
                <div key={college._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white text-lg">{college.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{college.events} events • {college.admins} admins</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition">
                      Manage
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "users" && (
          <div className="space-y-4">
            {users.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-12 text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No users found</h3>
                <p className="text-gray-400 dark:text-gray-500">No users registered in the system.</p>
              </div>
            ) : (
              users.map(user => (
                <div key={user._id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white text-lg">{user.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email} • {user.role}</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition">
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}