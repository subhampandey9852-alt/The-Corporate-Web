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

function getBookingImage(booking) {
  if (booking.roomId?.startsWith("event-")) {
    if (booking.roomId === "event-wedding") return "/photos/wedding_couple.jpg";
    if (booking.roomId === "event-birthday") return "/photos/birthday_kids.jpg";
    return "/photos/party_event.jpg";
  }
  const roomNameLower = booking.roomName?.toLowerCase() || "";
  if (roomNameLower.includes("executive double")) return "/photos/img4.jpg";
  if (roomNameLower.includes("deluxe room")) return "/photos/img7.jpg";
  if (roomNameLower.includes("smart workstation") || roomNameLower.includes("twin")) return "/photos/img10.jpg";
  if (roomNameLower.includes("study desk")) return "/photos/img13.jpg";
  if (roomNameLower.includes("penthouse")) return "/photos/img19.jpg";
  if (roomNameLower.includes("classic")) return "/photos/img34.jpg";
  if (roomNameLower.includes("terrace")) return "/photos/img37.jpg";
  if (roomNameLower.includes("cozy")) return "/photos/img16.jpg";
  if (roomNameLower.includes("front desk")) return "/photos/img31.jpg";
  return "/photos/img4.jpg";
}

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

  const handleCancelBooking = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await fetch("/api/booking", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Cancelled" })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Update local state
        setBookings(prev => prev.map(b => (b.id === id || b._id === id) ? { ...b, status: "Cancelled" } : b));
        alert("Your booking has been cancelled successfully.");
      } else {
        alert(data.error || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} text-[var(--ink)] min-h-screen font-sans pt-[30px] pb-32 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto space-y-16 relative overflow-hidden`}>

      {/* Header */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-0 relative z-10">
        <span className="text-sm uppercase tracking-[0.3em] text-[var(--accent)] font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--accent)] animate-pulse" />
          My Bookings
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-[var(--ink)] tracking-tight">
          Manage Your Reservations
        </h1>
        <div className="w-24 h-0.5 bg-[var(--accent)] mx-auto"></div>
        <p className="text-[var(--muted)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Enter your registered 10-digit phone number below to access your confirmation details, live verification statuses, and invoices.
        </p>
      </section>

      {/* Search Widget */}
      <div className="max-w-2xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-12 shadow-sm relative z-10">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs md:text-sm uppercase font-bold tracking-wider text-[var(--muted)] flex items-center gap-2">
              <Phone className="w-4.5 h-4.5 text-[var(--accent)]" />
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
                className="flex-grow bg-[var(--page-bg)] border border-[var(--border)] rounded-full px-6 py-4 text-base text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--muted)]/60 transition-all font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 rounded-full bg-[var(--ink)] hover:bg-[var(--accent)] text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
            <p className="text-[var(--muted)] text-sm tracking-widest uppercase font-light animate-pulse">Retrieving your bookings...</p>
          </div>
        ) : searched ? (
          bookings.length === 0 ? (
            <div className="text-center py-20 bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] max-w-lg mx-auto space-y-6">
              <AlertCircle className="w-16 h-16 text-[var(--muted)]/40 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[var(--ink)]">No Reservations Found</h3>
                <p className="text-[var(--muted)] text-sm mt-1 max-w-sm mx-auto leading-relaxed">
                  We couldn't locate any records associated with <strong>{phoneInput}</strong>. Please ensure the phone number matches the one used during booking.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
              {bookings.map((booking) => {
                const isConfirmed = booking.status === "Confirmed";
                const isCancelled = booking.status === "Cancelled";
                return (
                  <div
                    key={booking._id || booking.id}
                    className="bg-gradient-to-br from-[#fdfcf7] via-[#faf8f2] to-[#f4eee1] border border-[#e4d8bf]/60 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row hover:border-[var(--accent)] hover:shadow-md transition-all duration-300"
                  >
                    {/* Booking Image Block */}
                    <div className="relative w-full md:w-[320px] h-64 md:h-auto overflow-hidden flex-shrink-0 border-b md:border-b-0 md:border-r border-[#e4d8bf]/40">
                      <img
                        src={getBookingImage(booking)}
                        alt={booking.roomName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                      <div className="space-y-6">
                        {/* Room & Status */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] md:text-xs uppercase font-bold text-[var(--accent)] tracking-widest block">
                              {booking.roomId?.startsWith("event-") ? "Royal Event Booking" : "Boutique Suite"}
                            </span>
                            <h3 className="text-2xl font-bold text-[var(--ink)] leading-tight hover:text-[var(--accent)] transition-colors">{booking.roomName}</h3>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border shrink-0 ${isConfirmed
                                ? "bg-emerald-50 text-emerald-700 border-emerald-250"
                                : isCancelled
                                  ? "bg-rose-50 text-rose-700 border-rose-250"
                                  : "bg-amber-50 text-amber-700 border-amber-250"
                              }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {/* Timeline Details */}
                        <div className="grid grid-cols-2 gap-6 py-6 border-y border-[var(--border)] text-sm">
                          <div className="space-y-2">
                            <span className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-wider block">Check-In Slot</span>
                            <span className="font-semibold text-[var(--ink)] flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-[var(--accent)]" />
                              {booking.checkInDate}
                            </span>
                            <span className="text-[var(--muted)] text-xs flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[var(--muted)]/60" />
                              from {booking.checkInTime}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-wider block">Check-Out Slot</span>
                            <span className="font-semibold text-[var(--ink)] flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-[var(--accent)]" />
                              {booking.checkOutDate}
                            </span>
                            <span className="text-[var(--muted)] text-xs flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[var(--muted)]/60" />
                              by {booking.checkOutTime}
                            </span>
                          </div>
                        </div>

                        {/* Details Table */}
                        <div className="space-y-3.5 text-sm text-[var(--muted)]">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 font-light text-[var(--muted)]/80">
                              <User className="w-4.5 h-4.5" />
                              Guest Name:
                            </span>
                            <strong className="text-[var(--ink)] font-semibold">{booking.guestName}</strong>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 font-light text-[var(--muted)]/80">
                              {booking.paymentMethod === "Online Payment" ? (
                                <CreditCard className="w-4.5 h-4.5" />
                              ) : (
                                <Coins className="w-4.5 h-4.5" />
                              )}
                              Payment Option:
                            </span>
                            <span className="font-bold text-[var(--accent)] text-[10px] md:text-xs uppercase tracking-widest">{booking.paymentMethod || "Cash Payment"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Booking Price & Creation Info */}
                      <div className="pt-6 mt-6 border-t border-[var(--border)] flex justify-between items-end">
                        <div className="text-xs text-[var(--muted)]/80 font-mono">
                          {booking.createdAt && (
                            <span className="flex items-center gap-1.5">
                              <BookmarkCheck className="w-4.5 h-4.5 text-[var(--muted)]/60" />
                              Placed: {new Date(booking.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {!booking.roomId?.startsWith("event-") ? (
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-[var(--muted)] block tracking-wider">Total Amount Paid</span>
                            <span className="text-2xl font-bold text-emerald-600">₹{booking.totalPrice?.toLocaleString()}</span>
                          </div>
                        ) : (
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-amber-600 block tracking-wider">Payment Status</span>
                            <span className="text-sm font-semibold text-amber-600">Pay at Hotel Front Desk</span>
                          </div>
                        )}
                      </div>

                      {!isCancelled && (
                        <div className="mt-6 pt-6 border-t border-[var(--border)] flex justify-end">
                          <button
                            onClick={() => handleCancelBooking(booking._id || booking.id)}
                            className="px-5 py-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
                          >
                            <XCircle className="w-4.5 h-4.5" />
                            Cancel My Booking
                          </button>
                        </div>
                      )}
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
          className="inline-flex items-center gap-2.5 px-8 py-4 border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--page-bg)] text-xs uppercase font-semibold tracking-widest text-[var(--ink)] rounded-full transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          Back to Home
        </Link>
      </div>

    </div>
  );
}
