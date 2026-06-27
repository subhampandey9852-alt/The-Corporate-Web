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
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0 mounted-shine" : "opacity-0 translate-y-6"} text-black min-h-screen font-sans py-12 px-6 md:px-8 max-w-7xl mx-auto space-y-20 selection:bg-brand-green selection:text-white `}>

      {/* Heritage Narrative Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <span className="text-lg uppercase tracking-[0.25em] text-[#FFC72C] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-green-800" />
          The Corporate House Story
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-black">
          Our Heritage
        </h1>
        <div className="w-12 h-0.5 bg-brand-gold mx-auto"></div>
        <p className="text-black font-normal text-2xl md:text-3xl font-script leading-loose">
          ℍ𝕆𝕋𝔼𝕃 The Corporate House was built with a single vision: to integrate modern comfort with world-class hospitality. Situated along the coast, it stands as a premium location for leisure stays, coastal escapes, and luxury lodging.
        </p>
      </section>

      {/* Grid: Heritage & Bespoke Service */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-md">
          <img
            src="/photos/img37.jpg"
            alt="Resort architecture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif font-light text-black">
            A Sanctuary of Quietude
          </h2>
          <p className="text-black text-sm font-bold leading-relaxed">
            Every room at ℍ𝕆𝕋𝔼𝕃 The Corporate House is crafted to optimize guest rejuvenation and relaxation, featuring smart automation, premium bedding, and natural light. We offer standard-setting amenities and dining menus to make sure your stay is seamless and rewarding.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-black">Exclusive Location</h4>
                <p className="text-[10px] text-black/70">102 Ocean Drive, Malibu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold text-black">Bespoke Journeys</h4>
                <p className="text-[10px] text-black/70">24/7 Butler Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Stay Request / Activity Planner (Todo App) */}
      <section className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-4 sm:p-8 max-w-2xl mx-auto shadow-2xl space-y-6 hover:border-slate-700 hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-500/25">
            <ListTodo className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-light text-black">
            Guest Stay Request Planner
          </h3>
          <p className="text-black text-xs font-bold max-w-sm mx-auto">
            Design your ideal holiday itinerary. Add requests or booking needs below, and our concierges will curate them instantly.
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
            className="flex-grow bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors placeholder:text-slate-650"
          />
          <button
            onClick={handleAddRequest}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 transition-colors whitespace-nowrap shadow-md text-center"
          >
            Add Request
          </button>
        </div>

        {/* Request List Display */}
        <div className="space-y-3">
          {requestList.length === 0 ? (
            <p className="text-center text-slate-500 text-xs py-8">Your request list is empty. Add item above to start planning.</p>
          ) : (
            requestList.map((req, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800/80 rounded-lg group hover:border-slate-700 hover:bg-slate-900/60 hover:-translate-y-0.5 transition-all duration-500 hover:shadow-md gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 text-xs font-light break-words min-w-0">{req}</span>
                </div>

                <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button
                    onClick={() => handleEditRequest(idx)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-colors"
                    title="Edit Request"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(idx)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 transition-colors"
                    title="Remove Request"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
          ></div>
          <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md shadow-2xl space-y-4 mx-4">
            <h4 className="text-base font-serif font-bold text-white uppercase tracking-wide">
              Edit Request Details
            </h4>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRequest}
                className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-600 transition-colors"
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