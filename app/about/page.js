"use client";

import React, { useState } from "react";
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
  // Original Todo Logic styled and rebranded as Guest Requests
  const [requestInput, setRequestInput] = useState("");
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
    <div className="text-black min-h-screen font-sans py-12 px-6 md:px-8 max-w-7xl mx-auto space-y-20 selection:bg-brand-green selection:text-white ">

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
          Founded in 2012, The Corporate House was built with a single vision: to integrate modern comfort with world-class hospitality. Situated along the coast, it stands as a premium location for leisure stays, coastal escapes, and luxury lodging.
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
            Every room at The Corporate House is crafted to optimize guest rejuvenation and relaxation, featuring smart automation, premium bedding, and natural light. We offer standard-setting amenities and dining menus to make sure your stay is seamless and rewarding.
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
      <section className="bg-white/80 backdrop-blur-md border border-[#E5E2DA] rounded-xl p-8 max-w-2xl mx-auto shadow-lg shadow-stone-200/50 space-y-6 hover:border-brand-radishblack hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(26,13,16,0.18)]">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center mx-auto mb-2">
            <ListTodo className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-light text-[#1C2A22]">
            Guest Stay Request Planner
          </h3>
          <p className="text-[#1C2A22] text-xs font-bold max-w-sm mx-auto">
            Design your ideal holiday itinerary. Add requests or booking needs below, and our concierges will curate them instantly.
          </p>
        </div>

        {/* Input area */}
        <div className="flex gap-3">
          <input
            type="text"
            value={requestInput}
            onChange={(e) => setRequestInput(e.target.value)}
            placeholder="e.g., Book sunset cruise at 5:00 PM"
            onKeyDown={(e) => e.key === "Enter" && handleAddRequest()}
            className="flex-grow bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-2.5 text-xs text-stone-700 focus:outline-none focus:border-brand-green transition-colors"
          />
          <button
            onClick={handleAddRequest}
            className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-hover transition-colors whitespace-nowrap shadow-md"
          >
            Add Request
          </button>
        </div>

        {/* Request List Display */}
        <div className="space-y-3">
          {requestList.length === 0 ? (
            <p className="text-center text-stone-400 text-xs py-8">Your request list is empty. Add item above to start planning.</p>
          ) : (
            requestList.map((req, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-stone-50/50 border border-[#E5E2DA] rounded-lg group hover:border-brand-radishblack hover:bg-white hover:-translate-y-0.5 transition-all duration-500 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-stone-700 text-xs font-light">{req}</span>
                </div>

                <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditRequest(idx)}
                    className="p-2 rounded-lg bg-white hover:bg-stone-100 text-brand-green border border-stone-200 transition-colors"
                    title="Edit Request"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(idx)}
                    className="p-2 rounded-lg bg-white hover:bg-stone-100 text-rose-600 border border-stone-200 transition-colors"
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
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
          ></div>
          <div className="relative z-10 bg-white border border-[#E5E2DA] p-6 rounded-xl w-full max-w-md shadow-lg space-y-4 mx-4">
            <h4 className="text-base font-serif font-bold text-[#1C2A22] uppercase tracking-wide">
              Edit Request Details
            </h4>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-2.5 text-xs text-stone-700 focus:outline-none focus:border-brand-green"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRequest}
                className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-hover transition-colors"
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