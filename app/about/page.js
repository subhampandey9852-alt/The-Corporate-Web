"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  Compass,
  Plus,
  Trash2,
  Edit3,
  Check,
  ListTodo
} from "lucide-react";

function About() {
  const [isMounted, setIsMounted] = useState(false);
  const [requestInput, setRequestInput] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [requestList, setRequestList] = useState([
    "Order private terrace champagne service",
    "Book sunset cruise with Yacht Charter",
    "Request late check-out at 2:00 PM"
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleAddRequest() {
    if (!requestInput.trim()) return;
    setRequestList([...requestList, requestInput.trim()]);
    setRequestInput("");
  }

  function handleDeleteRequest(index) {
    const updated = requestList.filter((_, i) => index !== i);
    setRequestList(updated);
  }

  function handleEditRequest(index) {
    setShowEditModal(true);
    setEditValue(requestList[index]);
    setEditIndex(index);
  }

  function handleUpdateRequest() {
    if (!editValue.trim()) return;
    const updated = [...requestList];
    updated[editIndex] = editValue.trim();
    setRequestList(updated);
    setShowEditModal(false);
  }

  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} text-[var(--ink)] min-h-screen font-sans pt-[30px] pb-16 px-6 md:px-8 max-w-7xl mx-auto space-y-20 selection:bg-[var(--accent)] selection:text-white`}>

      {/* Heritage Narrative Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-0">
        <span className="text-sm uppercase tracking-[0.3em] text-[var(--accent)] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[var(--accent)]" />
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)]">
          Our Heritage
        </h1>
        <div className="w-12 h-0.5 bg-[var(--accent)] mx-auto"></div>
        <p className="text-[var(--muted)] font-normal text-lg md:text-xl leading-relaxed">
          Corporate House was built with a single vision: to integrate modern comfort with world-class hospitality. Situated in a prime location, it stands as an exceptional destination for business stays, leisure escapes, and refined lodging.
        </p>
      </section>

      {/* Grid: Heritage & Bespoke Service */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px] rounded-[2rem] overflow-hidden border border-[var(--border)] shadow-sm">
          <img
            src="/photos/img37.jpg"
            alt="Resort architecture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-[var(--ink)]">
            A Sanctuary of Quietude
          </h2>
          <p className="text-[var(--muted)] text-base leading-relaxed">
            Every room at Corporate House is crafted to optimize guest rejuvenation and relaxation, featuring smart automation, premium bedding, and natural light. We offer standard-setting amenities and dining menus to make sure your stay is seamless and rewarding.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-[var(--ink)]">Exclusive Location</h4>
                <p className="text-sm text-[var(--muted)]">18 Harbor Avenue, Downtown</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-[var(--ink)]">Bespoke Journeys</h4>
                <p className="text-sm text-[var(--muted)]">24/7 Butler Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Request / Activity Planner (Todo App) */}
      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-6 sm:p-10 max-w-2xl mx-auto shadow-sm space-y-8 hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto mb-2">
            <ListTodo className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-semibold text-[var(--ink)]">
            Guest Stay Request Planner
          </h3>
          <p className="text-[var(--muted)] text-sm max-w-md mx-auto">
            Design your ideal stay itinerary. Add special requests or booking needs below, and our concierges will curate them for you.
          </p>
        </div>

        {/* Input area */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={requestInput}
            onChange={(e) => setRequestInput(e.target.value)}
            placeholder="e.g., Book sunset cruise at 5:00 PM"
            onKeyDown={(e) => e.key === "Enter" && handleAddRequest()}
            className="flex-grow bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]/60"
          />
          <button
            onClick={handleAddRequest}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-white bg-[var(--ink)] hover:bg-[var(--accent)] transition-all whitespace-nowrap shadow-sm text-center cursor-pointer"
          >
            Add Request
          </button>
        </div>

        {/* Request List Display */}
        <div className="space-y-3">
          {requestList.length === 0 ? (
            <p className="text-center text-[var(--muted)] text-sm py-8">Your request list is empty. Add items above to start planning.</p>
          ) : (
            requestList.map((req, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-[var(--page-bg)]/40 border border-[var(--border)] rounded-2xl group hover:border-[var(--accent)]/45 transition-all duration-300 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-[var(--ink)] text-sm break-words min-w-0">{req}</span>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditRequest(idx)}
                    className="p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--page-bg)] text-[var(--accent)] border border-[var(--border)] transition-colors cursor-pointer"
                    title="Edit Request"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(idx)}
                    className="p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--page-bg)] text-[var(--error)] border border-[var(--border)] transition-colors cursor-pointer"
                    title="Remove Request"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Edit Dialog Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
          <div
            onClick={() => setShowEditModal(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          ></div>
          <div className="relative z-10 bg-[var(--surface)] border border-[var(--border)] p-8 rounded-[2rem] w-full max-w-md shadow-xl space-y-6 mx-4">
            <h4 className="text-lg font-semibold text-[var(--ink)]">
              Edit Request Details
            </h4>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRequest}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--ink)] hover:bg-[var(--accent)] transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default About;