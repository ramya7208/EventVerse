// ============================================================
// FILE: src/pages/SuperAdminEventApproval.jsx
// ACTION: CREATE NEW FILE inside src/pages/
// CASE: Dedicated event approval page for super admin
// Route: /super-admin/approvals
// ============================================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const STATUS = {
  pending:  { bg: "bg-amber-50 dark:bg-amber-900/20",  text: "text-amber-700 dark:text-amber-300",  dot: "bg-amber-400",  label: "Pending"  },
  approved: { bg: "bg-green-50 dark:bg-green-900/20",  text: "text-green-700 dark:text-green-300",  dot: "bg-green-400",  label: "Approved" },
  rejected: { bg: "bg-red-50 dark:bg-red-900/20",      text: "text-red-700 dark:text-red-300",      dot: "bg-red-400",    label: "Rejected" },
};

const CAT = {
  hackathon: { bg: "bg-red-50 dark:bg-red-900/20",       text: "text-red-700 dark:text-red-300"       },
  workshop:  { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-700 dark:text-violet-300" },
  webinar:   { bg: "bg-teal-50 dark:bg-teal-900/20",     text: "text-teal-700 dark:text-teal-300"     },
  other:     { bg: "bg-gray-50 dark:bg-gray-900/20",     text: "text-gray-700 dark:text-gray-300"     },
};

const FILTERS = ["all", "pending", "approved", "rejected"];

export default function SuperAdminEventApproval() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [events,        setEvents]        = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [filter,        setFilter]        = useState("pending"); // default to pending
  const [search,        setSearch]        = useState("");
  const [toast,         setToast]         = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (eventId, action) => {
    setActionLoading(eventId);
    try {
      await axios.put(
        `http://localhost:5000/api/events/${eventId}/status`,
        { status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents((prev) =>
        prev.map((e) => (e._id === eventId ? { ...e, status: action } : e))
      );
      showToast(
        action === "approved"
          ? "✅ Event approved and published!"
          : "❌ Event rejected.",
        action === "approved" ? "green" : "red"
      );
    } catch (err) {
      console.error("Error updating event:", err);
      showToast("Failed to update event status.", "red");
    } finally {
      setActionLoading(null);
    }
  };

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Filtered + searched events ──────────────────────────────
  const visible = events.filter((e) => {
    const matchesFilter = filter === "all" || e.status === filter;
    const matchesSearch =
      !search ||
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.college?.toLowerCase().includes(search.toLowerCase()) ||
      e.category?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = events.filter((e) => e.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-bold
          ${toast.color === "green" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <button
              onClick={() => navigate("/super-admin")}
              className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1 mb-2 transition"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">⚡ Event Approvals</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">
              Review and approve events submitted by college admins
            </p>
          </div>
          <button
            onClick={fetchEvents}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
          >
            🔄 Refresh
          </button>
        </div>

        {/* ── PENDING BANNER ── */}
        {pendingCount > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-6 py-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">⏳</span>
            <p className="text-amber-800 dark:text-amber-200 font-semibold text-sm">
              {pendingCount} event{pendingCount !== 1 ? "s" : ""} waiting for approval
            </p>
            {filter !== "pending" && (
              <button
                onClick={() => setFilter("pending")}
                className="ml-auto text-xs font-bold text-amber-700 dark:text-amber-300 underline"
              >
                Show pending
              </button>
            )}
          </div>
        )}

        {/* ── FILTER + SEARCH BAR ── */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Filter tabs */}
          <div className="flex gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
            {FILTERS.map((f) => {
              const count = f === "all"
                ? events.length
                : events.filter((e) => e.status === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black capitalize transition
                    ${filter === f
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                >
                  {f} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[180px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, college, category…"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ── EVENT LIST ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : visible.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-16 text-center">
            <div className="text-5xl mb-4">
              {filter === "pending" ? "🎉" : "📭"}
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
              {filter === "pending" ? "All caught up!" : "No events found"}
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {filter === "pending"
                ? "No pending events right now."
                : `No ${filter === "all" ? "" : filter + " "}events match your search.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                actionLoading={actionLoading}
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── EventCard — named component (never inline in .map) ────────
function EventCard({ event, actionLoading, onAction }) {
  const [expanded, setExpanded] = useState(false);
  const busy = actionLoading === event._id;
  const st   = STATUS[event.status] || STATUS.pending;
  const cat  = CAT[event.category]  || CAT.other;

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border p-6 hover:shadow-md transition-all
      ${event.status === "pending"
        ? "border-amber-200 dark:border-amber-800/50"
        : "border-gray-100 dark:border-gray-800"
      }`}>

      {/* Top row */}
      <div className="flex items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-0">

          {/* Badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold capitalize ${cat.bg} ${cat.text}`}>
              {event.category}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${st.bg} ${st.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
              {st.label}
            </span>
            {event.college && (
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                {event.college}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-black text-gray-900 dark:text-white text-base">{event.title}</h3>

          {/* Meta */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            📅 {new Date(event.date).toLocaleDateString()}
            {event.duration  && <> &nbsp;·&nbsp; ⏱️ {event.duration}</>}
            {event.seats     && <> &nbsp;·&nbsp; 💺 {event.seats} seats</>}
            {event.location  && <> &nbsp;·&nbsp; 📍 {event.location}</>}
          </p>

          {/* Description (expandable) */}
          <p className={`text-sm text-gray-600 dark:text-gray-400 mt-2 ${expanded ? "" : "line-clamp-2"}`}>
            {event.description}
          </p>
          {event.description?.length > 120 && (
            <button
              onClick={() => setExpanded((x) => !x)}
              className="text-xs text-blue-500 hover:underline mt-1"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          {/* Submitted by */}
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Submitted by:{" "}
              <span className="font-semibold text-gray-600 dark:text-gray-300">
                {event.createdBy?.name || "Unknown"}
              </span>
              {event.createdAt && (
                <>
                  <span className="mx-2">·</span>
                  {new Date(event.createdAt).toLocaleDateString()}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {event.status === "pending" && (
            <>
              <button
                onClick={() => onAction(event._id, "approved")}
                disabled={busy}
                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400
                           text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
              >
                {busy ? "…" : "✅ Approve"}
              </button>
              <button
                onClick={() => onAction(event._id, "rejected")}
                disabled={busy}
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400
                           text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
              >
                {busy ? "…" : "❌ Reject"}
              </button>
            </>
          )}
          {event.status === "approved" && (
            <button
              onClick={() => onAction(event._id, "rejected")}
              disabled={busy}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400
                         text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
            >
              {busy ? "…" : "🚫 Revoke"}
            </button>
          )}
          {event.status === "rejected" && (
            <button
              onClick={() => onAction(event._id, "approved")}
              disabled={busy}
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400
                         text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
            >
              {busy ? "…" : "✅ Re-approve"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}