// ============================================================
// FILE: src/pages/sections/Support.jsx
// ACTION: REPLACE existing Support.jsx
// FIX POINT 5: Dynamic Help & Support with dark mode
// ============================================================

import React, { useState } from "react";

const FAQS = [
  { q: "How do I register for an event?",          a: "Go to any event page and click 'Register Now'. Fill in your details in the form and submit. You'll receive a confirmation." },
  { q: "Can I register for multiple events?",      a: "Yes! You can register for as many events as you like across different colleges." },
  { q: "How do I know if my registration worked?", a: "After submitting the form, you'll see a success message. Your registrations also appear in your profile page." },
  { q: "What is a College Admin?",                 a: "College Admins represent their institution. They can post events which are reviewed and approved by the Super Admin." },
  { q: "How do I rate an event?",                  a: "After attending a past event, you can rate it from 1–5 stars from the event detail page." },
  { q: "Who is the Super Admin?",                  a: "The Super Admin manages the entire EventVerse platform — approving events, managing college admins, and overseeing all activity." },
];

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-3xl">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-8 bg-blue-500 rounded-full" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Help & Support</h1>
      </div>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 ml-6">We're here to help. Find answers or reach out to us.</p>

      {/* CONTACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "📧", label: "Email", value: "support@eventverse.com", sub: "Replies within 24 hrs" },
          { icon: "📞", label: "Phone", value: "+91 98765 43210",        sub: "Mon–Fri, 9am–6pm" },
          { icon: "💬", label: "Live Chat", value: "Available in app",  sub: "Avg response 5 mins" },
        ].map((c) => (
          <div key={c.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center">
            <div className="text-2xl mb-2">{c.icon}</div>
            <div className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">{c.label}</div>
            <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">{c.value}</div>
            <div className="text-xs text-gray-400 dark:text-gray-600">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
      <div className="space-y-3 mb-10">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {faq.q}
              <span className="text-gray-400 ml-4 flex-shrink-0">{openIndex === i ? "▲" : "▼"}</span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CONTACT FORM */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Send us a message</h2>
      {sent ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-green-800 dark:text-green-300 font-medium">Message sent! We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Your Name</label>
              <input required placeholder="Ramya Sri" onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Email</label>
              <input required type="email" placeholder="you@email.com" onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Message</label>
            <textarea required rows={4} placeholder="Describe your issue or question..." onChange={(e) => setForm({...form, message: e.target.value})}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}