// ============================================================
// FILE: src/pages/Home.jsx
// ACTION: REPLACE existing Home.jsx
// Dynamic scroll animations — elements slide in from left/right
// Parallax hero, floating elements, staggered reveals
// ============================================================
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ── SCROLL ANIMATION HOOK ────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(
      ".reveal-left, .reveal-right, .reveal-up, .reveal-fade, .reveal-scale"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ── ANIMATED COUNTER ─────────────────────────────────────────
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(end);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const COLLEGES = [
  { name: "IIT Hyderabad",    short: "IITH",  domain: "iith.ac.in"         },
  { name: "NIT Warangal",     short: "NITW",  domain: "nitw.ac.in"          },
  { name: "IIIT Hyderabad",   short: "IIITH", domain: "iiit.ac.in"          },
  { name: "BITS Pilani Hyd",  short: "BITS",  domain: "bits-pilani.ac.in"   },
  { name: "CBIT Hyderabad",   short: "CBIT",  domain: "cbit.ac.in"          },
  { name: "VIT Vellore",      short: "VIT",   domain: "vit.ac.in"           },
  { name: "JNTU Hyderabad",   short: "JNTUH", domain: "jntuh.ac.in"         },
  { name: "Osmania Univ",     short: "OU",    domain: "osmania.ac.in"       },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Hackathons",
    desc: "48-hour coding marathons from IIT, NIT and BITS — compete, build, win.",
    color: "from-red-500 to-orange-500",
    bg: "bg-red-50 dark:bg-red-900/10",
    border: "border-red-100 dark:border-red-900/30",
    delay: "0ms",
  },
  {
    icon: "🛠",
    title: "Workshops",
    desc: "Hands-on sessions on React, AI, Flutter, DevOps — learn by building.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-900/10",
    border: "border-violet-100 dark:border-violet-900/30",
    delay: "100ms",
  },
  {
    icon: "🎙",
    title: "Webinars",
    desc: "Industry experts from Google, Microsoft and startups — live and free.",
    color: "from-teal-500 to-cyan-600",
    bg: "bg-teal-50 dark:bg-teal-900/10",
    border: "border-teal-100 dark:border-teal-900/30",
    delay: "200ms",
  },
  {
    icon: "🏆",
    title: "Points & Badges",
    desc: "Earn rewards for every event you attend, rate and register for.",
    color: "from-amber-500 to-yellow-500",
    bg: "bg-amber-50 dark:bg-amber-900/10",
    border: "border-amber-100 dark:border-amber-900/30",
    delay: "300ms",
  },
];

const STEPS = [
  { n: "01", title: "Sign up free",       desc: "Create your account with your college email in under 30 seconds.", icon: "✍️"  },
  { n: "02", title: "Browse events",      desc: "Explore hackathons, workshops and webinars from colleges near you.", icon: "🔍" },
  { n: "03", title: "Register & attend",  desc: "One click to register. Show up, learn, network and win.", icon: "🎯"           },
];

export default function Home() {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <>
      {/* ── GLOBAL ANIMATION STYLES ── */}
      <style>{`
        /* Base states — hidden before scroll */
        .reveal-left  { opacity:0; transform:translateX(-60px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .reveal-right { opacity:0; transform:translateX(60px);  transition:opacity 0.7s ease, transform 0.7s ease; }
        .reveal-up    { opacity:0; transform:translateY(50px);  transition:opacity 0.7s ease, transform 0.7s ease; }
        .reveal-fade  { opacity:0;                              transition:opacity 0.8s ease; }
        .reveal-scale { opacity:0; transform:scale(0.85);       transition:opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1); }

        /* Revealed state — visible after scroll */
        .reveal-left.revealed,
        .reveal-right.revealed,
        .reveal-up.revealed,
        .reveal-fade.revealed,
        .reveal-scale.revealed {
          opacity:1; transform:translateX(0) translateY(0) scale(1);
        }

        /* Stagger delays */
        .delay-100 { transition-delay: 100ms !important; }
        .delay-200 { transition-delay: 200ms !important; }
        .delay-300 { transition-delay: 300ms !important; }
        .delay-400 { transition-delay: 400ms !important; }
        .delay-500 { transition-delay: 500ms !important; }

        /* Floating animation */
        @keyframes float {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-12px); }
        }
        @keyframes floatSlow {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          50%      { transform:translateY(-8px) rotate(3deg); }
        }
        @keyframes pulse-ring {
          0%   { transform:scale(1);   opacity:0.4; }
          100% { transform:scale(1.8); opacity:0;   }
        }
        @keyframes marquee {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
        .float      { animation:float     3.5s ease-in-out infinite; }
        .float-slow { animation:floatSlow 5s   ease-in-out infinite; }
        .marquee-track { animation:marquee 20s linear infinite; }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg,#2563eb,#7c3aed,#0e7490);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        /* Grain overlay */
        .grain::after {
          content:"";
          position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none; border-radius:inherit;
        }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">

        {/* ══════════════════════════════════════════════
            HERO SECTION — full screen, floating elements
        ══════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden grain">

          {/* BACKGROUND MESH */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06] dark:opacity-[0.12]"
              style={{ background:"radial-gradient(circle,#2563eb 0%,transparent 70%)" }} />
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-[0.05]"
              style={{ background:"radial-gradient(circle,#7c3aed,transparent 70%)" }} />
            <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full opacity-[0.05]"
              style={{ background:"radial-gradient(circle,#0e7490,transparent 70%)" }} />

            {/* FLOATING CARDS in background */}
            <div className="float absolute top-28 left-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 hidden lg:block"
              style={{ animationDelay:"0s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-sm">⚡</div>
                <div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">AI Hackathon</p>
                  <p className="text-xs text-gray-400">IITH · 48hrs</p>
                </div>
              </div>
            </div>

            <div className="float-slow absolute top-40 right-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 hidden lg:block"
              style={{ animationDelay:"1.5s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-sm">🛠</div>
                <div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">React Workshop</p>
                  <p className="text-xs text-gray-400">BITS · Tomorrow</p>
                </div>
              </div>
            </div>

            <div className="float absolute bottom-40 left-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 hidden lg:block"
              style={{ animationDelay:"0.8s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-sm">🏆</div>
                <div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">+25 Points!</p>
                  <p className="text-xs text-gray-400">Registered</p>
                </div>
              </div>
            </div>

            <div className="float-slow absolute bottom-32 right-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 hidden lg:block"
              style={{ animationDelay:"2s" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-sm">🎙</div>
                <div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">ML Webinar</p>
                  <p className="text-xs text-gray-400">NITW · Free</p>
                </div>
              </div>
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="relative max-w-4xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest">
                Hyderabad's student event hub
              </span>
            </div>

            <h1 className="reveal-up text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-6 leading-[1.0] tracking-tight">
              Every college<br />
              event.<br />
              <span className="gradient-text">One place.</span>
            </h1>

            <p className="reveal-up delay-100 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop missing hackathons, workshops and events from colleges near you.
              Discover, register and attend — all in one platform.
            </p>

            <div className="reveal-up delay-200 flex items-center gap-4 flex-wrap justify-center mb-16">
              <button onClick={() => navigate("/register")}
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-base transition-all hover:scale-105 shadow-xl shadow-blue-500/30 overflow-hidden">
                <span className="relative z-10">Get started free →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => navigate("/login")}
                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl font-black text-base transition-all hover:scale-105">
                Sign in
              </button>
            </div>

            {/* LIVE STATS */}
            <div className="reveal-fade delay-300 flex items-center justify-center gap-10 flex-wrap">
              {[
                { end:8,   suffix:"+", label:"Colleges"    },
                { end:26,  suffix:"+", label:"Events"      },
                { end:5,   suffix:"k+",label:"Students"    },
                { end:100, suffix:"%", label:"Free"        },
              ].map((s,i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-gray-900 dark:text-white">
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
            <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">Scroll</p>
            <div className="w-px h-8 bg-gray-400 animate-pulse" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            COLLEGE LOGO MARQUEE — infinite scroll
        ══════════════════════════════════════════════ */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 overflow-hidden border-y border-gray-100 dark:border-gray-800">
          <p className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-8">
            Events from top colleges
          </p>
          <div className="flex" style={{ width:"max-content" }}>
            <div className="marquee-track flex items-center gap-10 pr-10">
              {[...COLLEGES, ...COLLEGES].map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    <img src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=64`} alt={c.short}
                      className="w-6 h-6 object-contain"
                      onError={(e) => { e.target.style.display="none"; }} />
                  </div>
                  <span className="text-sm font-black text-gray-700 dark:text-gray-200 whitespace-nowrap">{c.short}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FEATURES — alternating left/right slide-in
        ══════════════════════════════════════════════ */}
        <section className="px-6 py-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <p className="reveal-fade text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[4px] mb-4">
                Everything you need
              </p>
              <h2 className="reveal-up text-5xl font-black text-gray-900 dark:text-white leading-tight">
                Built for students,<br />by students
              </h2>
            </div>

            {/* FEATURE ROWS — alternating slide directions */}
            {FEATURES.map((f, i) => (
              <div key={i} className={`flex items-center gap-12 mb-20 flex-wrap ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
                {/* TEXT SIDE */}
                <div className={`flex-1 min-w-[280px] ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} mb-6 shadow-lg`}>
                    <span className="text-3xl">{f.icon}</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">{f.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{f.desc}</p>
                </div>

                {/* CARD SIDE */}
                <div className={`flex-1 min-w-[280px] ${i % 2 === 0 ? "reveal-right" : "reveal-left"}`}>
                  <div className={`${f.bg} ${f.border} border-2 rounded-3xl p-8 hover:scale-105 transition-transform duration-500`}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-4xl">{f.icon}</span>
                      <h4 className="font-black text-gray-900 dark:text-white text-xl">{f.title}</h4>
                    </div>
                    <div className="space-y-3">
                      {[1,2,3].map(n => (
                        <div key={n} className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${f.color}`}
                            style={{ width:`${85 - n*15}%`, transition:"width 1s ease" }} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <span className="text-xs font-black text-gray-500 dark:text-gray-400">
                        {["24 events this week","15 workshops upcoming","8 colleges joined"][i] || ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            HOW IT WORKS — cards slide up with stagger
        ══════════════════════════════════════════════ */}
        <section className="px-6 py-28 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <p className="reveal-fade text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[4px] mb-4">
                Get started in minutes
              </p>
              <h2 className="reveal-up text-5xl font-black text-gray-900 dark:text-white">
                Three steps to your<br />next big event
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((s,i) => (
                <div key={i}
                  className={`reveal-up delay-${(i+1)*100} bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden`}>
                  {/* BIG NUMBER BG */}
                  <div className="absolute -top-4 -right-2 text-8xl font-black text-gray-50 dark:text-gray-700/50 select-none pointer-events-none">
                    {s.n}
                  </div>
                  <div className="relative">
                    <div className="text-5xl mb-6">{s.icon}</div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{s.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SOCIAL PROOF — scale in
        ══════════════════════════════════════════════ */}
        <section className="px-6 py-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="reveal-fade text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[4px] mb-4">
                What students say
              </p>
              <h2 className="reveal-up text-5xl font-black text-gray-900 dark:text-white">
                Loved by students
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name:"Arjun K",    college:"IITH · 3rd Year CSE",   text:"Found 3 hackathons in one week. EventVerse is insane for discovering events you'd otherwise miss.",     rating:5 },
                { name:"Priya M",    college:"NITW · 2nd Year EEE",   text:"Registered for the GRAVITAS workshop in literally 30 seconds. The badges system keeps me motivated!",   rating:5 },
                { name:"Siddharth", college:"BITS · 4th Year CSE",   text:"The trending section helped me discover PEARL Hackathon. Won 2nd place. Never would've known otherwise.", rating:5 },
              ].map((r, i) => (
                <div key={i}
                  className={`reveal-scale delay-${(i+1)*100} bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="text-yellow-400 text-sm mb-3">{"★".repeat(r.rating)}</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 dark:text-white text-sm">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.college}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA BANNER — slides up with parallax
        ══════════════════════════════════════════════ */}
        <section className="px-6 pb-28">
          <div className="reveal-up max-w-5xl mx-auto rounded-3xl overflow-hidden relative grain"
            style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#312e81 100%)" }}>
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 pointer-events-none"
              style={{ background:"radial-gradient(circle,#6366f1,transparent 70%)" }} />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10 pointer-events-none"
              style={{ background:"radial-gradient(circle,#3b82f6,transparent 70%)" }} />

            <div className="relative px-12 py-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-xs font-black uppercase tracking-widest">Join 5000+ students</span>
              </div>
              <h2 className="text-5xl font-black text-white mb-4 leading-tight">
                Ready to explore?
              </h2>
              <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Your next hackathon win, workshop skill, or industry connection is one click away.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button onClick={() => navigate("/register")}
                  className="px-10 py-4 bg-white text-blue-900 rounded-2xl font-black text-base hover:bg-blue-50 transition hover:scale-105 shadow-2xl">
                  Join EventVerse →
                </button>
                <button onClick={() => navigate("/login")}
                  className="px-10 py-4 border-2 border-white/30 text-white rounded-2xl font-black text-base hover:border-white/60 transition hover:scale-105">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-8 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 56 56" fill="none">
                <rect width="56" height="56" rx="16" fill="#2563EB"/>
                <path d="M14 20h10M14 28h8M14 36h10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M32 20l6 16 6-16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="38" cy="32" r="1.5" fill="#93C5FD"/>
              </svg>
              <span className="font-black text-gray-900 dark:text-white">EventVerse</span>
            </div>
            <p className="text-xs text-gray-400">© 2026 EventVerse · Built for students across Hyderabad</p>
          </div>
        </footer>
      </div>
    </>
  );
}