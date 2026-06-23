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
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} text-slate-800 min-h-screen bg-[#afb5c7] font-sans py-32 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-16 relative overflow-hidden`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px]"></div>
      </div>

      {/* Header */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-12 relative z-10">
        <span className="text-sm md:text-base uppercase tracking-[0.3em] text-[#2A4E3F] font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-green animate-pulse" />
          The Corporate House Stays
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-light text-slate-900 tracking-tight leading-none">
          Manage Your Bookings
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2A4E3F] to-transparent mx-auto"></div>
        <p className="text-slate-700 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal">
          Enter your registered 10-digit phone number below to access your confirmation details, live verification statuses, and invoices.
        </p>
      </section>

      {/* Search Widget */}
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-300 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs md:text-sm uppercase font-bold tracking-wider text-slate-500 flex items-center gap-2">
              <Phone className="w-4.5 h-4.5 text-brand-green" />
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
                className="flex-grow bg-white/95 border border-slate-350 rounded-2xl px-6 py-5 text-base md:text-lg text-slate-800 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 transition-all font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-5 rounded-2xl bg-brand-green hover:bg-brand-green-hover text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-green/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
            <p className="text-slate-600 text-sm tracking-widest uppercase font-light animate-pulse">Retrieving your bookings...</p>
          </div>
        ) : searched ? (
          bookings.length === 0 ? (
            <div className="text-center py-20 bg-white/70 backdrop-blur-md border border-slate-300 rounded-3xl max-w-lg mx-auto space-y-6">
              <AlertCircle className="w-16 h-16 text-slate-400 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-slate-800">No Reservations Found</h3>
                <p className="text-slate-600 text-sm mt-1 max-w-sm mx-auto leading-relaxed font-light">
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
                    className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-brand-green/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="space-y-6">
                      {/* Room & Status */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] md:text-xs uppercase font-bold text-brand-green tracking-widest block">Boutique Suite</span>
                          <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight hover:text-brand-green transition-colors">{booking.roomName}</h3>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border shrink-0 ${
                            isConfirmed
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : isCancelled
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-amber-55 text-amber-700 border-amber-200"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {/* Timeline Details */}
                      <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-200 text-sm">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Check-In Slot</span>
                          <span className="font-semibold text-slate-800 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-brand-green" />
                            {booking.checkInDate}
                          </span>
                          <span className="text-slate-500 text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            from {booking.checkInTime}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Check-Out Slot</span>
                          <span className="font-semibold text-slate-800 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-brand-green" />
                            {booking.checkOutDate}
                          </span>
                          <span className="text-slate-500 text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            by {booking.checkOutTime}
                          </span>
                        </div>
                      </div>

                      {/* Details Table */}
                      <div className="space-y-3.5 text-sm text-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2 font-light text-slate-500">
                            <User className="w-4.5 h-4.5" />
                            Guest Name:
                          </span>
                          <strong className="text-slate-900 font-medium">{booking.guestName}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2 font-light text-slate-500">
                            {booking.paymentMethod === "Online Payment" ? (
                              <CreditCard className="w-4.5 h-4.5" />
                            ) : (
                              <Coins className="w-4.5 h-4.5" />
                            )}
                            Payment Option:
                          </span>
                          <span className="font-bold text-brand-green text-[10px] md:text-xs uppercase tracking-widest">{booking.paymentMethod || "Cash Payment"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Price & Creation Info */}
                    <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-end">
                      <div className="text-xs text-slate-400 font-mono">
                        {booking.createdAt && (
                          <span className="flex items-center gap-1.5">
                            <BookmarkCheck className="w-4.5 h-4.5 text-slate-400" />
                            Placed: {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Amount Paid</span>
                        <span className="text-2xl font-serif font-bold text-emerald-600">₹{booking.totalPrice?.toLocaleString()}</span>
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
          className="inline-flex items-center gap-2.5 px-8 py-4 border border-slate-300 hover:border-slate-450 bg-white/70 hover:bg-white text-xs uppercase font-bold tracking-widest text-slate-700 transition-all shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          Back to Home
        </Link>
      </div>

    </div>
  );
}
