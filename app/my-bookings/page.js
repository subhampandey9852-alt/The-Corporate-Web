"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Clock,
  Phone,
  User,
  CreditCard,
  Coins,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  BookmarkCheck,
  CalendarDays
} from "lucide-react";
import Link from "next/link";

export default function MyBookingsPage() {
  const [phoneInput, setPhoneInput] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.length !== 10 || isNaN(phoneInput)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/booking?phone=${phoneInput}`);
      const data = await response.json();
      if (response.ok && data.success) {
        setBookings(data.bookings || []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Search bookings error:", error);
      alert("Failed to search bookings. Please try again.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} text-slate-100 min-h-screen bg-[#020617] font-sans py-32 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-16 relative overflow-hidden`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]"></div>
      </div>

      {/* Header */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-12 relative z-10">
        <span className="text-sm md:text-base uppercase tracking-[0.3em] text-amber-400 font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          The Corporate House Stays
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight leading-none">
          Manage Your Bookings
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
          Enter your registered 10-digit phone number below to access your confirmation details, live verification statuses, and invoices.
        </p>
      </section>

      {/* Search Widget */}
      <div className="max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs md:text-sm uppercase font-bold tracking-wider text-slate-400 flex items-center gap-2">
              <Phone className="w-4.5 h-4.5 text-amber-400" />
              Registered Phone Number
            </label>
            <div className="relative flex flex-col sm:flex-row gap-4">
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="Enter 10-digit registered number"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                className="flex-grow bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-5 text-base md:text-lg text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 placeholder:text-slate-600 transition-all font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Search className="w-4.5 h-4.5" />
                    Find Reservations
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-8 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            <p className="text-slate-400 text-sm tracking-widest uppercase font-light animate-pulse">Retrieving your bookings...</p>
          </div>
        ) : searched ? (
          bookings.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl max-w-lg mx-auto space-y-6">
              <AlertCircle className="w-16 h-16 text-slate-600 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-white">No Reservations Found</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto leading-relaxed font-light">
                  We couldn't locate any records associated with <strong>{phoneInput}</strong>. Please ensure the phone number matches the one used during booking.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {bookings.map((booking) => {
                const isConfirmed = booking.status === "Confirmed";
                const isCancelled = booking.status === "Cancelled";
                return (
                  <div
                    key={booking._id || booking.id}
                    className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-400/30 hover:bg-slate-900/60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group"
                  >
                    <div className="space-y-6">
                      {/* Room & Status */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] md:text-xs uppercase font-bold text-amber-400 tracking-widest block">Boutique Suite</span>
                          <h3 className="text-2xl font-serif font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">{booking.roomName}</h3>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border shrink-0 ${
                            isConfirmed
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : isCancelled
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {/* Timeline Details */}
                      <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-800/80 text-sm">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Check-In Slot</span>
                          <span className="font-semibold text-slate-200 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-amber-400" />
                            {booking.checkInDate}
                          </span>
                          <span className="text-slate-400 text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            from {booking.checkInTime}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Check-Out Slot</span>
                          <span className="font-semibold text-slate-200 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-amber-400" />
                            {booking.checkOutDate}
                          </span>
                          <span className="text-slate-400 text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            by {booking.checkOutTime}
                          </span>
                        </div>
                      </div>

                      {/* Details Table */}
                      <div className="space-y-3.5 text-sm text-slate-300">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2 font-light text-slate-400">
                            <User className="w-4.5 h-4.5" />
                            Guest Name:
                          </span>
                          <strong className="text-white font-medium">{booking.guestName}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2 font-light text-slate-400">
                            {booking.paymentMethod === "Online Payment" ? (
                              <CreditCard className="w-4.5 h-4.5" />
                            ) : (
                              <Coins className="w-4.5 h-4.5" />
                            )}
                            Payment Option:
                          </span>
                          <span className="font-bold text-amber-400 text-[10px] md:text-xs uppercase tracking-widest">{booking.paymentMethod || "Cash Payment"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Price & Creation Info */}
                    <div className="pt-6 mt-6 border-t border-slate-800/80 flex justify-between items-end">
                      <div className="text-xs text-slate-500 font-mono">
                        {booking.createdAt && (
                          <span className="flex items-center gap-1.5">
                            <BookmarkCheck className="w-4.5 h-4.5 text-slate-600" />
                            Placed: {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Total Amount Paid</span>
                        <span className="text-2xl font-serif font-bold text-emerald-400">₹{booking.totalPrice?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : null}
      </div>

      {/* Back Button */}
      <div className="text-center pt-12 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-8 py-4 border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 rounded-2xl text-xs uppercase font-bold tracking-widest text-slate-300 transition-all shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          Back to Home
        </Link>
      </div>

    </div>
  );
}
