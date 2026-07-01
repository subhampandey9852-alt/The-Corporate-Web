"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  CheckCircle,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  CreditCard,
  Coins
} from "lucide-react";
import Link from "next/link";

// Budget Rooms Mock Data
const BUDGET_ROOMS = [
  {
    id: "executive-double",
    name: "Executive Double Room",
    price: 1500,
    size: "35 m²",
    bed: "1 Double Bed",
    image: "/photos/img4.jpg",
    description: "Vibrant orange theme, double bed, air conditioning, and elegant blackout curtains."
  },
  {
    id: "deluxe-sitting",
    name: "Deluxe Sitting Area Room",
    price: 1800,
    size: "45 m²",
    bed: "1 Double Bed",
    image: "/photos/img7.jpg",
    description: "Double bed, television, closet mirror, and comfortable sofa seating area."
  },
  {
    id: "smart-twin",
    name: "Smart Workstation Twin Room",
    price: 1200,
    size: "30 m²",
    bed: "2 Twin Beds",
    image: "/photos/img10.jpg",
    description: "Twin-bed option featuring individual AC, patterned pillows, and workspace."
  },
  {
    id: "study-desk",
    name: "Study Desk Double Room",
    price: 1600,
    size: "40 m²",
    bed: "1 Double Bed",
    image: "/photos/img13.jpg",
    description: "Equipped with a study desk, modern green chair, ceiling fan, and wall TV."
  },
  {
    id: "premium-lounge",
    name: "Premium Lounge Room",
    price: 1950,
    size: "48 m²",
    bed: "1 Double Bed",
    image: "/photos/img19.jpg",
    description: "Spacious layout with a brown sofa seating setup, coffee table, and wardrobes."
  },
  {
    id: "lobby-classic",
    name: "Lobby View Classic Room",
    price: 1400,
    size: "38 m²",
    bed: "1 Double Bed",
    image: "/photos/img34.jpg",
    description: "Located near the classic lobby sitting area, featuring traditional gold-themed accents."
  },
  {
    id: "terrace-double",
    name: "Terrace View Double Room",
    price: 1550,
    size: "36 m²",
    bed: "1 Double Bed",
    image: "/photos/img37.jpg",
    description: "Situated near the upper marble staircase terrace with modern door access."
  },
  {
    id: "staircase-cozy",
    name: "Staircase Side Cozy Room",
    price: 1100,
    size: "28 m²",
    bed: "1 Double Bed",
    image: "/photos/img16.jpg",
    description: "Compact room conveniently situated near the marble staircase lobby."
  },
  {
    id: "front-desk-access",
    name: "Front Desk Access Room",
    price: 1300,
    size: "32 m²",
    bed: "1 Double Bed",
    image: "/photos/img31.jpg",
    description: "Ground level double room with quick access to the reception lobby desk."
  }
];

function BookingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [roomsList, setRoomsList] = useState(BUDGET_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState("executive-double");
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState({
    checkInDate: "2026-06-20",
    checkInTime: "14:00",
    checkOutDate: "2026-06-22",
    checkOutTime: "11:00"
  });
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New states
  const [existingBookings, setExistingBookings] = useState([]);
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash Payment");

  // Fetch rooms & existing bookings on mount
  React.useEffect(() => {
    setIsMounted(true);
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.rooms && data.rooms.length > 0) {
          setRoomsList(data.rooms);
          const firstRoomId = data.rooms[0].id || data.rooms[0]._id;
          setSelectedRoomId(firstRoomId);
        }
      })
      .catch((err) => console.error("Error fetching rooms:", err));

    fetch("/api/booking")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.bookings) {
          setExistingBookings(data.bookings);
        }
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [isBooked]);

  // Check if a room is booked for the currently selected dates/times
  const isRoomBooked = (roomId) => {
    if (!dates.checkInDate || !dates.checkOutDate) return false;
    const newStart = new Date(`${dates.checkInDate}T${dates.checkInTime || "12:00"}`);
    const newEnd = new Date(`${dates.checkOutDate}T${dates.checkOutTime || "12:00"}`);

    if (isNaN(newStart) || isNaN(newEnd)) return false;

    return existingBookings.some(b => {
      if (b.roomId !== roomId) return false;
      if (b.status === "Cancelled") return false;

      const existStart = new Date(`${b.checkInDate}T${b.checkInTime}`);
      const existEnd = new Date(`${b.checkOutDate}T${b.checkOutTime}`);

      return newStart < existEnd && newEnd > existStart;
    });
  };

  // Check if every single room in the list is booked for the chosen dates
  const allRoomsBooked = roomsList.length > 0 && roomsList.every(room => isRoomBooked(room.id || room._id));

  // Auto-switch away from a room if it becomes unavailable
  React.useEffect(() => {
    if (isRoomBooked(selectedRoomId)) {
      const firstAvailable = roomsList.find(r => !isRoomBooked(r.id || r._id));
      if (firstAvailable) {
        setSelectedRoomId(firstAvailable.id || firstAvailable._id);
      }
    }
  }, [dates, roomsList, existingBookings]);

  const selectedRoom = roomsList.find(r => r.id === selectedRoomId || r._id === selectedRoomId) || roomsList[0];

  const date1 = new Date(dates.checkInDate);
  const date2 = new Date(dates.checkOutDate);
  const diffTime = Math.abs(date2 - date1);
  const nightsCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const basePrice = (selectedRoom?.price || 1500) * nightsCount;
  const gstAmount = Math.round(basePrice * 0.18);
  const totalPrice = basePrice + gstAmount;

  // Step 2: Form submission checks details, then moves to Step 3: Payment
  const handleProceedToPayment = (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (isRoomBooked(selectedRoomId)) {
      alert("The selected room is not available for the chosen dates. Please choose another room.");
      return;
    }

    setShowPaymentSelection(true);
  };

  // Step 3: Submits the actual booking payload to the API
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      roomId: selectedRoom.id || selectedRoom._id,
      roomName: selectedRoom.name,
      guestName,
      phone,
      checkInDate: dates.checkInDate,
      checkInTime: dates.checkInTime,
      checkOutDate: dates.checkOutDate,
      checkOutTime: dates.checkOutTime,
      totalPrice,
      paymentMethod
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsBooked(true);
        setShowPaymentSelection(false);
      } else {
        alert(data.error || "Failed to confirm booking. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0 mounted-shine" : "opacity-0 translate-y-6"} text-black min-h-screen font-sans py-16 px-6 md:px-12 max-w-[90rem] mx-auto space-y-16 selection:bg-brand-green selection:text-white `}>

      {/* Header */}
      <section className="text-center max-w-4xl mx-auto space-y-5 pt-8">
        <span className="text-lg uppercase tracking-[0.25em] text-[#FFC72C] font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-green-800" />
          The Corporate House Stays
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-light text-black tracking-tight">
          Book Your Stay
        </h1>
        <div className="w-16 h-0.5 bg-brand-green mx-auto"></div>
        <p className="text-black text-3xl font-script leading-relaxed">
          Select from our selection of premium boutique rooms. Customize your check-in slot and secure your booking instantly.
        </p>
      </section>

      {/* Main Layout */}
      {!isBooked ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Room Selection Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-serif font-bold uppercase tracking-wide text-stone-700">
              Step 1: Choose Your Room
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roomsList.map((room) => {
                const rid = room.id || room._id;
                const isChosen = selectedRoomId === rid;
                const booked = isRoomBooked(rid);
                return (
                  <div
                    key={rid}
                    onClick={() => {
                      if (!booked) {
                        setSelectedRoomId(rid);
                      }
                    }}
                    className={`room-card group p-5 rounded-xl border transition-all duration-500 flex flex-col gap-5 -translate-y-0 md:hover:-translate-y-1 md:hover:shadow-md ${booked
                      ? "bg-yellow-100 border-yellow-200 opacity-75 cursor-not-allowed"
                      : isChosen
                        ? " bg-sky-100 bg-card-gradient border-transparent shadow-md cursor-pointer"
                        : "bg-white border-[#E5E2DA] md:hover:border-transparent md:hover:bg-card-gradient cursor-pointer"
                      }`}
                  >
                    <div className="w-full h-52 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="flex-grow space-y-2.5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className={`text-base font-bold font-serif line-clamp-1 transition-colors duration-300 ${isChosen ? "text-white" : "text-[#1C2A22] md:group-hover:text-black"}`}>{room.name}</h4>
                          <span className={`text-base font-serif font-bold shrink-0 transition-colors duration-300 ${isChosen ? "text-amber-400" : "text-brand-green md:group-hover:text-black"}`}>
                            {booked ? <span className="text-red-600 text-xs font-sans font-bold">Booked</span> : `₹${room.price}`}
                          </span>
                        </div>
                        <p className={`text-xs font-bold leading-relaxed line-clamp-2 mt-1 transition-colors duration-300 ${isChosen ? "text-slate-300" : "text-black md:group-hover:text-black"}`}>
                          {room.description}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 text-xs pt-2 mt-1 transition-colors duration-300 border-t ${isChosen ? "text-slate-400 border-slate-800/80" : "text-stone-400 md:group-hover:text-black border-stone-100 md:group-hover:border-slate-800/80"}`}>
                        <span>{room.size}</span>
                        <span>•</span>
                        <span>{room.bed}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Booking details or payment selection */}
          {allRoomsBooked ? (
            <div className="lg:col-span-5 bg-white border border-red-200 rounded-xl p-6 md:p-8 space-y-4 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-red-800">
                No Rooms Available
              </h3>
              <p className="text-stone-500 text-xs font-light leading-relaxed">
                Unfortunately, all of our rooms are booked for the dates you have selected. Please select a different check-in or check-out date to check availability.
              </p>
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-bold text-stone-400">Check-In</label>
                    <input
                      type="date"
                      value={dates.checkInDate}
                      onChange={(e) => setDates(prev => ({ ...prev, checkInDate: e.target.value }))}
                      className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-2.5 py-1.5 text-xs text-stone-700 focus:outline-none focus:border-brand-green"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase font-bold text-stone-400">Check-Out</label>
                    <input
                      type="date"
                      value={dates.checkOutDate}
                      onChange={(e) => setDates(prev => ({ ...prev, checkOutDate: e.target.value }))}
                      className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-2.5 py-1.5 text-xs text-stone-700 focus:outline-none focus:border-brand-green"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : showPaymentSelection ? (
            /* Step 3: Choose Payment Method */
            <form onSubmit={handleBookingSubmit} className="lg:col-span-5 bg-white border border-[#E5E2DA] rounded-xl p-6 md:p-8 space-y-6 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowPaymentSelection(false)}
                  className="p-1 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h3 className="text-lg font-serif font-bold uppercase tracking-wide text-stone-700">
                  Step 3: Payment Option
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-stone-50 border border-[#E5E2DA] rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Selected Room:</span>
                    <strong className="text-[#1C2A22]">{selectedRoom?.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Nights:</span>
                    <strong className="text-[#1C2A22]">{nightsCount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Base Price:</span>
                    <strong className="text-stone-700">₹{basePrice}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">GST (18%):</span>
                    <strong className="text-stone-700">₹{gstAmount}</strong>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-2 mt-1">
                    <span className="text-stone-500 font-bold">Total Price (incl. GST):</span>
                    <strong className="text-brand-green font-serif text-sm">₹{totalPrice}</strong>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                  Choose Payment Method
                </span>

                <div className="grid grid-cols-1 gap-3">
                  <div
                    onClick={() => setPaymentMethod("Online Payment")}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${paymentMethod === "Online Payment"
                      ? "border-brand-green bg-brand-green/5"
                      : "border-[#E5E2DA] bg-white hover:border-stone-300"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className={`w-5 h-5 ${paymentMethod === "Online Payment" ? "text-brand-green" : "text-stone-400"}`} />
                      <div className="text-left">
                        <span className="text-xs font-bold block text-stone-700">Online Payment</span>
                        <span className="text-[10px] text-stone-400 font-light">Pay securely with Cards, UPI, or NetBanking</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "Online Payment" ? "border-brand-green bg-brand-green" : "border-stone-300"}`}>
                      {paymentMethod === "Online Payment" && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("Cash Payment")}
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${paymentMethod === "Cash Payment"
                      ? "border-brand-green bg-brand-green/5"
                      : "border-[#E5E2DA] bg-white hover:border-stone-300"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Coins className={`w-5 h-5 ${paymentMethod === "Cash Payment" ? "text-brand-green" : "text-stone-400"}`} />
                      <div className="text-left">
                        <span className="text-xs font-bold block text-stone-700">Cash Payment</span>
                        <span className="text-[10px] text-stone-400 font-light">Pay in cash at the reception desk during check-in</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "Cash Payment" ? "border-brand-green bg-brand-green" : "border-stone-300"}`}>
                      {paymentMethod === "Cash Payment" && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-x-gold-green animate-gradient-x hover:shadow-lg hover:shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Complete Booking"}
              </button>
            </form>
          ) : (
            /* Step 2: Reserve Slots Form */
            <form onSubmit={handleProceedToPayment} className="lg:col-span-5 bg-white border border-[#E5E2DA] rounded-xl p-7 md:p-10 space-y-8 shadow-sm lg:sticky lg:top-24">
              <h3 className="text-xl font-serif font-bold uppercase tracking-wide text-stone-700">
                Step 2: Reserve Slots
              </h3>

              {/* Selected Room Tag */}
              <div className="p-4 bg-stone-50 border border-[#E5E2DA] rounded-lg flex items-center justify-between text-sm">
                <span className="text-stone-500 font-light">Selected Room:</span>
                <strong className="text-brand-green font-bold">{selectedRoom?.name}</strong>
              </div>

              {/* Guest Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-green" />
                  Guest Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter guests full name"
                  className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-brand-green"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-brand-green" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Please enter a valid 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-brand-green"
                />
              </div>

              {/* Check-In Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    required
                    value={dates.checkInDate}
                    onChange={(e) => setDates(prev => ({ ...prev, checkInDate: e.target.value }))}
                    className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-green" />
                    Check-In Time
                  </label>
                  <input
                    type="time"
                    required
                    value={dates.checkInTime}
                    onChange={(e) => setDates(prev => ({ ...prev, checkInTime: e.target.value }))}
                    className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              {/* Check-Out Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={dates.checkOutDate}
                    onChange={(e) => setDates(prev => ({ ...prev, checkOutDate: e.target.value }))}
                    className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-green" />
                    Check-Out Time
                  </label>
                  <input
                    type="time"
                    required
                    value={dates.checkOutTime}
                    onChange={(e) => setDates(prev => ({ ...prev, checkOutTime: e.target.value }))}
                    className="bg-stone-50 border border-[#E5E2DA] rounded-lg px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-gradient-x-gold-green animate-gradient-x hover:shadow-lg hover:shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Book
              </button>
            </form>
          )}
        </div>
      ) : (
        // Confirmation Screen
        <div className="max-w-md mx-auto bg-white border border-[#E5E2DA] p-8 rounded-xl shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/20">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-light text-[#1C2A22] uppercase tracking-wide">
              Booking Placed!
            </h2>
            <p className="text-stone-500 text-xs font-light leading-relaxed">
              Thank you, <strong className="text-[#1C2A22]">{guestName}</strong>. Your reservation request is pending admin verification.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-[#E5E2DA] rounded-lg text-left text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">Status:</span>
              <span className="text-amber-600 font-bold uppercase tracking-wider text-[10px]">Pending Verification</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">Payment Option:</span>
              <span className="text-brand-green font-bold uppercase tracking-wider text-[10px]">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">Guest Phone:</span>
              <span className="text-stone-850 font-bold">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">Room Type:</span>
              <span className="text-stone-850 font-bold">{selectedRoom?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">Check-In:</span>
              <span className="text-stone-850 font-bold">{dates.checkInDate} at {dates.checkInTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">Check-Out:</span>
              <span className="text-stone-850 font-bold">{dates.checkOutDate} at {dates.checkOutTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">Base Price:</span>
              <span className="text-stone-850 font-bold">₹{basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-light">GST (18%):</span>
              <span className="text-stone-850 font-bold">₹{gstAmount}</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-2 mt-1">
              <span className="text-stone-500 font-bold">Total Price (incl. GST):</span>
              <span className="text-[#1C2A22] font-serif font-bold">₹{totalPrice}</span>
            </div>
          </div>

          <div className="pt-2 flex gap-4">
            <button
              onClick={() => setIsBooked(false)}
              className="flex-1 py-3 rounded-lg border border-stone-200 text-xs uppercase tracking-wider text-stone-600 hover:bg-stone-50"
            >
              Book Another
            </button>
            <Link
              href="/"
              className="flex-1 py-3 rounded-lg text-xs uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-hover flex items-center justify-center font-bold"
            >
              Go to Home
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default BookingPage;
