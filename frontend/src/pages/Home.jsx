// ============================================================
// FILE: src/pages/Home.jsx
// ACTION: REPLACE existing Home.jsx
// CASE 7+8: Premium luxury public landing page
// ============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STATS = [
  { value: "8+",   label: "Colleges"   },
  { value: "26+",  label: "Events"     },
  { value: "5k+",  label: "Students"   },
  { value: "100%", label: "Free"       },
];

const FEATURES = [
  { icon: "🏫", title: "Multi-college discovery",  desc: "Find events from IIT, NIT, BITS, IIIT and more — all in one place. No more missing out on nearby college events." },
  { icon: "⚡", title: "Hackathons & workshops",   desc: "Filter by category. Find hackathons, webinars and workshops by technical or non-technical domain." },
  { icon: "⭐", title: "Real student ratings",     desc: "See ratings and past event photos before you register. Know what you're signing up for." },
  { icon: "🎟️", title: "One-click registration",  desc: "Register for any event in seconds. All your registrations tracked in your profile." },
];

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">

        {/* BACKGROUND MESH */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] dark:opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #2563eb, transparent 70%)" }} />
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #0891b2, transparent 70%)" }} />
        </div>

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
            Hyderabad's student event platform
          </span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-[1.05] max-w-4xl">
          Every college event.{" "}
          <span className="relative">
            <span className="text-blue-600 dark:text-blue-400">One place.</span>
            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
              <path d="M0 5 Q100 0 200 5" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Stop missing hackathons, workshops and events from colleges near you.
          EventVerse brings them all together — discover, register and attend.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex items-center gap-4 flex-wrap justify-center mb-16">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Get started free →
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl font-bold text-base transition-all hover:scale-105"
          >
            Sign in
          </button>
        </div>

        {/* STATS ROW */}
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-sm text-gray-400 dark:text-gray-500 font-medium">{s.label}</div>
              </div>
              {i < STATS.length - 1 && <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-6 py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-[3px] mb-3">Why EventVerse</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Built for students,<br />by students</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-5">{f.icon}</div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-[3px] mb-3">How it works</p>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-14">Three steps to your next event</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create account",   desc: "Sign up with your college email in 30 seconds."        },
              { step: "02", title: "Browse events",    desc: "Explore events from colleges near you by category."     },
              { step: "03", title: "Register & attend",desc: "One-click registration. Show up. Build your network."   },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="text-6xl font-black text-blue-100 dark:text-blue-900/40 mb-4">{s.step}</div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #1e3a8a, #4f46e5)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
            style={{ background: "radial-gradient(circle, #93c5fd, transparent)", transform: "translate(20%, -20%)" }} />
          <div className="relative px-12 py-14 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Ready to explore?</h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of students discovering events from top colleges.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-4 bg-white text-blue-700 rounded-2xl font-black text-base hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
            >
              Join EventVerse →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}